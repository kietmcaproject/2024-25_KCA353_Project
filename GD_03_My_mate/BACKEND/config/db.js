const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;
