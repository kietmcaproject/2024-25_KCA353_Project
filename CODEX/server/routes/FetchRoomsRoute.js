const express = require('express');
const Room = require('../model/Room');
const verifyToken = require('../middleware/auth');

const fetchRoomsRoute = express.Router();

// API to fetch all saved room IDs
fetchRoomsRoute.get('/fetch-rooms', verifyToken, async (req, res) => {
    try {
        const rooms = await Room.find({}, 'roomId'); // Fetch only `roomId`
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Error fetching rooms' });
    }
});

// API to fetch code by roomId
fetchRoomsRoute.get('/get-code/:roomId', verifyToken, async (req, res) => {
    try {
        const { roomId } = req.params;

        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ code: room.code });
    } catch (error) {
        console.error('Error fetching code:', error);
        res.status(500).json({ error: 'Error fetching code' });
    }
});

module.exports = fetchRoomsRoute;
