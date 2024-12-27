// backend/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

// Submit leave application with validation
router.post('/submit', leaveController.submitLeaveApplication);

// View leave applications by studentId and optional status filter
router.get('/status/:studentId', leaveController.getLeaveApplicationsByStudentId);

// Update any pending leave application
router.put('/update/:id', leaveController.updateLeaveApplication);

// Delete leave application by ID
router.delete('/delete/:id', leaveController.deleteApplication);

// Get pending applications for a specific HOD
router.get('/:hodId/pending', leaveController.getPendingApplicationsForHOD);

// Accept application by ID
router.put('/accept/:id', leaveController.acceptApplication);

// Reject application by ID
router.put('/reject/:id', leaveController.rejectApplication);

router.get('/check-overlap/:studentId', leaveController.checkLeaveOverlap);
module.exports = router;
