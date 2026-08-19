"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitWaitlist, type WaitlistActionState } from "@/app/actions/waitlist";
import { CAMPUS_OPTIONS, COURSE_YEAR_OPTIONS } from "@/lib/config";

const initialState: WaitlistActionState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-lg border border-border px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(submitWaitlist, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div id="waitlist" className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-foreground">Join the waitlist</h2>
      <p className="mt-1 text-sm text-muted">
        Two minutes. We&rsquo;ll email you the moment membership opens.
      </p>
      <form ref={formRef} action={formAction} className="mt-5 space-y-4">
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
        </div>
        <div>
          <label htmlFor="campus" className="block text-sm font-medium text-foreground">
            Campus
          </label>
          <select
            id="campus"
            name="campus"
            required
            defaultValue={CAMPUS_OPTIONS[0]}
            className={inputClass}
          >
            {CAMPUS_OPTIONS.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="courseYear" className="block text-sm font-medium text-foreground">
            Course year
          </label>
          <select id="courseYear" name="courseYear" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {COURSE_YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
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
