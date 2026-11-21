# Heat Wave — Cover Studio

An offline web app that turns your photos plus captions into GTA 6-style
cover art and exports it as a PNG.

## What it does

- **Multi-panel cover** — a giant hero photo with six smaller panels (or a
  3×3 nine-grid), each carrying a short location chip: Coral Row, Neon Mile,
  Sunset Keys, Tidewatch, Reef Side, Harbour Lights, Palm Court, Dune Road.
- **Chrome title** — HEAT WAVE in huge retro-chrome letters with a thick dark
  outline and one hard shadow, plus the pink script subtitle *Golden Hour*.
- **Press line, strip, billing** — five gold stars and a press quote up top
  (EST. 2026 / VOL. 06 chips), the pink-to-orange tagline strip
  *EIGHT LIVES · ONE HEAT WAVE · ZERO REGRETS*, COMING SOON, the billing
  line and a barcode at the bottom, and a red slanted WANTED stamp
  (*FOR SUNSET CRIMES*) across the mechanic panel.
- **Looks, layouts, sizes** — Poster / Magazine / Wanted looks; Bleed left /
  Bleed right / Postcard tilt / Nine grid layouts; Landscape 1920×1080,
  Portrait 1080×1350 and Square 1080×1080 sizes.
- **Grade** — Golden hour / Vice pink / Dusk teal / Neon night presets plus
  Warmth, Saturation and Vignette sliders, rendered through a WebGL shader
  (with a 2D canvas fallback when WebGL is unavailable), one unified warm
  grade across every panel.
- **Words** — title, script subtitle, press quote, quoted-by and tagline
  fields. Every field shows its full text; nothing is cut off.
- **Photos** — eight built-in golden-hour sample photos in the tray. Click a
  tray photo to arm it, then click a cover panel to swap it in; click a panel
  on its own to select it and nudge its focus with the Focus X / Focus Y
  sliders. You can also upload your own photo into the selected panel.
- **Export** — *Export PNG* saves the current size; *Export all 3 sizes*
  saves landscape, portrait and square in one go.

## Run it

```sh
node serve.ts 8131
# open http://localhost:8131/
```

Everything runs offline in the page: no network requests, no uploads, no
accounts. Your photos never leave the machine.

## Entrypoint

```sh
MAKEFUN_OUTPUT_DIR=/output node main.ts
```

Copies `app/` and `screenshots/` into the output directory and writes
`dossier.json` there. It refuses to run if the output directory is inside
the repository.

## License

MIT — see `LICENSE`.
