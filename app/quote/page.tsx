import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Tell LexBridge what your business needs and request a logistics quote.",
};

export default function Quote() {
  return (
    <section className="section">
      <div className="wrap split">
        <div className="stack">
          <h1 style={{ fontSize: "var(--t-h2)" }}>Request a quote</h1>
          <p className="lede">
            Tell us about your business and the logistics support you need. We will be in touch to discuss the details.
          </p>
          <p>
            Prefer to talk now? Call {site.contact} on <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        </div>
        <EnquiryForm kind="quote" />
      </div>
    </section>
  );
}
