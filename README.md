# Sunset State — GTA 6-style cover art maker

[![make.fun](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/rank.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Holladitt/gta6-cover-art-01-entry/reward.svg)](https://make.fun/bounty/gta6-cover-art-01)

An offline web app that turns any photo plus a caption into GTA 6-style cover
art, exported as a PNG to share. Pick photos, spread them across the panels,
grade them with a Vice City sunset or neon look, write the caption, and export
in the common post sizes: 1920 × 1080, 1080 × 1350 and 1080 × 1080.

Everything is original: no Rockstar Games logo, artwork or font. Photos are
read on your own machine and never uploaded; the grade runs in WebGL with a
2D fallback, entirely offline.

## Try it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and
writes `dossier.json` there with the kit's `buildDossier`. It writes nothing
into the repository itself.

## Entry

Built for the make.fun bounty [Make GTA 6 Cover Art](https://make.fun/bounty/gta6-cover-art-01).
