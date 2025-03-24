const thucDonController = require("../controllers/thucDonController");

const router = require("express").Router();
router.post(
  "/createThucDon",
  thucDonController.createThucDon
);
router.post(
  "/settingThucDon",
  thucDonController.settingThucDons
);
router.delete(
  "/deleteSettingThucDon/:id",
  thucDonController.deleteSettingThucDon
);
router.get("/getAllThucDon", thucDonController.getAllThucDon);
router.post("/getAllByQueryThucDon", thucDonController.getAllByQueryThucDon);
router.get("/getIdThucDon/:id", thucDonController.getIdThucDon);
router.patch(
  "/updateThucDon/:id",
  
  thucDonController.updateThucDon
);
router.delete(
  "/deleteThucDon/:id",
  thucDonController.deleteThucDon
);

module.exports = router;
