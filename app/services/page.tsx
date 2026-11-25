import type { Metadata } from "next";
import Link from "next/link";
import Plates from "@/components/Plates";

export const metadata: Metadata = {
  title: "Services",
  description: "Courier, international freight, customs clearing, dedicated transport, e-commerce shipping and mailroom management, coordinated through one relationship.",
};

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="stack">
            <h1>Seven services, one person to call</h1>
            <p className="lede">
              Each is delivered by a specialist partner and coordinated by us, so nobody on your side has to hold the
              pieces together.
            </p>
          </div>
          <div style={{ marginTop: "var(--s5)" }}><Plates openFirst /></div>
        </div>
      </section>
      <section className="section band-navy">
        <div className="wrap split">
          <h2>Not sure which of these is the problem?</h2>
          <div className="stack">
            <p>That is what the first fifteen minutes are for.</p>
            <p className="actions">
              <Link className="btn btn-primary" href="/start">Book a session</Link>
              <Link className="btn btn-ghost" href="/strategic-value-assessment">Request an assessment</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
