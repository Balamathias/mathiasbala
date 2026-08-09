import { experience } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  return (
    <section className="py-16">
      <SectionLabel>{experience.label}</SectionLabel>
      <ul className="reveal border-t border-line">
        {experience.roles.map((item) => (
          <li
            key={`${item.role}-${item.org}`}
            className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <p className="leading-snug">
              {item.role}
              <span className="text-muted">, {item.org}</span>
            </p>
            <p className="shrink-0 font-mono text-xs text-muted">
              {item.dates}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
