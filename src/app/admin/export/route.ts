import { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { toCsv } from "@/lib/csv";

// Reachable only through src/proxy.ts, which gates every /admin/* path
// behind the signed admin session cookie.
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const supabase = getSupabaseAdminClient();

  if (type === "waitlist") {
    const { data, error } = await supabase
      .from("waitlist_signups")
      .select("email, education_level, year_level, is_edu_au, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    const csv = toCsv(
      ["email", "education_level", "year_level", "is_edu_au", "created_at"],
      (data ?? []).map((row) => [
        row.email,
        row.education_level,
        row.year_level,
        row.is_edu_au,
        row.created_at,
      ]),
    );

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="stuvanta-waitlist.csv"`,
      },
    });
  }

  if (type === "venues") {
    const { data, error } = await supabase
      .from("venue_leads")
      .select(
        "business_name, contact_name, contact_email, contact_phone, suburb, category, discount_considered, created_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    const csv = toCsv(
      [
        "business_name",
        "contact_name",
        "contact_email",
        "contact_phone",
        "suburb",
        "category",
        "discount_considered",
        "created_at",
      ],
      (data ?? []).map((row) => [
        row.business_name,
        row.contact_name,
        row.contact_email,
        row.contact_phone,
        row.suburb,
        row.category,
        row.discount_considered,
        row.created_at,
      ]),
    );

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="stuvanta-venue-leads.csv"`,
      },
    });
  }

  return new Response("Unknown export type. Use ?type=waitlist or ?type=venues.", {
    status: 400,
  });
}
