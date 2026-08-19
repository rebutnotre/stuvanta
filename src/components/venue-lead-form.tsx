"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitVenueLead, type VenueActionState } from "@/app/actions/venue";
import { MIN_DISCOUNT_PERCENT, VENUE_CATEGORY_OPTIONS } from "@/lib/config";

const initialState: VenueActionState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-lg border border-border px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const labelClass = "block text-sm font-medium text-foreground";

export function VenueLeadForm() {
  const [state, formAction, isPending] = useActionState(submitVenueLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business name
        </label>
        <input id="businessName" name="businessName" type="text" required className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Your name
          </label>
          <input id="contactName" name="contactName" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="contactPhone" className={labelClass}>
            Phone (optional)
          </label>
          <input id="contactPhone" name="contactPhone" type="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="contactEmail" className={labelClass}>
          Email
        </label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="suburb" className={labelClass}>
            Suburb
          </label>
          <input id="suburb" name="suburb" type="text" required placeholder="Parkville" className={inputClass} />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select id="category" name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {VENUE_CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="discountConsidered" className={labelClass}>
          What discount would you consider offering members? (must be exclusive,{" "}
          {MIN_DISCOUNT_PERCENT}% minimum)
        </label>
        <textarea
          id="discountConsidered"
          name="discountConsidered"
          required
          rows={3}
          placeholder={`e.g. ${MIN_DISCOUNT_PERCENT}% off dine-in, Sunday–Thursday`}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending…" : "Register interest"}
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
  );
}
