import mongoose from "mongoose";

const ImageUploadSchema = new mongoose.Schema({
    ProductID: { type: String, required: true },
    ProductUploadedBy: { type: String, required: true },
    ImageUploadedBy: { type: String, required: true },
    ImageURL: { type: String, required: true },
    ProductIdPlusImageUploadedByPlusProductUploadedBy: { type: String, required: true },
    isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

export const ImageUpload = mongoose.model("ImageUpload", ImageUploadSchema);