import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    ProductID: { type: String, required: true },
    ProductUploadedBy: { type: String, required: true },
    ImageUploadedBy: { type: String, required: true },
    ImageID: { type: String, required: true },
    Amount: { type: Number, required: true },
    TransactionStatus: { type: String, required: true },
    OrderID: { type: String, required: true }
}, { timestamps: true });


export const Transaction = mongoose.model("Transaction", TransactionSchema);