import {
  CAMPUS_OPTIONS,
  MIN_DISCOUNT_PERCENT,
  SEMESTER_PRICE_DISPLAY,
  SEMESTER_PRICE_GST_NOTE,
} from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-8 sm:pt-16">
      {/* Decorative background only — no images, no animation, purely CSS. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent-warm/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Launching at {CAMPUS_OPTIONS[0]}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Real discounts near campus. Not the ones every student already gets.
        </h1>
        <p className="mt-4 text-lg text-muted">
          {SEMESTER_PRICE_DISPLAY} a semester ({SEMESTER_PRICE_GST_NOTE}) gets you{" "}
          {MIN_DISCOUNT_PERCENT}%+ off at venues near {CAMPUS_OPTIONS[0]} — offers you
          can&rsquo;t get by just flashing a student card at the counter.
        </p>
      </div>
    </section>
  );
}
