const router = require("express").Router()
const wardController = require("../controllers/wardController")



router.get("/getAll", wardController.getAll)



module.exports = router
