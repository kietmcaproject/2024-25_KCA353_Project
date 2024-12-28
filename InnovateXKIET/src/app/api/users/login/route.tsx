import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: "User Not Exist" }, { status: 400 });
    }

    if (user.isVerified === false) {
      return NextResponse.json({ error: "User not verified" }, { status: 400 });
    }

    const comparePass = await bcryptjs.compare(password, user.password);

    if (!comparePass) {
      return NextResponse.json(
        { error: "User Password is Incorrect" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate JWT token
    const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      userId: user._id,
      username: user.username,
    });

    // Set cookie
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
