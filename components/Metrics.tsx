import { metrics } from "@/content";
import { CountUp } from "./CountUp";

export function Metrics() {
  return (
    <section aria-label={metrics.label} className="pb-24 sm:pb-32">
      <dl className="reveal grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {metrics.items.map((m, i) => (
          <div
            key={m.label}
            className={`group relative flex flex-col-reverse gap-3 px-1 py-8 sm:px-6 sm:py-10 ${
              i % 2 === 1 ? "border-l border-line pl-5" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <dt className="text-sm leading-snug text-muted">
              {m.label}
              <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                {m.source}
              </span>
            </dt>
            <dd className="text-[clamp(2.5rem,5.5vw,4rem)] leading-none font-medium tracking-[-0.05em] text-text transition-colors duration-300 group-hover:text-accent">
              <CountUp value={m.value} suffix={m.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
