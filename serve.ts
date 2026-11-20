// Tiny static server for local development: serves app/ on http://localhost:8080.
// Serves files only; it never writes anything.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "app");
const types: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json",
};
const port = Number(process.env.PORT || 8080);

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url || "/", "http://x").pathname);
  const file = join(root, path === "/" ? "index.html" : path);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`serving app/ at http://localhost:${port}`));
