#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "assets/css/styles.css"), "utf8");
let failed = false;

function reject(label, pattern) {
  if (pattern.test(css)) {
    console.error(`[css] rejected ${label}`);
    failed = true;
  }
}

function requirePattern(label, pattern) {
  if (!pattern.test(css)) {
    console.error(`[css] missing ${label}`);
    failed = true;
  }
}

reject("negative letter spacing", /letter-spacing\s*:\s*-/i);
reject("viewport-scaled font size", /font-size\s*:[^;{}]*vw/i);
reject("large card radius", /--radius\s*:\s*(?:9|[1-9][0-9]+)px/i);
requirePattern("RTL rules", /\[dir="rtl"\]/);
requirePattern("reduced motion rules", /prefers-reduced-motion/);
requirePattern("responsive mobile rules", /@media\s+\(max-width:\s*640px\)/);
requirePattern("overflow wrapping", /overflow-wrap:\s*anywhere/);

if (failed) process.exit(1);
console.log("CSS validation passed.");
