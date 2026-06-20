# Testing and Validation Strategy

## Principle

Validation covered the complete user path and separated static repository checks from production verification.

| Layer | Validation | Public Status |
| --- | --- | --- |
| DNS | Resolution, MX, SPF, DKIM, DMARC and PTR review | Production verification performed; evidence omitted |
| Web | HTTP response, HTTPS redirect and certificate validation | Production verification performed; evidence omitted |
| SMTP | Listener reachability, STARTTLS and submission behavior | Production verification performed; evidence omitted |
| IMAP | TLS listener and authenticated access behavior | Production verification performed; evidence omitted |
| Webmail | Login-page availability and backend connectivity | Production verification performed; evidence omitted |
| WireGuard | Peer state and encrypted path reachability | Production verification performed; evidence omitted |
| HAProxy | Listener health and backend reachability | Production verification performed; evidence omitted |
| MikroTik | Route, NAT, firewall and policy-routing counters | Production verification performed; evidence omitted |
| Exim | Queue status, router selection and transport behavior | Production verification performed; evidence omitted |
| Dovecot | Service health and mailbox access | Production verification performed; evidence omitted |
| Backup | Archive creation and restore validation | Procedure implemented; evidence omitted |
| Recovery | Service-by-service post-change checks | Procedure implemented |
| Portfolio | Locale, links, privacy, syntax and required files | Automated local and CI validation |

## Post-Change Sequence

1. Confirm the intended change scope.
2. Validate syntax before a service reload or restart.
3. Check affected service health.
4. Verify DNS and TLS identity where relevant.
5. Verify network and proxy reachability.
6. Verify application behavior from the user perspective.
7. Inspect logs, queues and counters for hidden failures.
8. Record the result without exposing sensitive data.

## Status Language

The repository uses only these status meanings:

- Static validation completed.
- Local validation completed.
- Production verification required.
- Manual verification required.

No public screenshot, log or message content is used as evidence.
