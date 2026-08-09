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
import { hero } from "../content.ts";

const h = (style, children) => React.createElement("div", { style }, children);

const card = h(
  {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#0a0c0e",
    color: "#e9ecef",
    padding: "88px 96px",
    fontFamily: "sans-serif",
  },
  [
    h(
      {
        key: "name",
        fontSize: 88,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        display: "flex",
      },
      hero.name,
    ),
    h(
      {
        key: "summary",
        marginTop: 32,
        fontSize: 36,
        color: "#98a2ac",
        lineHeight: 1.35,
        maxWidth: 920,
        display: "flex",
      },
      hero.summary,
    ),
    h({ key: "rule", display: "flex", marginTop: 56 }, [
      h({ key: "bar", width: 6, background: "#ffb35c" }),
      h(
        {
          key: "label",
          paddingLeft: 24,
          fontSize: 28,
          color: "#ffb35c",
          display: "flex",
          alignItems: "center",
        },
        "Available for remote contract work · WAT / UTC+1",
      ),
    ]),
  ],
);

const image = new ImageResponse(card, { width: 1200, height: 630 });
const bytes = Buffer.from(await image.arrayBuffer());
await writeFile("public/og.png", bytes);
console.log(`prebuild: wrote public/og.png (${bytes.length} bytes)`);
