const monAnController = require("../controllers/monAnController");
const { uploadFile } = require("../middlewares/upload");

const router = require("express").Router();
router.post(
  "/createMonAn",
  monAnController.createMonAn
);
router.get("/getAllMonAn", monAnController.getAllMonAn);
router.post("/getAllByQueryMonAn", monAnController.getAllByQueryMonAn);
router.get("/getIdMonAn/:id", monAnController.getIdMonAn);
router.patch(
  "/updateMonAn/:id",
  
  monAnController.updateMonAn
);
router.delete(
  "/deleteMonAn/:id",
  monAnController.deleteMonAn
);
router.post(
    "/uploadFileMonAn",
    uploadFile.single("uploadFile"),
    monAnController.updateFileMonAn
  );
  router.delete(
    "/deleteFileMonAn/:id",
    monAnController.deleteFileMonAn
  );
module.exports = router;
