import Link from "next/link";
import FreightMotion from "@/components/FreightMotion";
import BackgroundVideo from "@/components/BackgroundVideo";
import "./home.css";
import "./home-sections.css";

const capabilities = [
  ["01", "Nationwide courier", "Reliable document and parcel delivery across South Africa.", "nationwide-courier"],
  ["02", "International courier", "Connect your business to customers and partners across borders.", "international-courier"],
  ["03", "Air, sea & customs", "Freight and clearing specialists working together for your business.", "international-freight"],
  ["04", "Transport & warehousing", "Dedicated transport and 3PL solutions shaped around your operation.", "warehousing"],
  ["05", "E-commerce logistics", "Connected systems, fulfilment and shipping that help you grow.", "ecommerce"],
  ["06", "Mailroom management", "Simpler document collection, distribution and courier coordination.", "mailroom"],
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
              <Link className="home-button home-button-light" href="/start#inquiry-form">Book a strategy session</Link>
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

      <div className="lex-sections">
        <section className="lex-intro lex-section">
          <div className="home-shell lex-intro-grid">
            <div className="lex-intro-copy">
              <p className="lex-label"><span /> A better way to do logistics</p>
              <h2>Great logistics starts with <em>great relationships.</em></h2>
              <p>Finding and managing the right providers takes time. We bring them together, so you can get back to what you do best: growing your business.</p>
              <Link className="lex-link" href="/about">Get to know LexBridge</Link>
            </div>
            <div className="lex-network" aria-label="One relationship connecting your business with logistics specialists">
              <svg className="lex-network-flow" viewBox="0 0 600 450" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <g className="lex-flow-routes">
                  <path d="M300 225 C300 164 290 105 300 47" />
                  <path d="M300 225 C225 225 155 225 76 225" />
                  <path d="M300 225 C375 225 452 225 524 225" />
                  <path d="M300 225 C300 297 300 350 300 402" />
                </g>
                <g className="lex-flow-packets">
                  <g>
                    <circle className="lex-flow-badge" r="18" />
                    <g className="lex-flow-symbol" transform="translate(-10 -10) scale(.83)">
                      <path d="M4 7 12 3l8 4v10l-8 4-8-4V7Z" /><path d="m4 7 8 4 8-4M12 11v10" />
                    </g>
                    <animateMotion dur="3.8s" repeatCount="indefinite" path="M300 225 C300 164 290 105 300 47" />
                  </g>
                  <g>
                    <circle className="lex-flow-badge" r="18" />
                    <g className="lex-flow-symbol" transform="translate(-10 -10) scale(.83)">
                      <path d="M3 10 12 4l9 6v10H3V10ZM8 20v-6h8v6" />
                    </g>
                    <animateMotion dur="4.8s" begin="-.9s" repeatCount="indefinite" path="M300 225 C225 225 155 225 76 225" />
                  </g>
                  <g>
                    <circle className="lex-flow-badge" r="18" />
                    <g className="lex-flow-symbol" transform="translate(-10 -10) scale(.83)">
                      <path d="M3 15h18l-2.5 4h-13L3 15ZM7 15V8h10v7M10 8V5h4v3M3 21c1 .6 2 .6 3 0s2-.6 3 0 2 .6 3 0 2-.6 3 0 2 .6 3 0 2-.6 3 0" />
                    </g>
                    <animateMotion dur="4.2s" begin="-1.7s" repeatCount="indefinite" path="M300 225 C375 225 452 225 524 225" />
                  </g>
                  <g>
                    <circle className="lex-flow-badge" r="18" />
                    <g className="lex-flow-symbol" transform="translate(-10 -10) scale(.83)">
                      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" />
                    </g>
                    <animateMotion dur="4.5s" begin="-2.3s" repeatCount="indefinite" path="M300 225 C300 297 300 350 300 402" />
                  </g>
                </g>
              </svg>
              <div className="lex-network-orbit lex-orbit-one" aria-hidden="true" />
              <div className="lex-network-orbit lex-orbit-two" aria-hidden="true" />
              <span className="lex-network-node lex-node-top">Courier</span>
              <span className="lex-network-node lex-node-left">Warehousing</span>
              <span className="lex-network-node lex-node-right">Freight</span>
              <span className="lex-network-node lex-node-bottom">Mailroom</span>
              <div className="lex-network-center"><span>One connection.</span><strong>LexBridge</strong><span>More possibilities.</span></div>
            </div>
          </div>
        </section>

        <section className="lex-services lex-section" id="solutions">
          <div className="home-shell">
            <div className="lex-section-heading">
              <div><p className="lex-label"><span /> Everything working together</p><h2>Big picture thinking.<br /><em>Everyday solutions.</em></h2></div>
              <p>From your mailroom to the other side of the world, we bring the right specialists together for you.</p>
            </div>
            <div className="lex-service-grid">
              {capabilities.map(([number, title, description, id]) => (
                <Link className="lex-service-card" href={`/services#${id}`} key={id}>
                  <div className="lex-card-top"><span className="lex-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{number === "01" ? <><path d="M4 7 12 3l8 4v10l-8 4-8-4V7Z"/><path d="m4 7 8 4 8-4M12 11v10"/></> : number === "02" ? <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></> : number === "03" ? <><path d="m3 14 7-2 3-8 2-1-1 8 6-1 1 1-7 4-2 5-2 1v-5l-5 1-2-2Z"/></> : number === "04" ? <><path d="M3 10 12 4l9 6v10H3V10ZM8 20v-6h8v6"/></> : number === "05" ? <><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></> : <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>}</svg></span><span className="lex-card-number">LexBridge solutions</span></div>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <span className="lex-card-more">Explore service</span>
                </Link>
              ))}
            </div>
            <div className="lex-services-foot"><p>Not sure where to start? We’ll figure it out together.</p><Link className="lex-link" href="/services">View all services</Link></div>
          </div>
        </section>

        <section className="lex-advantage lex-section">
          <div className="home-shell lex-advantage-grid">
            <div><p className="lex-label"><span /> Why LexBridge</p><h2>A partner who’s<br /><em>in your corner.</em></h2><p className="lex-advantage-lede">Good logistics is about more than moving things. It’s about having the right people by your side.</p><Link className="lex-link" href="/about">Meet the people behind LexBridge</Link><div className="lex-partner-image" role="img" aria-label="Illustration of two professionals reviewing logistics plans" /></div>
            <div className="lex-benefits">
              <div><span className="lex-benefit-symbol" aria-hidden="true">✓</span><div><h3>Partners chosen with care</h3><p>We connect you with proven specialists who share our commitment to service.</p></div></div>
              <div><span className="lex-benefit-symbol" aria-hidden="true">✓</span><div><h3>Commercial advantage</h3><p>Established relationships and combined volumes help us negotiate competitive arrangements.</p></div></div>
              <div><span className="lex-benefit-symbol" aria-hidden="true">✓</span><div><h3>One person to call</h3><p>We coordinate the moving parts, so you have one experienced point of contact.</p></div></div>
            </div>
          </div>
        </section>

        <section className="lex-assessment lex-section">
          <div className="home-shell">
            <div className="lex-assessment-card">
              <div className="lex-assessment-pattern" aria-hidden="true" />
              <div className="lex-assessment-copy"><p className="lex-label"><span /> Complimentary Strategic Value Assessment</p><h2>See the bigger picture.<br /><em>Find a better way forward.</em></h2><p>Let’s look at your providers, processes, spend and service together. We’ll identify opportunities to make your logistics work better for your business.</p><div className="lex-actions"><Link className="lex-button lex-button-white" href="/strategic-value-assessment">Request your assessment</Link><Link className="lex-button lex-button-outline" href="/start#inquiry-form">Book a 15-minute chat</Link></div></div>
              <div className="lex-assessment-note"><span aria-hidden="true">✳</span><p>We start by listening.<br /><strong>No pressure. Just a conversation.</strong></p></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
