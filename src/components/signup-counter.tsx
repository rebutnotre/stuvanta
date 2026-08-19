import { getSupabasePublicClient } from "@/lib/supabase";

// Below this, showing the number does more harm than good — "3 people
// joined" reads as weak. Show nothing until it's a real number.
const MIN_COUNT_TO_SHOW = 25;

export async function SignupCounter() {
  const supabase = getSupabasePublicClient();
  const { data: count, error } = await supabase.rpc("waitlist_signup_count");

  if (error) {
    console.error("waitlist_signup_count failed", error);
  }
  if (error || !count || count < MIN_COUNT_TO_SHOW) {
    return null;
  }

  return (
    <p className="mt-3 text-sm font-semibold text-accent">
      Join {Number(count).toLocaleString()} other students already on the list
    </p>
  );
}
