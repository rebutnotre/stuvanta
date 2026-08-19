"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only floating CTA. Shows once the real waitlist form has scrolled
 * out of view, so someone shown the site for five seconds at a stall can
 * join in one tap without hunting for the form.
 */
export function StickyJoinButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("waitlist");
    if (!target) return;

    let throttled = false;
    const checkPosition = () => {
      setVisible(target.getBoundingClientRect().bottom < 0);
      throttled = false;
    };

    const onScroll = () => {
      if (throttled) return;
      throttled = true;
      window.setTimeout(checkPosition, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const scrollToForm = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("email")?.focus();
    }, 400);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-sm sm:hidden">
      <button
        type="button"
        onClick={scrollToForm}
        className="w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-accent-foreground shadow-lg transition hover:opacity-90"
      >
        Join the waitlist
      </button>
    </div>
  );
}
