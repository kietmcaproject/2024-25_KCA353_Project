import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return response;
  } catch (error) {
    // Fix: Changed `localFilePath` to `filePath`
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Optional: Log the error for debugging
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadOnCloudinary };
