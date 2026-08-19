import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings use Sora — a bolder, more geometric font than the body copy, so
// the site reads as designed rather than a bare Tailwind default.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  // Needed to resolve absolute URLs for the auto-generated og:image/
  // twitter:image tags (from src/app/opengraph-image.png) — without it,
  // Next.js falls back to localhost in production.
  metadataBase: new URL(SITE_URL),
  title: "Stuvanta — Student discounts near University of Melbourne",
  description:
    "One membership, real discounts at venues near campus. Join the waitlist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
