import { SAMPLE_VENUES } from "@/lib/sample-venues";

export function SampleVenues() {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">What it&rsquo;ll look like</h2>
          <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-accent">
            Example venues — not signed up yet
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">
          We&rsquo;re signing up real venues near campus before launch. These are placeholders so
          you can see the kind of offer to expect.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {SAMPLE_VENUES.map((venue) => (
            <li key={venue.name} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-foreground">{venue.name}</p>
                <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  {venue.discountPercent}% off
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                {venue.category} · {venue.suburb}
              </p>
              <p className="mt-2 text-sm text-foreground">{venue.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
