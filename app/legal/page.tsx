import type { Metadata } from "next";
import Todo from "@/components/Todo";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Legal information", description: "Company details for LexBridge Group under section 43 of the ECT Act." };

const rows: [string, React.ReactNode][] = [
  ["Full legal name and status", site.legalName ?? <Todo key="a">To be supplied</Todo>],
  ["Registration number", site.registration ?? <Todo key="b">To be supplied</Todo>],
  ["VAT number", site.vat ?? <Todo key="c">To be supplied, if registered</Todo>],
  ["Office bearers", site.officeBearers ?? <Todo key="d">To be supplied</Todo>],
  ["Physical address and address for legal service", site.street ?? <Todo key="e">Street address, Edenvale, Gauteng</Todo>],
  ["Telephone", site.phoneDisplay],
  ["Email", site.email ?? <Todo key="f">After the domain is registered</Todo>],
  ["Services", "Logistics brokerage, coordination and advisory. Transport, freight and customs services are delivered by partner companies."],
  ["Prices", "No prices are published on this website. The strategy session and the Strategic Value Assessment are complimentary."],
  ["PAIA manual", site.paia ?? <Todo key="g">To be supplied</Todo>],
];

export default function Legal() {
  return (
    <section className="section">
      <div className="wrap stack">
        <h1 style={{ fontSize: "var(--t-h2)" }}>Legal information</h1>
        <p className="muted">Draft for the client and their adviser to confirm before launch.</p>
        <dl className="ruled" style={{ maxWidth: "60rem" }}>
          {rows.map(([k, v]) => (
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
