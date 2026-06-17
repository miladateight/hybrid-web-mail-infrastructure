# Mail Routing

Outbound mail routing was handled conceptually through separate direct and relayed delivery paths.

## Goals

- Support different outbound policies for different hosted domains.
- Keep DNS authentication aligned with delivery behavior.
- Preserve troubleshooting visibility through logs and validation checks.
- Avoid exposing credentials or real routing values.

## Public Documentation Boundary

This file explains the concept only. It is not a mail server configuration guide.
