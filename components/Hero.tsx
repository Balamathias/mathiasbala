import { hero, overlap } from "@/content";
import { AccentText } from "./AccentText";
import { RequestTrace } from "./RequestTrace";
import { TimezoneOverlap } from "./TimezoneOverlap";
import { ArrowRight, Check, Download, brandIcons } from "./icons";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="pt-32 pb-16 sm:pt-40 lg:pb-24">
      <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="rise flex flex-wrap items-center gap-2" style={d(0)}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 font-mono text-[0.7rem] text-muted backdrop-blur">
              <span className="pulse" aria-hidden />
              {hero.badge}
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft py-1.5 pr-3.5 pl-3 font-mono text-[0.7rem] text-accent">
              <Check size={12} strokeWidth={2.4} />
              {hero.credential}
            </p>
          </div>

          <h1
            id="hero-name"
            className="mt-8 text-[clamp(3.75rem,13vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.06em]"
          >
            {hero.nameLines.map((line, i) => (
              <span key={line} className="rise block" style={d(80 + i * 90)}>
                {line}
                {i === hero.nameLines.length - 1 && <span className="text-accent">.</span>}
              </span>
            ))}
          </h1>

          <div className="rise mt-10 max-w-[34rem]" style={d(300)}>
            <p className="font-mono text-[0.78rem] text-muted">{hero.role}</p>
            <p className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance">
              <AccentText text={hero.headline} />
            </p>
          </div>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={d(420)}>
            <div className="flex w-full gap-3 sm:w-auto">
            <a
              href={hero.primary.href}
              className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent pr-4 pl-5 whitespace-nowrap sm:flex-none text-[0.9rem] font-medium text-on-accent transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--color-accent)]"
            >
              {hero.primary.label}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondary.href}
              className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 whitespace-nowrap sm:flex-none text-[0.9rem] backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
              {hero.secondary.label}
            </a>
            </div>
            <span aria-hidden className="mx-1 hidden h-6 w-px bg-line-strong sm:block" />
            {hero.links.map((l) => {
              const Icon = brandIcons[l.icon];
              return (
                <a
                  key={l.label}
                  href={l.href}
                  aria-label={l.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="rise lg:col-span-5" style={d(520)}>
          <RequestTrace />
        </div>
      </div>

      <div className="rise mt-16 border-t border-line pt-6 lg:mt-24" style={d(640)}>
        <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-faint">
          {overlap.label}
        </p>
        <TimezoneOverlap />
      </div>
    </section>
  );
}
