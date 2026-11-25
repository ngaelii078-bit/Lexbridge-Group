import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/strategic-value-assessment", "/services", "/about", "/start", "/privacy", "/legal"].map((p) => ({ url: `${site.url}${p}` }));
}
