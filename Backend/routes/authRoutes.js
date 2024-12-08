const router = require("express").Router();
const { register, logIn, logout } = require("../controllers/authControllers");

router.post("/register", register);
router.post("/login", logIn);
router.get("/logout", logout);

module.exports = router;
