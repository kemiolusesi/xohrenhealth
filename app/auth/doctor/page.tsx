import Link from "next/link";
import { Eyebrow, FormField, PageShell, SelectField } from "../../components";

export default function DoctorAuth() {
  return (
    <PageShell>
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Eyebrow>Doctor onboarding</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight text-near-black">
            Verify your practice and begin consulting.
          </h1>
          <p className="mt-5 max-w-xl leading-8 text-text-body">
            Doctors create an email account, upload a medical license PDF to
            Supabase Storage, and wait for admin approval before seeing
            patients.
          </p>
        </section>
        <form className="card grid gap-5 p-6">
          <FormField label="Full name" placeholder="Dr. Adaeze Nwosu" />
          <FormField label="Email" placeholder="doctor@example.com" type="email" />
          <FormField label="Password" placeholder="Create a secure password" type="password" />
          <SelectField
            label="Primary specialty"
            options={["General Practice", "Obstetrics", "Pediatrics", "Mental Health", "Cardiology"]}
          />
          <label className="grid gap-2 text-sm font-medium text-near-black">
            Medical license PDF
            <input
              type="file"
              accept="application/pdf"
              className="rounded-xl border border-border bg-card px-4 py-3 text-text-body"
            />
          </label>
          <button className="rounded-xl bg-primary px-5 py-4 text-sm font-medium text-white">
            Submit for approval
          </button>
          <Link className="text-sm font-medium text-primary" href="/dashboard/doctor">
            Preview doctor dashboard
          </Link>
        </form>
      </main>
    </PageShell>
  );
}
