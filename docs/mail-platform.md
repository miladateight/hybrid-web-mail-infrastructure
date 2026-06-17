# Mail Platform

## Purpose

The mail platform provided corporate SMTP, IMAP and browser-based webmail from the centralized Linux hosting environment. It supported both internal and external users and applied different outbound delivery policies by sender domain.

## Components

### Exim

Exim handled SMTP receiving, authenticated submission, message routing, transport selection, queueing and outbound delivery. The routing layer selected either direct delivery or the external relay path according to the sender-domain policy.

### Dovecot

Dovecot provided IMAP mailbox access and authenticated user sessions. Validation covered service health, TLS behavior and mailbox access from the intended client paths.

### Roundcube

Roundcube provided browser-based webmail and depended on both the web stack and the mail services. A working login page alone was not enough; backend IMAP and SMTP connectivity also had to be verified.

## Mail Flows

### Inbound Mail

Recipient mail servers used public DNS and MX information to reach the mail environment. Exim accepted valid inbound messages and delivered them to the hosted mailbox layer.

### SMTP Submission

Mail clients submitted messages through the authenticated mail path. TLS behavior, authentication, sender identity and queue state were checked separately during troubleshooting.

### IMAP Access

Clients used Dovecot to read and manage mailbox content. Internal and external users reached the same mailbox service through different network entry paths.

### Webmail Access

Roundcube provided a browser interface while using Dovecot for mailbox access and Exim for message submission.

## Internal and External Access

Internal users used the company network and edge routing. External users entered through the external VPS and HAProxy, then crossed the protected inter-site connection before reaching the internal mail server.

## Domain-Based Outbound Delivery

The environment hosted multiple sender domains with different delivery requirements. Exim classified messages by sender domain and selected one of two transports:

1. Direct outbound delivery.
2. Delivery through the external SMTP relay.

The decision was domain-specific rather than global, allowing different delivery policies on the same hosting platform.

## TLS and DNS Dependencies

Mail behavior depended on aligned MX, SPF, DKIM, DMARC, PTR, mail hostnames and certificates. A transport problem could therefore originate in DNS, identity alignment, certificate behavior, routing or the remote recipient policy.

## Queue and Log Analysis

Operational troubleshooting included:

- Reviewing queued messages and queue age.
- Identifying the router and transport selected for a message.
- Checking relay reachability and TLS negotiation.
- Reviewing temporary and permanent delivery errors.
- Separating local service failures from DNS, network and remote-recipient failures.

## Generic Validation Examples

The following commands are generic examples only and use an intentionally invalid hostname:

```bash
systemctl status exim4
systemctl status dovecot
openssl s_client -starttls smtp -connect mail.example.invalid:587
openssl s_client -connect mail.example.invalid:993
```

They are not production deployment instructions.

## Failure Scenarios

- SMTP listener reachable but authenticated submission fails.
- IMAP service active but external path unavailable.
- Roundcube page loads but backend IMAP or SMTP is unavailable.
- Message remains queued because the wrong route or transport was selected.
- External relay is unreachable or rejects the connection.
- DNS authentication is incomplete or misaligned.
- Certificate name or validity does not match the client endpoint.

## Validation Steps

- Confirm Exim and Dovecot service health.
- Verify SMTP and IMAP TLS behavior.
- Verify internal and external client paths independently.
- Inspect the Exim queue and selected routing path.
- Validate relay reachability when the relay policy applies.
- Review MX, SPF, DKIM, DMARC and PTR alignment.
- Confirm Roundcube can reach both IMAP and SMTP backends.

## Public Boundary

No mailbox content, message headers, real domains, relay hosts, authentication data, DNS values or live mail configuration are included.
