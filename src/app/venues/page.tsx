import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VenueLeadForm } from "@/components/venue-lead-form";
import { MIN_DISCOUNT_PERCENT, SEMESTER_PRICE_DISPLAY } from "@/lib/config";

export const metadata: Metadata = {
  title: "Own a venue near campus? — Stuvanta",
  description: "List an exclusive student discount and reach members near campus, free.",
};

export default function VenuesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-5 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Reach students near campus. It costs nothing.
          </h1>
          <p className="mt-3 text-lg text-muted">
            Every {SEMESTER_PRICE_DISPLAY}-a-semester member gets a card that only works at
            venues offering a genuine, members-only discount — {MIN_DISCOUNT_PERCENT}% minimum,
            not something available to any walk-in student. You set the offer and the hours it
            applies. We bring the members.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground">Register your interest</h2>
            <p className="mt-1 text-sm text-muted">
              We&rsquo;ll follow up by email — no commitment yet.
            </p>
            <VenueLeadForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
