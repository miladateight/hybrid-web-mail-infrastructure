# Troubleshooting

Troubleshooting followed a layered process.

## Process

1. Observe symptoms and affected user paths.
2. Separate website, hosting, mail, proxy, tunnel and routing layers.
3. Validate service health.
4. Compare expected behavior with actual behavior.
5. Identify a root cause category without overclaiming.
6. Restore required components.
7. Validate access, delivery and logs.
8. Document preventive actions.

## Layered Checks

The investigation model separated:

- Website files and application behavior.
- Hosting control panel application files.
- Nginx and TLS behavior.
- Exim, Dovecot and webmail service health.
- Public proxy and relay behavior.
- WireGuard transport and MikroTik edge routing.
- DNS authentication and mail deliverability concepts.

## Documentation Style

Public troubleshooting notes should record what was learned without publishing
the environment itself. Prefer generalized categories such as "control panel
application dependency", "mail transport route", "proxy path" or "DNS
authentication mismatch" instead of exact paths, hostnames, commands, logs or
message IDs.

## Public Boundary

No real logs, command history, hostnames, paths or incident identifiers are included.
