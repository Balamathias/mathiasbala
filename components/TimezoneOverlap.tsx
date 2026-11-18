"use client";
import { hero, overlap, workHours } from "@/content";
import { useMounted } from "@/lib/useMounted";

const VISITOR_DAY = { start: 9, end: 17 };

const wrap = (h: number) => ((h % 24) + 24) % 24;
const fmt = (h: number) => {
  const w = wrap(h);
  const hh = Math.floor(w);
  const mm = Math.round((w - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

/** Splits a [start, end) range on a 24h ring into ≤2 non-wrapping segments. */
function segments(start: number, end: number): [number, number][] {
  const s = wrap(start);
  const len = end - start;
  return s + len <= 24 ? [[s, s + len]] : [[s, 24], [0, s + len - 24]];
}

function overlapHours(a: [number, number][], b: [number, number][]) {
  let total = 0;
  for (const [as, ae] of a)
    for (const [bs, be] of b) total += Math.max(0, Math.min(ae, be) - Math.max(as, bs));
  return total;
}

export function TimezoneOverlap() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <p className="min-h-[5.5rem] max-w-[52ch] text-sm leading-relaxed text-muted">
        {hero.availability}
      </p>
    );
  }

  const visitorOffset = -new Date().getTimezoneOffset() / 60;
  const shift = visitorOffset - workHours.utcOffset;
  const mine = segments(workHours.start + shift, workHours.end + shift);
  const yours = segments(VISITOR_DAY.start, VISITOR_DAY.end);
  const shared = overlapHours(mine, yours);
  const same = shift === 0;
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  const city = zone.split("/").pop()?.replace(/_/g, " ");

  const pct = (h: number) => `${(h / 24) * 100}%`;
  const sharedRounded = Math.round(shared * 2) / 2;

  return (
    <div className="min-h-[5.5rem]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-sm text-text">
          {same ? (
            overlap.sameZone
          ) : sharedRounded > 0 ? (
            <>
              <span className="font-mono text-accent">{sharedRounded}h</span>{" "}
              {overlap.overlapSuffix}
              {city ? <span className="text-muted"> in {city}</span> : null}.
            </>
          ) : (
            overlap.noOverlap
          )}
        </p>
        {!same && (
          <p className="font-mono text-[0.7rem] text-muted">
            {fmt(workHours.start)}–{fmt(workHours.end)} {workHours.zone} ={" "}
            <span className="text-text">
              {fmt(workHours.start + shift)}–{fmt(workHours.end + shift)}
            </span>{" "}
            {overlap.yourTime}
          </p>
        )}
      </div>

      <div className="relative mt-4 h-7" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        {Array.from({ length: 25 }, (_, h) => (
          <span
            key={h}
            className={`absolute top-1/2 w-px -translate-y-1/2 bg-line-strong ${
              h % 6 === 0 ? "h-3" : "h-1.5"
            }`}
            style={{ left: pct(h) }}
          />
        ))}
        {yours.map(([s, e], i) => (
          <span
            key={`y${i}`}
            className="absolute top-[calc(50%+3px)] h-1.5 rounded-full bg-muted/40"
            style={{ left: pct(s), width: pct(e - s) }}
          />
        ))}
        {mine.map(([s, e], i) => (
          <span
            key={`m${i}`}
            className="absolute top-[calc(50%-9px)] h-1.5 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]"
            style={{ left: pct(s), width: pct(e - s) }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[0.6rem] text-faint" aria-hidden>
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <div className="mt-2 flex gap-5 font-mono text-[0.65rem] text-muted" aria-hidden>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-accent" />
          {overlap.mine}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-muted/40" />
          {overlap.yours}
        </span>
      </div>
    </div>
  );
}
