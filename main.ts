// Sunset State (gta6-cover-art-01, v9): the entrypoint.
// It hands the app in: copies this repository's app/ and screenshots/ into the
// grader's output directory and writes /output/dossier.json with the vendored
// make.fun library. It never writes anything inside this repository itself.
//
//   MAKEFUN_OUTPUT_DIR=/tmp/sunset-out node main.ts
//
// Outside the grader MAKEFUN_OUTPUT_DIR stands in for /output. If the output
// directory ever resolves inside this repository, the run refuses loudly
// instead of writing there: the grader runs this repository read-only, so a
// write under it would fail the run anyway.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

if (outDir === repoRoot || outDir.startsWith(repoRoot + sep)) {
  console.error('REFUSING: output directory ' + outDir + ' is inside the repository ' + repoRoot);
  console.error('Set MAKEFUN_OUTPUT_DIR to a directory outside the repository (the grader uses /output).');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

// Clear only the three entries this program owns, so a stale local run can
// never leak an old cover, screenshot or dossier into a fresh output.
for (const owned of ['app', 'screenshots', 'dossier.json']) {
  const target = join(outDir, owned);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
}

cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files in app/ or 48 MiB of app files in all,
// or a path under app/ over 1000 bytes).
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 50331648,
    app_path_max_bytes: 1000,
  }),
);

console.log('Sunset State handed in:');
console.log('  app/         -> ' + join(outDir, 'app'));
console.log('  screenshots/ -> ' + join(outDir, 'screenshots'));
console.log('  dossier.json -> ' + join(outDir, 'dossier.json'));
