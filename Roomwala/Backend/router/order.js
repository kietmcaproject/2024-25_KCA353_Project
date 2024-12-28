import express from 'express';
import 'dotenv/config';
import { createOrder,getorderdetails } from '../controller/ordercontroller.js';

const router = express.Router();

router.post('/create', createOrder);

router.post('/getorders', getorderdetails);

export default router;