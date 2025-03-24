const dinhDuongController = require("../controllers/dinhDuongController");

const router = require("express").Router();
router.post(
  "/createDinhDuong",
  dinhDuongController.createDinhDuong
);
router.get("/getAllDinhDuong", dinhDuongController.getAllDinhDuong);
router.get("/getIdDinhDuong/:id", dinhDuongController.getIdDinhDuong);
router.patch(
  "/updateDinhDuong/:id",
  
  dinhDuongController.updateDinhDuong
);
router.delete(
  "/deleteDinhDuong/:id",
  dinhDuongController.deleteDinhDuong
);

module.exports = router;
