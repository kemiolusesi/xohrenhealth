import Link from "next/link";
import { Eyebrow, PageShell, Stat } from "../../components";

export default function PatientDashboard() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Patient dashboard</Eyebrow>
            <h1 className="mt-3 font-serif text-5xl font-medium text-near-black">
              Welcome back, Ifeoma.
            </h1>
          </div>
          <Link
            href="/doctors"
            className="rounded-xl bg-primary px-6 py-4 text-center text-sm font-medium text-white"
          >
            Quick book
          </Link>
        </div>
        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Stat value="2" label="Upcoming appointments" />
          <Stat value="6" label="Health records" />
          <Stat value="1" label="Active care bundle" />
          <Stat value="₦5k" label="Care code available" />
        </section>
        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="card p-6">
            <h2 className="font-serif text-3xl font-medium text-near-black">
              Upcoming appointments
            </h2>
            {[
              ["Today, 4:30 PM", "Dr. Amara Okonkwo", "Video consultation"],
              ["Friday, 9:00 AM", "Nurse Bisi", "Maternal bundle check-in"],
            ].map(([time, doctor, type]) => (
              <div
                className="mt-5 rounded-2xl border border-border bg-surface p-4"
                key={time}
              >
                <p className="font-medium text-near-black">{time}</p>
                <p className="mt-1 text-text-body">{doctor}</p>
                <p className="mt-2 text-sm text-primary">{type}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-5">
            <Link href="/triage" className="card block p-6">
              <Eyebrow>AI triage</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-medium text-near-black">
                Describe symptoms and get routed to the right specialist.
              </h2>
            </Link>
            <div className="card p-6">
              <h2 className="font-serif text-3xl font-medium text-near-black">
                Health record summary
              </h2>
              <p className="mt-3 leading-7 text-text-body">
                Blood group O+, genotype AA, no new chronic alerts, last lab
                upload reviewed by Dr. Sarah Abubakar.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
