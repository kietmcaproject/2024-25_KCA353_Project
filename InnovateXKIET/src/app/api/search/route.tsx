// src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/post"; // Adjust the import path to your model location

// Connect to your MongoDB database (assuming a helper function)
async function connectToDatabase() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      results: [],
      message: "No search query provided.",
    });
  }

  try {
    // Search posts where the title or content contains the search query (case-insensitive)
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } }, // If searching by department is needed
        { userId: { $regex: query, $options: "i" } }, // If searching by department is needed
      ],
    });

    // also adding the search by user

    return NextResponse.json({ results: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error occurred while searching.",
      error,
    });
  }
}
