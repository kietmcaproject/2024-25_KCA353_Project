const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Existing student routes here...

// Route to get student data by userId
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  

  try {
    const student = await User.findOne({ userId: String(id), role: 'student' }); 
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
