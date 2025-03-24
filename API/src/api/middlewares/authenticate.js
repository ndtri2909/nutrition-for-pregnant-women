const { Users } = require("../models")
const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const createSuccess = require("../helpers/createSuccess");
exports.authenticate = async (req, res, next) => {
  try {
    // console.log(process.env.AUTHENTICATE_TYPE)
      const token = req.header("Authorization") || req.params?.token || req.query?.token
      if (!token) {
        return res.status(400).json({
          status: 400,
          message: "No Authentication header found.",
        })
      }
      //allow token from specific service calls
      let serviceTokens = process.env?.SERVICE_AUTH_TOKENS
      if (serviceTokens) {
        serviceTokens = serviceTokens.split(',')
        if (serviceTokens.includes(token)) return next()
      }
      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if (!decoded) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Authentication",
        })
      }
      const user = await Users.findOne({
        where: { id: decoded.id },
        attributes: {
          exclude: ["PASSWORD"],
        },
      })
      if (!user) throw createError.BadRequest("User does not exist.")
      req.user = user

    return next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: error.message,
      })
    }
    return res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}
exports.verifyServiceToken = async (req, res, next) => {
  try {

      const token = req.header("Authorization")
      if (!token) {
        return res.status(400).json({
          status: 400,
          message: "No Authentication header found.",
        })
      }
      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if (!decoded) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Authentication",
        })
      }

      const user = await Users.findOne({
        where: { id: decoded.id },
        attributes: {
          exclude: ["PASSWORD"],
        },
      })
      if (!user) throw createError.BadRequest("User does not exist.")
      // req.user = user

    return res.status(200).json(createSuccess(200, "User authenticated from SSO server.", {}));
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: error.message,
      })
    }
    return res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}
