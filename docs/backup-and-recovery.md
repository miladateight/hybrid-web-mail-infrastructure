# Backup and Recovery

Backup and recovery planning focused on service continuity and practical restoration checks.

## Covered Practices

- Separate production data from public documentation.
- Validate restore procedures, not only backup creation.
- Treat control panel files separately from hosted website files.
- Verify service health after recovery.
- Keep recovery notes clear and current.

## Recovery Boundaries

The public portfolio documents recovery thinking without storing backup
artifacts. The actual production backup locations, schedules, retention values,
paths and restore commands are intentionally excluded.

## Validation After Recovery

Recovery validation covered the service behavior that users and operators care
about:

- Website and webmail pages load through the intended secure path.
- SMTP and IMAP services are reachable on the intended access paths.
- Mail queues and service status are checked internally before declaring recovery complete.
- DNS, TLS and proxy behavior are reviewed together when an incident touched public access.
- Preventive notes are updated so the same category of issue is easier to diagnose later.

## Portfolio-Safe Incident Notes

Incident notes in this repository should use categories instead of raw details:

- Affected layer instead of hostname.
- Root cause category instead of command history.
- Recovery action category instead of exact filesystem path.
- Validation result instead of real logs or message IDs.

## Exclusions

No backups, archives, mailbox data, logs, database dumps or configuration exports are included.
