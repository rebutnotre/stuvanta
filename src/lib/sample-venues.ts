/**
 * PLACEHOLDER DATA — not real venues or offers. These exist only to show
 * what the directory will look like once real venues sign up. Every card
 * using this data must carry a visible "Example" label — see
 * <SampleVenues />. Do not use real business names here without their
 * written agreement to the offer shown.
 */
export type SampleVenue = {
  name: string;
  category: string;
  suburb: string;
  discountPercent: number;
  blurb: string;
};

export const SAMPLE_VENUES: SampleVenue[] = [
  {
    name: "Example: Parkville Coffee House",
    category: "Cafe",
    suburb: "Parkville",
    discountPercent: 20,
    blurb: "20% off any coffee and pastry, members only, all day.",
  },
  {
    name: "Example: Lygon St Pizzeria",
    category: "Restaurant",
    suburb: "Carlton",
    discountPercent: 25,
    blurb: "25% off dine-in food, Sunday to Thursday.",
  },
  {
    name: "Example: The Corner Burger Bar",
    category: "Fast food / takeaway",
    suburb: "Carlton",
    discountPercent: 20,
    blurb: "20% off your order, exclusive to members.",
  },
  {
    name: "Example: Parkville Print & Copy",
    category: "Services",
    suburb: "Parkville",
    discountPercent: 30,
    blurb: "30% off printing and binding for assignments.",
  },
];
