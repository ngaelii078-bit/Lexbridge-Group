"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";

const W = 560;
const H = 420;
const STEP = H / (services.length + 1);
const MID = H / 2;

// Each ticked provider is one loose strand. All of them are drawn into a single line.
export default function Strands() {
  const [on, setOn] = useState<string[]>(["nationwide-courier", "international-freight", "customs"]);
  const n = on.length;
  const toggle = (id: string) => setOn((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const href = n ? `/start?services=${on.join(",")}` : "/start";
  const ordered = services.filter((s) => on.includes(s.id)).map((s) => s.id);

  return (
    <div className="split" style={{ alignItems: "start" }}>
      <fieldset className="strand-pick">
        <legend className="small muted" style={{ paddingBottom: "var(--s2)" }}>
          Tick everything you manage with a separate provider today.
        </legend>
        {services.map((s) => (
          <label key={s.id}>
            <input type="checkbox" checked={on.includes(s.id)} onChange={() => toggle(s.id)} />
            {s.short}
          </label>
        ))}
      </fieldset>
      <div className="stack">
        <svg
          className="strand-art"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={n ? `${n} separate ${n === 1 ? "strand" : "strands"} drawn into one line` : "Nothing selected"}
          style={{ width: "100%", height: "auto" }}
        >
          {services.map((s, i) => {
            const y = STEP * (i + 1);
            const live = on.includes(s.id);
            const end = MID + (live ? (ordered.indexOf(s.id) - (n - 1) / 2) * 5 : 0);
            return (
              <path
                key={s.id}
                d={`M0 ${y} C ${W * 0.28} ${y}, ${W * 0.3} ${end}, ${W * 0.56} ${end} L ${W * 0.6} ${end}`}
                fill="none"
                stroke="var(--slate)"
                strokeWidth={live ? 5 : 1.5}
                strokeDasharray={live ? undefined : "2 7"}
                opacity={live ? 1 : 0.35}
              />
            );
          })}
          {n > 0 && (
            <g fill="none">
              <path d={`M${W * 0.58} ${MID} L ${W} ${MID}`} stroke="var(--navy)" strokeWidth={30} />
              <path d={`M${W * 0.58} ${MID} L ${W} ${MID}`} stroke="var(--orange)" strokeWidth={26} />
              {Array.from({ length: 16 }, (_, i) => (
                <path key={i} d={`M${W * 0.6 + i * 14} ${MID - 13} q 9 13 4 26`} stroke="var(--navy)" strokeWidth={2} />
              ))}
            </g>
          )}
        </svg>
        <p className="tally" aria-live="polite">
          <span>{n}</span>
          <span className="muted" style={{ fontSize: "var(--t-body)", letterSpacing: 0 }}>
            {n === 1 ? "relationship to manage becomes" : "relationships to manage become"}
          </span>
          <span>1</span>
        </p>
        <p>
          <Link className="btn btn-primary" href={href}>Talk to us about {n === 1 ? "this" : "these"}</Link>
        </p>
      </div>
    </div>
  );
}
