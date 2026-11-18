import type { Accented } from "@/content";

/** Renders a heading with one phrase set in the serif italic accent face. */
export function AccentText({ text }: { text: Accented }) {
  return (
    <>
      {text.pre}
      <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">
        {text.accent}
      </em>
      {text.post}
    </>
  );
}
