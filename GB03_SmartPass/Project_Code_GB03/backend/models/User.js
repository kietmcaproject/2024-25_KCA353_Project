const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'hod', 'warden', 'guard'], required: true },
  department: { type: String },
  rollNumber: { type: String },
  hostel: { type: String }  
});

module.exports = mongoose.model('User', userSchema);
