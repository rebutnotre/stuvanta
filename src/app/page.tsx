import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { BreakEven } from "@/components/break-even";
import { SampleVenues } from "@/components/sample-venues";
import { Faq } from "@/components/faq";
import { WaitlistForm } from "@/components/waitlist-form";
import { SignupCounter } from "@/components/signup-counter";
import { StickyJoinButton } from "@/components/sticky-join-button";

// Without this, Next prerenders the page once at build time and the
// "live" signup count would only change on the next deploy. Revalidating
// every 5 minutes keeps it fresh without rendering on every request.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pb-20 sm:pb-0">
        <Hero />
        <div className="px-5">
          <div className="mx-auto max-w-3xl text-center">
            <Suspense fallback={null}>
              <SignupCounter />
            </Suspense>
          </div>
          <div className="mx-auto max-w-3xl">
            <WaitlistForm />
          </div>
        </div>
        <BreakEven />
        <SampleVenues />
        <Faq />
      </main>
      <SiteFooter />
      <StickyJoinButton />
    </>
  );
}
