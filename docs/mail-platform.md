# Mail Platform

## Purpose

The mail platform provided SMTP transport, IMAP mailbox access and browser-based webmail for internal and external users while supporting different outbound delivery policies for hosted sender domains.

## Components

### Exim

Exim handled inbound SMTP, authenticated submission, queue management, sender-domain classification, router selection and outbound transport. It selected direct delivery or a secure external relay according to the sender-domain policy.

### Dovecot

Dovecot provided authenticated mailbox access over IMAP and connected mailbox storage to mail clients and Roundcube.

### Roundcube

Roundcube provided browser-based webmail while relying on the same SMTP and IMAP services used by desktop clients.

## Access Paths

Internal users reached the mail services through the internal routed network. External users reached selected services through the external VPS, HAProxy, WireGuard and MikroTik edge policies. Both paths terminated at the same controlled mail environment.

## TLS Requirements

TLS protected SMTP submission, IMAP and webmail access. Certificate identity, hostname alignment and client compatibility were validated together with DNS and routing.

## Outbound Delivery

The platform supported two outbound paths:

1. Direct SMTP delivery from the hosting environment.
2. Secure relay delivery through the external VPS.

Exim selected the path by sender domain instead of applying one global relay rule.

## Queue and Log Troubleshooting

Troubleshooting included queue condition, defer and reject reasons, router and transport selection, TLS negotiation, DNS resolution, relay reachability and recipient-side response. Public documentation does not include operational message data.

## Generic Validation Examples

These commands are illustrative only and use an intentionally invalid example hostname:

```bash
systemctl status exim4
systemctl status dovecot
openssl s_client -starttls smtp -connect mail.example.invalid:587
openssl s_client -connect mail.example.invalid:993
```

## Common Failure Modes

- DNS or MX mismatch.
- Invalid or expired TLS certificate.
- SMTP submission or authentication failure.
- Dovecot mailbox access failure.
- HAProxy backend failure.
- WireGuard or edge-routing interruption.
- Incorrect sender-domain router selection.
- External relay unavailability.
- Queue growth caused by repeated deferrals.

## Validation Steps

- Confirm DNS and certificate identity.
- Confirm SMTP and IMAP listeners.
- Confirm Roundcube can reach both backends.
- Inspect queue and recent mail-service errors.
- Verify sender-domain router and transport selection.
- Verify direct and relay paths independently.
- Confirm post-change delivery without exposing message content.

## Public Scope

No mailbox content, sender, recipient, message identifier, domain, relay address or environment-specific settings are included.
