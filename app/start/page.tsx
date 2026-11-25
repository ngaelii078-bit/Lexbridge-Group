import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a strategy session",
  description: "A complimentary 15-minute conversation about your business and what it needs from logistics.",
};

export const dynamic = "force-dynamic";

export default function Start() {
  return (
    <section className="section">
      <div className="wrap split">
        <div className="stack">
          <h1 style={{ fontSize: "var(--t-h2)" }}>Fifteen minutes, before anyone recommends anything</h1>
          <p className="lede">
            Introduce the business and tell us how logistics works today. If we are not the right fit, you will hear
            that from us.
          </p>
          <p>
            Prefer to talk now? Call {site.contact} on <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        </div>
        <EnquiryForm kind="session" />
      </div>
    </section>
  );
}
