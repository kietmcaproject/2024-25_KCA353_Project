import mongoose from "mongoose"

const roomSchema = mongoose.Schema({
    pgname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    roomPic: {
        type: Array,
        default: ["roomwala-logo.png"],
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    facilities: {
        type: Array,
        default: [],
    },
    ratings: {
        type: Number,
        default: 5.0,
    },
    totalRatings: {
        type: Number,
        default: 1,
    },
    booked: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Array,
        default: [],
    },
    roomtype: {
        type: String,
        required: true,
    },
    availablefor: {
        type: String,
        required: true,
    },

    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },

}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;