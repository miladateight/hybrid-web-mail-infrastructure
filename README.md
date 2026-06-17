# Hybrid Corporate Web and Mail Infrastructure

[English](README.md) | [Deutsch](README.de.md) | [فارسی](README.fa.md) | [العربية](README.ar.md)

## Anonymous Case Study Notice

This repository is an anonymous portfolio case study. It is not the production website, not an infrastructure backup, and not a deployment repository. All company identity, domains, hostnames, network addresses, credentials, configuration exports, screenshots and production source files have been intentionally omitted.

## Overview

This project presents a multilingual GitHub Pages portfolio about a corporate web, mail and hybrid network infrastructure project completed by Milad. The case study explains the engineering decisions, responsibilities and operating practices behind a unified platform for website delivery, Linux hosting, corporate mail, secure external access and routed internal connectivity.

## Project Challenge

The organization needed a maintainable platform for a public corporate website, centralized web and mail hosting, reliable internal and external access, TLS-secured services, DNS-based mail authentication, controlled outbound mail paths, backup readiness and practical troubleshooting documentation.

## My Role

Milad designed and implemented the website layer, deployed the hosting environment, administered Linux services, configured HestiaCP, Nginx, Exim, Dovecot and Roundcube, integrated reverse proxy behavior, coordinated DNS authentication, configured secure connectivity concepts and documented recovery workflows.

## Responsibilities

- Website design and implementation.
- Website deployment and hosting administration.
- Linux server administration and service validation.
- HestiaCP, Nginx and TLS management.
- Exim SMTP, Dovecot IMAP and Roundcube webmail administration.
- Internal and external access planning.
- HAProxy, WireGuard and MikroTik RouterOS integration.
- Firewall, NAT and policy-based routing coordination.
- Domain-based outbound SMTP routing concepts.
- Backup planning, monitoring, troubleshooting and recovery documentation.

## High-Level Architecture

The generalized architecture includes external users, internal users, Public DNS, a European VPS, HAProxy, SMTP relay behavior, a secure WireGuard tunnel, a MikroTik edge router, a reverse proxy server, a HestiaCP web and mail server, Nginx, Exim, Dovecot, Roundcube, backup storage, monitoring and logs.

No real IP addresses, domains, hostnames, interface names, provider names or exact routing values are included.

## Website and Hosting Work

The web portion covers a corporate website presentation layer, Linux hosting, HestiaCP administration, Nginx web hosting, reverse proxy integration, HTTPS and TLS management, static asset delivery and post-change health checks. The repository does not include the production website source or original company content.

## Mail Infrastructure

The mail portion covers Exim SMTP, Dovecot IMAP, Roundcube webmail, TLS-secured mail access, internal and external mailbox access, DNS authentication and controlled outbound delivery concepts. Milad configured, administered and troubleshot these technologies; the case study does not claim he developed them.

## Internal and External Access

Internal users reached services through the organization network path. External users reached selected public entry points through a generalized European VPS and proxy or relay layer. The description is intentionally conceptual and omits exact addresses and routing rules.

## Hybrid Connectivity

The project used a secure tunnel concept between infrastructure locations, with MikroTik RouterOS handling edge routing, firewall boundaries, NAT and policy-based routing responsibilities.

## Domain-Based SMTP Routing Concept

Outbound mail delivery was planned around separate direct and relayed paths. The portfolio explains the concept without publishing real domains, selectors, DNS values, credentials or relay configuration.

## DNS and Email Authentication

The project considered SPF, DKIM, DMARC, MX and PTR concepts as part of mail identity, deliverability and trust. Real record values are not present in this repository.

## Security Approach

Security work focused on TLS, restricted exposure, firewall boundaries, credential hygiene, configuration separation, privacy review, backup handling and safe public documentation.

## Backup and Recovery

The case study explains backup planning, recovery validation and an incident recovery process in a sanitized way. It avoids real logs, filesystem paths, command history and unverified incident details.

## Troubleshooting

Troubleshooting is presented as a structured engineering process: observe symptoms, isolate layers, verify service health, identify a root cause category, recover required components, validate behavior and document preventive actions.

## Technologies

Web and hosting: HTML, CSS, JavaScript, Linux, Ubuntu Server, HestiaCP, Nginx, TLS.

Mail: Exim, Dovecot, Roundcube, SMTP, IMAP, SPF, DKIM, DMARC, MX, PTR.

Network: MikroTik RouterOS, WireGuard, HAProxy, NAT, Firewall, Policy-Based Routing, DNS, TCP/IP.

Operations: Bash, logging, monitoring, backup, incident recovery, troubleshooting and technical documentation.

## Skills Demonstrated

End-to-end infrastructure ownership, cross-domain troubleshooting, Linux administration, mail infrastructure administration, network engineering, secure remote access, reverse proxy configuration, SMTP routing, DNS management, TLS management, backup planning, incident recovery and technical documentation.

## Repository Structure

The repository contains a multilingual static website, locale files, documentation, Mermaid diagrams, privacy scanners, validation scripts and GitHub workflows for Pages deployment and quality checks.

## Running the Portfolio Locally

Use a local HTTP server because translation files are loaded from JSON:

```bash
python3 -m http.server 8080
```

Then open the local server in a browser. Direct `file://` opening may not load translation JSON consistently.

## Privacy and Confidentiality

This repository is sanitized for public portfolio review. It excludes real company identity, production website code, domains, hostnames, IP addresses, credentials, keys, DNS values, screenshots, mailbox data, backups, logs and configuration exports.

## Author

Milad  
IT Infrastructure and DevOps Engineer
