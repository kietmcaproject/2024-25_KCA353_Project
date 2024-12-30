import express from 'express';
import { getAllBurger, getBurgerByName } from '../controllers/burgerController.js';


const router = express.Router();

//get all pizza
router.get('/get-burger', getAllBurger);

//single product
router.get('/get-burger/:name', getBurgerByName);


export default router;