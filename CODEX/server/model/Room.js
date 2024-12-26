const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: {
        type: String, 
        required: true
    },
    code: {
        type: String, 
        default: ''
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

module.exports = mongoose.model('Room', RoomSchema)