"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitWaitlist, type WaitlistActionState } from "@/app/actions/waitlist";
import { EDUCATION_LEVEL_OPTIONS, yearOptionsFor } from "@/lib/config";

const initialState: WaitlistActionState = { status: "idle" };
const DEFAULT_EDUCATION_LEVEL = "University";

const inputClass =
  "mt-1 w-full rounded-lg border border-border px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(submitWaitlist, initialState);
  const [educationLevel, setEducationLevel] = useState<string>(DEFAULT_EDUCATION_LEVEL);

  // Reset to a fresh form instance after a successful submission. Adjusting
  // state during render (guarded against loops) rather than in a useEffect,
  // per https://react.dev/learn/you-might-not-need-an-effect — avoids an
  // extra post-commit render just to clear the form.
  const [prevStatus, setPrevStatus] = useState(state.status);
  const [formInstanceKey, setFormInstanceKey] = useState(0);
  if (state.status !== prevStatus) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setFormInstanceKey((key) => key + 1);
      setEducationLevel(DEFAULT_EDUCATION_LEVEL);
    }
  }

  const yearOptions = yearOptionsFor(educationLevel);

  return (
    <div
      id="waitlist"
      className="rounded-2xl border border-border bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
    >
      <h2 className="font-heading text-xl font-bold text-foreground">Join the waitlist</h2>
      <p className="mt-1 text-sm text-muted">
        Two minutes. We&rsquo;ll email you the moment membership opens.
      </p>
      <form key={formInstanceKey} action={formAction} className="mt-5 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@student.unimelb.edu.au"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted">
            We&rsquo;ll only email you about launch — see our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="educationLevel" className="block text-sm font-medium text-foreground">
              Level of education
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              required
              defaultValue={DEFAULT_EDUCATION_LEVEL}
              onChange={(e) => setEducationLevel(e.target.value)}
              className={inputClass}
            >
              {EDUCATION_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="yearLevel" className="block text-sm font-medium text-foreground">
              Year level
            </label>
            <select
              id="yearLevel"
              name="yearLevel"
              required
              defaultValue=""
              key={educationLevel}
              className={inputClass}
            >
              <option value="" disabled>
                Choose one
              </option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Joining…" : "Join the waitlist"}
        </button>
        {state.status !== "idle" && state.message ? (
          <p
            role="status"
            className={`text-sm ${state.status === "success" ? "text-accent" : "text-red-600"}`}
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
