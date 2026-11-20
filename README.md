# Sunset State — GTA 6 Cover Art Studio

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![Rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![Reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/bounty/gta6-cover-art-01)

An offline web app that turns any photo into GTA 6-style cover art and exports
it as a PNG. Add photos, pick a layout and grade, type your title, export.

## What it does

- **Photo-led covers** — a hero-left 7-panel collage (plus Hero Right, Grid 3×3,
  Center Stage, Mosaic, and 1–4 panel splits), every panel carrying a location
  chip with a place, a time, and a tagline.
- **Three cover variants** — Sunset State (landscape), Heat Wave (portrait),
  Night Drive (mosaic), each with its own title, script line, strip, and kicker.
- **Real grading** — photos are graded with a WebGL shader (Vice Sunset, Neon
  Nights, Golden Hour, Noir Heat, Comic Ink, Natural) with strength, contrast,
  saturation, grain, and vignette sliders, plus halftone dots and speed lines.
  A 2D canvas filter chain takes over when WebGL is unavailable.
- **Cover chrome** — big 3D-gradient title, EST. 2026 badge, VOL. 06 tag,
  COLLECTOR'S EDITION ribbon, WANTED five-star chip, bottom strip, catalog line.
- **Exports** — PNG at 1920×1080, 1080×1350, and 1080×1080, one at a time or
  all three together. Photos never leave the machine.

## Run it

```sh
node serve.ts        # studio at http://localhost:8095/
node main.ts         # hands app/ + screenshots/ to /output (or ./out) + dossier.json
```

## Layout

- `app/index.html` — the whole studio (single file, no network references).
- `app/samples/` — 8 sample photos, generated for this entry.
- `screenshots/` — 4 renders: the Sunset State cover, the studio UI, the Heat
  Wave cover, and the Night Drive cover.
- `main.ts` — entrypoint: copies `app/` + `screenshots/` and writes
  `dossier.json` with the kit's `buildDossier`.
- `vendor/makefun-app.ts` — the kit's app library, copied unchanged.

Everything on the covers is original — no Rockstar logo, artwork, or fonts.
