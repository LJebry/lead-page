"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createLeadAction,
  type CreateLeadState,
} from "@/lib/actions";

const initialState: CreateLeadState = {
  success: false,
  message: "",
};

function inputClass(hasError?: boolean) {
  return `rounded-md border px-3 py-2 outline-none focus:border-slate-900 ${
    hasError ? "border-red-500" : "border-slate-300"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600">{message}</p>;
}

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createLeadAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="grid max-w-2xl gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
      ref={formRef}
    >
      {state.message ? (
        <p
          className={`rounded-md px-4 py-3 text-sm ${
            state.success
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="name">
          Full name
        </label>
        <input
          aria-describedby="name-error"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          className={inputClass(Boolean(state.fieldErrors?.name))}
          id="name"
          name="name"
          placeholder="Jane Doe"
          required
        />
        <FieldError message={state.fieldErrors?.name} />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          aria-describedby="email-error"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          className={inputClass(Boolean(state.fieldErrors?.email))}
          id="email"
          name="email"
          placeholder="jane@example.com"
          required
          type="email"
        />
        <FieldError message={state.fieldErrors?.email} />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="company">
          Company
        </label>
        <input
          className={inputClass()}
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
          aria-describedby="source-error"
          aria-invalid={Boolean(state.fieldErrors?.source)}
          className={inputClass(Boolean(state.fieldErrors?.source))}
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
        <FieldError message={state.fieldErrors?.source} />
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
        className="rounded-md bg-slate-950 px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Submitting..." : "Submit lead"}
      </button>
    </form>
  );
}
