import { trace } from "@/content";
import { Corners } from "./Corners";

/** Illustrative span waterfall. Pure CSS animation, static under reduced motion. */
export function RequestTrace() {
  return (
    <figure
      className="group relative rounded-md border border-line bg-surface/80 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] backdrop-blur-sm"
      aria-label={`${trace.title}: ${trace.route} (${trace.disclaimer})`}
    >
      <Corners />
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5 font-mono text-[0.7rem]">
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </span>
          <span className="uppercase tracking-[0.18em] text-muted">{trace.title}</span>
          <span className="text-text">{trace.route}</span>
        </div>
        <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-faint">
          {trace.disclaimer}
        </span>
      </div>

      <div className="px-4 pt-3 pb-4">
        <div className="mb-2 flex justify-between pl-[42%] font-mono text-[0.6rem] text-faint" aria-hidden>
          {trace.axis.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <ol className="trace-run space-y-[7px]">
          {trace.spans.map((s, i) => {
            const nested = s.name !== "http.request" && s.name !== "worker.retrieve" && s.kind !== "mark";
            const start = { ["--s" as string]: (s.start / 100) * 0.95 };
            return (
              <li key={s.name} className="grid grid-cols-[42%_1fr] items-center gap-0 font-mono text-[0.68rem]">
                <span
                  className={`truncate ${
                    s.kind === "mark" ? "text-signal" : nested ? "pl-3 text-muted" : "text-text"
                  }`}
                >
                  {nested && <span className="mr-1 text-faint">└</span>}
                  {s.name}
                </span>
                <span className="relative h-3.5" aria-hidden>
                  <span className="absolute inset-y-[6px] left-0 right-0 border-t border-dashed border-line" />
                  {s.kind === "mark" ? (
                    <span
                      className="trace-mark absolute -top-1 -bottom-1 w-px bg-signal"
                      style={{ left: `${s.start}%`, ...start }}
                    />
                  ) : (
                    <span
                      className={`trace-bar absolute inset-y-0 rounded-[3px] ${
                        s.kind === "sync"
                          ? "bg-text/70"
                          : i === 5
                            ? "bg-accent/25 ring-1 ring-accent/50 ring-inset"
                            : "bg-accent"
                      }`}
                      style={{
                        left: `${s.start}%`,
                        width: `${s.width}%`,
                        ...start,
                      }}
                    />
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <figcaption className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-4 py-2.5 font-mono text-[0.62rem] text-muted">
        {trace.footer.map((f) => (
          <span key={f.key} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`h-1.5 w-3 rounded-sm ${f.key === "sync" ? "bg-text/70" : "bg-accent"}`}
            />
            {f.text}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
