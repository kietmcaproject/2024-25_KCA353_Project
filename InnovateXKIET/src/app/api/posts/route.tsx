import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/post";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import formidable, { Files } from "formidable";
import fs from "fs";

// Database connection
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "";
  if (mongoose.connections[0].readyState) return;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable not defined");
  }
  await mongoose.connect(uri);
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API Secret
});

// Disable default body parsing to handle file uploads using Formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define types for the PostBody
interface PostBody {
  userId: string;
  title: string;
  content: string;
  images?: Express.Multer.File[]; // Express file type for images (may be multiple)
}

// Type for Cloudinary response
interface CloudinaryUploadResponse {
  secure_url: string;
}

// Define types for request body
interface PostBody {
  userId: string;
  title: string;
  content: string;
  images?: string[];
}

// Function to fetch username by userId
async function fetchUsernameById(author: string) {
  const user = await User.findById(author).select("name");
  console.log(user.name);
  if (!user) {
    throw new Error("User not found");
  }
  return user.name;
}

// GET handler: Fetch all posts
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate("author", "name").exec();

    // Optionally fetch usernames if not using populate
    const postsWithUsernames = await Promise.all(
      posts.map(async (post) => {
        const username = await fetchUsernameById(post.userId); // Access userId directly
        console.log("us" + username);
        return { ...post.toObject(), username }; // Add username to the post object
      })
    );
    console.log(postsWithUsernames);
    return NextResponse.json({ success: true, data: postsWithUsernames });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

// just to be safe keep it till testing overs
// POST handler: Create a new post
export async function POST(req: Request) {
  try {
    await connectDB();
    const body: PostBody = await req.json();
    const { userId, title, content, images } = body;

    // Check for missing fields
    if (!userId || !title || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = new Post({
      userId,
      author: userId,
      title,
      content,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPost.save();
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const form = new formidable.IncomingForm();

//     // Returns a promise for Formidable file parsing
//     const parsedData = await new Promise<{ fields: PostBody; files: Files }>(
//       (resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//           if (err) {
//             reject(new Error("Error parsing the file"));
//           } else {
//             resolve({ fields: fields as PostBody, files: files as Files });
//           }
//         });
//       }
//     );

//     const { fields, files } = parsedData;
//     const { userId, title, content } = fields;
//     const imageFiles = files.images; // Assuming images is the field name for uploaded files

//     // Check for missing fields
//     if (!userId || !title || !content) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Prepare an array to hold the image URLs
//     const imageUrls: string[] = [];

//     // Handle image file uploads with Cloudinary
//     if (Array.isArray(imageFiles)) {
//       // Handle multiple files
//       for (let file of imageFiles) {
//         const uploadResult: CloudinaryUploadResponse =
//           await cloudinary.v2.uploader.upload(file.filepath, {
//             folder: "your-folder-name",
//             use_filename: true,
//             unique_filename: false,
//           });
//         imageUrls.push(uploadResult.secure_url); // Store the image URL
//         fs.unlinkSync(file.filepath); // Clean up the temporary file
//       }
//     } else if (imageFiles) {
//       // Handle a single file upload
//       const uploadResult: CloudinaryUploadResponse =
//         await cloudinary.v2.uploader.upload(imageFiles.filepath, {
//           folder: "your-folder-name",
//           use_filename: true,
//           unique_filename: false,
//         });
//       imageUrls.push(uploadResult.secure_url);
//       fs.unlinkSync(imageFiles.filepath); // Clean up the temporary file
//     }

//     // Create a new post with type safety
//     const newPost = new Post({
//       userId,
//       author: userId,
//       title,
//       content,
//       images: imageUrls, // Store Cloudinary URLs in the images array
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     // Save the post to the database
//     await newPost.save();

//     return NextResponse.json({ success: true, data: newPost }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Server Error" },
//       { status: 500 }
//     );
//   }
// }

// PUT handler: Update an existing post
export async function PUT(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }
    const body: PostBody = await req.json();
    const { title, content, images } = body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, images, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
