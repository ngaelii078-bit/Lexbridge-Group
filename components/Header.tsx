"use client";
import Link from "next/link";
import Image from "next/image";
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
          <Image className="brand-logo" src="/lexbridge-logo.png" alt="" width={190} height={75} priority />
        </Link>
        <nav className="site-nav" aria-label="Main">
          {links}
          <Link href="/quote#inquiry-form" className="btn btn-primary">Get a quote now</Link>
        </nav>
        <details className="menu" ref={menu}>
          <summary><span>Menu</span><span className="menu-icon" aria-hidden="true"><i /><i /></span></summary>
          <nav aria-label="Mobile">
            {links}
            <Link href="/quote#inquiry-form" className="btn btn-primary">Get a quote now</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
