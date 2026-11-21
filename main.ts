// Heat Wave (gta6-cover-art-01, v10): the entrypoint.
// It delivers the studio to the grader: app/ and screenshots/ are copied into
// the grader's output directory and /output/dossier.json is written with the
// vendored make.fun library. Nothing is ever written inside this repository.
//
//   MAKEFUN_OUTPUT_DIR=/tmp/heatwave-out node main.ts
//
// Outside the grader MAKEFUN_OUTPUT_DIR stands in for /output. When the
// output directory resolves inside this repository the run refuses loudly
// instead of writing there: the grader mounts this repository read-only, so a
// write under it would fail the run anyway (v7 learned this the hard way).

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here);

function pickOutputDir() {
  const wanted = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
  const inside = wanted === root || wanted.startsWith(root + sep);
  if (inside) {
    console.error('REFUSING: output directory ' + wanted + ' is inside the repository ' + root);
    console.error('Point MAKEFUN_OUTPUT_DIR outside the repository (the grader uses /output).');
    process.exit(1);
  }
  return wanted;
}

function clearOwned(dir) {
  // Only the three paths this program owns are cleared, so a stale local run
  // can never leak an old cover, screenshot or dossier into a fresh output.
  for (const name of ['app', 'screenshots', 'dossier.json']) {
    const target = join(dir, name);
    if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  }
}

const dest = pickOutputDir();
mkdirSync(dest, { recursive: true });
clearOwned(dest);

cpSync(join(root, 'app'), join(dest, 'app'), { recursive: true });
const shotDir = join(root, 'screenshots');
if (existsSync(shotDir)) cpSync(shotDir, join(dest, 'screenshots'), { recursive: true });

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files in app/ or 48 MiB of app files in all,
// or a path under app/ over 1000 bytes).
const dossier = buildDossier(dest, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});
writeFileSync(join(dest, 'dossier.json'), dossier);

console.log('Heat Wave handed in:');
console.log('  app/         -> ' + join(dest, 'app'));
console.log('  screenshots/ -> ' + join(dest, 'screenshots'));
console.log('  dossier.json -> ' + join(dest, 'dossier.json'));
