import Link from "next/link";
import KnotHero from "@/components/KnotHero";
import Plates from "@/components/Plates";
import Reveal from "@/components/Reveal";
import Strands from "@/components/Strands";
import Todo from "@/components/Todo";
import Volume from "@/components/Volume";
import WhippedEnd from "@/components/WhippedEnd";
import { assessed, convictions, sectors, signs } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <KnotHero />

      <section className="section band-sail">
        <div className="wrap">
          <Reveal className="stack">
            <h2>How many of these are you holding together?</h2>
            <p className="lede muted">
              Finding providers takes months. Then someone has to compare them, negotiate with them, test them and
              keep them talking to each other.
            </p>
          </Reveal>
          <div style={{ marginTop: "var(--s5)" }}>
            <Strands />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal><h2>We have done the searching.</h2></Reveal>
          <Reveal className="stack">
            <p>
              LexBridge is an independent logistics brokerage. For 18 years the work has been finding out which people
              and which firms in this industry do what they say.
            </p>
            <p>
              So you do not have to find, test and manage several providers. We bring in partners who have already shown
              their service and their pricing, and we oversee the relationship from there.
            </p>
            <p>
              We are not tied to recommending one provider. If the right answer changes as your business changes, the
              recommendation changes with it.
            </p>
            <p>
              <strong>How we are paid.</strong> <Todo>Client to confirm: partner commission, client fee, or both</Todo>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section band-loft">
        <div className="wrap">
          <Reveal><h2>Alone, you negotiate on your own volume.</h2></Reveal>
        </div>
        <Volume />
        <div className="wrap" style={{ marginTop: "var(--s4)" }}>
          <div className="split">
            <p className="lede">
              The cheapest provider is not the aim. We weigh price against service, reliability, efficiency and what the
              arrangement is worth over time.
            </p>
            <p><Link className="link" href="/strategic-value-assessment">See where your own spend could change</Link></p>
          </div>
        </div>
      </section>

      <section className="section band-navy">
        <div className="wrap split split-wide">
          <Reveal className="stack">
            <h2>The Strategic Value Assessment</h2>
            <p className="lede">
              We sit down with you, go through how your logistics runs today and show you where it can run better. It is
              complimentary, and it is not a quotation.
            </p>
            <p className="lede">
              You finish with a list of opportunities and a recommended strategy. What you do with it is up to you.
            </p>
            <p><Link className="btn btn-primary" href="/strategic-value-assessment">Request an assessment</Link></p>
          </Reveal>
          <Reveal>
            <ul className="ruled small">
              {assessed.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="stack"><h2>What we coordinate</h2></Reveal>
          <div style={{ marginTop: "var(--s4)" }}><Plates /></div>
        </div>
      </section>

      <section className="section band-sail">
        <div className="wrap">
          <Reveal className="letter">
            <h2>We are not trying to pass for a large corporate.</h2>
            <p>
              Our strength is a network of established, predominantly family-owned and South African-built logistics
              businesses, where relationships still matter and senior management is within reach.
            </p>
            <p>
              I have spent years finding the right people inside those businesses. When you work with us you are looked
              after by a dedicated team at each partner, with one relationship at the centre of it. You do not become
              another account number.
            </p>
            <p>We serve one another for a mutual outcome. When you do well, our partners do well, and so do we.</p>
            <p className="sign"><strong>{site.contact}</strong><br /><span className="muted">LexBridge Group, {site.locality}</span></p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal className="stack">
            <h2>Built for businesses that run on logistics</h2>
            <p className="lede muted">Usually the first conversation starts with one of these.</p>
            <ul className="ruled">
              {signs.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Reveal>
          <Reveal className="stack">
            <h3>Who we work with</h3>
            <ul className="ruled small">
              {sectors.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section band-loft">
        <div style={{ maxWidth: "34rem", marginBottom: "var(--s4)" }}><WhippedEnd /></div>
        <div className="wrap stack">
          <Reveal className="stack">
            <h2>Two ways to start. Neither is a quote.</h2>
            <p className="lede">{convictions[1][1]}</p>
          </Reveal>
          <Reveal className="split">
            <div className="stack">
              <h3>15-minute strategy session</h3>
              <p>Introduce the business and talk through what you need from logistics right now. Complimentary.</p>
              <p><Link className="btn btn-primary" href="/start">Book a session</Link></p>
            </div>
            <div className="stack">
              <h3>Strategic Value Assessment</h3>
              <p>A fuller review of your existing operation, with the opportunities we find. Complimentary.</p>
              <p><Link className="btn btn-ghost" href="/strategic-value-assessment">Request an assessment</Link></p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
