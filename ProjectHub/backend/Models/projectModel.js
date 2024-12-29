const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    image:{
        type:[String],
        required: true
    },
    links: {
        github: {
            type: String,
        },
        liveDemo: {
            type: String,
        },
        other: {
            type: String
        }
    },
    sourceCode: {
        type: String
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    category: {
        type: [String]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
