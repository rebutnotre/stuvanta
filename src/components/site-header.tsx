import Image from "next/image";
import Link from "next/link";
import { BUSINESS_NAME } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt={BUSINESS_NAME}
            width={396}
            height={370}
            priority
            className="h-11 w-auto"
          />
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
