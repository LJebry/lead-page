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

const highlights = [
  "Fast response from our team",
  "No spam or unnecessary follow-up",
  "Server-side processing for every lead",
];

function inputClass(hasError?: boolean) {
  return `mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 ${
    hasError ? "border-red-500" : "border-slate-300"
  }`;
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-red-600" id={id}>
      {message}
    </p>
  );
}

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white"
    >
      ✓
    </span>
  );
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
      className="w-full sm:mx-auto sm:max-w-7xl"
      noValidate
      ref={formRef}
    >
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Lead capture</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Tell us how to reach you
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {state.message ? (
              <p
                className={`mb-6 rounded-md px-4 py-3 text-sm ${
                  state.success
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {state.message}
              </p>
            ) : null}

            <div className="space-y-5 md:space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    className="text-sm font-medium text-slate-800"
                    htmlFor="name"
                  >
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
                  <FieldError
                    id="name-error"
                    message={state.fieldErrors?.name}
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-slate-800"
                    htmlFor="email"
                  >
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
                  <FieldError
                    id="email-error"
                    message={state.fieldErrors?.email}
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-sm font-medium text-slate-800"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className={inputClass()}
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-slate-800"
                  htmlFor="source"
                >
                  How did you hear about us?
                </label>
                <select
                  aria-describedby="source-error"
                  aria-invalid={Boolean(state.fieldErrors?.source)}
                  className={inputClass(Boolean(state.fieldErrors?.source))}
                  defaultValue=""
                  id="source"
                  name="source"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Google">Google</option>
                  <option value="Referral">Referral</option>
                  <option value="Social">Social</option>
                  <option value="Other">Other</option>
                </select>
                <FieldError
                  id="source-error"
                  message={state.fieldErrors?.source}
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-slate-800"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
                  id="message"
                  name="message"
                  placeholder="Optional note"
                />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-950">
                What happens next
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your details are saved securely, then forwarded to our intake
                workflow so the right person can follow up.
              </p>

              <ul className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <li
                    className="flex items-start gap-3 text-sm text-slate-800"
                    key={item}
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="my-8 h-px bg-slate-200" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            className="rounded-md px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            onClick={() => formRef.current?.reset()}
            type="button"
          >
            Clear
          </button>
          <button
            className="rounded-md bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit lead"}
          </button>
        </div>
    </form>
  );
}
