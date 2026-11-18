import { footer, site } from "@/content";
import { AccentText } from "./AccentText";
import { CopyEmail } from "./CopyEmail";
import { LocalClock } from "./LocalClock";
import { ArrowUpRight } from "./icons";

const built = new Date().toISOString().slice(0, 10);

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="pt-24 sm:pt-32">
      <div className="reveal flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
        <span className="text-accent">{footer.index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span>{footer.label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <h2
        id="contact-title"
        className="reveal mt-10 max-w-[16ch] text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-medium tracking-[-0.05em] text-balance"
      >
        <AccentText text={footer.heading} />
      </h2>
      <p className="reveal mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">{footer.lede}</p>

      <div className="reveal mt-10">
        <CopyEmail />
      </div>

      <ul className="reveal mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {footer.links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="link inline-flex items-center gap-1 pb-0.5 text-[0.95rem]">
              {link.label}
              <ArrowUpRight size={13} className="text-faint" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-24 flex flex-col gap-4 border-t border-line py-8 font-mono text-[0.7rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-text">
          <span
            aria-hidden
            className="grid size-5 place-items-center rounded border border-line-strong text-[0.55rem] font-semibold text-accent"
          >
            M
          </span>
          {site.wordmark}
        </span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{footer.location}</span>
          <span aria-hidden className="text-faint">·</span>
          <span>
            {footer.localTime} <LocalClock className="text-text" />
          </span>
        </span>
        <span className="text-faint">
          {footer.build} <time dateTime={built}>{built}</time>
        </span>
      </div>
    </footer>
  );
}
