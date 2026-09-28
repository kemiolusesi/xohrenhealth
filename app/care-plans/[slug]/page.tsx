import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Header } from "../../components";
import { carePlans, getCarePlan } from "../../../lib/care-plans";
import { CarePlanIcon } from "../../care-plan-icon";

const teamIcons = ["stethoscope", "leaf", "heart", "sparkles"];

export function generateStaticParams() {
  return carePlans.map(({ slug }) => ({ slug }));
}

export default function CarePlanPage({ params }: { params: { slug: string } }) {
  const plan = getCarePlan(params.slug);
  if (!plan) notFound();

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <section className="bg-primary-wash">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <span className="inline-flex rounded-xl bg-gold-light px-3 py-2 text-sm font-medium text-gold">{plan.condition}</span>
              <div className="mt-6"><CarePlanIcon maternal={plan.slug === "maternal-bundle"} name={plan.icon as "Baby"} size="hero" /></div>
              <h1 className="mt-5 font-serif text-4xl font-medium text-near-black sm:text-5xl">{plan.name}</h1>
              <p className="mt-4 font-accent text-2xl text-primary">{plan.tagline}</p>
              <p className="mt-6 max-w-2xl leading-8 text-text-body">{plan.heroDescription}</p>
              {plan.durationNote && <p className="mt-5 max-w-2xl rounded-xl border border-gold/30 bg-gold-light px-4 py-3 text-sm leading-6 text-text-body"><span className="font-medium text-gold">Plan duration: </span>{plan.durationNote}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a className="rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white" href="#pricing">Choose your plan</a>
                <Link className="text-sm font-medium text-primary" href="/triage">Talk to us first</Link>
              </div>
            </div>
            <div className="grid content-center gap-3 sm:grid-cols-2">
              {plan.team.map((member, index) => (
                <article className="card flex min-h-28 flex-col justify-between p-5" key={member}>
                  <span className="text-lg text-primary" aria-hidden="true">{teamIcons[index] ?? "plus"}</span>
                  <p className="mt-5 font-medium text-near-black">{member}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-medium text-near-black">Choose the plan that works for you.</h2>
          <p className="mt-4 max-w-xl leading-7 text-text-body">All plans include the same care quality. Longer plans simply cost less per month.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plan.pricingTiers.map((tier) => (
              <article className={`card relative p-7 ${tier.popular ? "border-gold shadow-md" : ""}`} key={tier.label}>
                {tier.popular && <span className="absolute right-5 top-5 rounded-xl bg-gold-light px-3 py-1.5 text-xs font-medium text-gold">Most popular</span>}
                <h3 className="font-serif text-3xl font-medium text-near-black">{tier.label}</h3>
                <p className="mt-2 text-sm text-text-muted">{tier.duration}</p>
                <p className="mt-5 font-serif text-4xl font-medium text-near-black">{tier.price}</p>
                {plan.durationNote && <p className="mt-2 text-xs font-medium text-health-green">Includes full pregnancy + 1 month postpartum</p>}
                {tier.discount && <span className="mt-3 inline-block rounded-xl bg-green-light px-3 py-1.5 text-xs font-medium text-health-green">{tier.discount}</span>}
                <div className="my-6 border-t border-border" />
                <p className="text-sm font-medium text-near-black">Includes everything:</p>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-text-body">
                  {plan.features.slice(0, 6).map((feature) => <li className="flex gap-2" key={feature}><span className="text-health-green">✓</span>{feature}</li>)}
                </ul>
                <Link className={`mt-7 block rounded-xl px-5 py-3 text-center text-sm font-medium ${tier.popular ? "bg-primary text-white" : "border border-primary text-primary"}`} href="/auth/patient">Get started</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Eyebrow>Your journey</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-medium text-near-black">Here is exactly what happens when you join.</h2>
            <div className="mt-12 grid gap-6">
              {plan.howItWorks.map((item, index) => (
                <article className="grid items-center gap-7 md:grid-cols-2" key={item.step}>
                  <div className={`min-h-44 rounded-2xl ${index % 2 ? "bg-gold-light md:order-2" : "bg-primary-light"}`} />
                  <div className={index % 2 ? "md:order-1" : ""}>
                    <p className="font-serif text-5xl text-gold">{item.step}</p>
                    <h3 className="mt-3 font-serif text-2xl font-medium text-near-black">{item.title}</h3>
                    <p className="mt-3 max-w-lg leading-7 text-text-body">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Eyebrow>Why it works</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-medium text-near-black">What you actually get from this plan.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {plan.benefits.map((benefit) => <article className="card p-7" key={benefit.title}><h3 className="font-serif text-2xl font-medium text-near-black">{benefit.title}</h3><p className="mt-3 leading-7 text-text-body">{benefit.description}</p></article>)}
          </div>
        </section>

        <section className="bg-primary-light py-16 text-center">
          <div className="mx-auto max-w-3xl px-5 sm:px-8"><Eyebrow>Is this right for you?</Eyebrow><h2 className="mt-4 font-serif text-4xl font-medium text-near-black">This plan is built for people like you.</h2><p className="mt-5 leading-8 text-text-body">{plan.whoIsThisFor}</p></div>
        </section>

        {plan.emergencyNote && <section className="bg-emergency-light py-9"><div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-5 sm:flex-row sm:items-center sm:px-8"><span className="text-3xl">SOS</span><p className="flex-1 leading-7 text-emergency">{plan.emergencyNote}</p><Link className="rounded-xl bg-emergency px-5 py-3 text-sm font-medium text-white" href="/triage">Activate SOS</Link></div></section>}

        <section className="bg-near-black py-20 text-center"><div className="mx-auto max-w-3xl px-5 sm:px-8"><h2 className="font-serif text-4xl font-medium text-white">Ready to start your {plan.name} journey?</h2><p className="mt-4 font-accent text-2xl text-primary">{plan.tagline}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a className="rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white" href="#pricing">Choose your plan -&gt;</a><Link className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-medium text-white" href="/triage">Ask a question</Link></div></div></section>
      </main>
    </div>
  );
}
