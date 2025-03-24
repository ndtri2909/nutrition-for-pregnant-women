const bmiController = require("../controllers/bmiController");

const router = require("express").Router();
router.post(
  "/createBMI",
  bmiController.createBMI
);
router.get("/getBMIByUser/:id", bmiController.getAllBMIByUser);
router.get("/getCountBmiByPhanLoai", bmiController.getCountBmiByPhanLoai);

module.exports = router;
