import express from 'express';
import { getAllSnacks, getSnacksByName } from '../controllers/snackController.js';

const router = express.Router();

//get all snacks
router.get('/get-snack', getAllSnacks);

//single product
router.get('/get-snack/:name', getSnacksByName);

export default router;
