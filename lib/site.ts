// Single source for client facts. `null` means the client has not supplied it yet,
// and the page renders a visible placeholder instead of a guess.
export const site = {
  name: "LexBridge Group",
  line: "One Relationship. Every Logistics Solution.",
  description:
    "LexBridge is an independent logistics brokerage in Edenvale, Gauteng. We connect South African businesses with vetted logistics partners, negotiate on combined volume and manage the relationship.",
  contact: "Lex Ninkovic",
  phoneDisplay: "082 368 0000",
  phoneHref: "tel:+27823680000",
  locality: "Edenvale",
  region: "Gauteng",
  // Not live: lexbridgegroup.co.za was unregistered on 25 Nov 2026.
  email: null as string | null,
  legalName: null as string | null,
  registration: null as string | null,
  vat: null as string | null,
  street: null as string | null,
  informationOfficer: null as string | null,
  officeBearers: null as string | null,
  paia: null as string | null,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
};

export const nav = [
  { href: "/strategic-value-assessment", label: "The assessment" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "The people" },
];
