import Link from "next/link";
import { Eyebrow, FormField, PageShell, SelectField } from "../../components";

export default function PatientAuth() {
  return (
    <PageShell>
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Eyebrow>Patient access</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight text-near-black">
            Sign in with your phone number.
          </h1>
          <p className="mt-5 max-w-xl leading-8 text-text-body">
            Xohren uses phone number and OTP access so patients can reach care
            through the app, WhatsApp, SMS, or USSD without remembering a
            password.
          </p>
        </section>
        <form className="card grid gap-5 p-6">
          <FormField label="Phone number" placeholder="+234 801 234 5678" />
          <SelectField
            label="Preferred language"
            options={["English", "Hausa", "Yoruba", "Igbo", "Pidgin"]}
          />
          <button className="rounded-xl bg-primary px-5 py-4 text-sm font-medium text-white">
            Send OTP
          </button>
          <div className="rounded-2xl bg-primary-light p-4 text-sm leading-6 text-text-body">
            OTP verification will connect to Supabase Auth when your project
            keys are added.
          </div>
          <Link className="text-sm font-medium text-primary" href="/dashboard/patient">
            Preview patient dashboard
          </Link>
        </form>
      </main>
    </PageShell>
  );
}
