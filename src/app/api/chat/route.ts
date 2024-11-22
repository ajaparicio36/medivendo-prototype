// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use server-side environment variable
});

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestLog.get(ip) || [];

  // Clean old requests
  const recentRequests = userRequests.filter(
    (time) => time > now - RATE_LIMIT_WINDOW
  );
  requestLog.set(ip, recentRequests);

  return recentRequests.length >= MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are MediBot, a helpful medical assistant. Provide brief, clear responses.",
        },
        ...messages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Log the request
    const userRequests = requestLog.get(ip) || [];
    userRequests.push(Date.now());
    requestLog.set(ip, userRequests);

    console.log(completion);
    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("[CHAT ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: error?.status || 500 }
    );
  }
}
