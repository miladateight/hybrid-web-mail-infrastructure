#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const excludedDirs = new Set([".git", "node_modules", "_site", "dist", "build", "coverage"]);
const allowedEmailDomains = new Set(["github.com", "github.io", "users.noreply.github.com", "example.invalid", "localhost"]);
const allowedDomains = new Set(["github.com", "github.io", "example.invalid", "localhost", "w3.org"]);
const scannerFiles = new Set([
  path.join(root, "scripts", "privacy-scan.js"),
  path.join(root, "scripts", "privacy-scan.sh"),
  path.join(root, "scripts", "privacy-scan.ps1")
]);

const blockedTerms = [
  ["neek", "co"].join(""),
  ["nee", "kan"].join(""),
  ["nik", "an"].join(""),
  ["neek", "-intl"].join(""),
  ["neek", "co"].join("") + "." + "com",
  ["neek", "co"].join("") + "." + "ir",
  ["neek", "-intl"].join("") + "." + "com",
  ["\u0646\u06cc", "\u06a9\u0627\u0646"].join(""),
  ["\u0646\u06cc\u06a9", " ", "\u06a9\u0648"].join(""),
  ["\u0646\u06cc\u06a9", "\u200c", "\u06a9\u0648"].join(""),
  ["\u0646\u06cc\u06a9\u0627\u0646", " ", "\u0627\u0646\u0631\u0698\u06cc", " ", "\u06a9\u06cc\u0627\u0646"].join("")
];

const contentPatterns = [
  ["IPv6 address", /\b(?:[0-9a-fA-F]{1,4}:){2,}[0-9a-fA-F]{1,4}\b/],
  ["Private key header", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["Password assignment", /\b(?:password|passwd|pwd)\s*[:=]/i],
  ["Token assignment", /(^|[^-])\b(?:token|api[_-]?key|secret)\b\s*[:=]/i],
  ["WireGuard key", /\b(?:PrivateKey|PublicKey|PresharedKey)\s*=/],
  ["SSH key", /\bssh-(?:rsa|ed25519)\b/],
  ["Internal hostname", /\b[A-Za-z0-9-]+\.(?:local|lan|corp)\b/i]
];

const sensitiveFileName = /^(?:\.env|id_rsa|id_ed25519)$|(?:\.backup|\.bak|\.sql|\.sqlite|\.db|\.rsc|\.pem|\.key|\.pfx|\.p12|\.crt|\.csr|\.log|\.mbox|\.eml|\.zip|\.tar|\.gz|\.7z)$/i;
let failed = false;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) return [];
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function report(file, category, line = null) {
  const location = line ? `${path.relative(root, file)}:${line}` : path.relative(root, file);
  console.error(`[privacy] ${location} | ${category}`);
  failed = true;
}

function lineFor(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function scanEmail(file, text) {
  const regex = /[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
  for (const match of text.matchAll(regex)) {
    const domain = match[1].toLowerCase();
    if (!allowedEmailDomains.has(domain)) report(file, "Email address", lineFor(text, match.index));
  }
}

function scanIpv4(file, text) {
  const regex = /(^|[^0-9])((?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(?:\.(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3})([^0-9]|$)/g;
  for (const match of text.matchAll(regex)) {
    if (match[2] === "127.0.0.1") continue;
    report(file, "IPv4 address", lineFor(text, match.index));
  }
}

function scanDomain(file, text) {
  const regex = /\b([A-Za-z0-9-]+\.)+(?:com|ir|net|org|io|dev|app|co)\b/g;
  for (const match of text.matchAll(regex)) {
    const value = match[0].toLowerCase();
    if ([...allowedDomains].some((domain) => value === domain || value.endsWith(`.${domain}`))) continue;
    if (value === "schema.org") continue;
    report(file, "Potential domain name", lineFor(text, match.index));
  }
}

for (const file of walk(root)) {
  if (scannerFiles.has(file)) continue;
  const name = path.basename(file);
  if (sensitiveFileName.test(name)) report(file, "Sensitive filename");

  let text;
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const lowerText = text.toLowerCase();
  for (const term of blockedTerms) {
    const index = lowerText.indexOf(term.toLowerCase());
    if (index !== -1) report(file, "Prohibited production identifier", lineFor(text, index));
  }
  for (const [category, pattern] of contentPatterns) {
    const match = pattern.exec(text);
    if (match) report(file, category, lineFor(text, match.index));
  }
  scanIpv4(file, text);
  scanEmail(file, text);
  scanDomain(file, text);
}

if (failed) {
  console.error("Privacy scan failed. Values are intentionally not printed.");
  process.exit(1);
}

console.log("Privacy scan passed.");
