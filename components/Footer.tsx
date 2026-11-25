import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap site-foot-inner">
        <div className="site-foot-lead">
          <div>
            <p className="site-foot-kicker">Let’s make logistics simpler</p>
            <p className="site-foot-heading">A better way forward, together.</p>
            <p className="site-foot-intro">The right people. The right partnerships. The right logistics solution.</p>
          </div>
          <Link className="site-foot-button" href="/start#inquiry-form">Start a conversation</Link>
        </div>
        <div className="site-foot-details">
          <div className="site-foot-about">
            <p className="site-foot-brand">Lex<span>Bridge</span> Group</p>
            <p>One relationship. Every logistics solution.</p>
            <a className="site-foot-phone" href={site.phoneHref}>{site.phoneDisplay}</a>
          </div>
          <div className="site-foot-links">
            <div><p className="site-foot-label">Explore</p><ul>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/start#inquiry-form">Book a strategy session</Link></li>
            </ul></div>
            <div><p className="site-foot-label">Information</p><ul>
              <li><Link href="/privacy">Privacy notice</Link></li>
              <li><Link href="/legal">Legal information</Link></li>
              {site.legalName && <li>{site.legalName}</li>}
              <li>{site.locality}, {site.region}, South Africa</li>
            </ul></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
