import express from 'express';
import { getAllPizza, getPizzaById, getPizzaByName } from '../controllers/pizzaController.js';


const router = express.Router();

//get all pizza
router.get('/get-pizza', getAllPizza);

//single product
router.get('/get-pizza/:name', getPizzaByName);

//get pizza by id
router.get('/:pizzaid', getPizzaById);


export default router;