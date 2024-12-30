import express from 'express';
import { getAllPasta, getPastaByName } from '../controllers/pastaController.js';

const router = express.Router();

//get all pasta
router.get('/get-pasta', getAllPasta);

//single product
router.get('/get-pasta/:name', getPastaByName);

export default router;
