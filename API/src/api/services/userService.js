const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op, QueryTypes } = require("sequelize");
const authService = require("./authService");

const userService = {
  createuser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if code exist or not
        const { EMAIL, PHONE, CITY_ID, DISTRICT_ID, WARD_ID, PASSWORD } = user

        const existEmail = await db.Users.findOne({
          where: {
            EMAIL,
            IS_DELETED: false,
          },
        });
        const existPhone = await db.Users.findOne({
          where: {
            PHONE,
            IS_DELETED: false,
          },
        });

        if (existEmail) throw createError.Conflict("email already exists");
        if (existPhone) throw createError.Conflict("phone already exists");

        const passwordHash = await authService.hashPassword(PASSWORD);
        const response = await db.Users.create({
          ...user,
          PASSWORD: passwordHash,
          ...logCreate(user.UPDATED_BY),
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create user successfully!"
            : "Error while create user",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAlluser: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
           
            {
              model: db.Cities,
              require: false,
              // where: {
              //   IS_DELETED: false,
              // },
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list user successfully"
            : "Error while get list user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDuser: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.findOne({
          where: {
            id: userId,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Working_Statuses,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Cities,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Districts,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Wards,
              where: {
                IS_DELETED: false,
              },
            },

          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id user successfully"
            : "Error while get id user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateuser: async (user, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if code exist or not
        const { EMAIL, PHONE, CITY_ID, DISTRICT_ID, WARD_ID } = user

        const existEmail = await db.Users.findOne({
          where: {
            EMAIL,
            IS_DELETED: false,
          },
        });
        const existPhone = await db.Users.findOne({
          where: {
            PHONE,
            IS_DELETED: false,
          },
        });
        // const existCity = await db.Cities.findOne({
        //     where: {
        //       id: CITY_ID,
        //       IS_DELETED: false,
        //     },
        //   });
        //   const existDistrict = await db.Districts.findOne({
        //     where: {
        //       id: DISTRICT_ID,
        //       IS_DELETED: false,
        //     },
        //   });
        //   const existWard = await db.Wards.findOne({
        //     where: {
        //       id: WARD_ID,
        //       IS_DELETED: false,
        //     },
        //   });

        //   if (!existCity) throw createError.Conflict("city not exists");
        //   if (!existDistrict) throw createError.Conflict("district exists");
        //   if (!existWard) throw createError.Conflict("ward exists");
        if (EMAIL && (existEmail?.id != userId && existEmail?.id !== undefined)) throw createError.Conflict("email already exists");
        if (PHONE && (existPhone?.id != userId && existPhone?.id !== undefined)) throw createError.Conflict("phone already exists");


        const response = await db.Users.update(
          {
            ...user,
            ...logUpdate(user.UPDATED_BY),
          },
          {
            where: {
              id: userId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update user successfully"
            : "Error while update user",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  changePassword: async (pass, userId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const response = await db.Users.update(
          {
            PASSWORD: pass,
            ...logUpdate(user.UPDATED_BY),
          },
          {
            where: {
              id: userId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update password user successfully"
            : "Error while update password user",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  dashboardByCity: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.sequelize.query('SELECT NAME, COUNT(Users.id) AS `count` FROM Cities LEFT JOIN Users ON Cities.id = Users.CITY_ID GROUP BY Cities.NAME;', {
          type: QueryTypes.SELECT,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get count user successfully"
            : "Error while get count user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = userService;
