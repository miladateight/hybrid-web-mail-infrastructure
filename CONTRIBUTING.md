# Contributing

This repository is a sanitized portfolio case study. Contributions should preserve anonymity and avoid any production detail.

## Rules

- Do not add real domains, hostnames, IP addresses, email addresses, usernames, credentials, logs, screenshots, backups or configuration exports.
- Do not add deployment commands for production infrastructure.
- Do not add fake metrics, testimonials, uptime claims or customer details.
- Keep wording factual and restrained.
- Run locale validation and privacy scanning before proposing changes.

## Local Checks

```bash
node scripts/validate-locales.js
bash scripts/privacy-scan.sh
bash scripts/link-check.sh
```

On Windows, the PowerShell privacy scanner can be used:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/privacy-scan.ps1
```
