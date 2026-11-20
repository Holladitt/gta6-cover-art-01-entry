// Sunset State — entrypoint (Node 22, no build step).
// Hands the working app and its screenshots to the output directory and
// writes the dossier the scorer compares against buildDossier's own output.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

function writableDir(path: string): boolean {
  try { mkdirSync(path, { recursive: true }); return true; } catch { return false; }
}
function countEntries(dir: string): number {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    n += 1;
    if (statSync(p).isDirectory()) n += countEntries(p);
  }
  return n;
}
function handIn(target: string): { entries: number; shots: number; dossierBytes: number } {
  mkdirSync(target, { recursive: true });
  for (const sub of ["app", "screenshots"]) {
    const src = join(HERE, sub);
    const dst = join(target, sub);
    if (existsSync(dst)) cpSync(src, dst, { recursive: true, force: true });
    else cpSync(src, dst, { recursive: true });
  }
  const dossier = buildDossier(target, CAPS);
  writeFileSync(join(target, "dossier.json"), dossier);
  /* The scorer requires dossier.json to equal a fresh buildDossier run over
     the same directory — verify the round-trip here instead of at submit. */
  const written = readFileSync(join(target, "dossier.json"));
  if (!written.equals(buildDossier(target, CAPS)))
    throw new Error(`dossier.json round-trip mismatch in ${target}`);
  const shots = readdirSync(join(target, "screenshots"))
    .filter((f) => /\.(png|jpe?g)$/i.test(f));
  return { entries: countEntries(target), shots: shots.length, dossierBytes: written.length };
}
function selfCheck(target: string, shots: number): void {
  if (!existsSync(join(target, "dossier.json"))) throw new Error(`dossier.json missing in ${target}`);
  if (!existsSync(join(target, "app", "index.html"))) throw new Error(`app/index.html missing in ${target}`);
  if (shots < 3 || shots > 4) throw new Error(`expected 3-4 screenshots, found ${shots}`);
}

const primary = writableDir("/output") ? "/output" : join(HERE, "out");
const result = handIn(primary);
selfCheck(primary, result.shots);
if (resolve(primary) !== resolve(join(HERE, "out"))) {
  const mirror = handIn(join(HERE, "out"));
  selfCheck(join(HERE, "out"), mirror.shots);
}
console.log(`handed in ${result.entries} entries (${result.shots} screenshots) to ${primary}`);
