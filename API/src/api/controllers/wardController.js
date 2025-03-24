const createSuccess = require("../helpers/createSuccess")
const wardService = require("../services/wardService")

const wardController = {

  getAll: async (req, res, next) => {
    try {
      const { status, wards } = await wardService.getAll()
      res
        .status(status)
        .json(
          createSuccess(status, "Tải tất cả phường xã thành công !", wards)
        )
    } catch (error) {
      next(error)
    }
  },

}

module.exports = wardController
