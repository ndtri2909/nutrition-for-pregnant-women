const router = require("express").Router()
const cityController = require("../controllers/cityController")



router.get("/getAll", cityController.getAll)


module.exports = router
