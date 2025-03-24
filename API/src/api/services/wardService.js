
const db = require("../models/index");

const wardService = {

  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const wards = await db.Wards.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Districts,
              required: false,
              attributes: ["id", "NAME"],
              where: {
                IS_DELETED: false,
              },
              include: [
                {
                  model: db.Cities,
                  required: false,
                  attributes: ["id", "NAME"],
                  where: {
                    IS_DELETED: false,
                  },
                  
                },
              ],
            },
          ],
        });
        resolve({
          status: 200,
          wards,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = wardService;
