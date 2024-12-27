const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }, 
    phoneNumber : { 
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('user_model' , UserSchema);