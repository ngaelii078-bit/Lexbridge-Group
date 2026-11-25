"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { services } from "@/lib/content";
import { enquirySchema } from "@/lib/enquiry";
import { site } from "@/lib/site";

type Props = { kind: "session" | "assessment" };
export default function EnquiryForm({ kind }: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("services");
    if (q) setPicked(q.split(",").filter((id) => services.some((s) => s.id === id)));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const g = (k: string) => String(f.get(k) ?? "");
    const data = {
      kind, name: g("name"), company: g("company"), email: g("email"), phone: g("phone"),
      services: picked, message: g("message"), website: g("website"),
    };
    const check = enquirySchema.safeParse(data);
    if (!check.success) {
      const next: Record<string, string> = {};
      for (const i of check.error.issues) next[String(i.path[0])] ??= i.message;
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setFailed(null);
    setBusy(true);
    try {
      const r = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      if (r.ok) return router.push(`/thank-you?for=${kind}`);
      setFailed(r.status === 429 ? "That is a few too many attempts. Please phone us instead." : "Your request did not go through. Nothing was sent.");
    } catch {
      setFailed("Your request did not go through. Nothing was sent.");
    }
    setBusy(false);
  }

  const field = (name: string, label: string, type: string, auto: string) => (
    <div className="field">
      <label htmlFor={`${kind}-${name}`}>{label}</label>
      <input
        id={`${kind}-${name}`} name={name} type={type} autoComplete={auto} required
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${kind}-${name}-err` : undefined}
      />
      {errors[name] && <p className="err" id={`${kind}-${name}-err`}>{errors[name]}</p>}
    </div>
  );

  return (
    <form className="form" id="inquiry-form" onSubmit={submit} noValidate>
      <div className="row">
        {field("name", "Your name", "text", "name")}
        {field("company", "Company", "text", "organization")}
      </div>
      <div className="row">
        {field("email", "Work email", "email", "email")}
        {field("phone", "Phone", "tel", "tel")}
      </div>
      <fieldset className="field strand-pick">
        <legend>What do you manage today? (optional)</legend>
        {services.map((s) => (
          <label key={s.id} style={{ fontWeight: 400 }}>
            <input
              type="checkbox" checked={picked.includes(s.id)} style={{ width: "1.375rem", minHeight: 0, padding: 0 }}
              onChange={() => setPicked((p) => (p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id]))}
            />
            {s.short}
          </label>
        ))}
      </fieldset>
      <div className="field">
        <label htmlFor={`${kind}-message`}>What is not working? (optional)</label>
        <textarea id={`${kind}-message`} name="message" rows={4} maxLength={2000} />
      </div>
      <div className="trap" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this empty</label>
        <input id={`${kind}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div role="alert">
        {failed && (
          <p className="notice">
            {failed} Call {site.contact} on <a className="link" href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        )}
      </div>
      <p className="small muted">
        We use these details to reply to you and nothing else. Read the <Link className="link" href="/privacy">privacy notice</Link>.
      </p>
      <p>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Sending" : kind === "assessment" ? "Request the assessment" : "Request a session"}
        </button>
      </p>
    </form>
  );
}
