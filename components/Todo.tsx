import type { ReactNode } from "react";

// A visible marker for anything the client still has to supply.
export default function Todo({ children }: { children: ReactNode }) {
  return <span className="todo">[{children}]</span>;
}
