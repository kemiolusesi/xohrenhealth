import { Eyebrow, PageShell, Stat } from "../../components";

export default function DoctorDashboard() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Eyebrow>Doctor dashboard</Eyebrow>
        <h1 className="mt-3 font-serif text-5xl font-medium text-near-black">
          Today&apos;s care room.
        </h1>
        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Stat value="7" label="Consultations today" />
          <Stat value="3" label="Pending notes" />
          <Stat value="₦186k" label="Earnings this week" />
          <Stat value="4.9" label="Average rating" />
        </section>
        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <h2 className="font-serif text-3xl font-medium text-near-black">
              Schedule
            </h2>
            {[
              ["9:30 AM", "Follow-up", "Diabetes medication review"],
              ["11:00 AM", "New patient", "Hypertension assessment"],
              ["4:30 PM", "Maternal", "Third trimester check-in"],
            ].map(([time, type, note]) => (
              <div className="mt-5 rounded-2xl border border-border bg-surface p-4" key={time}>
                <p className="font-medium text-near-black">{time} · {type}</p>
                <p className="mt-2 text-text-body">{note}</p>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <Eyebrow>Care code</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-medium text-near-black">
              Generate a return-care discount.
            </h2>
            <p className="mt-3 leading-7 text-text-body">
              Create a code for a patient&apos;s next consultation after a
              completed visit.
            </p>
            <button className="mt-6 rounded-xl bg-gold px-5 py-4 text-sm font-medium text-white">
              Generate care code
            </button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
