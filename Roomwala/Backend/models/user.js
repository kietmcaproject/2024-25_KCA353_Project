import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    pincode: {
        type: String,
    },
    prfilepic: {
        type: String,
        default: "roomwala-logo.png",
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;