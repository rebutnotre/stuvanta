import Link from "next/link";
import { BUSINESS_NAME } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-warm text-sm font-bold text-white"
          >
            S
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            {BUSINESS_NAME}
          </span>
        </Link>
        <Link
          href="/venues"
          className="text-sm font-medium text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          Own a venue?
        </Link>
      </div>
    </header>
  );
}
