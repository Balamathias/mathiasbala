import { workHours } from "@/content";

/** Current time in the owner's zone, e.g. "14:32". */
export function ownerTime(now = new Date()) {
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const m = (utcMinutes + workHours.utcOffset * 60 + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Whether the owner is inside their working window right now. */
export function ownerIsWorking(now = new Date()) {
  const h = (now.getUTCHours() + workHours.utcOffset + 24) % 24;
  return h >= workHours.start && h < workHours.end;
}
