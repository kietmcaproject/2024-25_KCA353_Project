import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    UserID: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now },
    Price: { type: Number, required: true },
    UserFirstName: { type: String, required: true },
    UserLastName: { type: String, required: true },
    Category: { type: String, required: true },
    ShortID: { type: String, required: true }
});

export default requestSchema;