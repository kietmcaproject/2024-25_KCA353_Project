
const LeaveApplication = require('../models/LeaveApplication');
const User = require('../models/User');

// Helper function to check for overlapping leave dates
const checkOverlappingLeaves = async (studentId, fromDate, toDate) => {
  const existingLeaves = await LeaveApplication.find({
    studentId,
    status: { $in: ['pending', 'approved'] },
    $or: [
      { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }, // Overlapping dates
      { fromDate: { $gte: fromDate }, toDate: { $lte: toDate } },  // Completely within the range
    ],
  });
  return existingLeaves.length > 0; // Return true if there's a conflict
};

// Submit leave application with validation
exports.submitLeaveApplication = async (req, res) => {
  const { studentId, fromDate, toDate, reason, location, attendance, timings } = req.body;

  try {
    const student = await User.findOne({ userId: studentId, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const hod = await User.findOne({ department: student.department, role: 'hod' });
    if (!hod) {
      return res.status(404).json({ message: 'HOD not found for this department' });
    }

    if (new Date(fromDate) < new Date()) {
      return res.status(400).json({ message: "Leave cannot start in the past." });
    }

    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({ message: "'To' date cannot be before 'From' date." });
    }

    // Check if leave dates overlap with any existing leave
    const hasConflict = await checkOverlappingLeaves(studentId, new Date(fromDate), new Date(toDate));
    if (hasConflict) {
      return res.status(400).json({ message: 'Leave dates overlap with an existing leave' });
    }

    const newLeaveApplication = new LeaveApplication({
      studentId: student.userId,
      hodId: hod.userId,
      department: student.department,
      fromDate,
      toDate,
      reason,
      location,
      attendance,
      timings,
      status: 'pending',
      applicationDate: new Date(),
    });

    await newLeaveApplication.save();
    res.status(201).json({ message: 'Leave application submitted successfully', leaveApplication: newLeaveApplication });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to check for overlapping leave before applying
exports.checkLeaveOverlap = async (req, res) => {
  const { studentId } = req.params;
  const { fromDate, toDate } = req.query;

  try {
    const hasConflict = await checkOverlappingLeaves(studentId, new Date(fromDate), new Date(toDate));
    res.json({ hasConflict });
  } catch (error) {
    console.error('Error checking for overlapping leaves:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch leave applications by studentId with optional status filter
exports.getLeaveApplicationsByStudentId = async (req, res) => {
  const { studentId } = req.params;
  const { status } = req.query;

  try {
    const query = { studentId };
    if (status) query.status = status;

    const leaveApplications = await LeaveApplication.find(query);
    res.json(leaveApplications);
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// General update route for pending applications
exports.updateLeaveApplication = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedApplication = await LeaveApplication.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await LeaveApplication.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pending applications for a specific HOD
exports.getPendingApplicationsForHOD = async (req, res) => {
  const { hodId } = req.params;

  try {
    const applications = await LeaveApplication.find({ hodId, status: 'pending' });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept leave application
exports.acceptApplication = async (req, res) => {
  const { id } = req.params;

  try {
    await LeaveApplication.findByIdAndUpdate(id, { status: 'approved' });
    res.status(200).json({ message: 'Application accepted' });
  } catch (error) {
    console.error('Error accepting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject leave application
exports.rejectApplication = async (req, res) => {
  const { id } = req.params;

  try {
    await LeaveApplication.findByIdAndUpdate(id, { status: 'rejected' });
    res.status(200).json({ message: 'Application rejected' });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
