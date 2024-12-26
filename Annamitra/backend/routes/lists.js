const express = require('express');
const { Donations } = require('../models/donations');
const { Recipients } = require('../models/recipients');
const authenticateJwt = require('../middlewares/authentication')
const router = express.Router();

router.get('/donations-list', authenticateJwt, async (req, res) => {
    try {
        const recipientRequests = await Recipients.find({ completed: false });
        res.json({ recipientRequests });
    }
    catch {
        res.status(404)
    }
});

router.get('/recipients-list', authenticateJwt, async (req, res) => {
    try {
        const donationRequests = await Donations.find({ completed: false });
        res.json({ donationRequests });
    }
    catch {
        res.status(404)
    }
});

module.exports = router;
