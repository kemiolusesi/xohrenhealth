import { Eyebrow, PageShell, Stat } from "../../components";

export default function AdminDashboard() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Eyebrow>Admin dashboard</Eyebrow>
        <h1 className="mt-3 font-serif text-5xl font-medium text-near-black">
          Platform operations.
        </h1>
        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Stat value="14" label="Doctors pending approval" />
          <Stat value="21k" label="Registered patients" />
          <Stat value="96%" label="Consultations completed" />
          <Stat value="₦8.7m" label="Monthly GMV" />
        </section>
        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="card p-6">
            <h2 className="font-serif text-3xl font-medium text-near-black">
              Doctor approval queue
            </h2>
            {["Dr. Chidi Nnamdi", "Dr. Halima Yusuf", "Dr. Eniola George"].map((doctor) => (
              <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center" key={doctor}>
                <div>
                  <p className="font-medium text-near-black">{doctor}</p>
                  <p className="mt-1 text-sm text-text-body">License PDF uploaded · awaiting review</p>
                </div>
                <button className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white">
                  Review
                </button>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <h2 className="font-serif text-3xl font-medium text-near-black">
              Platform analytics
            </h2>
            <div className="mt-6 grid gap-4">
              {[
                ["Top specialty", "General Practice"],
                ["Fastest growing channel", "WhatsApp"],
                ["Highest demand state", "Lagos"],
                ["Most used language", "English"],
              ].map(([label, value]) => (
                <div className="flex justify-between rounded-2xl bg-surface p-4" key={label}>
                  <span className="text-text-body">{label}</span>
                  <span className="font-medium text-near-black">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
