import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDN_NAME,
    api_key: process.env.CLOUDN_API_KEY,
    api_secret: process.env.CLOUDN_API_SECRET
});
export default cloudinary;