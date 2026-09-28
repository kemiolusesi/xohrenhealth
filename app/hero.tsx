"use client";

import Link from "next/link";
import { LanguageSelector } from "../components/layout/LanguageSelector";
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

function drawVitalsEcg(
  ctx: CanvasRenderingContext2D,
  CW: number,
  CH: number,
  offset: number,
) {
  const BASELINE = CH * 0.66;
  const UP_ROOM = BASELINE;
  const DOWN_ROOM = CH - BASELINE;

  function pqrst(pos: number): number {
    const noise = Math.sin(pos * 31.4) * 0.8;

    if (pos < 0.18) return BASELINE + noise;
    if (pos < 0.28) {
      const p = (pos - 0.18) / 0.1;
      return BASELINE - Math.sin(p * Math.PI) * UP_ROOM * 0.18 + noise;
    }
    if (pos < 0.34) {
      const p = (pos - 0.28) / 0.06;
      return BASELINE + Math.sin(p * Math.PI) * DOWN_ROOM * 0.28 + noise;
    }
    if (pos < 0.46) {
      const p = (pos - 0.34) / 0.12;
      const shape =
        p < 0.45
          ? Math.sin((p / 0.45) * (Math.PI / 2))
          : Math.cos(((p - 0.45) / 0.55) * (Math.PI / 2));
      return BASELINE - shape * UP_ROOM * 0.88;
    }
    if (pos < 0.56) {
      const p = (pos - 0.46) / 0.1;
      return BASELINE + Math.sin(p * Math.PI) * DOWN_ROOM * 0.72;
    }
    if (pos < 0.62) {
      const p = (pos - 0.56) / 0.06;
      return BASELINE + DOWN_ROOM * 0.72 * (1 - p) * (1 - p);
    }
    if (pos < 0.82) {
      const p = (pos - 0.62) / 0.2;
      return BASELINE - Math.sin(p * Math.PI) * UP_ROOM * 0.3;
    }
    return BASELINE + noise;
  }

  const period = CW / 3;
  const pxPerFrame = period / 80;
  const nextOffset = (offset + pxPerFrame) % period;
  ctx.clearRect(0, 0, CW, CH);

  ctx.beginPath();
  ctx.moveTo(0, BASELINE);
  ctx.lineTo(CW, BASELINE);
  ctx.strokeStyle = "rgba(74,158,219,0.08)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= CW; x += 1) {
    const localX = ((x + nextOffset) % period + period) % period;
    points.push({ x, y: pqrst(localX / period) });
  }

  ctx.beginPath();
  points.forEach((point, index) =>
    index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y),
  );
  ctx.strokeStyle = "rgba(74,158,219,0.20)";
  ctx.lineWidth = 9;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  points.forEach((point, index) =>
    index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y),
  );
  ctx.strokeStyle = "rgba(74,158,219,0.95)";
  ctx.lineWidth = 1.8;
  ctx.stroke();

  const dotX = CW * 0.68;
  const dotLocal = ((dotX + nextOffset) % period + period) % period;
  const dotY = pqrst(dotLocal / period);

  ctx.beginPath();
  ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(74,158,219,0.20)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = "#4A9EDB";
  ctx.fill();

  return nextOffset;
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
    let vitalsOffset = 0;
    const dpr = () => window.devicePixelRatio || 1;

    const resizeCanvas = (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
    ) => {
      const ratio = dpr();
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const resizeAll = () => {
      const heroRect = hero.getBoundingClientRect();
      resizeCanvas(waveCanvas, heroRect.width, heroRect.height);
      resizeCanvas(ecgStripCanvas, heroRect.width, 160);
      resizeCanvas(
        vitalsCanvas,
        vitalsCanvas.offsetWidth,
        vitalsCanvas.offsetHeight,
      );
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
      }

      if (vitalsCtx) {
        const width = vitalsCanvas.offsetWidth;
        vitalsOffset = drawVitalsEcg(vitalsCtx, width, 100, vitalsOffset);
      }

      t += 1;
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

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
        className="relative min-h-[680px] w-full overflow-hidden bg-[#1A1D23]"
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
              <Link href="/care-plans">Care Plans</Link>
              <Link href="/xohren-ai">Xohren AI</Link>
              <a href="#how">About</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 lg:flex">
                <LanguageSelector />
                <span className="h-5 border-l border-white/20" aria-hidden="true" />
              </div>
              <Link
                href="/auth/patient"
                className="hidden rounded-[9px] bg-[#4A9EDB] px-4 py-2.5 text-[13px] font-medium text-white sm:inline-flex"
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
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-6 pt-[100px] min-[1025px]:grid-cols-[1fr_420px] min-[1025px]:px-9 min-[1025px]:pb-8 min-[1025px]:pt-[90px]"
          style={{ zIndex: 10 }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#C9A84C]/60" />
              <p className="font-sans text-[10px] font-medium uppercase tracking-[3.5px] text-[#C9A84C]">
                PREMIUM NIGERIAN DIGITAL HEALTH
              </p>
            </div>
            <h1 className="mt-5 max-w-[620px] font-serif text-[30px] font-medium leading-[1.15] text-white sm:text-[38px] sm:leading-[1.1] min-[1025px]:text-[52px]">
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
            <div className="mt-7 flex gap-3">
              <Link
                href="/doctors"
                className="flex-1 rounded-xl bg-[#4A9EDB] px-3 py-[13px] text-center text-[13px] font-medium text-white sm:flex-none sm:px-7"
              >
                Book a consultation
              </Link>
              <a
                href="#how"
                className="flex-1 rounded-xl border border-white/[0.18] bg-white/[0.07] px-3 py-[13px] text-center text-[13px] font-medium text-white/80 sm:flex-none sm:px-7"
              >
                How it works
              </a>
            </div>
            <div className="mt-7 hidden flex-wrap items-center gap-2 font-sans text-[13px] sm:flex">
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

          <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3 min-[1025px]:ml-auto min-[1025px]:max-w-[420px]">
            <div className="hidden animate-[floatDoctor_5s_ease-in-out_infinite] rounded-[14px] border border-white/10 bg-white/[0.06] p-3 px-4 backdrop-blur-2xl sm:block">
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
                      {doctor[1]} {"\u00b7"} {doctor[2]}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#2D9B6F]">
                  {"\u25cf"} Online now
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
                className="mt-4 block h-[100px] w-full"
                height={100}
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

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                ["ti-users", "#4A9EDB", "ONLINE NOW", "247", "doctors \u00b7 36 states"],
                ["ti-calendar-check", "#C9A84C", "THIS MONTH", "18.4k", "consultations done"],
                ["ti-message-heart", "#2D9B6F", "LANGUAGES", "5", "EN \u00b7 HA \u00b7 YO \u00b7 IG \u00b7 PCM"],
              ].map(([icon, color, label, value, subLabel]) => (
                <div
                  className="min-w-0 rounded-[14px] border border-white/10 bg-white/[0.06] p-3.5 last:col-span-2 sm:last:col-span-1 backdrop-blur-2xl"
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
            <div className="flex flex-wrap items-center gap-2 font-sans text-[13px] sm:hidden">
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
        </div>
      </section>

    </div>
  );
}
