#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const excludedDirs = new Set([".git", "node_modules", "_site", "dist", "build", "coverage"]);
const checkedExtensions = new Set([".html", ".md"]);
const assetExtensions = new Set([".css", ".js", ".json", ".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".txt", ".xml"]);
let failed = false;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) return [];
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function isExternal(target) {
  return /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(target);
}

function stripQuery(target) {
  return target.split("?")[0];
}

function decodeTarget(target) {
  try {
    return decodeURIComponent(target);
  } catch {
    return target;
  }
}

function markdownSlug(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function anchorsFor(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const anchors = new Set();
  if (path.extname(filePath) === ".html") {
    for (const match of text.matchAll(/\s(?:id|name)=["']([^"']+)["']/g)) {
      anchors.add(match[1]);
    }
  }
  if (path.extname(filePath) === ".md") {
    for (const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)) {
      anchors.add(markdownSlug(match[1]));
    }
  }
  return anchors;
}

function targetsFromHtml(text) {
  const targets = [];
  for (const match of text.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) targets.push(match[1]);
  return targets;
}

function targetsFromMarkdown(text) {
  const targets = [];
  for (const match of text.matchAll(/!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) targets.push(match[1]);
  for (const match of text.matchAll(/<((?:https?:|mailto:)[^>]+)>/g)) targets.push(match[1]);
  return targets;
}

function report(source, target, reason) {
  console.error(`[link-check] ${path.relative(root, source)} -> ${target} | ${reason}`);
  failed = true;
}

function validateTarget(source, rawTarget) {
  const target = decodeTarget(rawTarget.trim());
  if (!target || target.startsWith("#") || isExternal(target)) return;

  const [withoutHash, hash = ""] = stripQuery(target).split("#");
  if (!withoutHash) return;
  if (withoutHash.startsWith("/")) {
    report(source, target, "root-relative links are not portable for project pages");
    return;
  }

  const resolved = path.resolve(path.dirname(source), withoutHash);
  if (!resolved.startsWith(root)) {
    report(source, target, "target escapes repository root");
    return;
  }
  if (!fs.existsSync(resolved)) {
    report(source, target, "missing target");
    return;
  }

  const extension = path.extname(resolved);
  if (hash && (checkedExtensions.has(extension) || assetExtensions.has(extension))) {
    const anchors = anchorsFor(resolved);
    if (!anchors.has(hash)) report(source, target, "missing anchor");
  }
}

for (const file of walk(root).filter((item) => checkedExtensions.has(path.extname(item)))) {
  const text = fs.readFileSync(file, "utf8");
  const targets = path.extname(file) === ".html" ? targetsFromHtml(text) : targetsFromMarkdown(text);
  targets.forEach((target) => validateTarget(file, target));
}

if (failed) process.exit(1);
console.log("Link check passed.");
