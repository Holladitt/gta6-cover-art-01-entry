// Sunset State entrypoint: hand the app in to the grader's output directory.
//
// Writes ONLY to the output directory (MAKEFUN_OUTPUT_DIR, else /output).
// It never creates, writes or copies anything inside the repository itself:
// the grader runs this in a read-only checkout, so any write under the repo
// would fail the run. The output directory is cleared of a stale handover
// first, so two runs write the same bytes.
import { buildDossier } from "./vendor/makefun-app.ts";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

// Safety net for the round-6 fix: the output directory must never live inside
// the repository itself. The grader runs the repo read-only, so a write under
// it would crash the run; refuse loudly instead of ever writing there.
const relToRepo = relative(repoRoot, outDir);
if (relToRepo === "" || (!relToRepo.startsWith("..") && !relToRepo.startsWith("/"))) {
  throw new Error("MAKEFUN_OUTPUT_DIR must be outside the repository, got: " + outDir);
}

function countFiles(dir: string): number {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? countFiles(join(dir, e.name)) : 1;
  }
  return n;
}

mkdirSync(outDir, { recursive: true });
// Clear a stale handover from an earlier run in this output directory.
for (const name of ["app", "screenshots", "dossier.json"]) {
  const p = join(outDir, name);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
});
writeFileSync(join(outDir, "dossier.json"), dossier);
// Self-check: the dossier must round-trip with its 4 screenshots and source
// outline, otherwise the handover is corrupt.
const parsed = JSON.parse(readFileSync(join(outDir, "dossier.json"), "utf8"));
if (!Array.isArray(parsed.images) || parsed.images.length !== 4) {
  throw new Error("dossier.json does not list 4 screenshots");
}
if (typeof parsed.text !== "string" || parsed.text.length === 0) {
  throw new Error("dossier.json has no source outline");
}
console.log(`dossier.json: ${dossier.length} bytes, ${parsed.images.length} screenshots, outline ${parsed.text.length} chars`);

const entries = countFiles(join(outDir, "app")) + countFiles(join(outDir, "screenshots")) + 1;
console.log(`handed in ${entries} entries`);
