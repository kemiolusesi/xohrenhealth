"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const gradients = [
  "linear-gradient(135deg, #0f2940, #1a4a6b, #0d3d2a)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #0d2137, #1a3a2a, #2d1b4e)",
  "linear-gradient(135deg, #1c1a0f, #2d3a1a, #1a2d3d)",
];

const doctors = [
  ["Dr. Amaka Okafor", "Cardiologist", "Lagos"],
  ["Dr. Raymond Manga", "General Practice", "Kano"],
  ["Dr. MI Abdulahi", "Orthopedics", "Kano"],
  ["Kemi Olusesi", "Nutritionist", "Kano"],
];

function ecgY(pos: number, H: number): number {
  if (pos < 0.04) return H * 0.5 + Math.sin(pos * 60) * 2;
  if (pos < 0.08) return H * 0.5 - Math.sin((pos - 0.04) * 80) * H * 0.28;
  if (pos < 0.11) return H * 0.5 + Math.sin((pos - 0.08) * 100) * H * 0.38;
  if (pos < 0.14) return H * 0.5 - Math.sin((pos - 0.11) * 100) * H * 0.14;
  if (pos < 0.18) return H * 0.5 + Math.sin((pos - 0.14) * 75) * H * 0.08;
  return H * 0.5 + Math.sin(pos * 5) * 1.5;
}

function drawEcgLine(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  baseY: number,
  color: string,
  glow: string,
  lineWidth: number,
  speed: number,
  frame: number,
  dot = true,
) {
  const drawPath = () => {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const pos = ((x + frame * speed) % 220) / 220;
      const y = baseY + ecgY(pos, height) - height * 0.5;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  };

  drawPath();
  ctx.strokeStyle = glow;
  ctx.lineWidth = lineWidth * 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  drawPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  if (dot) {
    const x = (frame * speed * 1.8) % width;
    const pos = ((x + frame * speed) % 220) / 220;
    const y = baseY + ecgY(pos, height) - height * 0.5;
    ctx.beginPath();
    ctx.fillStyle = "#4A9EDB";
    ctx.shadowColor = "rgba(74,158,219,0.6)";
    ctx.shadowBlur = 12;
    ctx.arc(x, y, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

type Wave =
  | {
      amplitude: number;
      freq: number;
      speed: number;
      phase: number;
      yOffset: number;
      fill: string;
    }
  | {
      amplitude: number;
      freq: number;
      speed: number;
      phase: number;
      yOffset: number;
      stroke: string;
      lineWidth: number;
    };

export default function Hero() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const ecgStripCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const vitalsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const waveCanvas = waveCanvasRef.current;
    const ecgStripCanvas = ecgStripCanvasRef.current;
    const vitalsCanvas = vitalsCanvasRef.current;

    if (!hero || !waveCanvas || !ecgStripCanvas || !vitalsCanvas) return;

    let animationFrame = 0;
    let t = 0;
    const dpr = () => window.devicePixelRatio || 1;

    const resizeCanvas = (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
    ) => {
      const ratio = dpr();
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const resizeAll = () => {
      const heroRect = hero.getBoundingClientRect();
      resizeCanvas(waveCanvas, heroRect.width, heroRect.height);
      resizeCanvas(ecgStripCanvas, heroRect.width, 160);
      resizeCanvas(vitalsCanvas, vitalsCanvas.offsetWidth, 80);
    };

    const observer = new ResizeObserver(resizeAll);
    observer.observe(hero);
    resizeAll();

    const waves: Wave[] = [
      {
        amplitude: 90,
        freq: 0.0018,
        speed: 0.0008,
        phase: 0,
        yOffset: 0.52,
        fill: "rgba(74,158,219,0.07)",
      },
      {
        amplitude: 60,
        freq: 0.0025,
        speed: 0.0014,
        phase: 2.1,
        yOffset: 0.58,
        fill: "rgba(74,158,219,0.05)",
      },
      {
        amplitude: 120,
        freq: 0.0012,
        speed: 0.0005,
        phase: 4.5,
        yOffset: 0.48,
        fill: "rgba(201,168,76,0.04)",
      },
      {
        amplitude: 35,
        freq: 0.004,
        speed: 0.002,
        phase: 1.1,
        yOffset: 0.62,
        stroke: "rgba(74,158,219,0.18)",
        lineWidth: 1.2,
      },
      {
        amplitude: 22,
        freq: 0.006,
        speed: 0.003,
        phase: 3.3,
        yOffset: 0.68,
        stroke: "rgba(201,168,76,0.22)",
        lineWidth: 0.8,
      },
    ];

    const render = () => {
      const waveCtx = waveCanvas.getContext("2d");
      const stripCtx = ecgStripCanvas.getContext("2d");
      const vitalsCtx = vitalsCanvas.getContext("2d");
      const heroRect = hero.getBoundingClientRect();
      const W = heroRect.width;
      const H = heroRect.height;

      if (waveCtx) {
        waveCtx.clearRect(0, 0, W, H);
        waves.forEach((wave) => {
          waveCtx.beginPath();
          for (let x = 0; x <= W; x += 8) {
            const y =
              H * wave.yOffset +
              Math.sin(x * wave.freq + t * wave.speed + wave.phase) *
                wave.amplitude +
              Math.sin(
                x * wave.freq * 1.7 + t * wave.speed * 0.6 + wave.phase + 1,
              ) *
                wave.amplitude *
                0.3;

            if (x === 0) waveCtx.moveTo(x, y);
            else waveCtx.lineTo(x, y);
          }

          if ("fill" in wave) {
            waveCtx.lineTo(W, H);
            waveCtx.lineTo(0, H);
            waveCtx.closePath();
            waveCtx.fillStyle = wave.fill;
            waveCtx.fill();
          } else {
            waveCtx.strokeStyle = wave.stroke;
            waveCtx.lineWidth = wave.lineWidth;
            waveCtx.stroke();
          }
        });
      }

      if (stripCtx) {
        stripCtx.clearRect(0, 0, W, 160);
        [
          {
            yMult: 0.42,
            color: "rgba(74,158,219,0.55)",
            glow: "rgba(74,158,219,0.12)",
            lineWidth: 1.8,
            speed: 1.6,
          },
          {
            yMult: 0.62,
            color: "rgba(74,158,219,0.25)",
            glow: "rgba(74,158,219,0.06)",
            lineWidth: 1.2,
            speed: 1.0,
          },
          {
            yMult: 0.78,
            color: "rgba(201,168,76,0.35)",
            glow: "rgba(201,168,76,0.08)",
            lineWidth: 1.0,
            speed: 1.3,
          },
        ].forEach((line) => {
          drawEcgLine(
            stripCtx,
            W,
            58,
            160 * line.yMult,
            line.color,
            line.glow,
            line.lineWidth,
            line.speed,
            t,
          );
        });
      }

      if (vitalsCtx) {
        const width = vitalsCanvas.offsetWidth;
        const height = 80;
        vitalsCtx.clearRect(0, 0, width, height);
        drawEcgLine(
          vitalsCtx,
          width,
          height,
          height * 0.5,
          "rgba(74,158,219,0.82)",
          "rgba(74,158,219,0.16)",
          1.7,
          1.45,
          t,
        );
      }

      t += 1;
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % gradients.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const doctor = doctors[active];

  return (
    <div className="bg-near-black">
      <section
        ref={heroRef}
        className="relative min-h-[580px] w-full overflow-hidden bg-[#1A1D23]"
      >
        {gradients.map((gradient, index) => (
          <div
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            key={gradient}
            style={{
              background: gradient,
              opacity: active === index ? 1 : 0,
              zIndex: 1,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(26,29,35,0.88) 0%, rgba(26,29,35,0.72) 38%, rgba(26,29,35,0.2) 65%, rgba(26,29,35,0.45) 100%)",
            zIndex: 2,
          }}
        />
        <canvas
          ref={waveCanvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: 3 }}
        />
        <canvas
          ref={ecgStripCanvasRef}
          className="absolute bottom-0 left-0 h-[160px] w-full"
          style={{ zIndex: 4 }}
        />

        <nav
          className="absolute left-0 top-0 w-full border-b border-white/[0.08] bg-[#1A1D23]/55 backdrop-blur-xl"
          style={{ zIndex: 50 }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-9">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#4A9EDB]">
                <svg
                  aria-hidden="true"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 12h3.2l1.4-4.3 3.1 9.1 2.5-13.2 2.4 8.4H21"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span>
                <span className="block font-serif text-[19px] font-medium leading-none text-white">
                  Xohren
                </span>
                <span className="font-accent text-[10.5px] text-[rgba(201,168,76,0.85)]">
                  Where light meets renewal.
                </span>
              </span>
            </Link>
            <div className="hidden items-center gap-7 font-sans text-[13px] font-normal text-white/65 md:flex">
              <Link href="/doctors">Doctors</Link>
              <a href="#care-plans">Care Plans</a>
              <Link href="/triage">Triage AI</Link>
              <a href="#how">About</a>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/auth/patient"
                className="rounded-[9px] border border-white/15 px-4 py-2.5 text-[13px] font-medium text-white/75"
              >
                Log in
              </Link>
              <Link
                href="/doctors"
                className="rounded-[9px] bg-[#4A9EDB] px-4 py-2.5 text-[13px] font-medium text-white"
              >
                Book care
              </Link>
            </div>
          </div>
        </nav>

        <div
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-8 pt-[110px] sm:px-9 md:pt-[90px] lg:grid-cols-[1fr_420px]"
          style={{ zIndex: 10 }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#C9A84C]/60" />
              <p className="font-sans text-[10px] font-medium uppercase tracking-[3.5px] text-[#C9A84C]">
                PREMIUM NIGERIAN DIGITAL HEALTH
              </p>
            </div>
            <h1 className="mt-5 max-w-[620px] font-serif text-[42px] font-medium leading-[1.1] text-white sm:text-[52px]">
              Your health, <span className="text-[#4A9EDB]">wherever</span>{" "}
              you are.
            </h1>
            <p className="mt-5 font-accent text-[21px] font-normal text-[rgba(201,168,76,0.9)]">
              Where light meets renewal.
            </p>
            <p className="mt-5 max-w-[380px] font-sans text-[14px] font-light leading-[1.8] text-white/65">
              Consult verified Nigerian doctors, receive guided AI triage, and
              continue care through App, WhatsApp, SMS, or USSD.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/doctors"
                className="rounded-xl bg-[#4A9EDB] px-7 py-[13px] text-center text-[13px] font-medium text-white"
              >
                Book a consultation
              </Link>
              <a
                href="#how"
                className="rounded-xl border border-white/[0.18] bg-white/[0.07] px-7 py-[13px] text-center text-[13px] font-medium text-white/80"
              >
                How it works
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2 font-sans text-[13px]">
              <span className="mr-2 text-white/35">Access via</span>
              {["App", "WhatsApp", "SMS", "USSD"].map((channel) => (
                <span
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-white/70"
                  key={channel}
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-[#2D9B6F]" />
                  {channel}
                </span>
              ))}
            </div>
          </div>

          <div className="ml-auto hidden w-full max-w-[420px] flex-col gap-3 lg:flex">
            <div className="animate-[floatDoctor_5s_ease-in-out_infinite] rounded-[14px] border border-white/10 bg-white/[0.06] p-3 px-4 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-gradient-to-br from-[#4A9EDB] to-[#2D9B6F] font-serif text-[14px] font-medium text-white">
                    {doctor[0]
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-sans text-[13px] font-medium text-white">
                      {doctor[0]}
                    </p>
                    <p className="font-sans text-[11px] font-normal text-white/45">
                      {doctor[1]} · {doctor[2]}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#2D9B6F]">
                  ● Online now
                </span>
              </div>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5 px-[22px] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[2px] text-white/40">
                  HEART VITALS
                </p>
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#2D9B6F]/15 px-3 py-1.5 text-[11px] font-medium text-[#2D9B6F]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#2D9B6F]" />
                  Live monitor
                </span>
              </div>
              <canvas
                ref={vitalsCanvasRef}
                className="mt-4 block h-20 w-full"
                height={80}
              />
              <div className="mt-4 flex items-end justify-between gap-4">
                <div className="flex items-end gap-2">
                  <span className="font-serif text-[36px] font-medium leading-none text-white">
                    72
                  </span>
                  <span className="pb-1 text-[12px] text-white/45">bpm</span>
                </div>
                <span className="rounded-xl bg-[#2D9B6F]/15 px-3 py-2 text-[11px] font-medium text-[#2D9B6F]">
                  Normal sinus
                </span>
              </div>
              <div className="mt-5 flex gap-2">
                {gradients.map((gradient, index) => (
                  <button
                    aria-label={`Show Xohren image slot ${index + 1}`}
                    className={`h-1.5 transition-all duration-300 ${
                      active === index
                        ? "w-[18px] rounded-full bg-[#4A9EDB]"
                        : "w-1.5 rounded-full bg-white/20"
                    }`}
                    key={gradient}
                    onClick={() => setActive(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2.5">
              {[
                ["ti-users", "#4A9EDB", "ONLINE NOW", "247", "doctors · 36 states"],
                ["ti-calendar-check", "#C9A84C", "THIS MONTH", "18.4k", "consultations done"],
                ["ti-message-heart", "#2D9B6F", "LANGUAGES", "5", "EN · HA · YO · IG · PCM"],
              ].map(([icon, color, label, value, subLabel]) => (
                <div
                  className="min-w-0 flex-1 rounded-[14px] border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-2xl"
                  key={label}
                >
                  <i className={`ti ${icon} text-[18px]`} style={{ color }} />
                  <p className="mt-3 font-sans text-[9.5px] font-medium uppercase text-white/40">
                    {label}
                  </p>
                  <p className="mt-1 font-serif text-[18px] font-medium text-white">
                    {value}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-white/40">
                    {subLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.07] bg-white/[0.04]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-5 sm:px-9 md:grid-cols-4">
          {[
            ["247", "Doctors online"],
            ["18,400+", "Consultations completed"],
            ["5", "Languages supported"],
            ["36", "Nigerian states covered"],
          ].map(([number, label]) => (
            <div className="px-3 py-3 text-center" key={label}>
              <p className="font-serif text-[20px] font-medium text-white">
                {number}
              </p>
              <p className="mt-1 text-[10px] text-white/35">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
