const express = require('express');
const router = express.Router();
const LeaveApplication = require('../models/LeaveApplication');

router.get('/', async (req, res) => {
    try {
        const statusFilter = req.query.status;
        let query = {};

        if (statusFilter && ['pending', 'approved', 'rejected'].includes(statusFilter)) {
            query.status = statusFilter;
        }

        const applications = await LeaveApplication.find(query);

        // If no applications found, return an empty array
        if (applications.length === 0) {
            return res.status(200).json([]);  // Important: return an empty array
        }

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching leave applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
