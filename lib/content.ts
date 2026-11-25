// Copy drawn from the client's brief. Nothing here is a statistic the client has not given.

export const steps = [
  {
    title: "Your operation, as it stands.",
    body: "Several providers, several accounts, and someone on your team chasing all of them.",
  },
  {
    title: "We come through it first.",
    body: "Fifteen minutes to understand the business before anything is recommended.",
  },
  {
    title: "Then round the whole of it.",
    body: "Spend, volumes, systems and service levels. Not only courier rates.",
  },
  {
    title: "Draw it tight. It holds.",
    body: "One relationship, with the right providers managed behind it.",
  },
];

export type Service = { id: string; name: string; short: string; summary: string; items: string[] };

export const services: Service[] = [
  {
    id: "nationwide-courier",
    name: "Nationwide courier",
    short: "Courier",
    summary: "Documents and parcels moved across South Africa on terms built around your volumes.",
    items: [
      "Nationwide document and parcel deliveries",
      "Business to business courier",
      "Business to consumer deliveries",
      "E-commerce parcel distribution",
      "Dedicated courier arrangements",
      "Solutions shaped to shipment volume",
    ],
  },
  {
    id: "international-courier",
    name: "International courier",
    short: "International courier",
    summary: "Imports and exports, from a small parcel to a larger commercial consignment.",
    items: [
      "International exports and imports",
      "Express international courier",
      "Commercial shipments",
      "Door-to-door international delivery",
      "Shipment coordination",
      "Tracking and shipment visibility",
    ],
  },
  {
    id: "international-freight",
    name: "International freight, air and sea",
    short: "Air and sea freight",
    summary: "Commercial cargo in or out of the country, planned and coordinated from one place.",
    items: [
      "Air freight imports and exports",
      "Sea freight imports and exports",
      "Full container loads (FCL)",
      "Less than container loads (LCL)",
      "Commercial cargo",
      "Shipment planning and visibility",
    ],
  },
  {
    id: "customs",
    name: "Customs clearing and forwarding",
    short: "Customs clearing",
    summary: "Coordinated through established specialist partners, so the parties talk to each other.",
    items: [
      "Import customs clearance",
      "Export customs documentation",
      "Customs processing",
      "Clearing and forwarding",
      "Coordination with freight and customs specialists",
    ],
  },
  {
    id: "dedicated-transport",
    name: "Dedicated transport",
    short: "Dedicated transport",
    summary: "Vehicles committed to your work, through established transport partners.",
    items: [
      "Dedicated vehicles",
      "Scheduled distribution",
      "Specialised transport requirements",
      "Business to business movements",
      "Tailored transport arrangements",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce logistics and automated systems",
    short: "E-commerce shipping",
    summary: "Less time on shipping administration, more on the business it serves.",
    items: [
      "E-commerce courier integration",
      "Automated shipping systems",
      "Shipment processing",
      "Order fulfilment coordination",
      "Multi-provider shipping",
      "Streamlined dispatch, tracking and visibility",
    ],
  },
  {
    id: "mailroom",
    name: "Mailroom management",
    short: "Mailroom",
    summary: "Documents collected, sorted and delivered without your people running the post.",
    items: [
      "Centralised mailroom operations",
      "Document collection and distribution",
      "Internal and external mail management",
      "Nationwide document delivery",
      "Courier integration",
      "Process improvements",
    ],
  },
];

export const assessed = [
  "Current logistics providers",
  "Existing commercial arrangements",
  "Monthly logistics expenditure",
  "Domestic distribution",
  "International imports and exports",
  "Shipment volumes and patterns",
  "Existing systems and integrations",
  "Operational processes",
  "Service levels",
  "Areas of inefficiency",
  "Opportunities for cost optimisation",
];

export const convictions = [
  ["Relationships over transactions", "We want to be an extension of your business, not another supplier on the list."],
  ["Understand first, recommend second", "Nothing is proposed until we know how your operation works."],
  ["Cheapest is not the aim", "Price is weighed against service, reliability, efficiency and what it is worth in five years."],
  ["People you can reach", "Our partners are predominantly family-owned, South African-built firms where senior people still take the call."],
  ["We grow when you grow", "We serve one another for a mutual outcome. That is the whole model."],
] as const;

export const sectors = [
  "Manufacturing",
  "Mining and industrial supply",
  "Importers and exporters",
  "Retail and wholesale",
  "E-commerce",
  "Automotive supply",
  "Healthcare and medical supply",
  "Construction and engineering",
  "Distribution",
  "Businesses with internal mailrooms",
  "High-volume shippers, local or international",
];

export const signs = [
  "Logistics costs that keep climbing and nobody can say why",
  "Service that depends on who answers the phone",
  "Several providers who have never spoken to each other",
  "Staff hired for one job and spending the day chasing deliveries",
];
