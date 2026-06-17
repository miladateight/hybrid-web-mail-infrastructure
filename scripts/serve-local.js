#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.argv[2] || 8080);
const host = "localhost";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer((request, response) => {
  let requestPath = decodeURIComponent(request.url.split("?")[0]);
  if (requestPath === "/") requestPath = "/index.html";

  const filePath = path.normalize(path.join(root, requestPath));
  if (!filePath.startsWith(root)) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(root, "404.html"), (fallbackError, fallbackData) => {
        response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        response.end(fallbackError ? "Not found" : fallbackData);
      });
      return;
    }

    response.writeHead(200, { "content-type": types[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Portfolio preview available at http://${host}:${port}`);
});
