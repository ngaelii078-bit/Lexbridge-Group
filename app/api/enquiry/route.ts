import { enquirySchema } from "@/lib/enquiry";
import { services } from "@/lib/content";

// Per-instance limiter. It slows abuse but is not shared across serverless instances,
// so add Turnstile or a shared store before launch.
const hits = new Map<string, { n: number; until: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.until < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.until < now) {
    hits.set(ip, { n: 1, until: now + WINDOW });
    return false;
  }
  h.n += 1;
  return h.n > LIMIT;
}

const reply = (status: number, body: object) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return reply(429, { error: "limit" });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return reply(400, { error: "invalid" });
  }
  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0] ?? "form")] ??= i.message;
    return reply(422, { error: "invalid", fields });
  }

  const { RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM } = process.env;
  // Never report success for an enquiry that went nowhere.
  if (!RESEND_API_KEY || !ENQUIRY_TO || !ENQUIRY_FROM) return reply(503, { error: "not-connected" });

  const d = parsed.data;
  const picked = services.filter((s) => d.services.includes(s.id)).map((s) => s.name);
  const text = [
    d.kind === "assessment" ? "Strategic Value Assessment request" : "15-minute strategy session request",
    "",
    `Name: ${d.name}`,
    `Company: ${d.company}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Managing today: ${picked.length ? picked.join(", ") : "not given"}`,
    "",
    d.message || "No message.",
  ].join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM,
        to: [ENQUIRY_TO],
        reply_to: d.email,
        subject: d.kind === "assessment" ? "New assessment request" : "New strategy session request",
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) {
      console.error("enquiry mail failed", r.status);
      return reply(502, { error: "send-failed" });
    }
  } catch {
    console.error("enquiry mail failed");
    return reply(502, { error: "send-failed" });
  }
  return reply(200, { ok: true });
}
