import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are EurosHub's AI assistant. Help users with:
          - Service inquiries (web dev, mobile apps, AI solutions)
          - Company information
          - Career opportunities
          - Technical support
          Be friendly, professional, and concise. If unsure, ask clarifying questions.`
        },
        ...messages
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ 
      message: response.choices[0].message.content 
    });

  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}