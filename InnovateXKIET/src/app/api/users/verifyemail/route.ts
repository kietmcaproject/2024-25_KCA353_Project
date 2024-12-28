
import { connectToDatabase } from "@/lib/mongodb"; // Connect to the MongoDB database
import User from "@/models/user"; // Import the User model (for accessing the user data in the database)
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request and response objects

// Establish a connection to the database as soon as this file runs
connectToDatabase();

// The POST function handles a POST request to verify a user's email
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the incoming request to get the request data
    const reqBody = await request.json();

    // Extract the 'token' from the parsed request body
    const { token } = reqBody;

    // Find the user in the database by matching the token and checking that the token has not expired.
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If no user is found (invalid or expired token), return a 401 Unauthorized response
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // If the user is found, set the user's 'isVerified' property to true,
    // and remove the verifyToken and its expiry fields since the verification is complete.
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save the updated user data back to the database
    await user.save();

    // Return a 200 OK response with a success message
    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    // Catch any errors that occur and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}