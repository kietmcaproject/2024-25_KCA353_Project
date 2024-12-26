const express = require('express');
const router = express.Router();
const LeaveApplication = require('../models/LeaveApplication');
const User = require('../models/User');

// Helper function to get the start and end dates of a month
const getMonthlyDateRange = (month, year) => {
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));
  return [startDate, endDate];
};

// Summary report route
router.get('/summary/:hodId', async (req, res) => {
  try {
    const { month, year } = req.query;
    const { hodId } = req.params;
    const [startDate, endDate] = getMonthlyDateRange(Number(month), Number(year));

    // Fetch HOD's department
    const hod = await User.findOne({ userId: hodId, role: 'hod' });
    if (!hod) {
      return res.status(403).json({ error: 'Unauthorized. HOD not found.' });
    }
    const department = hod.department;

    // Aggregate leave applications by status
    const summary = await LeaveApplication.aggregate([
      {
        $match: {
          department,
          $or: [
            {
              fromDate: { $lte: endDate }, // Leave starts before or within the month
              toDate: { $gte: startDate }, // Leave ends after or within the month
            },
            {
              fromDate: { $gte: startDate, $lte: endDate }, // Leave fully contained within the month
            },
          ],
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Build response object
    const result = {
      totalApplications: summary.reduce((acc, curr) => acc + curr.count, 0),
      approved: summary.find((s) => s._id === 'approved')?.count || 0,
      rejected: summary.find((s) => s._id === 'rejected')?.count || 0,
      pending: summary.find((s) => s._id === 'pending')?.count || 0,
    };

    res.json(result);
  } catch (error) {
    console.error('Error generating summary report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Most absent student report route
router.get('/most-absent/:hodId', async (req, res) => {
  try {
    const { month, year } = req.query;
    const { hodId } = req.params;
    const [startDate, endDate] = getMonthlyDateRange(Number(month), Number(year));

    // Fetch HOD's department
    const hod = await User.findOne({ userId: hodId, role: 'hod' });
    if (!hod) {
      return res.status(403).json({ error: 'Unauthorized. HOD not found.' });
    }
    const department = hod.department;

    // Aggregate total absent days for approved leave applications by student
    const absentData = await LeaveApplication.aggregate([
      {
        $match: {
          department,
          status: 'approved',
          fromDate: { $lte: endDate },
          toDate: { $gte: startDate },
        },
      },
      {
        $project: {
          studentId: 1,
          absentDays: {
            $add: [
              { $subtract: [{ $dayOfMonth: "$toDate" }, { $dayOfMonth: "$fromDate" }] },
              1, // Inclusive range
            ],
          },
        },
      },
      {
        $group: {
          _id: "$studentId",
          totalAbsentDays: { $sum: "$absentDays" },
        },
      },
      {
        $sort: { totalAbsentDays: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (!absentData.length) {
      return res.json({ message: "No data available for the selected period." });
    }

    // Fetch student details
    const student = await User.findOne({ userId: absentData[0]._id });
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    res.json({
      studentName: student.name,
      totalAbsentDays: absentData[0].totalAbsentDays,
    });
  } catch (error) {
    console.error('Error fetching most absent student report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/most-applications/:department", async (req, res) => {
    try {
        const { department } = req.params;

        // Aggregate leave applications grouped by month for the department
        const result = await LeaveApplication.aggregate([
            { $match: { department } }, // Filter by department
            {
                $group: {
                    _id: { $month: "$applicationDate" }, // Group by month
                    totalApplications: { $sum: 1 }, // Count applications
                },
            },
            { $sort: { totalApplications: -1 } }, // Sort by highest applications
        ]);

        if (result.length === 0) {
            return res
                .status(404)
                .json({ message: "No applications found for this department." });
        }

        const mostApplications = result[0]; // The month with the highest applications

        res.status(200).json({
            month: mostApplications._id, // Month (1 = Jan, 12 = Dec)
            totalApplications: mostApplications.totalApplications,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
