// models/Request.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId;  // User who is requesting help
    helper: mongoose.Schema.Types.ObjectId;     // User providing help
    description: string;
    status: string; // Pending, Resolved, or Rejected
    createdAt: Date;
    resolvedAt?: Date;
}

const requestSchema: Schema<IRequest> = new Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String, enum: ['Pending', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: { type: Date },
});

const Request = mongoose.models.Request || mongoose.model<IRequest>('Request', requestSchema);
export default Request;
