import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy notice", description: "How LexBridge Group handles personal information under POPIA." };

export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 style={{ fontSize: "var(--t-h2)" }}>Privacy notice</h1>
        <p className="muted">This notice is being finalised. Please contact us with any questions about your information.</p>
        <h2>Who is responsible</h2>
        <p>
          LexBridge Group, {site.locality}, {site.region}. Contact {site.contact} on{" "}
          <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
        <h2>What we collect and why</h2>
        <p>
          When you send a form: your name, company, email, phone number, the services you tick and your message. We use
          them to reply to you and to prepare for the conversation you asked for. We do not use them for marketing.
        </p>
        <h2>Where it goes</h2>
        <p>
          Enquiries are sent to LexBridge by email. Service providers that host the website or deliver email may process
          the information needed to provide those services.
        </p>
        <h2>Cookies</h2>
        <p>This website sets no advertising or analytics cookies.</p>
        <h2>Your rights</h2>
        <p>
          You may ask for access to your information, correct it, have it deleted or object to how it is used. You may
          also complain to the Information Regulator of South Africa.
        </p>
      </div>
    </section>
  );
}
