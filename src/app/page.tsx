import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-12 sm:px-8 lg:px-10">
      <section className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Secco Squared take-home
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
          Lead capture page
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Starter page for the public lead form. Wire this form to the server
          action, Supabase insert, and webhook side effect when you are ready.
        </p>
      </section>

      <LeadForm />
    </main>
  );
}
