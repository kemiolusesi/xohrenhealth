"use client";

import {
  AtSign,
  BriefcaseBusiness,
  Camera,
  ChevronDown,
  Play,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";

const footerColumns = [
  {
    heading: "Services",
    links: [
      ["Find a Doctor", "/doctors"],
      ["Care Plans", "/care-plans"],
      ["Xohren AI", "/xohren-ai"],
      ["Emergency SOS", "/triage"],
      ["Child Nutrition Check", "/child-nutrition"],
      ["Book a Consultation", "/auth/patient"],
    ],
  },
  {
    heading: "Care Plans",
    links: [
      ["Maternal Bundle", "/care-plans/maternal-bundle"],
      ["Diabetes Care", "/care-plans/diabetes-care"],
      ["Hypertension Plan", "/care-plans/hypertension-care"],
      ["Mental Wellness", "/care-plans/mental-wellness"],
      ["Sickle Cell Care", "/care-plans/sickle-cell-care"],
      ["HIV Wellness", "/care-plans/hiv-wellness"],
      ["Stroke Recovery", "/care-plans/stroke-recovery"],
      ["Nutrition Plan", "/care-plans/nutrition-plan"],
      ["General Wellness", "/care-plans/general-wellness"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["About Xohren", "/#about"],
      ["Our Doctors", "/doctors"],
      ["For Hospitals", "/#hospitals"],
      ["Careers", "/#careers"],
      ["Press", "/#press"],
      ["Contact Us", "/#contact"],
    ],
  },
  {
    heading: "Support",
    links: [
      ["Help Centre", "/#help"],
      ["Privacy Policy", "/#privacy"],
      ["Terms of Service", "/#terms"],
      ["NDPR Compliance", "/#ndpr"],
      ["Cookie Policy", "/#cookies"],
      ["For Doctors - Join us", "/auth/doctor"],
    ],
  },
] as const;

const socialLinks = [
  { label: "X", Icon: AtSign },
  { label: "Instagram", Icon: Camera },
  { label: "LinkedIn", Icon: BriefcaseBusiness },
  { label: "Facebook", Icon: ThumbsUp },
  { label: "YouTube", Icon: Play },
];

export function Footer() {
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
    <footer className="overflow-visible bg-near-black px-6 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          <section className="col-span-full lg:col-auto">
            <Link href="/" className="font-serif text-[28px] font-medium leading-none text-white">
              Xohren
            </Link>
            <p className="mt-2 font-accent text-base text-primary">Where light meets renewal.</p>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-text-muted">
              Nigeria&apos;s digital health infrastructure. Connecting patients, doctors, and communities by app, WhatsApp, SMS, and USSD.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {socialLinks.map(({ label, Icon }) => (
                <a href="#" key={label} aria-label={label} className="text-text-muted transition hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </section>

          {footerColumns.map((column) => {
            const isOpen = openColumn === column.heading;
            return (
              <section key={column.heading} className="border-b border-[#2A2D33] pb-4 md:border-0 md:pb-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-[11px] font-medium uppercase tracking-widest text-text-muted md:pointer-events-none"
                  onClick={() => setOpenColumn(isOpen ? null : column.heading)}
                  aria-expanded={isOpen}
                >
                  {column.heading}
                  <ChevronDown className={`h-4 w-4 transition md:hidden ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                </button>
                <div className={`mt-4 space-y-3 ${isOpen ? "block" : "hidden"} md:block`}>
                  {column.links.map(([label, href]) => (
                    <Link key={label} href={href} className="block text-sm text-text-muted transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="my-10 border-t border-[#2A2D33]" />

        <div className="text-center">
          <p className="mb-4 text-[11px] font-light text-text-muted">Secure payments powered by</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-lg bg-[#2A2D33] px-3 py-1.5 text-xs font-medium text-white">Paystack</span>
            <span className="rounded-lg bg-[#2A2D33] px-3 py-1.5 text-xs font-medium text-white">Flutterwave</span>
            <span className="rounded-lg bg-[#2A2D33] px-3 py-1.5 text-xs font-medium text-white">Data protected under NDPR</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#2A2D33] pt-6 text-xs font-light text-text-muted md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Xohren Health Technologies Ltd. Built in Nigeria, for Africa.</p>
          <LanguageSelector dark dropDirection="up" showLabel />
        </div>
      </div>
    </footer>
  );
}
