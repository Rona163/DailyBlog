const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const protect = require("../middleware/authMiddleware");

router.post("/login", loginController.loginUser);
router.post("/refresh", loginController.refreshToken);
router.post("/logout", loginController.logoutUser );

module.exports = router;