import express from 'express';
import { getAllBread, getBreadByName } from '../controllers/breadController.js';

const router = express.Router();

//get all bread
router.get('/get-bread', getAllBread);

//single product
router.get('/get-bread/:name', getBreadByName);

export default router;
