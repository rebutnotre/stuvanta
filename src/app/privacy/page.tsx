import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy policy — ${BUSINESS_NAME}`,
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-5 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
            Privacy policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: this is a pre-launch waitlist stage.</p>

          <div className="prose-sm mt-6 space-y-5 text-foreground [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_p]:mt-2 [&_p]:text-sm [&_p]:text-muted [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:text-muted">
            <section>
              <h2>What we collect</h2>
              <p>
                If you join the student waitlist: your email address, campus, and course year.
              </p>
              <p>
                If you register venue interest: your business name, contact name, email, phone
                (optional), suburb, category, and the discount you&rsquo;re considering.
              </p>
              <p>We don&rsquo;t collect payment details in this pre-launch stage.</p>
            </section>

            <section>
              <h2>Why we collect it</h2>
              <p>
                To let you know when {BUSINESS_NAME} launches, to validate demand near campus
                before we build the paid product, and to follow up with venues who&rsquo;ve
                registered interest.
              </p>
            </section>

            <section>
              <h2>Who we share it with</h2>
              <ul>
                <li>Supabase — stores the data securely.</li>
                <li>Resend — sends the confirmation email you receive after signing up.</li>
              </ul>
              <p>We don&rsquo;t sell your data or share it with advertisers.</p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                Under the Privacy Act 1988 (Cth), you can ask us what we hold about you, ask us to
                correct it, or ask us to delete it. Email {CONTACT_EMAIL} and we&rsquo;ll action it.
              </p>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                The public site doesn&rsquo;t use tracking or advertising cookies. Our admin login
                sets one functional cookie to keep the two of us signed in.
              </p>
            </section>

            <section>
              <h2>Questions</h2>
              <p>
                Email {CONTACT_EMAIL}. This policy will be expanded when paid membership launches.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
