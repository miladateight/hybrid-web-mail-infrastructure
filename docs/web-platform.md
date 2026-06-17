# Web Platform

## Purpose

The web portion of the project covered design, deployment and day-to-day operation of a corporate website on a Linux hosting platform.

## Responsibilities

- Designed and implemented the website presentation layer.
- Prepared the site for deployment to the managed hosting environment.
- Configured domain and certificate handling through HestiaCP.
- Operated Nginx website delivery and reverse-proxy integration.
- Reviewed filesystem ownership and permissions after content changes.
- Validated HTTP behavior, HTTPS redirection, certificate validity and backend health.
- Kept recovery procedures for website content separate from the hosting-control application.

## Request Flow

A public request passed through name resolution and the controlled entry layer before reaching the reverse proxy and Linux hosting server. Internal access used the managed network path. The public case study omits addresses, domain names and exact forwarding values.

## Hosting Integration

HestiaCP managed the website domain, certificate lifecycle and generated service configuration. Nginx served the website and handled the required web behavior. Changes to generated control-panel files were treated carefully because later panel operations could overwrite unmanaged edits.

## Filesystem and Permission Considerations

Website content, control-panel application files and mail data had different ownership and recovery requirements. Before destructive or recursive file operations, the target path and scope required explicit validation. After changes, ownership, readability and service access were checked independently.

## Validation

- Confirm the website responds over HTTPS.
- Confirm HTTP redirects to HTTPS where required.
- Review certificate subject and validity.
- Confirm reverse-proxy backend reachability.
- Check Nginx service health and relevant logs.
- Verify static assets and internal links.
- Confirm file ownership and permissions.
- Recheck the site after hosting-panel or filesystem changes.

## Failure Scenarios

- Certificate renewal or hostname mismatch.
- Reverse-proxy backend unavailable.
- Incorrect file ownership or permissions.
- Missing website assets after deployment.
- Generated hosting configuration overwritten by a later panel action.
- Control-panel application failure incorrectly treated as a website-content failure.

## Recovery Boundary

The production website source, content and media are not included here. This document describes responsibilities and validation procedures without exposing the original website or live configuration.
