const User = require('../models/User');

// Fetch student details based on userId
exports.getStudentById = async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await User.findOne({ userId, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Respond with student data
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
