import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Todo from "@/components/Todo";
import { convictions } from "@/lib/content";

export const metadata: Metadata = {
  title: "The people",
  description: "An independent brokerage built on 18 years of industry relationships and a network of predominantly family-owned South African logistics firms.",
};

export default function About() {
  return (
    <>
      <section className="section">
        <div className="wrap stack">
          <h1>The people behind the network</h1>
          <p className="lede">
            LexBridge is built on about 18 years in the logistics industry and on relationships with carefully selected
            partners, most of them family-owned and all of them chosen for how they treat their clients.
          </p>
        </div>
      </section>
      <section className="section band-sail">
        <div className="wrap split">
          <Reveal><h2>What we believe</h2></Reveal>
          <Reveal>
            <ol className="ruled">
              {convictions.map(([t, b]) => (
                <li key={t}><h3>{t}</h3><p className="muted">{b}</p></li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <Reveal><h2>Who you deal with</h2></Reveal>
          <Reveal className="stack">
            <p>
              One experienced point of contact who understands your business, works out what it needs, brings in the
              right specialists and stays responsible for the relationship.
            </p>
            <p>Behind that, a dedicated team inside each partner firm, where you are known by name.</p>
            <p><Todo>Photograph of Lex, and partner names once each has agreed in writing</Todo></p>
            <p><Link className="btn btn-primary" href="/start">Book a session</Link></p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
