"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { carePlans } from "../lib/care-plans";
import { CarePlanIcon } from "./care-plan-icon";
import { Footer } from "../components/layout/Footer";
import { LanguageSelector } from "../components/layout/LanguageSelector";

export { Footer } from "../components/layout/Footer";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Xohren home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-lg font-medium text-white">
        X
      </span>
      <span>
        <span className="block font-serif text-2xl font-medium leading-none text-near-black">
          xohren
        </span>
        <span className="font-accent text-base text-gold">
          Where light meets renewal.
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileCarePlansOpen, setMobileCarePlansOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-border/80 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-text-body lg:flex">
          <Link href="/doctors">Doctors</Link>
          <div className="group relative">
            <Link href="/care-plans" className="inline-flex py-3">Care plans</Link>
            <div className="pointer-events-none invisible absolute left-1/2 top-full grid w-80 -translate-x-1/2 gap-1 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-sm transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
              <CarePlanMenuItems />
            </div>
          </div>
          <Link href="/xohren-ai">Xohren AI</Link>
          <Link href="/dashboard/patient">Patient</Link>
          <Link href="/dashboard/doctor">Doctor</Link>
          <Link href="/dashboard/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector />
            <span className="h-5 border-l border-border" aria-hidden="true" />
          </div>
          <Link
            href="/auth/patient"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white"
          >
            Book care
          </Link>
        </div>
      </div>
      <div className="border-t border-border/80 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center px-5 sm:px-8">
          <Link href="/care-plans" className="py-3 text-sm font-medium text-text-body">Care plans</Link>
          <button
            type="button"
            aria-label="Show care plans"
            aria-expanded={mobileCarePlansOpen}
            onClick={() => setMobileCarePlansOpen((open) => !open)}
            className="ml-1 rounded-lg p-2 text-text-body hover:bg-primary-light"
          >
            <ChevronDown className={`h-4 w-4 transition ${mobileCarePlansOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
          </button>
        </div>
        {mobileCarePlansOpen && (
          <div className="border-t border-border bg-card px-5 py-3 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-1">
              <CarePlanMenuItems onNavigate={() => setMobileCarePlansOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function CarePlanMenuItems({ onNavigate }: { onNavigate?: () => void }) {
  return <>
    {carePlans.map((plan) => (
      <Link onClick={onNavigate} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-primary-light" href={`/care-plans/${plan.slug}`} key={plan.slug}>
        <CarePlanIcon maternal={plan.slug === "maternal-bundle"} name={plan.icon as "Baby"} size="nav" /><span>{plan.name}</span>
      </Link>
    ))}
    <Link onClick={onNavigate} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-primary hover:bg-primary-light" href="/child-nutrition"><CarePlanIcon name="Ruler" size="nav" /><span>Child Nutrition Check</span></Link>
  </>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-gold">
      {children}
    </p>
  );
}

export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="card p-5">
      <p className="font-serif text-3xl font-medium text-near-black">{value}</p>
      <p className="mt-2 text-sm text-text-body">{label}</p>
    </div>
  );
}

export function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-near-black">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-card px-4 py-3 text-text-body outline-none focus:border-primary"
      />
    </label>
  );
}

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-near-black">
      {label}
      <select className="rounded-xl border border-border bg-card px-4 py-3 text-text-body outline-none focus:border-primary">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
