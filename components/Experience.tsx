import { experience } from "@/content";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <SectionHeader
        id="experience"
        index={experience.index}
        label={experience.label}
        heading={experience.heading}
      />
      <ol className="relative">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-accent via-line-strong to-transparent sm:left-[calc(12rem+5px)]"
        />
        {experience.roles.map((item) => (
          <li
            key={`${item.role}-${item.org}`}
            className="reveal group relative grid gap-1 pb-10 pl-8 last:pb-0 sm:grid-cols-[12rem_1fr] sm:gap-0 sm:pl-0"
          >
            <p className="font-mono text-[0.72rem] leading-7 text-muted tabular-nums sm:pr-10 sm:text-right">
              {item.dates}
            </p>
            <span
              aria-hidden
              className="absolute top-[9px] left-0 sm:left-[12rem]"
            >
              {item.current ? (
                <span className="pulse size-[11px]!" />
              ) : (
                <span className="block size-[11px] rounded-full border border-line-strong bg-ink transition-colors group-hover:border-accent" />
              )}
            </span>
            <div className="sm:pl-10">
              <p className="text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">
                {item.role}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 text-muted">
                {item.org}
                {item.current && (
                  <span className="rounded-full border border-signal/30 bg-signal/10 px-2 py-px font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal">
                    {experience.current}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
