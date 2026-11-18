// Renders public/og.png from content.ts. Runs as prebuild, so the social card
// always matches the copy on the page.
//
// This deliberately does not use Next's app/opengraph-image convention: under
// `output: "export"` that emits a file with no extension, leaving static hosts
// to guess the content type. Social scrapers need image/png, so we write a
// real .png and reference it from metadata instead.
import { writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import React from "react";
import { hero, site } from "../content.ts";

const h = (style, children) => React.createElement("div", { style }, children);

const INK = "#08090b";
const TEXT = "#eceef0";
const MUTED = "#8f97a1";
const ACCENT = "#ffb35c";
const SIGNAL = "#4ade80";
const LINE = "#1a1e24";

const card = h(
  {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: INK,
    backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
    backgroundSize: "64px 64px",
    color: TEXT,
    padding: "72px 88px",
    fontFamily: "sans-serif",
  },
  [
    h(
      { key: "top", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: MUTED },
      [
        h({ key: "w", display: "flex" }, site.wordmark),
        h({ key: "s", display: "flex", alignItems: "center", gap: 14, color: TEXT }, [
          h({ key: "dot", width: 14, height: 14, borderRadius: 999, background: SIGNAL }),
          h({ key: "t", display: "flex" }, hero.badge),
        ]),
      ],
    ),
    h({ key: "mid", display: "flex", flexDirection: "column" }, [
      h(
        { key: "name", display: "flex", fontSize: 128, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95 },
        [h({ key: "n", display: "flex" }, hero.name), h({ key: "p", display: "flex", color: ACCENT }, ".")],
      ),
      h(
        { key: "summary", display: "flex", marginTop: 36, fontSize: 34, color: MUTED, lineHeight: 1.35, maxWidth: 940 },
        hero.summary,
      ),
    ]),
    h({ key: "bottom", display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: ACCENT }, [
      h({ key: "bar", width: 48, height: 3, background: ACCENT }),
      h({ key: "z", display: "flex" }, `${site.url.replace("https://", "")}  ·  WAT / UTC+1  ·  ${hero.credential}`),
    ]),
  ],
);

const image = new ImageResponse(card, { width: 1200, height: 630 });
const bytes = Buffer.from(await image.arrayBuffer());
await writeFile("public/og.png", bytes);
console.log(`prebuild: wrote public/og.png (${bytes.length} bytes)`);
