import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModal";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  console.log("here");
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody, "requestbody");
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log(existingUser, "existingUser");

    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json({
        error: "Password is incorrect",
      });
    }
    //token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser?.username,
      email: existingUser?.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
