import { z } from "zod";
import { services } from "./content";

const ids = services.map((s) => s.id) as [string, ...string[]];

export const enquirySchema = z.strictObject({
  kind: z.enum(["session", "assessment", "quote"]),
  name: z.string().trim().min(2, "Please give your name.").max(80),
  company: z.string().trim().min(2, "Please give your company.").max(120),
  email: z.email("Please give a valid email address.").max(160),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{8,18}$/, "Please give a phone number we can call."),
  services: z.array(z.enum(ids)).max(ids.length),
  message: z.string().trim().max(2000),
  // Hidden from people. Anything in it means a bot.
  website: z.string().max(0),
});

export type Enquiry = z.infer<typeof enquirySchema>;
