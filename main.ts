// Sunset State — entry hand-in (Node 22, standard library only).
// Takes the finished app and its screenshots from beside this file,
// places them in the grader's output directory, and writes the dossier
// the judge reads, using the vendored make.fun library.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const destDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Caps from the scorer's gate: the text budget shapes the bytes, and the
// rest refuse an entry the scorer would refuse (more than 4 screenshots or
// one over 256 KiB; more than 993 files or 48 MiB under app/; any app path
// over 1000 bytes).
const dossierLimits = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
};

mkdirSync(destDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(destDir, "app"), { recursive: true });

const shotTarget = join(destDir, "screenshots");
mkdirSync(shotTarget, { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), shotTarget, { recursive: true });
}

writeFileSync(join(destDir, "dossier.json"), buildDossier(destDir, dossierLimits));

// Self-check: confirm the hand-in actually landed before reporting success.
const handedIn = readdirSync(destDir, { recursive: true });
const shotCount = existsSync(shotTarget)
  ? readdirSync(shotTarget).filter((f) => /\.(png|jpe?g)$/i.test(f)).length
  : 0;
if (!existsSync(join(destDir, "dossier.json")) || shotCount === 0) {
  throw new Error("hand-in incomplete: dossier.json or screenshots missing from " + destDir);
}
console.log(`handed in ${handedIn.length} entries (${shotCount} screenshots) to ${destDir}`);
