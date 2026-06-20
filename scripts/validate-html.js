#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const notFound = fs.readFileSync(path.join(root, "404.html"), "utf8");
let failed = false;

function requirePattern(label, pattern, text = index) {
  if (!pattern.test(text)) {
    console.error(`[html] missing ${label}`);
    failed = true;
  }
}

for (const section of [
  "overview",
  "challenge",
  "role",
  "implemented",
  "architecture",
  "decisions",
  "web",
  "mail",
  "connectivity",
  "routing",
  "security",
  "recovery",
  "validation",
  "outcomes",
  "stack",
  "lessons",
  "documentation"
]) {
  requirePattern(`section #${section}`, new RegExp(`<section\\s+id=["']${section}["']`));
}

for (const lang of ["en", "de", "fa", "ar"]) {
  requirePattern(`language button ${lang}`, new RegExp(`data-lang=["']${lang}["']`));
}

requirePattern("canonical URL", /<link rel="canonical" href="https:\/\/miladateight\.github\.io\/hybrid-web-mail-infrastructure\/">/);
requirePattern("Open Graph URL", /property="og:url" content="https:\/\/miladateight\.github\.io\/hybrid-web-mail-infrastructure\/"/);
requirePattern("Twitter metadata", /name="twitter:title"/);
requirePattern("main landmark", /<main id="main">/);
requirePattern("external README link", /href="https:\/\/github\.com\/miladateight\/hybrid-web-mail-infrastructure\/blob\/main\/README\.md" target="_blank" rel="noopener noreferrer"/);
requirePattern("external docs links", /href="https:\/\/github\.com\/miladateight\/hybrid-web-mail-infrastructure\/blob\/main\/docs\/architecture\.md" target="_blank" rel="noopener noreferrer"/);
requirePattern("404 home link", /href="https:\/\/miladateight\.github\.io\/hybrid-web-mail-infrastructure\/"/, notFound);
requirePattern("404 localhost fallback", /location\.hostname === "localhost"/, notFound);

const localDocLink = /href="(?:README|PRIVACY_REVIEW|PROJECT_REVIEW|PROJECT_SCOPE|CHANGELOG|docs\/)[^"]*"/;
if (localDocLink.test(index)) {
  console.error("[html] GitHub Pages index contains local repository documentation link");
  failed = true;
}

if (failed) process.exit(1);
console.log("HTML validation passed.");
