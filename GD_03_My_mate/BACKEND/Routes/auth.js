const express = require("express");
const { Login, Signup, Logout } = require("../Controllers/auth");
const auth = express.Router();
const upload = require("../Middlewares/upload");
// Signup
auth.post("/signup",upload.single('profilePic'), Signup);

// Login
auth.post("/login", Login);

// Logout
auth.get("/logout", Logout);

module.exports = auth;
