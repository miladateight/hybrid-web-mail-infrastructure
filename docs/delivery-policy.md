# Sender-Domain Delivery Policy

The hosting platform served several sender domains with different outbound requirements. I implemented a policy that selected either direct delivery or an external relay according to the sender domain.

## Why This Was Needed

A global setting would have forced every hosted domain to use the same path. The sender-domain policy allowed different delivery requirements to coexist on one managed platform.

## Decision Model

```text
if sender domain belongs to relay policy:
    choose the external relay path
else:
    choose the direct delivery path
```

This is explanatory pseudocode, not live configuration.

## Validation

The selected route was checked through message queues and service logs. Direct and relayed messages were tested independently, and DNS identity, TLS behavior and delivery responses were reviewed for each path.

## Failure Isolation

A relay-path problem could affect only the domains assigned to that policy while direct-delivery domains continued to operate. This separation made queue analysis and recovery more precise.

## Public Boundary

Real domain lists, service addresses, authentication data and configuration files are not included.
