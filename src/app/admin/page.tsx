import { getSupabaseAdminClient } from "@/lib/supabase";
import { adminLogout } from "@/app/actions/admin-auth";

export const dynamic = "force-dynamic";

type WaitlistRow = {
  id: string;
  email: string;
  campus: string;
  course_year: string;
  is_edu_au: boolean;
  created_at: string;
};

type VenueLeadRow = {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  suburb: string;
  category: string;
  discount_considered: string;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = getSupabaseAdminClient();

  const [waitlistRes, venuesRes] = await Promise.all([
    supabase
      .from("waitlist_signups")
      .select("id, email, campus, course_year, is_edu_au, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("venue_leads")
      .select(
        "id, business_name, contact_name, contact_email, contact_phone, suburb, category, discount_considered, created_at",
      )
      .order("created_at", { ascending: false }),
  ]);

  const waitlist = (waitlistRes.data ?? []) as WaitlistRow[];
  const venues = (venuesRes.data ?? []) as VenueLeadRow[];

  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">Admin</h1>
          <form action={adminLogout}>
            <button type="submit" className="text-sm font-medium text-muted underline-offset-4 hover:underline">
              Log out
            </button>
          </form>
        </div>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">
              Student waitlist ({waitlist.length})
            </h2>
            <a
              href="/admin/export?type=waitlist"
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Export CSV
            </a>
          </div>
          {waitlistRes.error ? (
            <p className="mt-3 text-sm text-red-600">Failed to load: {waitlistRes.error.message}</p>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase text-muted">
                  <tr>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">.edu.au?</th>
                    <th className="px-3 py-2">Campus</th>
                    <th className="px-3 py-2">Course year</th>
                    <th className="px-3 py-2">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {waitlist.map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{row.email}</td>
                      <td className="px-3 py-2">{row.is_edu_au ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{row.campus}</td>
                      <td className="px-3 py-2">{row.course_year}</td>
                      <td className="px-3 py-2">{new Date(row.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {waitlist.length === 0 ? (
                    <tr>
                      <td className="px-3 py-4 text-muted" colSpan={5}>
                        No signups yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">Venue interest ({venues.length})</h2>
            <a
              href="/admin/export?type=venues"
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              Export CSV
            </a>
          </div>
          {venuesRes.error ? (
            <p className="mt-3 text-sm text-red-600">Failed to load: {venuesRes.error.message}</p>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase text-muted">
                  <tr>
                    <th className="px-3 py-2">Business</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Suburb</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Discount considered</th>
                    <th className="px-3 py-2">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {venues.map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2">{row.business_name}</td>
                      <td className="px-3 py-2">
                        {row.contact_name} · {row.contact_email}
                        {row.contact_phone ? ` · ${row.contact_phone}` : ""}
                      </td>
                      <td className="px-3 py-2">{row.suburb}</td>
                      <td className="px-3 py-2">{row.category}</td>
                      <td className="px-3 py-2">{row.discount_considered}</td>
                      <td className="px-3 py-2">{new Date(row.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {venues.length === 0 ? (
                    <tr>
                      <td className="px-3 py-4 text-muted" colSpan={6}>
                        No venue leads yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
