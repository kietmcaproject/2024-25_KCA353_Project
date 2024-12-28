import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    orderItems: {
        type: "string",
        required: true,
    },
    paymentMethod: {
        type: String,
        default: "QR Code",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentstatus: {
        type: String,
        default: "Pending",
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)

export default Order