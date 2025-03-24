const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate")

const router = require("express").Router();

router.get("/getAllUser",userController.getAllUser);
router.get("/getCountUserByCity",userController.getCountUserByCity);
router.get("/getIdUser/:id", userController.getIdUser);
router.patch(
  "/updateUser/:id",
  userController.updateUser
);
router.patch(
  "/changePassword/:id",
  authenticate.authenticate,
  userController.changePassword
);


module.exports = router;
