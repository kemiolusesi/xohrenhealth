import { notFound } from "next/navigation";
import { doctors } from "../../data";
import { Eyebrow, FormField, PageShell, SelectField } from "../../components";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;
  const doctor = doctors.find((item) => item.id === doctorId);

  if (!doctor) {
    notFound();
  }

  return (
    <PageShell>
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Eyebrow>Booking flow</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-tight text-near-black">
            Book {doctor.name}.
          </h1>
          <p className="mt-5 max-w-xl leading-8 text-text-body">
            Select date, slot, consultation type, enter a care code if
            available, then continue to Paystack checkout.
          </p>
          <div className="card mt-8 p-6">
            <h2 className="font-serif text-3xl font-medium text-near-black">
              Summary
            </h2>
            <p className="mt-3 text-text-body">{doctor.specialty}</p>
            <p className="mt-3 font-serif text-3xl font-medium text-near-black">
              {doctor.fee30}
            </p>
          </div>
        </section>
        <form className="card grid gap-5 p-6">
          <FormField label="Select date" placeholder="2026-08-12" type="date" />
          <SelectField label="Select slot" options={["4:30 PM", "6:00 PM", "Tomorrow 10:00 AM"]} />
          <SelectField label="Consultation type" options={["Video", "Voice", "Chat"]} />
          <FormField label="Care code" placeholder="Optional code" />
          <button className="rounded-xl bg-primary px-5 py-4 text-sm font-medium text-white">
            Pay with Paystack
          </button>
          <p className="rounded-2xl bg-gold-light p-4 text-sm leading-6 text-text-body">
            Paystack initializes with NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY when
            credentials are added.
          </p>
        </form>
      </main>
    </PageShell>
  );
}
