import type { Metadata } from "next";
import Todo from "@/components/Todo";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy notice", description: "How LexBridge Group handles personal information under POPIA." };

export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 style={{ fontSize: "var(--t-h2)" }}>Privacy notice</h1>
        <p className="muted">Draft for the client and their adviser to confirm before launch.</p>
        <h2>Who is responsible</h2>
        <p>
          {site.legalName ?? <Todo>Registered legal name</Todo>}, {site.locality}, {site.region}. Information officer:{" "}
          {site.informationOfficer ?? <Todo>Name and contact details</Todo>}. Telephone {site.phoneDisplay}.
        </p>
        <h2>What we collect and why</h2>
        <p>
          When you send a form: your name, company, email, phone number, the services you tick and your message. We use
          them to reply to you and to prepare for the conversation you asked for. We do not use them for marketing.
        </p>
        <h2>Where it goes</h2>
        <p>
          This website does not keep a database of submissions. Each one is sent as an email. Our hosting and email
          providers may process it outside South Africa: <Todo>Confirm providers, countries and the basis for transfer</Todo>
        </p>
        <h2>How long we keep it</h2>
        <p><Todo>Retention period to be confirmed</Todo></p>
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
