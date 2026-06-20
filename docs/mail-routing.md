# Mail Routing

Outbound mail routing was handled conceptually through separate direct and
relayed delivery paths. The implementation supported different outbound
policies for hosted domains while keeping DNS authentication and operational
validation aligned.

## Goals

- Support different outbound policies for different hosted domains.
- Keep DNS authentication aligned with delivery behavior.
- Preserve troubleshooting visibility through logs and validation checks.
- Avoid exposing credentials or real routing values.

## Responsibilities

- Separate inbound mail reception from outbound delivery decisions.
- Keep domain-level routing policy explicit in internal documentation.
- Validate SMTP submission, transport, queue behavior and delivery path after changes.
- Keep relay authentication and provider-specific values outside the public repository.
- Document whether a domain is intended for direct or relayed delivery without publishing the real domain.

## Validation Model

Validation used generalized checks:

1. Confirm the mail service accepts expected authenticated submission paths.
2. Confirm outbound policy chooses the intended direct or relayed route.
3. Confirm DNS authentication concepts remain aligned with the route.
4. Confirm queue and service health after any mail transport change.
5. Record outcomes without copying real logs, addresses or message content.

## Delivery Policy Boundary

The repository may describe direct delivery, relayed delivery, MX, SPF, DKIM,
DMARC and PTR concepts. It must not include live relay hosts, credentials,
domains, selectors, keys, mailbox data, queue IDs or message headers from the
production environment.

## Public Documentation Boundary

This file explains the concept only. It is not a mail server configuration guide.
