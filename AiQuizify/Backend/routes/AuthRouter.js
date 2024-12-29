import express from 'express';
const router = express.Router();

import { loginvalidation, signupvalidation } from '../middlewares/AuthValidation.js';
import { signup,login } from '../controller/authcontroller.js';



router.post('/signup', signupvalidation, signup);
router.post('/login',loginvalidation, login);

export default router;
