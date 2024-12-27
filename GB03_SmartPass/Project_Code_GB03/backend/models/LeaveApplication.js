const mongoose = require('mongoose');
const User = require('./User'); 

const leaveApplicationSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  hodId: { type: String, required: true },
  department: { type: String, required: true },
  studentName: { type: String },  
  hostel: { type: String },  // Add the hostel field
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  location: { type: String, required: true },
  attendance: { type: String, required: true },
  timings: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  applicationDate: { type: Date, default: Date.now },
});

// Middleware to populate studentName and hostel before saving the application
leaveApplicationSchema.pre('save', async function (next) {
  if (!this.studentName && this.studentId) {
    try {
      const student = await User.findOne({ userId: this.studentId, role: 'student' });
      if (student) {
        this.studentName = student.name;
        this.hostel = student.hostel; 
      } else {
        throw new Error('Student not found');
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema);
