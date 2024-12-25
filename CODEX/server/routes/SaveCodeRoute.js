// const express = require('express');
// const saveCodeRoute = express.Router();
// const Room = require('../model/Room');
// const verifyToken = require('../middleware/auth'); // Ensure auth middleware is imported

// saveCodeRoute.post('/save-code', verifyToken, async (req, res) => {
//     const { roomId, code, roomName } = req.body;
//     const userId = req.user.id; // Retrieved from the verified token
//     if(!roomId || !code || !roomName) {
//         return res.status(400).json({ message: 'Please fill in all fields' });
//     }

//     try {
//         const room = await Room.findOne({ roomId, hostId: userId, roomName});
//         // console.log(room)

//         if (!room) {
//             room.create({roomId, hostId: userId, roomName});
//             return res.status(404).json({ error: "No valid room found or user unauthorized" });
//         }

//         room.code = code;
//         await room.save();
//         res.status(200).json({ message: "Code saved successfully!" }); // Success response
//     } catch (error) {
//         console.error("Error saving code:", error);
//         res.status(500).json({ error: "Error in saving code" });
//     }
    
// });

// module.exports = saveCodeRoute;



const express = require('express');
const saveCodeRoute = express.Router();
const Room = require('../model/Room');
const verifyToken = require('../middleware/auth'); // Ensure auth middleware is imported

saveCodeRoute.post('/save-code', verifyToken, async (req, res) => {
    const { roomId, code } = req.body;
    // const userId = req.user._id; // Retrieved from the verified token

    // Validate required fields
    if (!roomId || !code) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Find the room by roomId and hostId
        let room = await Room.findOne({ roomId});

        // If no room found, create a new one
        if (!room) {
            room = await Room.create({ roomId, code});
        } else {
            // Update the code if the room exists
            room.code = code;
        }

        // Save the room
        await room.save();

        // Success response
        res.status(200).json({ message: 'Code saved successfully!' });
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).json({ error: 'Error in saving code' });
    }
});

// get code from room 
saveCodeRoute.get('/get-code/:roomId', verifyToken,async (req, res) => {
    const { roomId } = req.params;
    // const userId = req.user._id; // Retrieved from the verified token

    // Validate required fields
    if (!roomId) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Find the room by roomId and hostId
        let room = await Room.findOne({ roomId});

        // If no room found, create a new one
        if (!room) {
            return res.status(404).json({ error: 'No valid room found' });
        }

        // Success response
        res.status(200).json({ code: room.code });
    } catch (error) {
        console.error('Error getting code:', error);
        res.status(500).json({ error: 'Error in getting code' });
    }
});

// saveCodeRoute.get('/', (req, res) => {
//     res.send('Save code route');
// });

module.exports = saveCodeRoute;