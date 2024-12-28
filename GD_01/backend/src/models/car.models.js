import mongoose, { Schema } from "mongoose";

const carSchema = new Schema({
  carname: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  regNo: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1886
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  seats: {
    type: Number,
    required: true,
    min: 1
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] 
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic'] 
  },
  location:{
    type:String,
    required:true,
  },
  img: {
    type: String,
    trim: true,
    default:"https://img.freepik.com/premium-vector/car-icon-car-icon-white-background-illustration_995545-84.jpg"
  },
  userID:{
    type: String,
    required: true,
  }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
