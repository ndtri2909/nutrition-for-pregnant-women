const { Districts } = require("../models");

const db = require("../models/index");

require("dotenv").config();

const districtService = {

  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const districts = await db.Districts.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Cities,
              required: false,
              attributes: ["id", "CD", "NAME", "DESC"],
              where: {
                IS_DELETED: false,
              },
             
            },
            {
              model: db.Wards,
              required: false,
              attributes: ["id", "CD", "NAME", "DESC"],
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: 200,
          districts,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = districtService;
