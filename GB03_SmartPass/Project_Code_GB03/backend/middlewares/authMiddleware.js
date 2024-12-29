// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user based on JWT token
const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token found.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user data to request object
    next(); // Continue to the next middleware
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to authorize user based on their role (HOD access only)
const authorizeHod = (req, res, next) => {
  if (!req.user || req.user.role.toLowerCase() !== 'hod') {
    return res.status(403).json({ message: 'Access forbidden. Only HODs can access this resource.' });
  }
  next();
};

module.exports = { authenticateUser, authorizeHod };

 // Export the middleware
  //status page fix, all fix, hod report fix, feedback frontend fix, json create for feedback