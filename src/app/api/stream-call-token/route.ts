import { NextRequest, NextResponse } from "next/server";
import { getStreamCallToken } from "@/lib/streamClient";

export async function POST(req: NextRequest) {
  const { userId, callId } = await req.json();
  if (!userId || !callId) {
    return NextResponse.json({ error: "Missing userId or callId" }, { status: 400 });
  }
  const token = await getStreamCallToken(userId, callId);
  return NextResponse.json({
    apiKey: process.env.STREAM_API_KEY,
    token,
    callId,
  });
}
