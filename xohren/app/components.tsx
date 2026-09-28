import Link from "next/link";

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
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-text-body lg:flex">
          <Link href="/doctors">Doctors</Link>
          <Link href="/triage">AI triage</Link>
          <Link href="/dashboard/patient">Patient</Link>
          <Link href="/dashboard/doctor">Doctor</Link>
          <Link href="/dashboard/admin">Admin</Link>
        </nav>
        <Link
          href="/auth/patient"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white"
        >
          Book care
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-text-body sm:px-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-3">
          {["EN", "HA", "YO", "IG", "PCM"].map((language) => (
            <span
              className="rounded-xl border border-border bg-surface px-3 py-2 font-medium"
              key={language}
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      {children}
      <Footer />
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
