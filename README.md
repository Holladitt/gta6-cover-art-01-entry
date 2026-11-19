# Sunset State — Cover Studio

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/bounty/gta6-cover-art-01)

An offline web app that turns any photo into GTA 6-style cover art and exports it as a PNG. Built for the [Make GTA 6 Cover Art](https://make.fun/bounty/gta6-cover-art-01) bounty on make.fun. Everything runs in the browser — photos never leave the machine.

## What it does

- **Photo-led covers**: drop in your own photos or use the 8 included samples. One photo fills every panel with different crops; several spread across panels.
- **Three editions**: Sunset State (landscape), Heat Wave (portrait) and Night Drive (mosaic), each with its own title, script subtitle, kicker line and bottom strip.
- **Studio controls**: nine layouts (Hero Left, Hero Right, Grid 3×3, Center Stage, Mosaic, 1–4 panels), six Vice-City grade presets with Strength / Contrast / Saturation / Grain / Vignette sliders, halftone dots and speed lines, and full text editing (title, tagline, kicker, strip, badge, volume, ribbon, HUD word, stars).
- **Per-panel editing**: click a panel to select it, drag to move the photo, double-click to re-center, change its photo, zoom, grade, swap it with another panel, or rewrite its location chip (place + time + tagline).
- **Real grading**: photos are graded in WebGL (saturation, contrast, warmth, teal shadows, vignette, grain, halftone, speed lines) with a 2D canvas fallback, and the same grade is baked into the export.
- **One-click export**: PNG at 1920×1080, 1080×1350 and 1080×1080 — individually or all three at once.

## Run it

```sh
node serve.ts
# open http://127.0.0.1:8080/
```

No build step, no network, no dependencies. `main.ts` (Node 22) hands the entry in: it copies `app/` and `screenshots/` to `/output` and writes `dossier.json` with the vendored make.fun library.

## Screenshots

1. Sunset State cover (landscape)
2. The studio UI
3. Heat Wave cover (portrait)
4. Night Drive cover (landscape)

## License

MIT — see [LICENSE](LICENSE).
