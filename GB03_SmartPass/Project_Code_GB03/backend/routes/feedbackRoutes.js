// feedback.js (Express route)
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST feedback
router.post('/', async (req, res) => {
  try {
    const { studentName, studentId, hostel, department, suggestion, improvement, rating } = req.body;
    const newFeedback = new Feedback({
      studentName,
      studentId,
      hostel,
      department,
      suggestion,
      improvement,
      rating,
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error });
  }
});

module.exports = router;
