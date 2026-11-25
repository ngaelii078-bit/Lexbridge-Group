// The frayed end from the hero, bound. The one place on the page the loose strand is finished.
const turns = Array.from({ length: 9 }, (_, i) => 388 + i * 9);
const lay = Array.from({ length: 24 }, (_, i) => i * 17 - 10);

export default function WhippedEnd() {
  return (
    <svg className="end-art" viewBox="0 0 520 64" aria-hidden="true">
      <path d="M0 12H478V52H0Z" fill="var(--slate)" stroke="var(--navy)" strokeWidth="2.5" />
      <g fill="none" stroke="var(--loft)" strokeWidth="2">
        {lay.map((x) => (
          <path key={x} d={`M${x} 14c14 8 4 28 18 36`} />
        ))}
      </g>
      <path d="M382 8h88v48h-88z" fill="var(--orange)" stroke="var(--navy)" strokeWidth="2.5" />
      <g stroke="var(--navy)" strokeWidth="2">
        {turns.map((x) => (
          <path key={x} d={`M${x} 8v48`} />
        ))}
      </g>
    </svg>
  );
}
