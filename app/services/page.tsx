import type { Metadata } from "next";
import Link from "next/link";
import Plates from "@/components/Plates";

export const metadata: Metadata = {
  title: "Services",
  description: "Courier, freight, customs, warehousing, dedicated transport, e-commerce and mailroom management, coordinated through one relationship.",
};

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="stack">
            <h1>Every logistics solution, one person to call</h1>
            <p className="lede">
              Each is delivered by a specialist partner and coordinated by us, so nobody on your side has to hold the
              pieces together.
            </p>
          </div>
          <div style={{ marginTop: "var(--s5)" }}><Plates openFirst /></div>
        </div>
      </section>
      <section className="section band-sail">
        <div className="wrap split">
          <h2>Mailroom management that works for your business</h2>
          <div className="stack">
            <p className="lede">
              Your mailroom is part of your operation, not an afterthought. We help coordinate document collection,
              internal and external distribution, nationwide delivery and courier services through one relationship.
            </p>
            <p>
              We look at the way work flows today and where clearer processes and better coordination can save your team time.
            </p>
            <p><Link className="link" href="/start?services=mailroom#inquiry-form">Talk to us about your mailroom</Link></p>
          </div>
        </div>
      </section>
      <section className="section band-navy">
        <div className="wrap split">
          <h2>Not sure which of these is the problem?</h2>
          <div className="stack">
            <p>That is what the first fifteen minutes are for.</p>
            <p className="actions">
              <Link className="btn btn-primary" href="/start#inquiry-form">Book a session</Link>
              <Link className="btn btn-ghost" href="/strategic-value-assessment">Request an assessment</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
