const congThucController = require("../controllers/congThucController");

const router = require("express").Router();
router.post(
  "/createCongThuc",
  congThucController.createCongThuc
);
router.get("/getAllCongThuc", congThucController.getAllCongThuc);
router.get("/getIdCongThuc/:id", congThucController.getIdCongThuc);
router.patch(
  "/updateCongThuc/:id",
  
  congThucController.updateCongThuc
);
router.delete(
  "/deleteCongThuc/:id",
  congThucController.deleteCongThuc
);

module.exports = router;
