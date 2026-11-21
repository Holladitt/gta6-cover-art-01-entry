[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

# Heat Wave — Cover Studio

A free offline web app that turns your own golden-hour photos into GTA-style cover art: a multi-panel poster with a giant striped-chrome title, a pink script subtitle, a press quote, a tagline strip and a wanted stamp — exported as a PNG you can post anywhere.

This is an entry for the [gta6-cover-art-01 bounty](https://make.fun/bounty/gta6-cover-art-01) on make.fun. All of the art, lettering and code here is original; it uses no Rockstar Games logo, artwork or fonts.

## What it does

- **Eight-panel covers.** A hero photo plus six smaller panels, each with its own place name (Coral Row, Neon Mile, Sunset Keys, Tidewatch, Reef Side, Harbour Lights, Palm Court, Dune Road).
- **Any photo.** Load your own pictures from your machine, crop and position each panel with the Focus sliders, or swap any panel from the photo tray. Photos never leave your machine — the app makes no network request at all.
- **Three looks.** Poster, Magazine and Wanted.
- **Four layouts.** Bleed left, Bleed right, Postcard tilt and a nine-panel grid.
- **Three post sizes.** Landscape 1920×1080, Portrait 1080×1350 and Square 1080×1080, all exported in one click.
- **A real colour grade.** A WebGL shader grades every photo (warmth, saturation, vignette, plus a Golden hour / Vice pink / Dusk teal / Neon night preset); if WebGL is unavailable it falls back to a 2D canvas grade.
- **Your words.** Title, script subtitle, press quote, quoted-by line and tagline strip are all editable, and long text wraps onto two lines instead of being cut off.

## How to run it

The app is plain static files under `app/` — no build step, no install.

```sh
node serve.ts
```

Then open http://localhost:8123/ in a desktop browser. Or serve `app/` with any static file server and open `app/index.html`.

Node 22.18 or later is enough; the entry program `main.ts` runs on the same Node.

## How to export

1. Pick a look, a layout and a size.
2. Click a photo in the tray, then click a panel to put it there. Click a panel on its own to select it and nudge its focus.
3. Edit the words until the cover reads the way you want.
4. **Export PNG** downloads the current size; **Export all 3 sizes** downloads landscape, portrait and square in one go.

## Layout of this repo

- `app/index.html` — the whole studio: editor UI, cover renderer and WebGL grade, in one file.
- `app/samples/` — eight sample photos made for this entry (no real people).
- `screenshots/` — the cover and the editor, taken from the running app.
- `shots.json` — what each screenshot shows.
- `main.ts` — the entry program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json`.
- `serve.ts` — a small static server for local development.
- `vendor/makefun-app.ts` — the kit's dossier library, copied unchanged.

## License

MIT — see `LICENSE`.
