import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/carController.js';

const carRouter = Router();

carRouter.route("/available-cars").get(getAllCars);
carRouter.route("/car-details/:id").get(getCarById);
carRouter.route("/add-car").post(upload.single('img'), createCar);
carRouter.route("/update-car/:id").put(upload.single('img'), updateCar); 
carRouter.route("/car/:id").delete(deleteCar);

export default carRouter;
