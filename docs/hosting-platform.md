# Hosting Platform

## Purpose

The hosting platform centralized website and mail administration on Ubuntu Server with HestiaCP, Nginx and the related mail services.

## Platform Responsibilities

- Linux service administration and package maintenance.
- HestiaCP administration for web domains, mail domains, certificates, mailboxes and backups.
- Nginx website delivery and virtual-host behavior.
- TLS certificate issuance, renewal and validation.
- File ownership and permission management.
- Service-state and log inspection.
- Backup creation and recovery planning.

## HestiaCP as the Control Plane

HestiaCP managed the configuration lifecycle of hosted domains and mail services. It generated and maintained parts of the service configuration, so direct changes to generated files required caution. A manual edit that works initially can later be replaced by a panel action or template regeneration.

Custom behavior was therefore separated from panel-managed configuration where practical, and every change was followed by a service validation step.

## Nginx Responsibilities

Nginx delivered website content and worked with the reverse-proxy layer. Operational checks covered listener state, virtual-host selection, certificate behavior, backend reachability, static assets and error logs.

## Web and Mail Domains

Web domains and mail domains shared the hosting platform but had different dependencies. Website delivery depended primarily on Nginx, certificates and filesystem access. Mail delivery depended on Exim, Dovecot, DNS records, certificates, queues and mailbox access.

## Service Validation

- Check the relevant system service is active.
- Review recent errors before restarting a service.
- Validate configuration syntax where supported.
- Confirm website, SMTP, IMAP and webmail independently.
- Recheck certificates and DNS after hostname-related changes.
- Inspect application and system logs for the affected layer.

## Generated Configuration Risk

Panel-generated configuration can be overwritten during domain changes, template updates or package operations. The operating model therefore required:

- Knowing whether a file was panel-managed.
- Backing up custom changes before regeneration.
- Using templates or supported extension points when possible.
- Retesting after panel or package updates.

## Backup Responsibilities

Backups were considered separately for website files, databases where applicable, hosting configuration, mail configuration, mailboxes, certificates and network documentation. A backup was not considered complete until the restore path and ownership requirements were understood.

## Failure Scenarios

- Hosting panel unavailable while hosted services remain active.
- Website content unavailable because of ownership or permission errors.
- Generated configuration replaced after a panel operation.
- Certificate renewal failure.
- Mail service running while DNS or routing prevents delivery.
- Dependency files missing from the control-panel application.

## Public Boundary

No live server paths, configuration exports, domain values, credentials or backup archives are included. The document explains the operating model and responsibilities only.
