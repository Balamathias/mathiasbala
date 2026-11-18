"use client";
import { useEffect, useState } from "react";
import { Check } from "./icons";

/** Single polite live region. Messages arrive via the `toast` window event. */
export function Toaster() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      clearTimeout(t);
      t = setTimeout(() => setVisible(false), 2400);
    };
    window.addEventListener("toast", on);
    return () => {
      clearTimeout(t);
      window.removeEventListener("toast", on);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {message && (
        <div className="flex items-center gap-2.5 rounded-full border border-line-strong bg-raised/90 px-4 py-2.5 text-sm shadow-2xl shadow-black/30 backdrop-blur-md">
          <span className="grid size-5 place-items-center rounded-full bg-signal/15 text-signal">
            <Check size={12} strokeWidth={2.4} />
          </span>
          {message}
        </div>
      )}
    </div>
  );
}
