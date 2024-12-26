const express = require('express');
const createRoomRoute = express.Router();
const verifyToken = require('../middleware/auth')
const Room = require('../model/Room')

createRoomRoute.post('/create-room', verifyToken, async(req, res) => {
    const roomId = await uuidV4();
    const {userId, roomName} = req.body; 
    
    //assuming that useid is sent from the front end
    try {
        const room = new Room({
            roomId: roomId,
            hostId: userId,
            roomName: roomName,
        })
        console.log("USERID : ", userId,"RoomName : ", roomName);
        await room.save()
        res.status(200).json({ message: 'Room created successfully', roomId: room.roomId });
    } catch (error) {
        
    }
});

module.exports = createRoomRoute;