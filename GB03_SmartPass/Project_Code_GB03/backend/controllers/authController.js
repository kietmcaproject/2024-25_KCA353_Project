const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const users = require('../userData.json'); 

// Function for user login
exports.login = async (req, res) => {
  const { userId, password } = req.body; 

  try {
    // Find the user in the JSON data
    const userFromJson = users.find(user => user.userId === userId);

    if (!userFromJson) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password directly (since not hashing)
    if (password !== userFromJson.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user exists in MongoDB
    let user = await User.findOne({ userId });

    // If user doesn't exist in MongoDB, create a new entry
    if (!user) {
      user = new User({
        userId: userFromJson.userId,
        name: userFromJson.name,
        password: userFromJson.password, // Store the plain password
        role: userFromJson.role,
        department: userFromJson.department,
        rollNumber: userFromJson.rollNumber,
        hostel:userFromJson.hostel
      });
      await user.save(); // Save the user to MongoDB
    }

    // Token generation
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return res.json({ token, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
