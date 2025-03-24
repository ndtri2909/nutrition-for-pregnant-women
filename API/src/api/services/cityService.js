
const db = require("../models/index");
const cityService = {

  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const cities = await db.Cities.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Districts,
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
          cities,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = cityService;
