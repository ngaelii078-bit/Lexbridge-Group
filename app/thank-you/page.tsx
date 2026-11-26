import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Request received", robots: { index: false } };

export default function ThankYou() {
  return (
    <section className="section">
      <div className="wrap stack">
        <h1>We have your request.</h1>
        <p className="lede">
          {site.contact} will come back to you about your request. If it is urgent, call{" "}
          <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
        <p><Link className="link" href="/">Back to the home page</Link></p>
      </div>
    </section>
  );
}
