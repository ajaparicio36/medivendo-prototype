import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const baseURL = "https://api.together.xyz/v1";
const apiKey = `${process.env.OPENAI_API_KEY}`;
const systemPrompt = `
  You are a pharmaceutical physician providing medical advice. When responding:
  
  1. You will respond in json_objects
  2. The user will give symptoms and you will provide keywords for the medicine he might take.
  3. You will label the keywords as "tags" in the json object.
  4. Give a message as well with advice text.
  5. Only suggest common over-the-counter medicines.
  
  Example:
  User: I have a headache
  You: {"tags": ["aspirin", "paracetamol"], "message": "You might take aspirin or paracetamol for your headache."}`;

const api = new OpenAI({
  apiKey,
  baseURL,
});

export async function POST(request: NextRequest) {
  try {
    const { userMessage } = await request.json();

    const chatCompletion = await api.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 150,
      response_format: { type: "json_object" },
    });

    if (!chatCompletion.choices[0].message.content) {
      return NextResponse.json(
        { error: "An error occurred while processing your request" },
        { status: 500 }
      );
    }

    const reply = await JSON.parse(chatCompletion.choices[0].message.content);
    console.log(reply);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
