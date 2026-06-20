#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const required = [
  "README.md",
  "README.de.md",
  "README.fa.md",
  "README.ar.md",
  "index.html",
  "404.html",
  "robots.txt",
  "PRIVACY_REVIEW.md",
  "PROJECT_REVIEW.md",
  "PROJECT_SCOPE.md",
  "CHANGELOG.md",
  "locales/en.json",
  "locales/de.json",
  "locales/fa.json",
  "locales/ar.json",
  "assets/css/styles.css",
  "assets/js/app.js",
  "assets/js/i18n.js",
  "assets/icons/favicon.svg",
  "assets/icons/mark.svg",
  "assets/images/infrastructure-abstract.svg",
  "scripts/link-check.js",
  "scripts/privacy-scan.js",
  "scripts/validate-locales.js",
  "scripts/validate-html.js",
  "scripts/validate-css.js",
  "docs/architecture.md",
  "docs/web-platform.md",
  "docs/hosting-platform.md",
  "docs/mail-platform.md",
  "docs/mail-routing.md",
  "docs/internal-external-access.md",
  "docs/security.md",
  "docs/testing-strategy.md",
  "docs/incident-recovery.md",
  ".github/workflows/quality.yml",
  ".github/workflows/pages.yml"
];

const forbidden = [
  "IMPLEMENTATION_PLAN.md",
  "scripts/.upgrade-payload-01a",
  "scripts/.upgrade-payload-02",
  "scripts/.upgrade-test"
];

let failed = false;

for (const file of required) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`[required] missing ${file}`);
    failed = true;
  }
}

for (const file of forbidden) {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    console.error(`[forbidden] remove ${file}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Required file validation passed.");
