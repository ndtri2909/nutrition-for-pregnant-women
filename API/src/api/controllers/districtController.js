const createSuccess = require("../helpers/createSuccess")
const districtService = require("../services/districtService")

const districtController = {

  getAll: async (req, res, next) => {
    try {
      const { status, districts } = await districtService.getAll()
      res
        .status(status)
        .json(
          createSuccess(status, "Tải tất cả quận huyện thành công !", districts)
        )
    } catch (error) {
      next(error)
    }
  },

}

module.exports = districtController
