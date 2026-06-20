# Security

Security work in the case study focused on reducing exposure and keeping operational values private.

## Areas Covered

- HTTPS and TLS management.
- Firewall and NAT boundaries.
- Secure tunnel concepts.
- DNS and email authentication.
- Credential hygiene.
- Backup separation.
- Privacy scanning before publication.
- Public documentation sanitization.

## Operating Principles

- Publish responsibilities and decisions, not deployment values.
- Keep credentials, tokens, keys and relay authentication outside version control.
- Treat mail, web, proxy, routing and tunnel layers as separate blast-radius areas.
- Validate DNS, TLS and routing together because mail and web behavior often depend on all three.
- Keep backup and recovery notes separate from actual backups or exported configuration.
- Scan both content and filenames before publishing portfolio updates.

## Public Repository Controls

The repository includes scripts and workflow checks for:

- Prohibited production names and domain patterns.
- Public IP address patterns.
- Email address patterns outside allowed public project references.
- Private key, token and password-like strings.
- Files that look like logs, backups, archives, certificates, keys or database dumps.
- Locale consistency so translated content does not drift into unsafe wording.

## Not Included

The repository does not include secrets, keys, production rules, exact DNS values, private screenshots, logs or configuration exports.
