# Architecture

This document describes the generalized architecture for the anonymous portfolio case study.

## Components

- External Users
- Internal Users
- Public DNS
- European VPS
- HAProxy
- SMTP Relay
- Secure WireGuard Tunnel
- MikroTik Edge Router
- Reverse Proxy Server
- HestiaCP Web and Mail Server
- Nginx
- Exim
- Dovecot
- Roundcube
- Backup Storage
- Monitoring and Logs

## Design Intent

The architecture separated public entry, internal routing, hosting services and mail services into understandable operational layers. It allowed Milad to reason about website delivery, mail access, external access, internal access, security boundaries and recovery checks without mixing unrelated concerns.

## Sanitization

No address, hostname, provider name, domain, interface name, route value, credential or configuration export is included.
