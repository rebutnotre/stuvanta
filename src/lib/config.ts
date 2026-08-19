export const BUSINESS_NAME = "Stuvanta";

// Update if a custom domain replaces the Vercel one.
export const SITE_URL = "https://stuvanta.vercel.app";

export const CAMPUS_OPTIONS = ["University of Melbourne (Parkville)"] as const;

export const SEMESTER_PRICE_DISPLAY = "$15";
export const SEMESTER_PRICE_GST_NOTE = "GST inclusive";

export const MIN_DISCOUNT_PERCENT = 15;

export const EDUCATION_LEVEL_OPTIONS = ["High school", "University"] as const;

export const HIGH_SCHOOL_YEAR_OPTIONS = ["Year 10", "Year 11", "Year 12"] as const;

export const UNIVERSITY_YEAR_OPTIONS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year+",
  "Postgrad",
  "Other",
] as const;

export function yearOptionsFor(
  educationLevel: string,
): readonly string[] {
  return educationLevel === "High school" ? HIGH_SCHOOL_YEAR_OPTIONS : UNIVERSITY_YEAR_OPTIONS;
}

export const VENUE_CATEGORY_OPTIONS = [
  "Cafe",
  "Restaurant",
  "Bar / pub",
  "Fast food / takeaway",
  "Retail",
  "Fitness / wellbeing",
  "Services (e.g. hair, print, tutoring)",
  "Other",
] as const;

export const CONTACT_EMAIL = "hello@stuvanta.com.au";
