import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; // Ensure your User model includes image and dept fields
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/lib/mailer";

// Connect to the database
connectToDatabase();

// Define the request body type
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  image: string; // URL or base64 encoded image
  dept: string; // Department the user belongs to
  otp: string; // Department the user belongs to
}

// Define the response type for success
interface SuccessResponse {
  message: string;
  success: boolean;
  savedUser: Omit<Document, "password">; // Omitting password field from the user in the response
}

// Define the response type for error
interface ErrorResponse {
  error: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Parse the request body
    const reqBody: RegisterRequestBody = await request.json();

    // Destructure the request body
    const { name, email, password, image, dept, otp } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user instance with additional fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image, // Store image URL or base64 encoded image
      dept, // Store department
      isAdmin: false,
      verifyToken: "", // Token for email verification
      verifyTokenExpiry: null, // Expiry for verification token
      forgetPasswordToken: "", // Token for password reset
      forgetPasswordTokenExpiry: null, // Expiry for password reset token
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Generate a verification token (you can implement your own logic for this)
    // const verifyToken = Math.random().toString(36).substring(2, 15); // Simple random token
    savedUser.verifyToken = otp;
    savedUser.verifyTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save the user with the verification token
    await savedUser.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    // Respond with success
    return NextResponse.json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      success: true,
      savedUser: userWithoutPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
