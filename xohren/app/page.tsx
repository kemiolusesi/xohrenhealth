import Link from "next/link";
import { bundles, specialties } from "./data";
import { Eyebrow, Footer, Stat } from "./components";
import Hero from "./hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <main>
        <Hero />

        <section id="how" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Eyebrow>How it works</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Tell us what you need", "Use AI triage, WhatsApp, SMS, USSD, or the app to start care."],
              ["Match with a specialist", "Filter by specialty, language, availability, price, or bundle."],
              ["Continue your plan", "Book visits, store records, use care codes, and track long-term needs."],
            ].map(([title, body], index) => (
              <article className="card p-6" key={title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-sm font-medium text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-medium text-near-black">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-text-body">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Specialties</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-medium text-near-black">
              Care for everyday questions and long-term conditions.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.map((specialty) => (
              <div className="card p-5 font-medium text-near-black" key={specialty}>
                {specialty}
              </div>
            ))}
          </div>
        </section>

        <section id="care-plans" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Eyebrow>Care bundles</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {bundles.map(([title, body]) => (
              <article className="card p-6" key={title}>
                <h3 className="font-serif text-2xl font-medium text-near-black">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-body">{body}</p>
                <Link
                  href="/doctors"
                  className="mt-5 inline-block rounded-xl bg-gold px-4 py-3 text-sm font-medium text-white"
                >
                  Explore plan
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <Stat value="28" label="Doctors online" />
          <Stat value="42k+" label="Consultations completed" />
          <Stat value="5" label="Languages supported" />
          <Stat value="36 + FCT" label="Nigerian states covered" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
