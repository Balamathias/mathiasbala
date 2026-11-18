import { stack } from "@/content";
import { SectionHeader } from "./SectionHeader";

export function Stack() {
  const n = stack.layers.length;
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-24 sm:py-32">
      <SectionHeader id="stack" index={stack.index} label={stack.label} heading={stack.heading} />
      <ol className="reveal space-y-2">
        {stack.layers.map((layer, i) => (
          <li
            key={layer.name}
            className="group relative grid items-center gap-4 rounded-xl border border-line bg-surface/70 px-5 py-4 backdrop-blur-sm transition-[border-color,transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/60 hover:bg-raised sm:grid-cols-[3rem_14rem_1fr] sm:px-6"
            style={{ marginInline: `${i * 0.6}rem` }}
          >
            <span className="hidden font-mono text-[0.68rem] text-faint sm:block">
              L{n - i}
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-accent">
              {layer.name}
            </span>
            <ul className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line-strong bg-ink/40 px-2.5 py-1 text-sm text-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
