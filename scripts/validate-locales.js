#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const localesDir = path.join(root, "locales");
const languages = ["en", "de", "fa", "ar"];
const expectedDirections = { en: "ltr", de: "ltr", fa: "rtl", ar: "rtl" };

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

function valueType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function compareShape(reference, candidate, lang, prefix = "") {
  const referenceType = valueType(reference);
  const candidateType = valueType(candidate);
  if (referenceType !== candidateType) {
    console.error(`[type] ${lang}: ${prefix || "<root>"} expected ${referenceType}, got ${candidateType}`);
    return false;
  }

  let ok = true;
  if (referenceType === "array") {
    if (reference.length !== candidate.length) {
      console.error(`[array-length] ${lang}: ${prefix} expected ${reference.length}, got ${candidate.length}`);
      ok = false;
    }
    reference.forEach((item, index) => {
      if (index < candidate.length) ok = compareShape(item, candidate[index], lang, `${prefix}[${index}]`) && ok;
    });
  }
  if (referenceType === "object") {
    for (const key of Object.keys(reference)) {
      ok = compareShape(reference[key], candidate[key], lang, prefix ? `${prefix}.${key}` : key) && ok;
    }
  }
  return ok;
}

function validateI18nConfig() {
  const configText = fs.readFileSync(path.join(root, "assets/js/i18n.js"), "utf8");
  let ok = true;
  for (const lang of languages) {
    if (!new RegExp(`["']${lang}["']`).test(configText)) {
      console.error(`[i18n-config] missing supported language ${lang}`);
      ok = false;
    }
    if (!new RegExp(`${lang}:\\s*["']${expectedDirections[lang]}["']`).test(configText)) {
      console.error(`[i18n-config] wrong direction for ${lang}`);
      ok = false;
    }
  }
  return ok;
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

if (!validateI18nConfig()) failed = true;

for (const lang of languages) {
  const locale = load(lang);
  const entries = flatten(locale);
  const keys = new Set(entries.map((entry) => entry.key));
  if (!compareShape(canonical, locale, lang)) failed = true;

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
    if (Array.isArray(entry.value) && entry.value.length === 0) {
      console.error(`[empty-array] ${lang}: ${entry.key}`);
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
