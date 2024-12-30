import express from 'express';
import { getAllBeverage, getBeverageByName } from '../controllers/beverageController.js';


const router = express.Router();

//get all pizza
router.get('/get-beverage', getAllBeverage);

//single product
router.get('/get-beverage/:name', getBeverageByName);


export default router;