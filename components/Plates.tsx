import { services } from "@/lib/content";
import OpenServiceFromHash from "@/components/OpenServiceFromHash";

// Services as an index of plates. Native details, so it works without JavaScript.
export default function Plates({ openFirst = false }: { openFirst?: boolean }) {
  return (
    <div className="plates">
      <OpenServiceFromHash />
      {services.map((s, i) => (
        <details key={s.id} id={s.id} open={openFirst && i === 0}>
          <summary>
            <span>{i + 1}</span>
            <h3>{s.name}</h3>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="inner">
            <p>{s.summary}</p>
            <ul className="ruled small">
              {s.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
