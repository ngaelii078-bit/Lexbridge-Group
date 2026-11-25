import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap stack">
        <h1>This line leads nowhere.</h1>
        <p className="lede">The page you were after has moved or never existed.</p>
        <p><Link className="btn btn-primary" href="/">Back to the home page</Link></p>
      </div>
    </section>
  );
}
