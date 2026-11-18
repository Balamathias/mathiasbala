"use client";
import { useState } from "react";
import { architecture, type ArchNodeKey } from "@/content";
import { Corners } from "./Corners";
import { SectionHeader } from "./SectionHeader";

type Path = "sync" | "async";
type Mode = Path | "all";

const W = 252;
const H = 52;

const boxes: { key: ArchNodeKey; x: number; y: number; path: Path }[] = [
  { key: "client", x: 8, y: 8, path: "sync" },
  { key: "api", x: 8, y: 92, path: "sync" },
  { key: "db", x: 380, y: 92, path: "sync" },
  { key: "workers", x: 8, y: 176, path: "async" },
  { key: "redis", x: 380, y: 176, path: "async" },
  { key: "router", x: 8, y: 260, path: "async" },
  { key: "models", x: 380, y: 260, path: "async" },
];

const edges: {
  d: [number, number, number, number];
  path: Path;
  both?: boolean;
  touches: ArchNodeKey[];
}[] = [
  { d: [134, 60, 134, 92], path: "sync", touches: ["client", "api"] },
  { d: [260, 118, 380, 118], path: "sync", touches: ["api", "db"] },
  { d: [134, 144, 134, 176], path: "async", touches: ["api", "workers"] },
  { d: [260, 202, 380, 202], path: "async", both: true, touches: ["workers", "redis"] },
  { d: [134, 228, 134, 260], path: "async", touches: ["workers", "router"] },
  { d: [260, 286, 380, 286], path: "async", touches: ["router", "models"] },
  { d: [134, 312, 134, 344], path: "async", touches: ["router", "retrieval"] },
];

const color = (p: Path) => (p === "async" ? "var(--color-accent)" : "var(--color-muted)");

export function ArchitectureDiagram() {
  const [mode, setMode] = useState<Mode>("all");
  const [active, setActive] = useState<ArchNodeKey | null>(null);
  const a = architecture;

  const dim = (p: Path) => mode !== "all" && mode !== p;

  const nodeProps = (key: ArchNodeKey) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-label": `${a.nodes[key]}: ${a.notes[key]}`,
    onMouseEnter: () => setActive(key),
    onFocus: () => setActive(key),
    onClick: () => setActive(key),
    className: "cursor-pointer outline-none",
  });

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="py-24 sm:py-32">
      <SectionHeader id="architecture" index={a.index} label={a.label} heading={a.heading} />

      <figure className="reveal">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Highlight a path"
            className="flex rounded-full border border-line bg-surface/60 p-1 backdrop-blur"
          >
            {[{ key: "all" as const, text: a.showAll }, ...a.legend].map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={mode === item.key}
                onClick={() => setMode(item.key)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.7rem] whitespace-nowrap transition-colors sm:px-3.5 ${
                  mode === item.key
                    ? "bg-raised text-text shadow-[inset_0_0_0_1px_var(--color-line-strong)]"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.key !== "all" && (
                  <span
                    aria-hidden
                    className={`hidden h-px w-4 sm:block ${item.key === "async" ? "bg-accent" : "bg-muted"}`}
                  />
                )}
                {item.text}
              </button>
            ))}
          </div>
          <p className="hidden font-mono text-[0.7rem] text-faint md:block">{a.hint}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Desktop / tablet: the SVG diagram */}
          <div className="group relative hidden rounded-md border border-line bg-surface/70 p-6 backdrop-blur-sm sm:block lg:col-span-8">
            <Corners />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-md opacity-60 [background-image:radial-gradient(var(--color-line-strong)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
            />
            <svg
              viewBox="0 0 640 424"
              className="relative w-full font-sans"
              role="group"
              aria-label={a.alt}
              onMouseLeave={() => setActive(null)}
            >
              <defs>
                {(["sync", "async"] as const).map((p) => (
                  <marker
                    key={p}
                    id={`tip-${p}`}
                    viewBox="0 0 8 8"
                    refX={8}
                    refY={4}
                    markerWidth={7}
                    markerHeight={7}
                    markerUnits="userSpaceOnUse"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L8,4 L0,8 z" fill={color(p)} />
                  </marker>
                ))}
              </defs>

              {edges.map(({ d: [x1, y1, x2, y2], path, both, touches }, i) => {
                const hot = active && touches.includes(active);
                return (
                  <g
                    key={i}
                    style={{
                      opacity: dim(path) ? 0.12 : 1,
                      transition: "opacity 400ms ease",
                    }}
                  >
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2 - (y1 === y2 ? 0 : 1)}
                      stroke={color(path)}
                      strokeWidth={hot ? 2 : 1.25}
                      strokeOpacity={hot ? 1 : 0.55}
                      markerEnd={`url(#tip-${path})`}
                      markerStart={both ? `url(#tip-${path})` : undefined}
                    />
                    <line
                      className="flow"
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={path === "async" ? "var(--color-accent)" : "var(--color-text)"}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeDasharray="0 1000"
                      style={{ ["--d" as string]: `${i * 320}ms` }}
                    />
                  </g>
                );
              })}

              {boxes.map(({ key, x, y, path }) => {
                const on = active === key;
                return (
                  <g
                    key={key}
                    {...nodeProps(key)}
                    style={{ opacity: dim(path) ? 0.3 : 1, transition: "opacity 400ms ease" }}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={W}
                      height={H}
                      rx={10}
                      fill={on ? "var(--color-accent-soft)" : "var(--color-raised)"}
                      stroke={on ? "var(--color-accent)" : "var(--color-line-strong)"}
                      strokeWidth={1}
                      style={{ transition: "fill 250ms ease, stroke 250ms ease" }}
                    />
                    <circle cx={x + 18} cy={y + H / 2} r={3} fill={color(path)} />
                    <text
                      x={x + 32}
                      y={y + H / 2 + 5}
                      fontSize={14}
                      fill="var(--color-text)"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {a.nodes[key]}
                    </text>
                  </g>
                );
              })}

              <g
                {...nodeProps("retrieval")}
                style={{ opacity: dim("async") ? 0.3 : 1, transition: "opacity 400ms ease" }}
              >
                <rect
                  x={8}
                  y={344}
                  width={624}
                  height={72}
                  rx={10}
                  fill={active === "retrieval" ? "var(--color-accent-soft)" : "var(--color-raised)"}
                  stroke={active === "retrieval" ? "var(--color-accent)" : "var(--color-line-strong)"}
                  strokeWidth={1}
                  style={{ transition: "fill 250ms ease, stroke 250ms ease" }}
                />
                <text
                  x={28}
                  y={372}
                  fontSize={10.5}
                  letterSpacing="0.18em"
                  className="font-mono"
                  fill="var(--color-muted)"
                >
                  {a.nodes.retrieval.toUpperCase()}
                </text>
                <text x={28} y={397} fontSize={13} className="font-mono" fill="var(--color-text)">
                  {a.retrievalChain}
                </text>
              </g>
            </svg>
          </div>

          {/* Inspector */}
          <aside
            aria-live="polite"
            className="hidden rounded-md border border-line bg-surface/70 p-6 backdrop-blur-sm sm:block lg:col-span-4 lg:flex lg:flex-col"
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
              {active ? "Inspecting" : a.idle}
            </p>
            <p className="mt-4 text-xl font-medium tracking-[-0.02em]">
              {active ? a.nodes[active] : a.nodes.api}
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              {active ? a.notes[active] : a.notes.api}
            </p>
            <ul className="mt-8 flex flex-wrap gap-1.5 border-t border-line pt-6">
              {(Object.keys(a.nodes) as ArchNodeKey[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setActive(key)}
                    aria-pressed={active === key}
                    className={`rounded-md border px-2 py-1 font-mono text-[0.68rem] transition-colors ${
                      active === key
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line text-muted hover:border-line-strong hover:text-text"
                    }`}
                  >
                    {a.nodes[key]}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-8 text-sm leading-relaxed text-faint">{a.caption}</p>
          </aside>

          {/* Mobile: a vertical flow with every note visible */}
          <ol className="relative space-y-3 sm:hidden" aria-label={a.alt}>
            <span aria-hidden className="absolute top-4 bottom-4 left-[15px] w-px bg-line-strong" />
            {(Object.keys(a.nodes) as ArchNodeKey[]).map((key) => {
              const path = boxes.find((b) => b.key === key)?.path ?? "async";
              return (
                <li
                  key={key}
                  className="relative grid grid-cols-[2rem_1fr] gap-3"
                  style={{ opacity: dim(path) ? 0.3 : 1, transition: "opacity 400ms ease" }}
                >
                  <span
                    aria-hidden
                    className="relative z-10 mt-4 ml-[11px] size-[9px] rounded-full ring-4 ring-ink"
                    style={{ background: color(path) }}
                  />
                  <div className="rounded-xl border border-line bg-surface/80 p-4">
                    <p className="font-medium tracking-[-0.01em]">{a.nodes[key]}</p>
                    {key === "retrieval" && (
                      <p className="mt-1 font-mono text-[0.68rem] text-accent">{a.retrievalChain}</p>
                    )}
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.notes[key]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <figcaption className="mt-4 max-w-[56ch] text-sm leading-relaxed text-muted sm:hidden">
          {a.caption}
        </figcaption>
      </figure>
    </section>
  );
}
