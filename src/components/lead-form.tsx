"use client";

export function LeadForm() {
  return (
    <form className="grid max-w-2xl gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="name">
          Full name
        </label>
        <input
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          id="name"
          name="name"
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          id="email"
          name="email"
          placeholder="jane@example.com"
          required
          type="email"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="company">
          Company
        </label>
        <input
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          id="company"
          name="company"
          placeholder="Acme Inc."
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="source">
          How did you hear about us?
        </label>
        <select
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          id="source"
          name="source"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="Google">Google</option>
          <option value="Referral">Referral</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="message">
          Message
        </label>
        <textarea
          className="min-h-28 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          id="message"
          name="message"
          placeholder="Optional note"
        />
      </div>

      <button
        className="rounded-md bg-slate-950 px-4 py-2.5 font-medium text-white"
        type="button"
      >
        TODO: connect submit action
      </button>
    </form>
  );
}
