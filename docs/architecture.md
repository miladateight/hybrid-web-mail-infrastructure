# Architecture

## Purpose

This document explains the generalized architecture of a real corporate web and mail platform. It preserves the engineering relationships while excluding production identifiers and deployment values.

## Architectural Goals

- Deliver a public corporate website through controlled web-hosting and reverse-proxy layers.
- Keep the core hosting and mail services inside a managed network boundary.
- Support distinct internal and external access paths.
- Use encrypted transport between infrastructure locations.
- Apply outbound SMTP policy per sender domain.
- Keep backup, validation and recovery responsibilities explicit.

## Logical Layers

1. **Public identity layer:** public DNS and TLS identity.
2. **External entry layer:** external VPS, HAProxy and SMTP relay functions.
3. **Encrypted transport layer:** WireGuard between the external entry and edge network.
4. **Edge policy layer:** MikroTik firewall, NAT and policy-based routing.
5. **Proxy layer:** reverse proxy for controlled web delivery.
6. **Hosting layer:** Linux, HestiaCP and Nginx.
7. **Mail layer:** Exim, Dovecot and Roundcube.
8. **Operations layer:** logs, monitoring, backup and recovery procedures.

## Trust Boundaries

The external VPS is treated as a public-facing edge, not as the system of record for hosted content or mailboxes. The encrypted tunnel connects it to the internal edge router. The MikroTik router enforces network policy before traffic reaches the internal hosting environment. Administrative access and backups remain outside the public portfolio.

## Main Traffic Flows

### Website

User request -> public DNS -> controlled entry or reverse proxy -> Nginx hosting -> website content.

### Internal Mail Access

Internal user -> internal routed network -> MikroTik -> Exim, Dovecot or Roundcube.

### External Mail Access

External user -> external VPS -> HAProxy -> WireGuard -> MikroTik -> internal mail services.

### Outbound Mail

Hosted sender domain -> Exim routing policy -> direct transport or secure external relay -> recipient mail server.

## Key Decisions

The external entry layer was separated from the core hosting server to reduce direct exposure and keep public forwarding independent from mailbox storage. WireGuard provided encrypted transport between infrastructure locations. Internal and external users used different entry paths while reaching the same core services. Sender-domain routing was used instead of a single global SMTP route because hosted domains had different delivery requirements.

## Failure Domains

- DNS or certificate failures can block public discovery or TLS trust.
- VPS or HAProxy failures affect external entry but not necessarily internal access.
- WireGuard or edge-routing failures interrupt cross-location traffic.
- HestiaCP or Nginx failures affect hosting administration or website delivery.
- Exim, Dovecot or Roundcube failures affect different parts of the mail service.
- Filesystem changes can affect hosted content and control-panel dependencies differently.

## Validation Approach

After changes, validation covered DNS, TLS, public entry, encrypted transport, edge routing, web delivery, mail listeners, queues, logs and user-facing access. No production output is included in this repository.

## Sanitization Boundary

No real domain, address, hostname, provider, interface, route, port mapping, log, screenshot or production configuration is published.
