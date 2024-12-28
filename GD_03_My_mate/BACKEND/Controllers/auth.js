const userModel = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("../config/cloudinary");


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // Generate JWT token
    let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Set the token in a cookie and return user data
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "Login successful",
      "token":token,
      userId:user._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const Signup = async (req, res) => {
  try {
    // Extract form data and file from the request
    const { name, email, password } = req.body;
    const profilePic = req.file;  // The uploaded image file

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If there's a profilePic, upload to Cloudinary
    let profilePicUrl = '';
    if (profilePic) {
      const cloudinaryResponse = await cloudinary.uploader.upload(profilePic.path, {
        folder: 'user_profiles', // Optional folder to organize images
        transformation: [
          { width: 200, height: 200, crop: 'thumb' } // Optional transformation (resize/crop)
        ],
      });

      // Save Cloudinary URL in the user object
      profilePicUrl = cloudinaryResponse.secure_url;
    }

    // Create a new user with hashed password and Cloudinary image URL
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      profilePic: profilePicUrl, // Save the Cloudinary image URL
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    // Set token in cookie and return success response
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      userId:user._id
    });
  } catch (error) {
    console.error('Signup Error: ', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
    });
  }
};



const Logout =(req,res)=> {
  res.cookie("token","");
  res.send("Logout")
}

module.exports = {
  Login,
  Signup,
  Logout
};
