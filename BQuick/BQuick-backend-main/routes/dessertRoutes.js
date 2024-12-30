import express from 'express';
import { getAllDessert, getDessertByName } from '../controllers/dessertController.js';

const router = express.Router();

//get all desserts
router.get('/get-dessert', getAllDessert);

//single product
router.get('/get-dessert/:name', getDessertByName);

export default router;
