# mathiasbala.com

Single-page proof-of-work site. Next.js App Router, TypeScript, Tailwind CSS,
static export. No CMS, no database, no API routes, no analytics, no runtime
dependencies beyond React.

The design language is "blueprint + observability": a masked grid backdrop,
crop-mark panels, live status, and an illustrative request trace. Type is Geist
Sans / Geist Mono with Instrument Serif italic for one accent phrase per
heading.

Small client islands add the interactive details; everything else is
server-rendered and readable without JavaScript:

- **Top bar** with active-section tracking and a live WAT clock
- **Command palette** — `⌘K`, `Ctrl+K`, or `/`
- **Time-zone overlap strip** computed from the visitor's zone and `workHours`
  in `content.ts` (set those to your real hours)
- **Count-up metrics** (final values are in the HTML)
- **Interactive architecture diagram** with path toggles and a node inspector
- **Copy-email button** and toast, plus a cursor spotlight on fine pointers

The page follows the visitor's OS theme via `prefers-color-scheme`. There is no
toggle. Dark and light are two separately designed palettes rather than one
inverted — the accent changes outright between them, because the dark amber
`#ffb35c` only reaches 1.7:1 on white.

## Develop

```bash
pnpm install
pnpm dev
```

Runs on http://localhost:3111.

## Edit the copy

Every string on the page lives in [`content.ts`](content.ts). Change copy there;
the components read from it and never hardcode text. The only exception is the
CV file itself, which lives in `public/`.

## Replace the CV

`public/Mathias_Bala_Backend_Engineer.pdf` is a placeholder. Overwrite it with
the real CV and keep the filename — `content.ts` links to it by that exact path.

## Build

```bash
pnpm build
```

Writes a fully static site to `out/`. There is no server component of this
project at runtime; every route is prerendered HTML.

`prebuild` runs `scripts/og.mjs` first, which renders `public/og.png` — the
social card people see when the link is pasted into Slack, WhatsApp, or
LinkedIn. It reads from `content.ts`, so the card always matches the page. To
regenerate it on its own:

```bash
pnpm og
```

This deliberately avoids Next's `app/opengraph-image.tsx` convention: under
`output: "export"` that emits a file with no extension, and static hosts then
serve it with the wrong content type, which stops scrapers from rendering it.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel detects Next.js. Confirm the settings and leave them as detected —
   `output: "export"` in `next.config.ts` makes the build emit static files, and
   Vercel serves them from its CDN.
   - Framework preset: **Next.js**
   - Build command: `pnpm build`
   - Install command: `pnpm install`
4. **Deploy.** Every push to the default branch ships to production; every other
   branch gets a preview URL.

From the CLI instead:

```bash
npx vercel --prod
```

## Point the apex domain

1. In Vercel, open the project → **Settings → Domains**.
2. Add `mathiasbala.com`. Vercel will also offer to add `www.mathiasbala.com`
   and redirect it to the apex — accept that.
3. At your DNS registrar, create the records Vercel shows you:

   | Type  | Name  | Value                   |
   | ----- | ----- | ----------------------- |
   | A     | `@`   | `76.76.21.21`           |
   | CNAME | `www` | `cname.vercel-dns.com.` |

   Vercel displays the current values on the Domains page — use those if they
   differ from the table above.
4. Wait for propagation. Vercel issues the TLS certificate automatically once
   the records resolve; the domain shows **Valid Configuration** when it's done.

If the registrar supports ALIAS or ANAME records at the apex, use
`cname.vercel-dns.com.` there instead of the A record.

## Performance notes

The page is text and inline SVG, so there are no images to optimize. All
motion is CSS (keyframes, scroll-driven `animation-timeline`, and a registered
`@property` clock for the trace) and is disabled under
`prefers-reduced-motion`. All
content is in the server-rendered HTML — nothing waits on JavaScript to appear.
The scroll reveal uses CSS `animation-timeline: view()`, which degrades to
static content in browsers that don't support it, and is disabled under
`prefers-reduced-motion`.

Fonts are self-hosted by `next/font` and preloaded with `display: swap` so text
renders before they land.

There is also a print stylesheet. Recruiters save profiles to PDF, and without
it the dark background prints as a black rectangle; the print rules force the
light palette, hide the top bar, palette, grid and grain, and append link
targets after each anchor so the paper copy stays verifiable.
