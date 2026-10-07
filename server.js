// Minimal static server for the Westport Middle School Quick Recall Guide.
// No dependencies. Railway injects PORT; we bind to 0.0.0.0 on it.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const ROOT = __dirname;

const INDEX = path.join(ROOT, "index.html");

// Read the single-page app once at startup and keep it in memory.
let indexHtml = fs.readFileSync(INDEX);

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];

  // Health check for Railway.
  if (url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("ok");
  }

  // Quiet the browser's automatic favicon request.
  if (url === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  // Everything else gets the app (so / and /index.html both work).
  if (req.method === "GET" || req.method === "HEAD") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": indexHtml.length,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "no-referrer",
    });
    return res.end(req.method === "HEAD" ? undefined : indexHtml);
  }

  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`Quick Recall Guide listening on http://${HOST}:${PORT}`);
});

// Let Railway stop the container cleanly on redeploy.
process.on("SIGTERM", () => server.close(() => process.exit(0)));
