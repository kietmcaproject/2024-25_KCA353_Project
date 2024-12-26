const express = require('express')
const dashboardRouter = express.Router();
const jwt = require("jsonwebtoken")

dashboardRouter.get('/dashboard', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized access',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.send(`Welcome to the dashboard, User ID: ${decoded.user.id}`);
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token, access denied.',
        });
    }
});

module.exports = dashboardRouter;