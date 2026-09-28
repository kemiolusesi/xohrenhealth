import { NextResponse } from "next/server";

const systemPrompt =
  "You are Xohren AI, a compassionate health assistant for Xohren, a Nigerian digital health platform. Help patients identify what kind of specialist they need. Ask 3-5 simple questions about symptoms, duration, and severity. Return: specialist type, urgency level (Routine/Soon/Urgent), and a warm next step. Never diagnose. If patient writes in Hausa respond in Hausa. Always end by offering to connect them with a Xohren doctor.";

export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    messages?: { role: string; text: string }[];
  };

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply:
        "Thank you for sharing that. I need 3 quick details before routing you: when did it start, how severe is it from 1-10, and do you have fever, chest pain, bleeding, fainting, or trouble breathing? I will suggest the right specialist and urgency level, but I will not diagnose. Would you like me to connect you with a Xohren doctor?",
    });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 500,
      system: systemPrompt,
      messages: (messages ?? []).map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.text,
      })),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { reply: "I could not reach triage right now. Please try again soon." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };

  return NextResponse.json({
    reply:
      data.content?.find((item) => item.type === "text")?.text ??
      "I can help route you to the right specialist. Would you like me to connect you with a Xohren doctor?",
  });
}
