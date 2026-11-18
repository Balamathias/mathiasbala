import type { Accented } from "@/content";
import { AccentText } from "./AccentText";

export function SectionHeader({
  index,
  label,
  heading,
  id,
}: {
  index: string;
  label: string;
  heading: Accented;
  id: string;
}) {
  return (
    <header className="reveal mb-12 sm:mb-16">
      <div className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span>{label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <h2
        id={`${id}-title`}
        className="mt-6 max-w-[22ch] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.035em] text-balance"
      >
        <AccentText text={heading} />
      </h2>
    </header>
  );
}
