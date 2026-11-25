"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

type Message = { id: number; role: "assistant" | "user"; text: string };

const suggestedQuestions = [
  "What services do you offer?",
  "How does LexBridge work?",
  "What is the assessment?",
  "Where do you operate?",
];

function answerQuestion(question: string) {
  const text = question.toLowerCase();

  if (/\b(price|prices|pricing|cost|rate|quote|quotation)\b/.test(text)) {
    return "Pricing depends on your operation, shipment volumes, service needs and the partners involved. LexBridge reviews the whole picture and can identify commercial opportunities; specific rates aren’t published on this website.";
  }
  if (/\b(assessment|review|complimentary|free)\b/.test(text)) {
    return "The complimentary Strategic Value Assessment looks at your providers, commercial arrangements, spend, volumes, systems, processes and service levels. LexBridge then shares practical recommendations. Read more on the Strategic Value Assessment page.";
  }
  if (/\b(book|booking|session|meeting|appointment|talk to|speak to|contact|phone|call|email)\b/.test(text)) {
    return `You can call ${site.contact} on ${site.phoneDisplay}. The website also has a booking inquiry form at /start.`;
  }
  const internationalCoverage =
    /\b(international(?:ly)?|overseas|abroad)\b/.test(text) &&
    /\b(cover|coverage|deliver|ship|operate|send|area|where)\b/.test(text);
  if (/\b(where|location|located|based|coverage|cover|operate|area|south africa)\b/.test(text) || internationalCoverage) {
    return "LexBridge is based in Edenvale, Gauteng, and serves businesses across South Africa. Its network also coordinates international courier, freight and customs services.";
  }
  if (/\b(partner|partners|network|who with|work with)\b/.test(text)) {
    return "LexBridge coordinates a network of specialist logistics partners, including Bridgewater Logistics, QI Logistics (Quad International Logistics), and BEX Express. The site describes the partners as carefully selected, with most being family-owned South African firms.";
  }
  if (/\b(how|process|work|works|broker|brokerage|manage|relationship|different)\b/.test(text)) {
    return "LexBridge is an independent logistics brokerage. It first learns how your operation works, then brings together suitable specialist providers and coordinates the relationship through one point of contact.";
  }
  if (/\b(who|company|lexbridge|about|what is lexbridge)\b/.test(text)) {
    return "LexBridge Group is an independent logistics brokerage based in Edenvale, Gauteng. It connects businesses with specialist logistics providers and coordinates them through one relationship. The company describes its experience as about 18 years in the logistics industry.";
  }

  const service = services.find((item) =>
    [item.name, item.short, ...item.items].some((term) => {
      const normalized = term.toLowerCase();
      return normalized.length > 3 && text.includes(normalized);
    }),
  );
  if (service) return `${service.name}: ${service.summary}`;

  if (/\b(service|services|logistics|courier|freight|customs|warehouse|warehousing|transport|mailroom|e-?commerce)\b/.test(text)) {
    return `LexBridge coordinates ${services.map((service) => service.name.toLowerCase()).join(", ")} through specialist partners. Ask about any one of these and I can share more detail.`;
  }

  return "I can answer questions using information published on this website, such as LexBridge’s services, partners, coverage, process and assessment. I don’t have information about that in the site content.";
}

export default function AssistantDemo() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I can help with questions about LexBridge and the information on this website. What would you like to know?",
    },
  ]);
  const nextId = useRef(1);
  const transcriptEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEnd.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", text: trimmed },
      { id: nextId.current++, role: "assistant", text: answerQuestion(trimmed) },
    ]);
    setQuestion("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <>
      <aside id="assistant-panel" className="assistant-panel" aria-label="LexBridge website assistant" hidden={!open}>
        <div className="assistant-head">
          <div>
            <p className="assistant-kicker">LexBridge website assistant</p>
            <h2>How can I help?</h2>
          </div>
          <button className="assistant-close" type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
            ×
          </button>
        </div>

        <div className="assistant-transcript" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message) => (
            <p className={`assistant-bubble assistant-bubble-${message.role}`} key={message.id}>
              {message.text}
            </p>
          ))}
          <div ref={transcriptEnd} />
        </div>

        {messages.length === 1 && (
          <div className="assistant-suggestions" aria-label="Suggested questions">
            {suggestedQuestions.map((suggestion) => (
              <button type="button" key={suggestion} onClick={() => ask(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form className="assistant-composer" onSubmit={submit}>
          <label className="assistant-sr-only" htmlFor="assistant-question">Ask a question about LexBridge</label>
          <input
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question..."
            maxLength={500}
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit" disabled={!question.trim()}>
            Send
          </button>
        </form>

        <p className="assistant-note">Answers are based on information published on this website.</p>
      </aside>
      <button
        className="assistant-launch"
        type="button"
        aria-expanded={open}
        aria-controls="assistant-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close assistant" : "Ask LexBridge"}
      </button>
    </>
  );
}
