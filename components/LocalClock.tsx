"use client";
import { status, workHours } from "@/content";
import { ownerTime } from "@/lib/time";
import { useNow } from "@/lib/useNow";

/** "14:32 WAT" once mounted; the static zone label before that and without JS. */
export function LocalClock({ className }: { className?: string }) {
  const now = useNow();
  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {now ? `${ownerTime(now)} ${workHours.zone}` : status.zoneFallback}
    </time>
  );
}
