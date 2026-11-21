# Heat Wave — GTA 6 Cover Art Studio

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/c/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/c/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/c/gta6-cover-art-01)

**Heat Wave** is a cover-art studio for the [make.fun GTA 6 Cover Art bounty](https://make.fun/c/gta6-cover-art-01).
It turns golden-hour photos into a full-bleed multi-panel poster cover: eight
place-tagged panels edge to edge with no outer frame, an enormous 3D-extruded
gradient title sitting on the photos, a pink script subtitle, press-quote top
line, EST. 2026 / VOL. 06 badges, a red WANTED stamp, tagline strip and billing
block — then exports it as a PNG.

## Try it

```sh
node serve.ts            # http://localhost:8080
```

Node 22 or later, no dependencies, no network: the app is plain static files under
`app/` and runs fully offline. The photos never leave the machine.

## What it does

- **Looks** — three one-click presets: Poster (bleed left, golden hour),
  Magazine (bleed right, vice pink), Wanted (postcard tilt, dusk teal). Each
  preset sets the layout, the grade and the wording in one tap.
- **Full-bleed layouts** — bleed left, bleed right, postcard tilt (a hero
  centerpiece with six tilted corner snapshots), and a nine grid. The hero
  portrait takes about half the cover; every panel carries its own place tag
  (Coral Row, Neon Mile, Sunset Keys, Tidewatch, Reef Side, Harbour Lights,
  Palm Court, Dune Road).
- **Your photos** — load your own pictures, cast them into any panel, and nudge
  each panel's focus point so faces never get cropped out. Click a panel on
  the cover to select it.
- **Golden-hour grade** — four presets (Golden hour, Vice pink, Dusk teal,
  Neon night) plus warmth, saturation and vignette sliders, applied evenly
  across every panel so the cover feels like one photoshoot.
- **Words** — edit the title, script subtitle, press quote, quoted-by line and
  tagline strip. The title renders as a 3D extruded stack: a dark purple
  extrusion stepping down-right, a gold-to-pink gradient fill, and a bright
  top edge. A red WANTED stamp marks the cover "for sunset crimes".
- **Sizes** — landscape 1920×1080, portrait 1080×1350, square 1080×1080, all
  exported as PNG with one click, or all three at once.

## Sample photos

The eight photos under `app/samples/` were made for this entry with an image model,
all golden-hour coastal shots with people in them. They are free to use as samples;
replace them with your own photos in the studio.

## Hand in

```sh
MAKEFUN_OUTPUT_DIR=/tmp/heatwave-out node main.ts   # writes /tmp/heatwave-out/{app,screenshots,dossier.json}
node ~/workspace/tools/makefun/gta6-cover-art-01-kit/cli/makefun.mjs check --kit ~/workspace/tools/makefun/gta6-cover-art-01-kit --repo .
```

## License

MIT — see [LICENSE](LICENSE).
