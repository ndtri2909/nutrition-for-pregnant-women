const createSuccess = require("../helpers/createSuccess")
const cityService = require("../services/cityService")

const cityController = {

  getAll: async (req, res, next) => {
    try {
      const { status, cities } = await cityService.getAll()
      res
        .status(status)
        .json(createSuccess(status, "Tải tất cả thành phố thành công !", cities))
    } catch (error) {
      next(error)
    }
  },

}

module.exports = cityController

