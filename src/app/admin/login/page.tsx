"use client";

import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "@/app/actions/admin-auth";

const initialState: AdminLoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, initialState);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-5 py-16">
      <form action={formAction} className="w-full max-w-sm rounded-2xl border border-border p-6">
        <h1 className="text-xl font-bold text-foreground">Admin login</h1>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Checking…" : "Log in"}
        </button>
        {state.status === "error" && state.message ? (
          <p className="mt-3 text-sm text-red-600">{state.message}</p>
        ) : null}
      </form>
    </main>
  );
}
