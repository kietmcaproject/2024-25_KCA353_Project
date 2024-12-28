// pages/api/feed.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Post from "@/models/post";
import User from "@/models/user";

// Database connection (assuming MongoDB is being used)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI!, {});
};

// Response type
type ResponseData = {
  success: boolean;
  data?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      return getFeed(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
  }
}

// Fetch the feed for the specified user
const getFeed = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    // Get the userId from the query parameters
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Find the user and populate the list of users they're following
    const user = await User.findById(userId).populate("following", "_id");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Extract the IDs of the users being followed
    const followingIds = user.following.map(
      (followedUser: any) => followedUser._id
    );

    // Fetch posts created by users that the specified user is following, including their own posts
    const posts = await Post.find({
      author: { $in: [...followingIds, userId] },
    })
      .sort({ createdAt: -1 }) // Sort posts by most recent
      .populate("author", "name department") // Populate author details like name and department
      .exec();

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
