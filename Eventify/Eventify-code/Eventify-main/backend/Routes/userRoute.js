const express = require("express");

const {
  signupController,
  loginController,
} = require("../Controllers/userController");
const { isAuthenticated } = require("../Middleware/isAuthenticated");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
// router.get("/me", isAuthenticated, getUserController);

module.exports = router;
