import { Activity, Apple, Baby, Brain, Droplets, HeartPulse, Microscope, PersonStanding, Ruler, Shield } from "lucide-react";

const icons = { Baby, Droplets, Activity, Brain, Microscope, Apple, Shield, PersonStanding, HeartPulse, Ruler };

export function CarePlanIcon({ name, size = "card", maternal = false }: { name: keyof typeof icons; size?: "nav" | "card" | "hero"; maternal?: boolean }) {
  const Icon = icons[name];
  const dimensions = size === "nav" ? "h-7 w-7" : size === "hero" ? "h-12 w-12" : "h-9 w-9";
  return <span className={`inline-flex rounded-xl p-3 ${maternal ? "bg-gold-light text-gold" : "bg-primary-light text-primary"}`}><Icon className={dimensions} strokeWidth={1.5} /></span>;
}
