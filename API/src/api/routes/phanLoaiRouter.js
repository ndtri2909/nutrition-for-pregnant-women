const phanLoaiController = require("../controllers/phanLoaiController");

const router = require("express").Router();
router.post(
  "/createPhanLoai",
  phanLoaiController.createPhanLoai
);
router.get("/getAllPhanLoai", phanLoaiController.getAllPhanLoai);
router.get("/getIdPhanLoai/:id", phanLoaiController.getIdPhanLoai);
router.patch(
  "/updatePhanLoai/:id",
  
  phanLoaiController.updatePhanLoai
);
router.delete(
  "/deletePhanLoai/:id",
  phanLoaiController.deletePhanLoai
);

module.exports = router;
