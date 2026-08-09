import { stack } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function Stack() {
  return (
    <section className="py-16">
      <SectionLabel>{stack.label}</SectionLabel>
      <ul className="reveal flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-muted">
        {stack.items.map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            {item}
            {i < stack.items.length - 1 && (
              <span aria-hidden className="text-line-strong">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
