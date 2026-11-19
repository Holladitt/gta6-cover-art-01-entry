// Tiny static server for local development of the cover studio.
// Serves the app/ folder over plain HTTP on 127.0.0.1.
// Usage: node serve.ts [--port 8093]   (default port 8080)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const serveDir = resolve(join(fileURLToPath(new URL(".", import.meta.url)), "app"));

function lookupMime(name) {
  const ext = extname(name).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js" || ext === ".mjs") return "text/javascript; charset=utf-8";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".json") return "application/json";
  return "application/octet-stream";
}

function pickPort(argv) {
  const at = argv.indexOf("--port");
  if (at === -1) return 8080;
  const n = Number(argv[at + 1]);
  return Number.isInteger(n) && n > 0 && n < 65536 ? n : 8080;
}

async function onRequest(req, res) {
  const rawPath = decodeURIComponent(new URL(req.url || "/", "http://127.0.0.1").pathname);
  const wanted = rawPath === "/" ? "index.html" : rawPath.replace(/^\/+/, "");
  const target = resolve(join(serveDir, wanted));
  if (target !== serveDir && !target.startsWith(serveDir + sep)) {
    res.writeHead(403, { "content-type": "text/plain" });
    res.end("forbidden");
    return;
  }
  try {
    const body = await readFile(target);
    res.writeHead(200, { "content-type": lookupMime(target) });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
}

const chosenPort = pickPort(process.argv.slice(2));
createServer(onRequest).listen(chosenPort, "127.0.0.1", () => {
  console.log(`cover studio at http://127.0.0.1:${chosenPort}/`);
});
