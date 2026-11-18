"use client";
import { useState } from "react";
import { contact, footer } from "@/content";
import { copyText, toast } from "@/lib/events";
import { Check, Copy } from "./icons";

/** Big email button: the address is a mailto link, the side button copies it. */
export function CopyEmail() {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    if (!(await copyText(contact.email))) return;
    setDone(true);
    toast(footer.copied);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="group inline-flex max-w-full items-stretch overflow-hidden rounded-full border border-line-strong bg-surface/70 backdrop-blur transition-colors hover:border-accent">
      <a
        href={`mailto:${contact.email}`}
        className="truncate py-4 pr-4 pl-6 font-mono text-[clamp(0.9rem,2.4vw,1.25rem)] tracking-tight transition-colors hover:text-accent sm:pl-7"
      >
        {contact.email}
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={footer.copy}
        className="no-print flex shrink-0 items-center gap-2 border-l border-line-strong px-5 font-mono text-[0.72rem] text-muted transition-colors hover:bg-accent hover:text-on-accent"
      >
        {done ? <Check size={15} /> : <Copy size={15} />}
        <span className="hidden sm:inline">{footer.copy}</span>
      </button>
    </div>
  );
}
