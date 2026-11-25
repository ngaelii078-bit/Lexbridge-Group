import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Legal information", description: "Contact and company information for LexBridge Group." };

const rows: [string, string | null][] = [
  ["Full legal name and status", site.legalName],
  ["Registration number", site.registration],
  ["VAT number", site.vat],
  ["Office bearers", site.officeBearers],
  ["Physical address", site.street],
  ["Telephone", site.phoneDisplay],
  ["Email", site.email],
  ["Services", "Logistics brokerage, coordination and advisory. Transport, freight and customs services are delivered by partner companies."],
  ["Prices", "No prices are published on this website. The strategy session and the Strategic Value Assessment are complimentary."],
  ["PAIA manual", site.paia],
];

export default function Legal() {
  return (
    <section className="section">
      <div className="wrap stack">
        <h1 style={{ fontSize: "var(--t-h2)" }}>Legal information</h1>
        <p className="muted">For further company information, contact {site.contact} on <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.</p>
        <dl className="ruled" style={{ maxWidth: "60rem" }}>
          {rows.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="split" style={{ borderTop: "1px solid var(--rule)", paddingBlock: "var(--s2)", rowGap: "var(--s1)" }}>
              <dt style={{ fontWeight: 600 }}>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
