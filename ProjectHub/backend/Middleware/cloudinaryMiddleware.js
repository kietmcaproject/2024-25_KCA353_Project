const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Middleware to upload image to Cloudinary
const uploadImageToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) { // Now we're looking for a file in the request
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // Use the buffer from Multer's in-memory storage
        const result = await cloudinary.uploader.upload_stream({
            folder: 'projectHub_images'
        }, (error, result) => {
            console.log(result);
            if (error) { 
                return res.status(500).json({
                    success: false,
                    message: `Image upload failed!!! error: ${error.message}`,
                });
            }
            req.body.image = result.secure_url;
            next(); // Proceed to the next middleware or route handler
        }).end(req.file.buffer); // Pass the file buffer to Cloudinary
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: `Image upload failed! error: ${error.message}`,
        });
    }
};

module.exports = uploadImageToCloudinary;
