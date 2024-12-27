const  express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController. renderSignupForm )
.post(wrapAsync(userController.signUp)
);

router.route("/login")
.get(userController.renderLoginForm)

.post( saveRedirectUrl,passport.authenticate 
    ("local" , {failureRedirect: '/login' , failureFlash : true}) ,userController.LoginForm

);


router.get("/logout",userController.LogOutForm);

module.exports = router; 