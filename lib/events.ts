"use client";

/** Tiny decoupled event bus so server-rendered islands can talk. */
export const openPalette = () => window.dispatchEvent(new Event("palette:open"));

export const toast = (message: string) =>
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
