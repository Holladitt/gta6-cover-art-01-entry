/**
 * Heat Wave — Cover Studio: the entry program.
 *
 * Copies the built app (app/) and its screenshots (screenshots/) from this
 * repository into the output directory, then writes /output/dossier.json
 * with buildDossier from the kit's vendor/makefun-app.ts.
 *
 * The output directory is MAKEFUN_OUTPUT_DIR when set, otherwise /output.
 * The program refuses to run if the output directory resolves inside this
 * repository, so a run can never write into the repo it reads from.
 */
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

/* The gate's own caps for this competition (see the kit's gate.json). */
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 48 * 1024 * 1024,
  app_path_max_bytes: 1000,
};

function isInside(child: string, parent: string): boolean {
  const rel = path.relative(parent, child);
  return rel === "" || (!rel.startsWith(".." + path.sep) && rel !== ".." && !path.isAbsolute(rel));
}

async function main(): Promise<void> {
  const repoRoot = path.dirname(fileURLToPath(import.meta.url));
  const outDir = path.resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

  if (isInside(outDir, repoRoot)) {
    throw new Error(
      "refusing to write output inside the repository: " + outDir + " is inside " + repoRoot,
    );
  }

  await mkdir(outDir, { recursive: true });
  await rm(path.join(outDir, "app"), { recursive: true, force: true });
  await rm(path.join(outDir, "screenshots"), { recursive: true, force: true });
  await rm(path.join(outDir, "dossier.json"), { force: true });

  await cp(path.join(repoRoot, "app"), path.join(outDir, "app"), { recursive: true });
  await cp(path.join(repoRoot, "screenshots"), path.join(outDir, "screenshots"), { recursive: true });

  const dossier = buildDossier(outDir, DOSSIER_CAPS);
  await writeFile(path.join(outDir, "dossier.json"), dossier);

  console.log("wrote " + outDir + "/dossier.json (" + dossier.byteLength + " bytes)");
  console.log("app/ and screenshots/ copied to " + outDir);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.stack || err.message : String(err));
  process.exit(1);
});
