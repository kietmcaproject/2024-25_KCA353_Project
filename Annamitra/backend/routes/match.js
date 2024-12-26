const express = require('express');
const { Donations } = require('../models/donations');
const { Recipients } = require('../models/recipients');
const authenticateJwt = require('../middlewares/authentication')
const router = express.Router();

router.put('/match-donation', authenticateJwt, async (req, res) => {
    try {
        const request = await Recipients.findByIdAndUpdate(req.headers.request_id, req.body, { new: true });
        if (request) {
            res.json({ message: 'Matched Successfully!' });
        } else {
            res.status(404).json({ message: 'Not found.' });
        }
    }
    catch {
        res.status(404).json({ message: "Failed." })
    }
});

router.put('/match-recipient', authenticateJwt, async (req, res) => {
    try {
        const request = await Donations.findByIdAndUpdate(req.headers.request_id, req.body, { new: true });
        if (request) {
            res.json({ message: 'Matched Successfully!' });
        } else {
            res.status(404).json({ message: 'Not found.' });
        }
    }
    catch {
        res.status(404).json({ message: "Failed." })
    }
});

module.exports = router;
