const router = require("express").Router();
const {login , signup} = require('../controller/auth');
const {Getuser} = require("../controller/Usercontroller");

router.post('/login' , login);

router.post('/signup' , signup);

router.get('/GetUser' ,Getuser);


module.exports = router;