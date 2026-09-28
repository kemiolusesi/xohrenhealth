import Link from "next/link";
import { Header, Eyebrow } from "../components";
import { carePlans } from "../../lib/care-plans";
import { CarePlanIcon } from "../care-plan-icon";

export default function CarePlansPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <section className="border-b border-border bg-primary-wash">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
            <Eyebrow>Care plans</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-near-black sm:text-5xl">
              Care that goes beyond the consultation.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-text-body">
              Whether you are managing a condition, supporting a pregnancy, or simply choosing to stay ahead - there is a Xohren plan built for exactly where you are.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          {carePlans.filter((plan) => plan.slug === "general-wellness").map((plan) => (
            <article className="mb-8 grid gap-6 rounded-2xl border border-primary bg-primary-light p-6 md:grid-cols-[auto_1fr_auto] md:items-center" key={plan.slug}>
              <CarePlanIcon maternal={false} name={plan.icon as "HeartPulse"} size="hero" />
              <div><Eyebrow>Start here if you are new to Xohren</Eyebrow><h2 className="mt-2 font-serif text-3xl font-medium text-near-black">{plan.name}</h2><p className="mt-2 font-accent text-xl text-primary">{plan.tagline}</p></div>
              <Link className="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white" href={`/care-plans/${plan.slug}`}>Explore plan</Link>
            </article>
          ))}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {carePlans.filter((plan) => plan.slug !== "general-wellness").map((plan) => (
              <article className="card flex min-h-[278px] flex-col p-7" key={plan.slug}>
                <CarePlanIcon maternal={plan.slug === "maternal-bundle"} name={plan.icon as "Baby"} />
                <span className="mt-5 w-fit rounded-xl bg-gold-light px-3 py-1.5 text-xs font-medium text-gold">
                  {plan.condition}
                </span>
                <h2 className="mt-4 font-serif text-3xl font-medium text-near-black">{plan.name}</h2>
                <p className="mt-2 font-accent text-xl text-primary">{plan.tagline}</p>
                <Link className="mt-auto pt-6 text-sm font-medium text-primary" href={`/care-plans/${plan.slug}`}>
                  View plan -&gt;
                </Link>
              </article>
            ))}
            <article className="card flex min-h-[278px] flex-col p-7">
              <CarePlanIcon name="Ruler" />
              <span className="mt-5 w-fit rounded-xl bg-gold-light px-3 py-1.5 text-xs font-medium text-gold">Free assessment tool</span>
              <h2 className="mt-4 font-serif text-3xl font-medium text-near-black">Child Nutrition Check</h2>
              <p className="mt-2 font-accent text-xl text-primary">Know what your child needs next.</p>
              <Link className="mt-auto pt-6 text-sm font-medium text-primary" href="/child-nutrition">Start free check -&gt;</Link>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
