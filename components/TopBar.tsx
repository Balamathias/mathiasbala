"use client";
import { useEffect, useState } from "react";
import { nav, palette, site, status } from "@/content";
import { openPalette } from "@/lib/events";
import { useMounted } from "@/lib/useMounted";
import { LocalClock } from "./LocalClock";
import { Search } from "./icons";

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const mounted = useMounted();
  const isMac = mounted && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      className={`no-print fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-[0.8rem] tracking-tight"
        >
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-md border border-line-strong bg-surface text-[0.65rem] font-semibold text-accent transition-colors group-hover:border-accent"
          >
            M
          </span>
          {site.wordmark}
        </a>

        <nav aria-label="Sections" className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-[0.8rem] transition-colors ${
                    active === n.id
                      ? "bg-raised text-text shadow-[inset_0_0_0_1px_var(--color-line-strong)]"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <span className="hidden items-center gap-2 font-mono text-[0.7rem] text-muted sm:flex">
            <span className="pulse" aria-hidden />
            {status.available}
            <span aria-hidden className="text-faint">
              ·
            </span>
            <LocalClock />
          </span>
          <button
            type="button"
            onClick={openPalette}
            aria-label={palette.trigger}
            aria-keyshortcuts="Meta+K Control+K"
            className="flex h-8 items-center gap-2 rounded-lg border border-line-strong bg-surface px-2.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-accent hover:text-text"
          >
            <Search size={13} />
            <kbd className="font-mono">{mounted ? (isMac ? "⌘K" : "Ctrl K") : "⌘K"}</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
