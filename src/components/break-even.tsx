import { MIN_DISCOUNT_PERCENT, SEMESTER_PRICE_DISPLAY } from "@/lib/config";

export function BreakEven() {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground">The maths</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-extrabold text-accent">{SEMESTER_PRICE_DISPLAY}</p>
            <p className="mt-1 text-sm text-muted">Membership, one semester</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-accent">{MIN_DISCOUNT_PERCENT}%+</p>
            <p className="mt-1 text-sm text-muted">Minimum discount, every venue</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-accent">2 dinners</p>
            <p className="mt-1 text-sm text-muted">And it&rsquo;s paid for itself</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted">
          Example: spend $35 on a meal at a member venue, save $7 with a 20% discount. Do that
          twice in the semester and you&rsquo;ve already saved more than membership cost —
          everything after that is money back in your pocket.
        </p>
      </div>
    </section>
  );
}
