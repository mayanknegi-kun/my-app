import { connect } from "@/db/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password -__v");
    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    console.log(error, "error");
  }
}
