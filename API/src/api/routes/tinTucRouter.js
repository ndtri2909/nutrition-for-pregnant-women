const tinTucController = require("../controllers/tinTucController");

const router = require("express").Router();
router.post(
  "/createTinTuc",
  tinTucController.createTinTuc
);
router.get("/getAllTinTuc", tinTucController.getAllTinTuc);
router.get("/getIdTinTuc/:id", tinTucController.getIdTinTuc);
router.patch(
  "/updateTinTuc/:id",
  
  tinTucController.updateTinTuc
);
router.delete(
  "/deleteTinTuc/:id",
  tinTucController.deleteTinTuc
);

module.exports = router;
