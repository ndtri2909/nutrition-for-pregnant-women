const ketLuanKhuyenNghiController = require("../controllers/ketLuanKhuyenNghiController");

const router = require("express").Router();
router.post(
  "/createKetLuanKhuyenNghi",
  ketLuanKhuyenNghiController.createKetLuanKhuyenNghi
);
router.get("/getAllKetLuanKhuyenNghi", ketLuanKhuyenNghiController.getAllKetLuanKhuyenNghi);
router.post("/getKetLuanKhuyenNghiByValue", ketLuanKhuyenNghiController.getKetLuanKhuyenNghiByValue);
router.get("/getIdKetLuanKhuyenNghi/:id", ketLuanKhuyenNghiController.getIdKetLuanKhuyenNghi);
router.patch(
  "/updateKetLuanKhuyenNghi/:id",
  
  ketLuanKhuyenNghiController.updateKetLuanKhuyenNghi
);
router.delete(
  "/deleteKetLuanKhuyenNghi/:id",
  ketLuanKhuyenNghiController.deleteKetLuanKhuyenNghi
);

module.exports = router;
