const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authenticate");
const { verifyRefreshToken } = require("../middlewares/verify");

const router = require("express").Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.login)
// router.get("/verifyServiceToken", authenticate.verifyServiceToken)
router.get("/refresh_token", verifyRefreshToken, authController.refreshToken)

module.exports = router;
