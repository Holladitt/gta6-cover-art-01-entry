# Sunset State — GTA 6 Cover Art Studio

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/c/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/c/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/c/gta6-cover-art-01)

**Sunset State** is a cover-art studio for the [make.fun GTA 6 Cover Art bounty](https://make.fun/c/gta6-cover-art-01).
It turns golden-hour photos into a multi-panel poster cover in the style of a Vice City
sunset: one giant hero portrait, a cast of supporting panels, an enormous retro-chrome
title sitting on the photos, a pink script subtitle, press-quote top line, role tags,
billing block, and a gold starburst seal — then exports it as a PNG.

## Try it

```sh
node serve.ts            # http://localhost:8080
```

Node 22 or later, no dependencies, no network: the app is plain static files under
`app/` and runs fully offline. The photos never leave the machine.

## What it does

- **Hero-led layouts** — hero center, hero left, hero right, plus a grid. The hero
  portrait takes about half the cover; every panel shows a person (driver, skipper,
  rider, lookout, boss, mechanic, courier, wheelman).
- **Your photos** — load your own pictures, cast them into any panel, and nudge each
  panel's focus point so faces never get cropped out.
- **Golden-hour grade** — three presets (Golden hour, Vice pink, Dusk teal) plus
  warmth, saturation and vignette sliders, applied evenly across every panel so the
  cover feels like one photoshoot.
- **Words** — edit the title, script subtitle, press quote, quoted-by line and
  tagline strip. The title renders with horizontal retro-chrome stripes (yellow to
  magenta), a thick dark outline and one hard drop shadow.
- **Sizes** — landscape 1920×1080, portrait 1080×1350, square 1080×1080, all exported
  as PNG with one click.

## Sample photos

The eight photos under `app/samples/` were made for this entry with an image model,
all golden-hour coastal shots with people in them. They are free to use as samples;
replace them with your own photos in the studio.

## Hand in

```sh
MAKEFUN_OUTPUT_DIR=/tmp/sunset-out node main.ts   # writes /tmp/sunset-out/{app,screenshots,dossier.json}
node ~/workspace/tools/makefun/gta6-cover-art-01-kit/cli/makefun.mjs check --kit ~/workspace/tools/makefun/gta6-cover-art-01-kit --repo .
```

## License

MIT — see [LICENSE](LICENSE).
