import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { assessed } from "@/lib/content";

export const metadata: Metadata = {
  title: "Strategic Value Assessment",
  description: "A complimentary review of your whole logistics operation: providers, spend, volumes, systems and service. Not a quotation.",
};

const stages = [
  ["We sit down with you", "We learn how the business works and what it needs logistics to do."],
  ["We look at the whole operation", "Domestic and international, the providers, the systems and the people running it."],
  ["We show you what we found", "Inefficiencies, commercial opportunities and where service is costing you."],
  ["We recommend a strategy", "Change one provider, change several, or hand us the whole chain to coordinate."],
];

export default function Assessment() {
  return (
    <>
      <section className="section">
        <div className="wrap split split-wide">
          <div className="stack">
            <h1>The Strategic Value Assessment</h1>
            <p className="lede">
              A complimentary review of your logistics from end to end. It looks past the courier rate to how the whole
              operation works, and it ends with a recommendation you can use.
            </p>
            <p><a className="btn btn-primary" href="#request">Request an assessment</a></p>
          </div>
          <div className="stack">
            <h2 style={{ fontSize: "var(--t-h3)" }}>What we review</h2>
            <ul className="ruled small">{assessed.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section band-sail">
        <div className="wrap split">
          <Reveal><h2>How it runs</h2></Reveal>
          <Reveal>
            <ol className="ruled">
              {stages.map(([t, b]) => (
                <li key={t}><h3>{t}</h3><p className="muted">{b}</p></li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section band-navy">
        <div className="wrap split">
          <Reveal><h2>Or hand us the whole chain</h2></Reveal>
          <Reveal className="stack">
            <p>
              You can outsource your entire logistics and operational chain to LexBridge. We coordinate the providers,
              manage the relationships and monitor performance, nationally and internationally.
            </p>
            <p>Your people stop managing logistics problems. You keep one relationship, and it is with us.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="request">
        <div className="wrap split">
          <div className="stack">
            <h2>Request an assessment</h2>
            <p className="lede muted">Tell us a little about the operation. We will come back to arrange a time.</p>
          </div>
          <EnquiryForm kind="assessment" />
        </div>
      </section>
    </>
  );
}
