const router = require("express").Router()
const districtController = require("../controllers/districtController")


router.get("/getAll",  districtController.getAll)


module.exports = router
