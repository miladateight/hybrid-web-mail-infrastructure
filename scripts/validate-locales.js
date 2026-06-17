#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const localesDir = path.join(root, "locales");
const languages = ["en", "de", "fa", "ar"];

function flatten(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flatten(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.keys(value).flatMap((key) => flatten(value[key], prefix ? `${prefix}.${key}` : key));
  }
  return [{ key: prefix, value }];
}

function load(lang) {
  return JSON.parse(fs.readFileSync(path.join(localesDir, `${lang}.json`), "utf8"));
}

function blockedTerms() {
  return [
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
}

let failed = false;
const canonical = load("en");
const canonicalKeys = new Set(flatten(canonical).map((entry) => entry.key));

for (const lang of languages) {
  const locale = load(lang);
  const entries = flatten(locale);
  const keys = new Set(entries.map((entry) => entry.key));

  for (const key of canonicalKeys) {
    if (!keys.has(key)) {
      console.error(`[missing] ${lang}: ${key}`);
      failed = true;
    }
  }

  for (const key of keys) {
    if (!canonicalKeys.has(key)) {
      console.error(`[extra] ${lang}: ${key}`);
      failed = true;
    }
  }

  for (const entry of entries) {
    if (typeof entry.value === "string" && entry.value.trim() === "") {
      console.error(`[empty] ${lang}: ${entry.key}`);
      failed = true;
    }
  }
}

const scanText = languages.map((lang) => fs.readFileSync(path.join(localesDir, `${lang}.json`), "utf8")).join("\n").toLowerCase();
for (const term of blockedTerms()) {
  if (scanText.includes(term.toLowerCase())) {
    console.error(`[blocked-term] locale content contains a prohibited identifier category`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("Locale validation passed.");
