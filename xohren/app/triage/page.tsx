"use client";

import { useState } from "react";
import { PageShell } from "../components";

const starter = [
  {
    role: "assistant",
    text: "Hello, I am Xohren AI. Tell me what you are feeling, how long it has been happening, and how severe it feels today.",
  },
];

export default function TriagePage() {
  const [messages, setMessages] = useState(starter);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;
    const nextMessages = [...messages, { role: "user", text: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply: string };
      setMessages([...nextMessages, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: "I can help route you. Based on what you shared, please choose a general practitioner soon, and seek urgent help immediately if symptoms worsen. Would you like me to connect you with a Xohren doctor?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <section>
          <p className="text-xs font-medium uppercase tracking-widest text-gold">
            AI symptom check
          </p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-near-black">
            Understand what kind of care you need.
          </h1>
          <p className="mt-5 leading-8 text-text-body">
            Xohren AI asks simple questions, routes patients to a specialist,
            flags urgency, and never diagnoses.
          </p>
          <div className="mt-8 rounded-2xl bg-emergency-light p-5 text-sm leading-6 text-emergency">
            If symptoms feel life-threatening, contact local emergency services
            immediately.
          </div>
        </section>
        <section className="card flex min-h-[620px] flex-col p-5">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                className={`max-w-[86%] rounded-2xl px-4 py-3 leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-surface text-text-body"
                }`}
                key={`${message.role}-${index}`}
              >
                {message.text}
              </div>
            ))}
            {loading ? (
              <div className="max-w-[86%] rounded-2xl bg-primary-light px-4 py-3 text-text-body">
                Thinking through the safest next step...
              </div>
            ) : null}
          </div>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={sendMessage}>
            <input
              aria-label="Describe your symptoms"
              className="min-h-12 flex-1 rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
              onChange={(event) => setInput(event.target.value)}
              placeholder="I have had a headache for two days..."
              value={input}
            />
            <button className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white">
              Send
            </button>
          </form>
        </section>
      </main>
    </PageShell>
  );
}
