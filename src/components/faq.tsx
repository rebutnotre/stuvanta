import { CAMPUS_OPTIONS, MIN_DISCOUNT_PERCENT, SEMESTER_PRICE_DISPLAY } from "@/lib/config";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How is this different from just showing my student ID?",
    answer: `Every offer we list has to be exclusive to members — at least ${MIN_DISCOUNT_PERCENT}% off, and not something any walk-in student can already get. If a "student discount" is available to anyone with a student card, we won't list it.`,
  },
  {
    question: "Do I need a university email to join?",
    answer:
      "You can join the waitlist with any email. We'll ask for your .edu.au address to verify you're a current student before membership goes live.",
  },
  {
    question: "Is this run by the university?",
    answer: `No — ${CAMPUS_OPTIONS[0].split(" (")[0]} isn't involved. This is an independent, student-run project.`,
  },
  {
    question: "When does membership actually start?",
    answer:
      "We're validating demand and signing up venues first. Everyone on the waitlist gets an email the moment paid membership goes live.",
  },
  {
    question: `Why ${SEMESTER_PRICE_DISPLAY}?`,
    answer:
      "It's priced to pay for itself in one or two visits to a member venue, per semester. Venues pay us nothing, so the membership fee is the whole business.",
  },
];

export function Faq() {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <dl className="mt-5 divide-y divide-border">
          {FAQS.map((faq) => (
            <div key={faq.question} className="py-4">
              <dt className="font-semibold text-foreground">{faq.question}</dt>
              <dd className="mt-1 text-sm text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
