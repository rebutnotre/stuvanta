import Link from "next/link";
import { BUSINESS_NAME, CONTACT_EMAIL } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {BUSINESS_NAME}. Independent student project — not
          affiliated with or endorsed by any university.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="underline-offset-4 hover:text-accent hover:underline">
            Privacy
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline-offset-4 hover:text-accent hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
