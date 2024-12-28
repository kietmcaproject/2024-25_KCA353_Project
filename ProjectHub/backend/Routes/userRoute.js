const express  = require('express');

const { signupController, loginController, addProjectController } = require('../Controllers/userController');

const { isAuthenticated } = require('../Middleware/isAuthenticated');
const router = express.Router();

router.post('/signup', signupController)
router.post('/login',loginController)
// router.post('/add-project', isAuthenticated,addProjectController);

 module.exports=router;