import { Schema, model, models } from 'mongoose';

const leaderboardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
});

export const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);
