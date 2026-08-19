import { MIN_DISCOUNT_PERCENT, SEMESTER_PRICE_DISPLAY } from "@/lib/config";

export function BreakEven() {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">The maths</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="font-heading text-3xl font-extrabold text-accent">
              {SEMESTER_PRICE_DISPLAY}
            </p>
            <p className="mt-1 text-sm text-muted">Membership, one semester</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-extrabold text-accent-3">
              {MIN_DISCOUNT_PERCENT}%+
            </p>
            <p className="mt-1 text-sm text-muted">Minimum discount, every venue</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-extrabold text-accent">Within weeks</p>
            <p className="mt-1 text-sm text-muted">And it&rsquo;s paid for itself</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted">
          Example: it&rsquo;s not one big purchase that pays for it — it&rsquo;s the coffee runs
          that quietly add up plus the odd meal out or drink with mates, all at{" "}
          {MIN_DISCOUNT_PERCENT}%+ off. Even just grabbing coffee at a member cafe a couple of
          times a week covers the $15 membership within weeks — everything else you save all
          semester is money back in your pocket.
        </p>
      </div>
    </section>
  );
}
