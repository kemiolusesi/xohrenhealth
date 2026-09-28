import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors } from "../../data";
import { Eyebrow, PageShell } from "../../components";

export default async function DoctorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((item) => item.id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <PageShell>
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="card h-fit p-6">
          <div className="grid h-28 w-28 place-items-center rounded-2xl bg-primary-light font-serif text-5xl font-medium text-primary">
            {doctor.name.split(" ")[1][0]}
          </div>
          <h1 className="mt-6 font-serif text-4xl font-medium text-near-black">
            {doctor.name}
          </h1>
          <p className="mt-2 text-text-body">{doctor.specialty}</p>
          <p className="mt-4 rounded-xl bg-green-light px-4 py-3 text-sm font-medium text-health-green">
            Verified · Available {doctor.next}
          </p>
          <Link
            href={`/book/${doctor.id}`}
            className="mt-6 block rounded-xl bg-primary px-5 py-4 text-center text-sm font-medium text-white"
          >
            Book consultation
          </Link>
        </aside>
        <section className="grid gap-5">
          <div className="card p-6">
            <Eyebrow>Doctor profile</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl font-medium text-near-black">
              Calm, accessible care in your preferred language.
            </h2>
            <p className="mt-5 leading-8 text-text-body">{doctor.bio}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-serif text-3xl font-medium text-near-black">
                Languages
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <span className="rounded-xl bg-primary-light px-3 py-2 text-sm font-medium text-primary" key={language}>
                    {language}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-serif text-3xl font-medium text-near-black">
                Fees
              </h3>
              <p className="mt-4 font-serif text-3xl font-medium text-near-black">
                {doctor.fee30} / 30 min
              </p>
              <p className="mt-2 text-text-body">{doctor.fee60} / 60 min</p>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-serif text-3xl font-medium text-near-black">
              Available slots
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Today 4:30 PM", "Tomorrow 10:00 AM", "Friday 2:00 PM"].map((slot) => (
                <span className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium" key={slot}>
                  {slot}
                </span>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-serif text-3xl font-medium text-near-black">
              Patient reviews
            </h3>
            <p className="mt-4 font-accent text-2xl text-gold">
              Gentle, practical, and easy to understand.
            </p>
            <p className="mt-3 text-text-body">Reviewed after a completed video consultation.</p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
