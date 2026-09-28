"use client";

import {
  Activity,
  Bot,
  Brain,
  ChevronDown,
  Globe,
  HeartPulse,
  Languages,
  MessageSquare,
  MoreVertical,
  Send,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

const waves = [
  { amp: 24, freq: 0.01, speed: 0.7, phase: 0, yFrac: 0.4, color: "74,158,219", alpha: 0.07 },
  { amp: 18, freq: 0.016, speed: 1, phase: 1.5, yFrac: 0.58, color: "74,158,219", alpha: 0.09 },
  { amp: 32, freq: 0.007, speed: 0.5, phase: 3, yFrac: 0.5, color: "201,168,76", alpha: 0.04 },
  { amp: 14, freq: 0.021, speed: 1.3, phase: 4.2, yFrac: 0.7, color: "45,155,111", alpha: 0.06 },
  { amp: 20, freq: 0.013, speed: 0.8, phase: 2, yFrac: 0.8, color: "74,158,219", alpha: 0.05 },
];

type ChatMessage = { role: "assistant" | "user"; content: string };
type Assessment = { specialist: string; urgency: "Routine" | "Soon" | "Urgent"; urgencyReason?: string; nextStep?: string };

export default function XohrenAiPage() {
  return (
    <main className="bg-surface">
      <Hero />
      <TriageChat />
      <HowItWorks />
      <Outcomes />
      <ClosingCta />
    </main>
  );
}

function Hero() {
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const background = backgroundRef.current;
    const orb = orbRef.current;
    if (!background || !orb) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      [background, orb].forEach((canvas) => {
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(background);
    observer.observe(orb);
    resize();

    const ellipsePoint = (angle: number, rx: number, ry: number, tilt: number, cx: number, cy: number) => {
      const dx = Math.cos(angle) * rx;
      const dy = Math.sin(angle) * ry;
      return { x: dx * Math.cos(tilt) - dy * Math.sin(tilt) + cx, y: dx * Math.sin(tilt) + dy * Math.cos(tilt) + cy };
    };

    const drawBackground = (t: number) => {
      const ctx = background.getContext("2d");
      if (!ctx) return;
      const w = background.offsetWidth;
      const h = background.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      waves.forEach((wave) => {
        const breathe = 1 + Math.sin(t * 0.007 + wave.phase * 0.5) * 0.2;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = h * wave.yFrac
            + Math.sin(x * wave.freq - t * wave.speed * 0.016 + wave.phase) * wave.amp * breathe
            + Math.sin(x * wave.freq * 1.5 - t * wave.speed * 0.0096 + wave.phase + 1) * wave.amp * breathe * 0.35;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wave.color},${wave.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
      ([[w * 0.3, h * 0.5, w * 0.28, "74,158,219,.06"], [w * 0.7, h * 0.6, w * 0.22, "45,155,111,.05"], [w * 0.5, h * 0.3, w * 0.18, "201,168,76,.04"]] as [number, number, number, string][]).forEach(([x, y, radius, color]) => {
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glow.addColorStop(0, `rgba(${color})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      });
    };

    const drawOrb = (t: number) => {
      const ctx = orb.getContext("2d");
      if (!ctx) return;
      const w = orb.offsetWidth;
      const h = orb.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const breath = 1 + Math.sin(t * 0.022) * 0.055;
      const pulse = 1 + Math.sin(t * 0.038) * 0.028;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 3; i += 1) {
        const progress = ((t * 0.8 + i * 40) % 120) / 120;
        ctx.beginPath();
        ctx.arc(cx, cy, 80 + progress * 75, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74,158,219,${(1 - progress) * 0.14})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      const rings = [
        { rx: 100, ry: 33, tilt: Math.PI * 0.2, angle: t * 0.02, color: "74,158,219", dot: "#4A9EDB", dotR: 5, inner: "rgba(210,238,255,.95)" },
        { rx: 96, ry: 38, tilt: -Math.PI * 0.16, angle: -t * 0.015, color: "201,168,76", dot: "#C9A84C", dotR: 4.5, inner: "rgba(255,242,190,.95)" },
        { rx: 30, ry: 102, tilt: Math.PI * 0.06, angle: t * 0.017 + 1.2, color: "45,155,111", dot: "#2D9B6F", dotR: 4, inner: "rgba(160,255,210,.95)" },
      ];
      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.rx * breath, ring.ry * breath, ring.tilt, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color},${ring.color.startsWith("74") ? 0.25 : 0.22})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        const point = ellipsePoint(ring.angle, ring.rx * breath, ring.ry * breath, ring.tilt, cx, cy);
        ctx.beginPath(); ctx.arc(point.x, point.y, ring.dotR + 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(${ring.color},.15)`; ctx.fill();
        ctx.beginPath(); ctx.arc(point.x, point.y, ring.dotR, 0, Math.PI * 2); ctx.fillStyle = ring.dot; ctx.fill();
        ctx.beginPath(); ctx.arc(point.x, point.y, ring.dotR / 2, 0, Math.PI * 2); ctx.fillStyle = ring.inner; ctx.fill();
      });

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.01);
      for (let i = 0; i < 36; i += 1) {
        const major = i % 6 === 0;
        const a = i * Math.PI / 18;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (major ? 66 : 70), Math.sin(a) * (major ? 66 : 70));
        ctx.lineTo(Math.cos(a) * (major ? 76 : 73), Math.sin(a) * (major ? 76 : 73));
        ctx.strokeStyle = major ? "rgba(74,158,219,.55)" : "rgba(74,158,219,.18)";
        ctx.lineWidth = major ? 1.5 : 0.8;
        ctx.stroke();
      }
      ctx.restore();

      const core = ctx.createRadialGradient(cx, cy - 7 * breath, 0, cx, cy - 7 * breath, 78 * pulse);
      ([[0, "rgba(160,220,255,.75)"], [.2, "rgba(100,180,240,.52)"], [.48, "rgba(74,158,219,.28)"], [.75, "rgba(30,90,160,.1)"], [1, "rgba(0,0,0,0)"]] as [number, string][]).forEach(([stop, color]) => core.addColorStop(stop, color));
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(cx, cy, 82 * pulse, 0, Math.PI * 2); ctx.fill();
      const center = ctx.createRadialGradient(cx, cy - 3, 0, cx, cy - 3, 30);
      ([[0, "rgba(225,245,255,.92)"], [.35, "rgba(140,205,250,.6)"], [.75, "rgba(74,158,219,.2)"], [1, "rgba(0,0,0,0)"]] as [number, string][]).forEach(([stop, color]) => center.addColorStop(stop, color));
      ctx.fillStyle = center; ctx.beginPath(); ctx.arc(cx, cy, 31, 0, Math.PI * 2); ctx.fill();
    };

    let frame = 0;
    const animate = () => {
      timeRef.current += 1;
      drawBackground(timeRef.current);
      drawOrb(timeRef.current);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  return <section className="relative min-h-screen overflow-hidden bg-[#080f1a] text-white">
    <canvas ref={backgroundRef} className="absolute inset-0 z-0 h-full w-full" />
    <nav className="relative z-20 border-b border-white/[.07] bg-[#080f1a]/75 px-5 py-4 backdrop-blur-2xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3"><span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-gradient-to-br from-primary to-health-green"><Activity className="h-4 w-4" strokeWidth={1.5} /></span><span><span className="block font-serif text-[19px] font-medium leading-none">Xohren</span><span className="font-accent text-[10.5px] text-gold">Where light meets renewal.</span></span></Link>
        <div className="hidden items-center gap-7 text-[13px] text-white/50 md:flex"><Link href="/doctors">Doctors</Link><Link href="/care-plans">Care Plans</Link><Link className="text-white" href="/xohren-ai">Triage AI</Link><Link href="/#about">About</Link></div>
        <Link href="/auth/patient" className="rounded-[9px] bg-gradient-to-br from-primary to-health-green px-4 py-2.5 text-[13px] font-medium shadow-[0_2px_12px_rgba(74,158,219,.3)]">Book care</Link>
      </div>
    </nav>
    <div className="relative z-10 mx-auto max-w-[620px] px-6 pt-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-[22px] border border-primary/30 bg-primary/10 px-4 py-[7px] text-[11px] text-primary/90"><i className="ai-pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />Xohren AI &middot; Powered by Claude</span>
      <h1 className="mt-6 font-serif text-[32px] font-medium leading-[1.06] sm:text-[38px] md:text-[58px]">Tell me<br />how you<br /><em className="ai-gold-word">feel.</em></h1>
      <p className="mt-4 font-accent text-[19px] leading-[1.6] text-white/45">Not a symptom checker.<br />A conversation that knows where to go.</p>
      <p className="mx-auto mt-4 max-w-[500px] text-[13.5px] font-light leading-[1.9] text-white/35">Describe what you&apos;re experiencing in your own words - in English, Hausa, Yoruba, Igbo, or Pidgin. Xohren AI will listen, ask the right questions, and guide you gently to the right doctor.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><a href="#conversation" className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-[15px] font-medium text-white"><MessageSquare className="h-4 w-4" strokeWidth={1.5} />Start a conversation</a><a href="#how-it-works" className="rounded-xl border border-white/20 px-7 py-3.5 text-[15px] text-white/70">How does it work?</a></div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-white/40"><span className="mr-1">Speaks:</span>{["English", "Hausa", "Yoruba", "Igbo", "Pidgin"].map((language) => <span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-white/60" key={language}>{language}</span>)}</div>
    </div>
    <div className="orb-stage relative z-10 mx-auto mt-12 h-[260px] w-full max-w-[780px] md:h-80">
      <div className="ai-bubble-left absolute left-0 top-1/2 z-20 hidden w-[180px] rounded-2xl border border-gold/30 bg-gold/10 px-[15px] py-3 backdrop-blur-xl md:block"><p className="mb-[5px] text-[9px] font-medium uppercase tracking-[2px] text-gold/80">YOU</p><p className="text-[11.5px] leading-[1.55] text-white/75">I&apos;ve had this headache for 3 days and I feel exhausted all the time.</p></div>
      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 md:h-[260px] md:w-[260px]"><canvas ref={orbRef} className="h-full w-full" /></div>
      <div className="ai-bubble-right absolute right-0 top-[30%] z-20 hidden w-[180px] rounded-2xl border border-primary/30 bg-primary/10 px-[15px] py-3 backdrop-blur-xl md:block"><p className="mb-[5px] text-[9px] font-medium uppercase tracking-[2px] text-primary/80">XOHREN AI</p><p className="text-[11.5px] leading-[1.55] text-white/75">Is the pain on one side of your head, or does it feel all over?</p></div>
      <div className="ai-bubble-bottom absolute bottom-0 left-1/2 z-20 w-[210px] rounded-2xl border border-health-green/30 bg-health-green/[.09] px-[15px] py-3 backdrop-blur-xl"><p className="mb-[5px] text-[9px] font-medium tracking-[2px] text-health-green/80">RECOMMENDATION FORMING</p><p className="text-[11.5px] leading-[1.55] text-white/75">Neurologist &middot; Urgency: Soon</p><div className="mt-2 flex gap-1"><i className="ai-typing h-[5px] w-[5px] rounded-full bg-health-green" /><i className="ai-typing h-[5px] w-[5px] rounded-full bg-health-green [animation-delay:.2s]" /><i className="ai-typing h-[5px] w-[5px] rounded-full bg-health-green [animation-delay:.4s]" /></div></div>
    </div>
    <div className="relative z-10 flex flex-col items-center gap-1 pb-8 text-[11px] uppercase tracking-[.1em] text-white/30"><ChevronDown className="ai-scroll h-5 w-5" strokeWidth={1.5} />scroll to begin</div>
    <style jsx>{`.ai-gold-word{background:linear-gradient(135deg,#e8c84e,#C9A84C,#f0d060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-style:italic}.ai-pulse-dot{animation:pulse 2s ease-in-out infinite}.ai-bubble-left{animation:floatLeft 6s ease-in-out infinite}.ai-bubble-right{animation:floatRight 7s ease-in-out .8s infinite}.ai-bubble-bottom{animation:floatBottom 5.5s ease-in-out 1.5s infinite}.ai-typing{animation:typingDot 1.2s infinite}.ai-scroll{animation:scroll 2s ease-in-out infinite}@keyframes pulse{50%{opacity:.4;transform:scale(.8)}}@keyframes floatLeft{0%,100%{transform:translateY(-50%)}50%{transform:translateY(calc(-50% - 10px))}}@keyframes floatRight{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes floatBottom{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}@keyframes typingDot{0%,60%,100%{opacity:.2;transform:scale(.8)}30%{opacity:1;transform:scale(1)}}@keyframes scroll{50%{transform:translateY(6px)}}`}</style>
  </section>;
}

function TriageChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "Hello. I am Xohren AI. I am here to help you understand what you might be experiencing and guide you to the right doctor. To get started: how are you feeling today, and how long have you been feeling this way?" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || typing) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages); setInput(""); setTyping(true);
    try {
      const response = await fetch("/api/xohren-ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages, language: "English" }) });
      const data = await response.json() as { message?: string; assessment?: Assessment };
      setMessages((current) => [...current, { role: "assistant", content: data.message || "I am here with you. Could you tell me a little more?" }]);
      if (data.assessment) setAssessment(data.assessment);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I could not reach Xohren AI just now. Please try again shortly." }]);
    } finally { setTyping(false); }
  };

  return <section id="conversation" className="scroll-mt-8 bg-surface px-5 py-20 sm:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-medium uppercase tracking-widest text-gold">Xohren AI</p><h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-near-black">A conversation that guides you to the right care.</h2><p className="mt-4 leading-7 text-text-body">Answer a few simple questions. Xohren AI will assess your symptoms and recommend the right specialist, along with how urgently you need to be seen.</p></div><div className="mx-auto mt-12 max-w-[720px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><header className="flex items-center gap-3 bg-[#0A0D14] px-5 py-4 sm:px-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-health-green"><Bot className="h-5 w-5 text-white" strokeWidth={1.5} /></span><span className="flex-1"><strong className="block text-sm font-medium text-white">Xohren AI</strong><span className="text-xs text-health-green">Online &middot; Responds instantly</span></span><Globe className="h-4 w-4 text-white/40" strokeWidth={1.5} /><MoreVertical className="ml-2 h-4 w-4 text-white/40" strokeWidth={1.5} /></header><div className="min-h-[400px] space-y-4 bg-card p-5 sm:p-6">{messages.map((message, index) => message.role === "user" ? <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-6 text-white" key={index}>{message.content}</div> : <div className="flex max-w-[85%] gap-2.5" key={index}><span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-health-green"><Bot className="h-4 w-4 text-white" strokeWidth={1.5} /></span><div className="rounded-2xl rounded-tl-sm border border-primary-light bg-primary-wash px-4 py-3"><p className="mb-1 text-[11px] font-medium text-text-muted">Xohren AI</p><p className="text-sm leading-6 text-near-black">{message.content}</p><p className="mt-2 text-right text-[11px] text-text-muted">Just now</p></div></div>)}{typing && <div className="flex gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-health-green"><Bot className="h-4 w-4 text-white" strokeWidth={1.5} /></span><div className="flex gap-1 rounded-2xl rounded-tl-sm bg-primary-wash px-5 py-4"><i className="ai-typing h-2 w-2 rounded-full bg-text-muted" /><i className="ai-typing h-2 w-2 rounded-full bg-text-muted [animation-delay:.2s]" /><i className="ai-typing h-2 w-2 rounded-full bg-text-muted [animation-delay:.4s]" /></div></div>}{assessment && <AssessmentCard assessment={assessment} />}</div><form onSubmit={sendMessage} className="flex items-center gap-2.5 border-t border-border p-4 sm:px-5"><input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm text-near-black outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Type how you are feeling..." aria-label="Describe how you feel" /><button type="button" title="Change language" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-text-muted transition hover:border-primary hover:text-primary"><Globe className="h-4 w-4" strokeWidth={1.5} /></button><button type="submit" title="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-[#3a8ecb]"><Send className="h-4 w-4" strokeWidth={1.5} /></button></form></div><p className="mx-auto mt-4 flex max-w-[720px] items-center justify-center gap-2 text-center text-sm text-text-muted"><ShieldCheck className="h-4 w-4" strokeWidth={1.5} />Xohren AI does not diagnose. It guides. Always consult a verified Xohren doctor for medical decisions.</p></section>;
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const tone = assessment.urgency === "Urgent" ? "bg-emergency-light text-emergency" : assessment.urgency === "Soon" ? "bg-gold-light text-gold" : "bg-green-light text-health-green";
  return <div className="ml-9 max-w-[85%] rounded-2xl border border-border bg-card p-5"><p className="text-xs font-medium uppercase tracking-wider text-text-muted">Your assessment</p><div className="mt-5 flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" strokeWidth={1.5} /><h3 className="font-serif text-lg font-medium text-near-black">Recommended: {assessment.specialist}</h3></div><span className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${tone}`}>{assessment.urgency === "Routine" ? "Routine - within the week" : assessment.urgency === "Soon" ? "See a doctor soon - within 48hrs" : "Urgent - today if possible"}</span>{assessment.nextStep && <p className="mt-3 text-sm leading-6 text-text-body">{assessment.nextStep}</p>}<Link href={`/doctors?specialty=${encodeURIComponent(assessment.specialist)}`} className="mt-4 block rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-white">Find this specialist on Xohren</Link></div>;
}

function HowItWorks() {
  const points = [[Brain, "Contextually intelligent", "Xohren AI understands Nigerian health patterns, not just Western medical textbooks. It understands the conditions that matter most across Nigeria.", "text-primary", "border-primary/20 bg-primary/10"], [Languages, "Multilingual by design", "Xohren AI thinks and responds in the language you write to it. Health information in your own language is not a feature, it is a right.", "text-gold", "border-gold/20 bg-gold/10"], [ShieldCheck, "Safe, always", "Xohren AI never diagnoses. It guides. Every conversation ends with a path to a real, verified Xohren doctor.", "text-health-green", "border-health-green/20 bg-health-green/10"]] as const;
  return <section id="how-it-works" className="bg-[#0A0D14] px-5 py-24 text-white sm:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-medium uppercase tracking-widest text-primary">The intelligence behind it</p><h2 className="mt-3 font-serif text-4xl font-medium leading-tight">Not magic. Science. Compassion. And Nigerian medical knowledge.</h2><p className="mt-4 leading-7 text-white/50">Xohren AI is powered by Claude, one of the world&apos;s most advanced language models, with the Nigerian health context patients need.</p></div><div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">{points.map(([Icon, title, body, color, surface]) => <article key={title}><span className={`grid h-12 w-12 place-items-center rounded-xl border ${surface}`}><Icon className={`h-6 w-6 ${color}`} strokeWidth={1.5} /></span><h3 className="mt-5 font-serif text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{body}</p></article>)}</div><div className="mx-auto mt-16 max-w-5xl border-t border-white/[.08] pt-10 text-center"><p className="text-sm text-white/30">Xohren AI is powered by</p><span className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[.04] px-5 py-2 text-sm font-medium text-white/60">Claude by Anthropic</span></div></section>;
}

function Outcomes() { const outcomes = [["94%", "of users reached the right specialist on their first booking", "text-primary"], ["3 min", "average time to specialist recommendation", "text-gold"], ["5 langs", "Xohren AI responds fluently in all five supported languages", "text-health-green"]] as const; return <section className="bg-card px-5 py-20 sm:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-medium uppercase tracking-widest text-gold">Real outcomes</p><h2 className="mt-3 font-serif text-4xl font-medium text-near-black">What happens after Xohren AI guides you.</h2></div><div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">{outcomes.map(([value, label, color]) => <article className="rounded-2xl border border-border p-8" key={value}><p className={`font-serif text-5xl font-medium ${color}`}>{value}</p><p className="mt-2 text-sm leading-6 text-text-muted">{label}</p></article>)}</div></section>; }

function ClosingCta() { return <section className="bg-gradient-to-br from-[#0A0D14] to-[#0D1520] px-5 py-20 text-center text-white sm:px-8"><HeartPulse className="mx-auto h-7 w-7 text-gold" strokeWidth={1.5} /><h2 className="mx-auto mt-5 max-w-xl font-serif text-4xl font-medium leading-tight">Your health journey starts with one sentence.</h2><p className="mt-4 font-accent text-xl text-white/50">Tell Xohren AI how you feel.</p><a href="#conversation" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gold px-10 py-4 text-base font-medium text-white"><MessageSquare className="h-5 w-5" strokeWidth={1.5} />Start your conversation</a><p className="mt-5 text-sm font-light text-white/30">Free for all Xohren users. No account required to start.</p></section>; }
