import Link from "next/link";
import { nav, site } from "@/lib/site";
import Todo from "./Todo";

export default function Footer() {
  return (
    <footer className="site-foot band-navy">
      <div className="wrap" style={{ paddingBlock: "var(--s5)" }}>
        <div className="split">
          <div className="stack">
            <p className="mark">LexBridge Group</p>
            <p className="lede">The right people. The right partnerships. The right logistics solution.</p>
            <p>
              <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>
            </p>
          </div>
          <div className="split">
            <ul className="stack small">
              {nav.map((n) => (
                <li key={n.href}><Link className="link" href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link className="link" href="/start">Book a strategy session</Link></li>
            </ul>
            <ul className="stack small">
              <li><Link className="link" href="/privacy">Privacy notice</Link></li>
              <li><Link className="link" href="/legal">Legal information</Link></li>
              <li>{site.legalName ?? <Todo>Registered name and number</Todo>}</li>
              <li>{site.locality}, {site.region}, South Africa</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
