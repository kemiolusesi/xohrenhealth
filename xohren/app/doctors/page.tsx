import Link from "next/link";
import { doctors } from "../data";
import { Eyebrow, PageShell, SelectField } from "../components";

export default function DoctorsPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Doctor directory</Eyebrow>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium leading-tight text-near-black">
              Find verified Nigerian doctors by need, language, and budget.
            </h1>
          </div>
          <Link
            className="rounded-xl bg-primary px-6 py-4 text-center text-sm font-medium text-white"
            href="/triage"
          >
            Start with AI triage
          </Link>
        </div>
        <section className="card mt-8 grid gap-4 p-5 md:grid-cols-4">
          <SelectField
            label="Specialty"
            options={["All specialties", "Obstetrics", "Endocrinology", "Family Medicine", "Mental Health"]}
          />
          <SelectField label="Language" options={["Any language", "English", "Hausa", "Yoruba", "Igbo", "Pidgin"]} />
          <SelectField label="Availability" options={["Any time", "Today", "Tomorrow", "This week"]} />
          <SelectField label="Care bundle" options={["Any bundle", "Maternal Bundle", "Diabetes Plan", "Hypertension Plan", "Mental Wellness"]} />
          <label className="grid gap-2 text-sm font-medium text-near-black md:col-span-4">
            Price range
            <input type="range" min="5000" max="50000" className="accent-primary" />
          </label>
        </section>
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <article className="card p-6" key={doctor.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl font-medium text-near-black">
                    {doctor.name}
                  </h2>
                  <p className="mt-2 text-text-body">{doctor.specialty}</p>
                </div>
                <span className="rounded-xl bg-green-light px-3 py-2 text-sm font-medium text-health-green">
                  {doctor.rating}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <span className="rounded-xl bg-primary-light px-3 py-2 text-xs font-medium text-primary" key={language}>
                    {language}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-text-body">Next slot: {doctor.next}</p>
              <p className="mt-2 font-serif text-3xl font-medium text-near-black">
                {doctor.fee30}
              </p>
              <div className="mt-6 flex gap-3">
                <Link className="rounded-xl border border-border px-4 py-3 text-sm font-medium" href={`/doctors/${doctor.id}`}>
                  View profile
                </Link>
                <Link className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white" href={`/book/${doctor.id}`}>
                  Book
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
