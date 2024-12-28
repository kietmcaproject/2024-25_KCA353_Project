// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if the Authorization header exists and if it contains a Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header is missing or malformed');
    return res.status(403).json({ error: 'Authorization header is missing or malformed' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided after splitting the header');
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object for further use
    req.userId = decoded.userId || decoded._id;

    // Log the decoded token information for debugging
    console.log('Token verified successfully:', decoded);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);

    // Handle specific JWT errors for better feedback
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    } else {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
  }
};

module.exports = authenticateToken;
