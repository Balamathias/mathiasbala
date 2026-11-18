"use client";
import { useEffect, useState } from "react";

/** A Date that updates every `ms`, or null before mount. */
export function useNow(ms = 15_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}
