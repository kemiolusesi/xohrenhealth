import { NextResponse } from "next/server";

const system = `You are Xohren AI, the intelligent health assistant for Xohren, Nigeria's premium digital health infrastructure. Be warm, calm, and reassuring. Ask about a main symptom, duration, severity, and relevant follow-up questions. After 4-5 exchanges, provide an assessment in [ASSESSMENT]{"specialist":"Specialty name","urgency":"Routine|Soon|Urgent","urgencyReason":"One sentence why","nextStep":"What the patient should do"}[/ASSESSMENT]. Never diagnose. Respond in Hausa, Yoruba, Igbo, or Nigerian Pidgin if the patient writes in that language. If emergency symptoms such as chest pain, difficulty breathing, severe bleeding, stroke symptoms, or suicidal thoughts are mentioned, tell the patient to activate Xohren SOS or go to the nearest emergency room immediately.`;

export async function POST(request: Request) {
  const { messages = [], language = "English" } = (await request.json()) as { messages?: { role: string; content: string }[]; language?: string };
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ message: "Thank you for telling me. To guide you well, when did this start, how severe is it from 1 to 10, and do you have fever, chest pain, bleeding, fainting, or trouble breathing?", language });
  const response = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, temperature: 0.7, system, messages: messages.map((message) => ({ role: message.role === "assistant" ? "assistant" : "user", content: message.content })) }) });
  if (!response.ok) return NextResponse.json({ message: "I could not reach Xohren AI right now. Please try again shortly." }, { status: 502 });
  const data = await response.json() as { content?: { type: string; text?: string }[] };
  const raw = data.content?.find((item) => item.type === "text")?.text ?? "I am ready to help you find the right care.";
  const match = raw.match(/\[ASSESSMENT\]([\s\S]*?)\[\/ASSESSMENT\]/);
  let assessment: unknown;
  if (match) { try { assessment = JSON.parse(match[1]); } catch { assessment = undefined; } }
  return NextResponse.json({ message: raw.replace(/\[ASSESSMENT\][\s\S]*?\[\/ASSESSMENT\]/, "").trim(), assessment });
}
