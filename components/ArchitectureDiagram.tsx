import { architecture } from "@/content";
import { SectionLabel } from "./SectionLabel";

const n = architecture.nodes;

function Box({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={252}
        height={52}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
      />
      <text
        x={x + 126}
        y={y + 31}
        textAnchor="middle"
        fontSize={14}
        fill="var(--color-text)"
      >
        {label}
      </text>
    </g>
  );
}

export function ArchitectureDiagram() {
  return (
    <section className="py-16">
      <SectionLabel>{architecture.label}</SectionLabel>

      <figure className="reveal">
        <div className="overflow-x-auto border border-line bg-surface p-4 sm:p-6">
          <svg
            viewBox="0 0 640 424"
            className="w-full min-w-[600px] font-sans"
            role="img"
            aria-label={architecture.alt}
          >
            <defs>
              <marker
                id="tip-line"
                viewBox="0 0 8 8"
                refX={8}
                refY={4}
                markerWidth={8}
                markerHeight={8}
                markerUnits="userSpaceOnUse"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="var(--color-muted)" />
              </marker>
              <marker
                id="tip-accent"
                viewBox="0 0 8 8"
                refX={8}
                refY={4}
                markerWidth={8}
                markerHeight={8}
                markerUnits="userSpaceOnUse"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="var(--color-accent)" />
              </marker>
            </defs>

            <g
              stroke="var(--color-muted)"
              strokeWidth={1.25}
              markerEnd="url(#tip-line)"
            >
              <line x1={134} y1={60} x2={134} y2={92} />
              <line x1={260} y1={118} x2={380} y2={118} />
            </g>

            <g
              stroke="var(--color-accent)"
              strokeWidth={1.25}
              markerEnd="url(#tip-accent)"
            >
              <line x1={134} y1={144} x2={134} y2={176} />
              <line x1={134} y1={228} x2={134} y2={260} />
              <line x1={134} y1={312} x2={134} y2={344} />
              <line x1={260} y1={286} x2={380} y2={286} />
              <line
                x1={260}
                y1={202}
                x2={380}
                y2={202}
                markerStart="url(#tip-accent)"
              />
            </g>

            <Box x={8} y={8} label={n.client} />
            <Box x={8} y={92} label={n.api} />
            <Box x={380} y={92} label={n.db} />
            <Box x={8} y={176} label={n.workers} />
            <Box x={380} y={176} label={n.redis} />
            <Box x={8} y={260} label={n.router} />
            <Box x={380} y={260} label={n.models} />

            <rect
              x={8}
              y={344}
              width={624}
              height={72}
              fill="var(--color-surface)"
              stroke="var(--color-line-strong)"
              strokeWidth={1}
            />
            <text
              x={28}
              y={372}
              fontSize={11}
              letterSpacing="0.16em"
              className="font-mono"
              fill="var(--color-muted)"
            >
              {n.retrievalTitle.toUpperCase()}
            </text>
            <text
              x={28}
              y={397}
              fontSize={13}
              className="font-mono"
              fill="var(--color-text)"
            >
              {n.retrievalChain}
            </text>
          </svg>
        </div>

        <p className="mt-3 font-mono text-xs text-muted sm:hidden">
          {architecture.scrollHint}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {architecture.legend.map((item) => (
            <span
              key={item.key}
              className="flex items-center gap-2 font-mono text-xs text-muted"
            >
              <span
                aria-hidden
                className={`h-px w-6 ${
                  item.key === "async" ? "bg-accent" : "bg-muted"
                }`}
              />
              {item.text}
            </span>
          ))}
        </div>

        <figcaption className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">
          {architecture.caption}
        </figcaption>
      </figure>
    </section>
  );
}
