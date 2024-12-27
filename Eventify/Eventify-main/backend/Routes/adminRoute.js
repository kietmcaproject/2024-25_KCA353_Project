const express = require("express");

const {
  signupController,
  loginController,
  getUserController,
} = require("../Controllers/userController");
const { isAuthenticated } = require("../Middleware/isAuthenticated");
const router = express.Router();

router.post("/admin-signup", signupController);
router.post("/admin-login", loginController);
router.get("/me", isAuthenticated, getUserController);

module.exports = router;
