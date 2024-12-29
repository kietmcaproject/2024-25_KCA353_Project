// Feedback.js (Mongoose model)
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: String,
  studentId: String,
  hostel: String,
  department: String,
  suggestion: String,
  improvement: String,
  rating: Number,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
