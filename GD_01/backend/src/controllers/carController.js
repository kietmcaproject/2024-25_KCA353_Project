import Car from '../models/car.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


// ================== Get all Cars ==============
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============== Create Car ===================================
export const createCar = async (req, res) => {
  try {
    const { carname, brand, regNo, year, pricePerDay, seats, fuelType, transmission, location, userID } = req.body;
    const imgPath = req.file ? req.file.path : '';
    console.log(imgPath);
    
    let imgUrl = '';

    if (imgPath) {
      const cloudinaryResponse = await uploadOnCloudinary(imgPath);
      imgUrl = cloudinaryResponse.secure_url;
    }
    
    const newCar = new Car({
      carname,
      brand,
      regNo,
      year,
      pricePerDay,
      seats,
      fuelType,
      transmission,
      location,
      img: imgUrl, 
      userID,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// ========================= Update Car ==================================
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const imgFilePath = req.file?.path;
    if (imgFilePath) {
      const imgResponse = await uploadOnCloudinary(imgFilePath);
      updates.img = imgResponse ? imgResponse.secure_url : updates.img;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================== Delete a car ================================
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==================== Get a specific car by ID ===================================
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
