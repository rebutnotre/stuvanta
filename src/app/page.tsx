import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { BreakEven } from "@/components/break-even";
import { SampleVenues } from "@/components/sample-venues";
import { Faq } from "@/components/faq";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <div className="px-5">
          <div className="mx-auto max-w-3xl">
            <WaitlistForm />
          </div>
        </div>
        <BreakEven />
        <SampleVenues />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
