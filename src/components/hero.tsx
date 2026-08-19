import { CAMPUS_OPTIONS, SEMESTER_PRICE_DISPLAY, SEMESTER_PRICE_GST_NOTE } from "@/lib/config";

export function Hero() {
  return (
    <section className="px-5 pt-12 pb-8 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Launching at {CAMPUS_OPTIONS[0]}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Real discounts near campus. Not the ones every student already gets.
        </h1>
        <p className="mt-4 text-lg text-muted">
          {SEMESTER_PRICE_DISPLAY} a semester ({SEMESTER_PRICE_GST_NOTE}) gets you 20%+ off at
          venues near {CAMPUS_OPTIONS[0]} — offers you can&rsquo;t get by just flashing a
          student card at the counter.
        </p>
      </div>
    </section>
  );
}
