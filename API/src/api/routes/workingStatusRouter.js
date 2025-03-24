const workingStatusController = require("../controllers/workingStatusController");

const router = require("express").Router();
router.post(
  "/createWorkingStatus",
  workingStatusController.createWorkingStatus
);
router.get("/getAllWorkingStatus", workingStatusController.getAllWorkingStatus);
router.get("/getIdWorkingStatus/:id", workingStatusController.getIdWorkingStatus);
router.patch(
  "/updateWorkingStatus/:id",
  
  workingStatusController.updateWorkingStatus
);
router.delete(
  "/deleteWorkingStatus/:id",
  workingStatusController.deleteWorkingStatus
);

module.exports = router;
