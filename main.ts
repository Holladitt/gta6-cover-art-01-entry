// @ts-nocheck
// Builds the submission bundle: copies the app and its screenshots into the
// output directory and writes dossier.json describing them for the judge.
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || join(here, "out"));
mkdirSync(out, { recursive: true });

cpSync(join(here, "app"), join(out, "app"), { recursive: true });

const shots = join(here, "screenshots");
if (existsSync(shots)) {
  cpSync(shots, join(out, "screenshots"), { recursive: true });
}

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});

writeFileSync(join(out, "dossier.json"), JSON.stringify(dossier, null, 2) + "\n");
console.log(`dossier written: ${join(out, "dossier.json")}`);
