"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_MAX_AGE_SECONDS,
  ADMIN_COOKIE_NAME,
  createAdminSessionValue,
} from "@/lib/admin-session";

export type AdminLoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { status: "error", message: "Admin password is not configured on the server." };
  }
  if (typeof password !== "string" || password !== expected) {
    return { status: "error", message: "Incorrect password." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });

  redirect("/admin");
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
