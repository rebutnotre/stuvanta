"use server";

import { venueLeadSchema } from "@/lib/validation";
import { getSupabasePublicClient } from "@/lib/supabase";
import { getResendClient, EMAIL_FROM } from "@/lib/resend";

export type VenueActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitVenueLead(
  _prevState: VenueActionState,
  formData: FormData,
): Promise<VenueActionState> {
  const phoneRaw = formData.get("contactPhone");
  const parsed = venueLeadSchema.safeParse({
    businessName: formData.get("businessName"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    contactPhone: typeof phoneRaw === "string" && phoneRaw.trim() ? phoneRaw : undefined,
    suburb: formData.get("suburb"),
    category: formData.get("category"),
    discountConsidered: formData.get("discountConsidered"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Check your details and try again.",
    };
  }

  const data = parsed.data;
  const supabase = getSupabasePublicClient();
  const { error } = await supabase.from("venue_leads").insert({
    business_name: data.businessName,
    contact_name: data.contactName,
    contact_email: data.contactEmail,
    contact_phone: data.contactPhone ?? null,
    suburb: data.suburb,
    category: data.category,
    discount_considered: data.discountConsidered,
  });

  if (error) {
    console.error("venue lead insert failed", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again in a moment.",
    };
  }

  const notifyTo = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (notifyTo) {
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: EMAIL_FROM,
        to: notifyTo,
        subject: `New venue interest: ${data.businessName}`,
        text: [
          `Business: ${data.businessName}`,
          `Contact: ${data.contactName} <${data.contactEmail}>${data.contactPhone ? ` / ${data.contactPhone}` : ""}`,
          `Suburb: ${data.suburb}`,
          `Category: ${data.category}`,
          `Discount they'd consider: ${data.discountConsidered}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("venue lead notification email failed", err);
    }
  } else {
    console.warn("ADMIN_NOTIFICATION_EMAIL not set — venue lead notification email skipped");
  }

  return { status: "success", message: "Thanks — we'll be in touch soon." };
}
