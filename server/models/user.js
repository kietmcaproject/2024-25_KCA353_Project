import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    
    FirstName: {
        type: String,
        required: true,
    },

    LastName: {
        type: String,
        requrired: true
    },

    Email: {
        type: String,
        required: true,
        lowercase: true
    },

    Password: {
        type: String,
        required: true
    },

    ProfileScore: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 4.0
    },

    // RefreshToken: {
    //     type: String,
    //     required: true
    // },

    ItemsRequested: {
        type: Number,
        required: true,
        default: 0
    },

    ItemsShared: {
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true} );

export const User = mongoose.model("User", userSchema);