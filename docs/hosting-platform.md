# Hosting Platform

## Purpose

The hosting platform centralized web domains, mail domains, certificates, service management and backups on Ubuntu Server with HestiaCP as the control plane.

## Component Responsibilities

- **Ubuntu Server:** operating system, packages, storage, permissions, services and logs.
- **HestiaCP:** web and mail domain management, certificates, templates, users and backups.
- **Nginx:** website delivery and front-end hosting behavior.
- **Exim:** SMTP receiving, submission and outbound transport.
- **Dovecot:** mailbox access over IMAP.
- **Roundcube:** browser-based mail access.

## Operational Work

I configured and maintained domains, services, TLS, permissions, ownership, backups and health checks. Troubleshooting separated control-panel behavior from the hosted website and mail services so a panel failure did not automatically imply that every hosted service was unavailable.

## Generated Settings

Control panels generate and regenerate service files. Unmanaged edits can be overwritten or create drift. Custom behavior was therefore isolated, documented and validated against the control panel lifecycle.

## Validation

Operational checks covered service state, recent errors, listener availability, certificate behavior, web response, mail queue condition and mailbox access.

## Backup Responsibilities

Backup planning covered website content, hosting settings, mail settings, mailboxes, databases where applicable, DNS documentation, certificates and restore validation. Backup creation alone was not treated as proof of recoverability.

## Public Scope

Environment-specific names, paths and exported settings are not included.
