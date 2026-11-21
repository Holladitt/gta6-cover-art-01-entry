// Sunset State dev server: serves this entry's app/ folder on localhost so the
// cover studio can be tried in a desktop browser with no build step.
//
//   node serve.ts            (http://localhost:8080)
//   node serve.ts --port 8123
//
// Plain Node standard library only. It answers GET and HEAD, sends the MIME
// type an offline web app needs, and refuses any path that escapes app/.
// A development convenience, not a server for the internet.

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_DIR = resolve(fileURLToPath(new URL('./app', import.meta.url)));

function pickPort(): number {
  const args = process.argv.slice(2);
  const at = args.indexOf('--port');
  const raw = at === -1 ? 8080 : Number(args[at + 1]);
  return Number.isInteger(raw) && raw > 0 && raw < 65536 ? raw : 8080;
}

const PORT = pickPort();

const MEDIA: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

function mimeFor(path: string): string {
  return MEDIA[extname(path).toLowerCase()] ?? 'application/octet-stream';
}

function insideApp(pathname: string): string | null {
  const rel = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
  const target = resolve(join(APP_DIR, normalize(rel)));
  if (target !== APP_DIR && !target.startsWith(APP_DIR + sep)) return null;
  return target;
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end('method not allowed');
    return;
  }
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('bad request');
    return;
  }
  const file = insideApp(pathname);
  if (file === null) {
    res.writeHead(403).end('forbidden');
    return;
  }
  let bytes: number;
  try {
    const info = statSync(file);
    if (!info.isFile()) throw new Error('not a file');
    bytes = info.size;
  } catch {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, {
    'content-type': mimeFor(file),
    'content-length': bytes,
    'cache-control': 'no-store',
  });
  if (req.method === 'GET') createReadStream(file).pipe(res);
  else res.end();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Sunset State studio: http://localhost:' + PORT);
});
