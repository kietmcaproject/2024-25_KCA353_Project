import express from 'express';
import { getAllChinese, getChineseByName } from '../controllers/chineseController.js';

const router = express.Router();

//get all chinese
router.get('/get-chinese', getAllChinese);

//single product
router.get('/get-chinese/:name', getChineseByName);

export default router;
