const bcrypt = require("bcrypt");
const db = require("../models");



const authService = {
    hashPassword: async (password) => {
        return new Promise(async (resolve, reject) => {
          try {
            const passwordHash = await bcrypt.hash(password, 12);
            resolve(passwordHash);
          } catch (error) {
            reject(error);
          }
        });
      },
      checkUserExist: async (user, EMAIL, PHONE) => {
        return new Promise(async (resolve, reject) => {
          try {
            // EMAIL
            if (!user && EMAIL) {
              user = await db.Users.findOne({
                where: {
                  EMAIL,
                  IS_DELETED: false,
                },
              });
            }
    
            //PHONE
            if (!user && PHONE) {
              user = await db.Users.findOne({
                where: {
                    PHONE,
                  IS_DELETED: false,
                },
                include: [
           
                  {
                    model: db.Cities,
                    require: false,
                    where: {
                      IS_DELETED: false,
                    },
                  },
                ],

              });
            }
            if (!user) {
              resolve(false);
            } else {
              resolve(user);
            }
          } catch (error) {
            reject(error);
          }
        });
      },
      checkMatchPassword: async (password, userPassword) => {
        return new Promise(async (resolve, reject) => {
          try {
            const isMatch = await bcrypt.compare(password, userPassword);
            resolve(isMatch);
          } catch (error) {
            reject(error);
          }
        });
      },
}

module.exports = authService;
