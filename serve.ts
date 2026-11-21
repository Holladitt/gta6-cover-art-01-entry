// Heat Wave Cover Studio — tiny offline static server for local development.
// Serves app/ over HTTP so the cover can be opened in a desktop browser.
// Usage: node serve.ts [port]   (default 8131)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "app");
const port = Number(process.argv[2] || 8131);
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url || "/", "http://x").pathname);
    const file = resolve(join(root, path === "/" ? "index.html" : "." + path));
    if (!file.startsWith(root)) {
      res.writeHead(403); res.end("forbidden");
      return;
    }
    const data = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404); res.end("not found");
  }
});

server.listen(port, () => {
  console.log(`Heat Wave Cover Studio at http://localhost:${port}/ (serving ${root})`);
});
