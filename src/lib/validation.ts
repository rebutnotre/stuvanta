import { z } from "zod";
import { EDUCATION_LEVEL_OPTIONS, VENUE_CATEGORY_OPTIONS, yearOptionsFor } from "./config";

/** True only for addresses ending in ".edu.au" (case-insensitive). */
export function isEduAuEmail(email: string): boolean {
  return /\.edu\.au$/i.test(email.trim());
}

export const waitlistSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    educationLevel: z.enum(EDUCATION_LEVEL_OPTIONS, {
      message: "Choose your level of education",
    }),
    yearLevel: z.string().trim().min(1, "Choose your year level"),
  })
  .refine((data) => yearOptionsFor(data.educationLevel).includes(data.yearLevel), {
    message: "Choose a valid year level for your level of education",
    path: ["yearLevel"],
  });

export const venueLeadSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required"),
  contactName: z.string().trim().min(1, "Contact name is required"),
  contactEmail: z.string().trim().toLowerCase().email("Enter a valid email address"),
  contactPhone: z.string().trim().optional(),
  suburb: z.string().trim().min(1, "Suburb is required"),
  category: z.enum(VENUE_CATEGORY_OPTIONS, {
    message: "Choose a category",
  }),
  discountConsidered: z.string().trim().min(1, "Tell us roughly what discount you'd consider"),
});
