import { Schema, model, models } from 'mongoose';

const feedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String

    },
    upvotes: {
        type: [String],
        default: []
    },
    isUpvoted: {
        type: Boolean,
        default: false
    },
    isSaved: {
        type: Boolean,
        default: false
    },
});

export const Feed = models.Feed || model('Feed', feedSchema);
