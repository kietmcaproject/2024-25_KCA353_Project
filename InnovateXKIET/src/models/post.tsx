import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  author: mongoose.Schema.Types.ObjectId;
  userId: string;
  content: string;
  title: string;
  likes: number;
  images: string[];
  upvotes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  department: string; 
}

const postSchema: Schema<IPost> = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },  
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId, // Assuming upvotes are ObjectIds
      ref: 'User', // Uncomment if you want to reference a User model
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
  images: {
    type: [String], // Changed to an array of strings for image URLs
  },
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
export default Post;
