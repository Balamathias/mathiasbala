"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { contact, footer, moreWork, nav, palette, projects } from "@/content";
import { copyText, toast } from "@/lib/events";
import { ArrowUpRight, Copy, Download, GitHub, Hash, LinkedIn, Mail, Search } from "./icons";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ReactNode;
  run: () => void;
};

const external = (href: string) => () => window.open(href, "_blank", "noopener");

export function CommandPalette() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const close = useCallback(() => dialog.current?.close(), []);

  const items = useMemo<Item[]>(
    () => [
      ...nav.map((n) => ({
        id: `nav-${n.id}`,
        group: palette.groups.navigate,
        label: n.label,
        icon: <Hash />,
        run: () => document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy",
        group: palette.groups.actions,
        label: palette.copyEmail,
        hint: contact.email,
        icon: <Copy />,
        run: async () => {
          if (await copyText(contact.email)) toast(footer.copied);
        },
      },
      {
        id: "mail",
        group: palette.groups.actions,
        label: palette.sendEmail,
        icon: <Mail />,
        run: () => (window.location.href = `mailto:${contact.email}`),
      },
      {
        id: "cv",
        group: palette.groups.actions,
        label: palette.cv,
        hint: "PDF",
        icon: <Download />,
        run: external(contact.cv),
      },
      {
        id: "gh",
        group: palette.groups.actions,
        label: palette.github,
        icon: <GitHub />,
        run: external(contact.github),
      },
      {
        id: "li",
        group: palette.groups.actions,
        label: palette.linkedin,
        icon: <LinkedIn />,
        run: external(contact.linkedin),
      },
      ...projects.flatMap((p) =>
        p.links.map((l) => ({
          id: `p-${l.href}`,
          group: palette.groups.products,
          label: p.name,
          hint: l.label,
          icon: <ArrowUpRight />,
          run: external(l.href),
        })),
      ),
      ...moreWork.items.map((w) => ({
        id: `w-${w.link.href}`,
        group: palette.groups.products,
        label: w.name,
        hint: w.link.label,
        icon: <ArrowUpRight />,
        run: external(w.link.href),
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const open = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    d.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", open);
    };
  }, [open, close]);

  useEffect(() => {
    list.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const select = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialog}
      aria-label={palette.trigger}
      className="palette no-print m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line-strong bg-raised p-0 text-text shadow-[0_40px_120px_-20px_rgb(0_0_0/0.6)]"
      onClick={(e) => e.target === dialog.current && close()}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="shrink-0 text-muted" />
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder={palette.placeholder}
          aria-label={palette.placeholder}
          aria-controls="palette-list"
          aria-activedescendant={filtered[active] ? `pi-${filtered[active].id}` : undefined}
          role="combobox"
          aria-expanded
          className="h-14 w-full bg-transparent text-[0.95rem] outline-none placeholder:text-faint"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">
          esc
        </kbd>
      </div>

      <ul
        ref={list}
        id="palette-list"
        role="listbox"
        className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2"
      >
        {filtered.length === 0 && (
          <li className="px-3 py-10 text-center text-sm text-muted">{palette.empty}</li>
        )}
        {filtered.map((item, i) => {
          const heading = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          const isActive = i === active;
          return (
            <li key={item.id} role="presentation">
              {heading && (
                <p className="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
                  {heading}
                </p>
              )}
              <div
                id={`pi-${item.id}`}
                role="option"
                aria-selected={isActive}
                data-index={i}
                onMouseMove={() => setActive(i)}
                onClick={() => select(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-accent-soft text-text" : "text-muted"
                }`}
              >
                <span className={isActive ? "text-accent" : "text-faint"}>{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint && (
                  <span className="truncate font-mono text-xs text-faint">{item.hint}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.65rem] text-faint">
        <span>
          <kbd className="text-muted">↑↓</kbd> {palette.hints.move}
        </span>
        <span>
          <kbd className="text-muted">↵</kbd> {palette.hints.select}
        </span>
        <span>
          <kbd className="text-muted">esc</kbd> {palette.hints.close}
        </span>
      </div>
    </dialog>
  );
}
