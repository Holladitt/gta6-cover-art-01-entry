// Heat Wave Cover Studio — make.fun entrypoint (Node 22, erasable TypeScript).
// Copies app/ and screenshots/ from this repository into the output directory
// and writes dossier.json there with the kit's buildDossier.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR when set, otherwise
// /output. Nothing is ever written inside this repository: main.ts refuses
// to run when the output directory resolves inside the repo.
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

if (outDir === repoRoot || outDir.startsWith(repoRoot + sep)) {
  throw new Error(
    `refusing to write output inside the repository: ${outDir} is inside ${repoRoot}`,
  );
}

mkdirSync(outDir, { recursive: true });
cpSync(resolve(repoRoot, "app"), resolve(outDir, "app"), { recursive: true });
cpSync(resolve(repoRoot, "screenshots"), resolve(outDir, "screenshots"), {
  recursive: true,
});

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});
writeFileSync(resolve(outDir, "dossier.json"), dossier);

console.log(`Heat Wave entry written to ${outDir}`);
console.log("  app/ + screenshots/ copied, dossier.json written");
