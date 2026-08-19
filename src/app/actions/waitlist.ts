"use server";

import { waitlistSchema, isEduAuEmail } from "@/lib/validation";
import { getSupabasePublicClient } from "@/lib/supabase";
import { getResendClient, EMAIL_FROM } from "@/lib/resend";
import { BUSINESS_NAME } from "@/lib/config";

export type WaitlistActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitWaitlist(
  _prevState: WaitlistActionState,
  formData: FormData,
): Promise<WaitlistActionState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
    campus: formData.get("campus"),
    courseYear: formData.get("courseYear"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Check your details and try again.",
    };
  }

  const { email, campus, courseYear } = parsed.data;
  const isEduAu = isEduAuEmail(email);

  const supabase = getSupabasePublicClient();
  const { error } = await supabase.from("waitlist_signups").insert({
    email,
    campus,
    course_year: courseYear,
    is_edu_au: isEduAu,
  });

  if (error) {
    if (error.code === "23505") {
      // Unique constraint on email — they're already signed up.
      return {
        status: "success",
        message: "You're already on the list — we'll email you when we launch.",
      };
    }
    console.error("waitlist insert failed", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again in a moment.",
    };
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `You're on the ${BUSINESS_NAME} waitlist`,
      text: `Thanks for joining the ${BUSINESS_NAME} waitlist!\n\nWe'll email you as soon as membership goes live at ${campus}.\n\n— The ${BUSINESS_NAME} team`,
    });
  } catch (err) {
    // The signup itself succeeded — don't fail the request just because the email did.
    console.error("waitlist confirmation email failed", err);
  }

  return {
    status: "success",
    message: "You're on the list! Check your inbox for a confirmation email.",
  };
}
