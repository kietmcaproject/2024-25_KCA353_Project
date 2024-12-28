const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: [
      {
        type: String, // URLs of images or videos associated with the post
        default: [],
      },
    ],
    mediaPublicId: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Refers to the user who created the post
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who liked this post
      },
    ],
    shares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who shared this post
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // User who commented
          required: true,
        },
        text: {
          type: String, // Comment text
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who saved this post
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("post", postSchema);
