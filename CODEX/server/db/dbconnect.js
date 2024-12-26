const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const url = process.env.MONGO_URI

const  connectDB = async () => {
    try {
        await mongoose.connect(url, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Failed to connect  to MongoDB");
        process.exit(1);
    }
}

module.exports = connectDB