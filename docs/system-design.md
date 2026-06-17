# System Design

This document explains the structure and operating model of the project at a safe public level.

## Goals

- Keep the public entry layer separate from the main hosting platform.
- Support different paths for internal and external users.
- Protect communication between infrastructure locations.
- Separate website, hosting-control and mail responsibilities.
- Make service validation and fault isolation practical.

## Main Layers

The project used public name resolution, an external entry service, protected connectivity, an edge router, a reverse proxy, a Linux hosting server, web services, mail services, backups and operational monitoring.

## Key Decisions

The main hosting platform remained behind controlled routing. Internal users used the internal path, while external users used a separate VPS and proxy layer. Different sender domains could select different outbound delivery paths. Website content and hosting-control application files were handled as separate operational areas.

## Validation Model

Checks covered name resolution, protected transport, proxy reachability, routing state, website delivery, mail services, mail queues, backup readiness and recovery checks.

## Failure Isolation

Each layer could be checked independently. An external-entry failure did not automatically imply an internal-service failure. Mail delivery, mailbox access, website delivery and management access were validated as separate paths.

## Trade-Offs

The layered design introduced more components, but improved separation of responsibility and troubleshooting. Centralized hosting simplified administration while increasing the importance of tested backups and dependency validation. Sender-domain mail routing improved delivery control while requiring accurate documentation and queue analysis.

## Public Boundary

This repository contains no exact operational values or company identifiers. It documents engineering decisions and responsibilities without acting as a deployment guide.
