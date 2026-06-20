# Internal and External Access

The project separated internal and external access paths so that public entry,
internal routing and service placement could be reasoned about independently.
This document describes the responsibilities only; it does not publish
production addresses, hostnames, ports, interface names or firewall rules.

## Internal Access

Internal users reached services through the organization network path and edge
routing controls. The important operational distinction was that internal
service access did not need to follow the same path as external public access.

Covered responsibilities:

- Maintain routed access toward web, mail and webmail services.
- Keep firewall and NAT behavior aligned with the intended trust boundary.
- Validate service access from internal user paths after infrastructure changes.
- Keep internal path documentation separate from public portfolio material.

## External Access

External users reached selected public entry points through a generalized
European VPS, proxy behavior and relay concepts. The public entry layer was used
to control which services were exposed and how requests were forwarded.

Covered responsibilities:

- Maintain a public edge concept without documenting provider-specific details.
- Use proxy and relay behavior only for the services that needed public reach.
- Keep TLS, DNS and service health checks aligned after edge changes.
- Avoid exposing backend placement details in public documentation.

## Security Considerations

Access paths were documented without exposing IP addresses, hostnames, ports,
provider names, interface names or firewall rules.

Validation focused on user-visible behavior:

- Website reaches the expected application layer.
- Webmail loads over the intended secure path.
- SMTP and IMAP access follow the intended internal or external route.
- DNS, TLS and routing changes are checked together.
- No production access material is copied into the repository.
