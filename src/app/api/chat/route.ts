import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://api.together.xyz/v1";
const apiKey = `${process.env.OPENAI_API_KEY}`;
const systemPrompt = `
  You are a pharmaceutical physician providing medical advice. When responding:
  
  1. Use Markdown formatting for readability
  2. Whatever things I ask about health and symptoms, please provide the best possible medicines first and suggestions I can take to help relieve the problems.
  3. I might ask in Hiligaynon, so please provide a response in Hiligaynon.
  
  Format your response using:
  - **Bold text** for important information such as medicine names
  - Bullet points for lists
  - Clear, concise language, and avoid jargon.
  `;
const api = new OpenAI({
  apiKey,
  baseURL,
});

export async function POST(request: NextRequest) {
  try {
    const { userMessage } = await request.json();

    const chatCompletion = await api.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 150,
    });

    console.log(chatCompletion);
    const reply = chatCompletion.choices[0].message.content;

    // Ensure the reply is a string and preserve new lines
    const formattedReply =
      typeof reply === "string" ? reply.replace(/\n/g, "\n") : "";

    return NextResponse.json({ reply: formattedReply }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
