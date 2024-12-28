const jwt = require('jsonwebtoken');
const User = require('../Models/user'); // Adjust the path according to your project structure
const dotenv = require('dotenv');
dotenv.config();

// Middleware to check if the user is logged in
exports.isLoggedIn = async (req, res, next) => {
  // Get token from cookie or Authorization header
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token provided! You need to log in first.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user associated with the decoded token
    req.user = await User.findById(decoded.id);
    
    // If user is not found in the database, return an error
    if (!req.user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Proceed to the next middleware/route handler
    next(); 
  } catch (err) {
    // Handle invalid token cases (e.g., token expired, malformed token)
    return res.status(403).json({ message: 'Invalid or expired token!', error: err.message });
  }
};
