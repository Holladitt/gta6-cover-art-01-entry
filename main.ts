// Heat Wave (gta6-cover-art-01, v11): the entrypoint, written fresh for round 11.
// It hands the studio to the grader: the app/ tree and the screenshots/ set are
// copied into the grader's output directory, and /output/dossier.json is built
// with the vendored make.fun library. This program never writes inside its own
// repository.
//
//   MAKEFUN_OUTPUT_DIR=/tmp/heatwave-out node main.ts
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output. If the output
// directory resolves inside this repository the run stops with an error instead
// of writing there: the grader mounts this repository read-only, so a write
// under it would fail the run anyway (v7 learned this the hard way).

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files in app/ or 48 MiB of app files in all,
// or a path under app/ over 1000 bytes).
const HANDIN_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
};

// The three paths this program owns inside the output directory: a stale local
// run's leftovers are cleared so they can never leak an old cover, screenshot
// or dossier into a fresh output.
const OWNED_NAMES = ['app', 'screenshots', 'dossier.json'];

function repositoryRoot(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)));
}

function outputRoot(repo: string): string {
  const wanted = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
  if (wanted === repo || wanted.startsWith(repo + sep)) {
    throw new Error(
      `output directory ${wanted} is inside the repository ${repo}; ` +
        'point MAKEFUN_OUTPUT_DIR outside the repository (the grader uses /output)',
    );
  }
  return wanted;
}

function clearOwned(out: string): void {
  for (const name of OWNED_NAMES) {
    const target = join(out, name);
    if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  }
}

function copyTree(from: string, to: string): void {
  if (existsSync(from)) cpSync(from, to, { recursive: true });
}

function handIn(): void {
  const repo = repositoryRoot();
  const out = outputRoot(repo);
  mkdirSync(out, { recursive: true });
  clearOwned(out);
  copyTree(join(repo, 'app'), join(out, 'app'));
  copyTree(join(repo, 'screenshots'), join(out, 'screenshots'));
  const dossier = buildDossier(out, HANDIN_CAPS);
  writeFileSync(join(out, 'dossier.json'), dossier);
  console.log('Heat Wave handed in:');
  console.log(`  app/         -> ${join(out, 'app')}`);
  console.log(`  screenshots/ -> ${join(out, 'screenshots')}`);
  console.log(`  dossier.json -> ${join(out, 'dossier.json')}`);
}

try {
  handIn();
} catch (err) {
  console.error(`hand-in failed: ${(err as Error).message}`);
  process.exit(1);
}
