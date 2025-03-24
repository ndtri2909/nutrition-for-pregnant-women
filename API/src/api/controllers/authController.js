const createSuccess = require("../helpers/createSuccess");
const createError = require("http-errors");

const { generateAccessToken, generateRefreshToken, generateRefreshTokenShortExpiration } = require("../helpers/generateToken");
const authService = require("../services/authService");
const userService = require("../services/userService");
const setRefreshToken = async (res, refreshToken, rememberMe) => {
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      domain: process.env.SSO_DOMAIN,
      // maxAge: 30 * 60 * 1000, // 30m
      path: "/",
      // secure: true,
      // sameSite: "Lax",
    });
    res.cookie("rememberMe", rememberMe, {
      httpOnly: true,
      domain: process.env.SSO_DOMAIN,
      // maxAge: 30 * 60 * 1000, // 30m
      path: "/",
      // secure: true,
      // sameSite: "Lax",
    });
  };
const authController = {
    registerUser: async (req, res, next) => {
        try {
          const { status, message } = await userService.createuser(req.body);
          res.status(status).json(createSuccess(status, message));
        } catch (error) {
          next(error);
        }
      },
      login: async (req, res, next) => {
        const { PHONE, PASSWORD, remember } = req.body;
        try {
          let user;
          //connect AD to login
            user = await authService.checkUserExist(user ,undefined, PHONE);
            // if (!user) throw createError.NotFound("This user does not exist.")
            if (!user) {
              res
                .status(400)
                // .json(createSuccess(400, "This user does not exist.", {}));
                .json(createSuccess(400, "Người dùng này không tồn tại.", {}));
              return;
            }
            // console.log("User: ", user);
            //login by user database
            const isMatch = await authService.checkMatchPassword(
              PASSWORD,
              user.PASSWORD
            );
            if (!isMatch) {
              // throw createError.BadRequest("Password is incorrect.");
              throw createError.BadRequest("Mật khẩu không đúng.");
            }

          const access_token = generateAccessToken({ id: user.id });
          let refresh_token;
          if (remember) {
            refresh_token = generateRefreshToken({ id: user.id });
          } else {
            refresh_token = generateRefreshTokenShortExpiration({ id: user.id });
          }
          // need to set long time for RefToken rather than Access token for remember me button ?
          user.PASSWORD = undefined;
          await setRefreshToken(res, refresh_token, remember);
    
          res.status(200).json(
            // createSuccess(200, "Login successfully !", {
            createSuccess(200, "Login thành công !", {
              user,
              access_token,
            })
          );
        } catch (error) {
          next(error);
        }
      },
      refreshToken: async (req, res, next) => {
        try {
          const userId = req.userId;
          if (process.env?.CONSOLE_LOG == "true") console.log("req.userId: ", req.userId)
          const rememberMe = req.cookies.rememberMe;
          // let storedRefreshToken = refreshTokenStore.find(x => x.userId == userId)
    
          // if (storedRefreshToken == undefined) throw createError.BadRequest("Please login now!")
          const user = await userService.getIDuser(userId);
          if (!user) throw createError.BadRequest("This user does not exist.");
          const access_token = generateAccessToken({ id: user.id });
          let refresh_token;
          if (rememberMe == "true") {
            refresh_token = generateRefreshToken({ id: user.id });
          } else {
            refresh_token = generateRefreshTokenShortExpiration({ id: user.id });
          }
          await setRefreshToken(res, refresh_token, rememberMe);
          user.USER_PW = undefined;
    
          res.status(200).json(
            // createSuccess(200, "Tải new access_token successfully !", {
            createSuccess(200, "Tải mới access_token thành công !", {
              access_token,
              user,
            })
          );
        } catch (error) {
          next(error);
        }
      },
}
module.exports = authController;
