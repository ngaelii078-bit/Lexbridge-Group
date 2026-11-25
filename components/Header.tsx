"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [path]);

  const links = nav.map((n) => (
    <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
      {n.label}
    </Link>
  ));
  return (
    <header className="site-head">
      <div className="wrap">
        <Link href="/" className="brand-lockup" aria-label="LexBridge Group, home">
          <span className="brand-name"><span>LEX</span>BRIDGE GROUP</span>
          <span className="brand-tagline">Built on trust, powered by purpose</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          {links}
          <Link href="/start" className="btn btn-primary">Book 15 minutes</Link>
        </nav>
        <details className="menu" ref={menu}>
          <summary>Menu</summary>
          <nav aria-label="Mobile">
            {links}
            <Link href="/start" className="btn btn-primary">Book 15 minutes</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
