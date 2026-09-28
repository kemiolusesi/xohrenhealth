"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const languages = [
  { name: "English", native: "English" },
  { name: "Hausa", native: "\u0647\u064e\u0648\u064f\u0633\u064e" },
  { name: "Yor\u00f9b\u00e1", native: "Yor\u00f9b\u00e1" },
  { name: "Igbo", native: "Igbo" },
  { name: "Pidgin", native: "Naij\u00e1" },
];

type LanguageSelectorProps = {
  dark?: boolean;
  showLabel?: boolean;
  dropDirection?: "up" | "down";
};

export function LanguageSelector({
  dark = false,
  showLabel = false,
  dropDirection = "down",
}: LanguageSelectorProps) {
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  const [toast, setToast] = useState("");
  const selectorRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        selectorRef.current?.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const selectLanguage = (language: (typeof languages)[number]) => {
    setActiveLanguage(language);
    selectorRef.current?.removeAttribute("open");
    setToast(`Language set to ${language.name}`);
  };

  return (
    <details className="language-selector relative z-[70]" ref={selectorRef}>
      <summary
        aria-label="Choose language"
        className={`inline-flex cursor-pointer list-none items-center gap-2 rounded-lg transition [&::-webkit-details-marker]:hidden ${
          showLabel
            ? "px-2 py-1.5 text-xs"
            : "h-9 w-9 justify-center"
        } ${dark ? "text-white hover:bg-white/10" : "text-primary hover:bg-primary-light"}`}
      >
        <Globe className="h-5 w-5" strokeWidth={1.5} />
        {showLabel && <span className="text-text-muted">{activeLanguage.name}</span>}
        {showLabel && <ChevronDown className="h-3.5 w-3.5 text-text-muted" strokeWidth={1.5} />}
      </summary>

      <div role="menu" className={`language-selector-menu absolute right-0 z-[80] hidden min-w-40 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-md ${
          dropDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
        }`}>
          {languages.map((language) => {
            const isActive = language.name === activeLanguage.name;
            return (
              <button
                key={language.name}
                type="button"
                role="menuitem"
                onClick={() => selectLanguage(language)}
                className="flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left hover:bg-primary-light"
              >
                <span>
                  <span className="block text-sm font-medium text-near-black">
                    {language.name}
                  </span>
                  <span className="block text-xs font-light text-text-muted">
                    {language.native}
                  </span>
                </span>
                {isActive && <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />}
              </button>
            );
          })}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-near-black px-4 py-3 text-sm text-white shadow-md">
          {toast}
        </div>
      )}
    </details>
  );
}
