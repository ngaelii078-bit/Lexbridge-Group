import Link from "next/link";
import FreightMotion from "@/components/FreightMotion";
import BackgroundVideo from "@/components/BackgroundVideo";
import "./home.css";

const capabilities = [
  ["Local courier", "Nationwide documents, parcels and distribution."],
  ["International freight", "Imports, exports, air and sea freight, and customs."],
  ["Transport & warehousing", "Dedicated transport and third-party logistics."],
  ["E-commerce & mailroom", "Connected shipping, fulfilment and document flows."],
] as const;

export default function Home() {
  return (
    <div className="home-experience">
      <div className="home-hero-story">
      <section className="home-hero motion-hero" aria-labelledby="home-heading">
        <div className="home-scene" data-freight-scene aria-hidden="true"><BackgroundVideo /></div>
        <div className="home-hero-shade" aria-hidden="true" />
        <FreightMotion />
        <div className="home-shell home-hero-inner">
          <div className="home-hero-copy" data-freight-copy>
            <p className="home-eyebrow"><span /> Independent logistics brokerage</p>
            <h1 id="home-heading">One relationship.<br /><em>Every logistics solution.</em></h1>
            <p className="home-intro">The right people. The right partners. One experienced team bringing your logistics together.</p>
            <div className="home-actions">
              <Link className="home-button home-button-light" href="/start">Book a strategy session</Link>
              <Link className="home-button home-button-outline" href="/strategic-value-assessment">Explore the assessment</Link>
            </div>
          </div>
          <div className="home-hero-bottom">
            <p className="home-hero-caption">Built on trust.<br /><strong>Powered by purpose.</strong></p>
            <div className="home-glass" data-freight-glass aria-label="The LexBridge advantage">
              <div><strong>18 years</strong><span>of industry relationships</span></div>
              <div><strong>One contact</strong><span>for your logistics network</span></div>
              <div><strong>Independent</strong><span>advice for your business</span></div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <section className="home-section home-introduction">
        <div className="home-shell home-intro-grid">
          <p className="home-kicker">A better way to work</p>
          <div>
            <h2>Logistics is complicated.<br /><span>Your relationship doesn’t have to be.</span></h2>
            <div className="home-intro-text">
              <p>Finding the right providers takes time. Managing them takes even more. We bring together a carefully selected network and coordinate the relationships for you.</p>
              <p>With experience, commercial influence and a personal approach, we help you make better decisions across the whole operation.</p>
            </div>
            <Link className="home-text-link" href="/about">Get to know LexBridge</Link>
          </div>
        </div>
      </section>

      <section className="home-section home-services" id="solutions">
        <div className="home-shell">
          <div className="home-section-head">
            <div><p className="home-kicker">What we coordinate</p><h2>All the moving parts.<br /><span>One point of contact.</span></h2></div>
            <p>From a single shipment to an entire logistics operation, we connect your business with the specialists it needs.</p>
          </div>
          <div className="home-service-grid">
            {capabilities.map(([title, description]) => (
              <article className="home-service-card" key={title}>
                <span className="home-card-number">Logistics solutions</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <Link className="home-text-link" href="/services">Explore all services</Link>
        </div>
      </section>

      <section className="home-section home-advantage">
        <div className="home-shell home-advantage-grid">
          <div><p className="home-kicker">The LexBridge advantage</p><h2>Relationships that work<br /><span>harder for your business.</span></h2></div>
          <div className="home-advantage-list">
            <div><h3>Carefully chosen partners</h3><p>We bring in people whose service, professionalism and capabilities fit your needs.</p></div>
            <div><h3>Commercial influence</h3><p>Our established relationships and combined volumes help us negotiate competitive arrangements.</p></div>
            <div><h3>One relationship, end to end</h3><p>We stay involved, coordinating providers and helping your operation run more smoothly.</p></div>
          </div>
        </div>
      </section>

      <section className="home-assessment">
        <div className="home-shell home-assessment-inner">
          <div><p className="home-kicker">A clearer view of your operation</p><h2>Let’s find the value<br /><span>you may be missing.</span></h2></div>
          <div><p>Our complimentary Strategic Value Assessment looks beyond rates to your providers, systems, service and opportunities for improvement.</p><Link className="home-button home-button-light" href="/strategic-value-assessment">Request an assessment</Link></div>
        </div>
      </section>
    </div>
  );
}
