# Web Platform

## Purpose

The web platform delivered a corporate website from a Linux hosting environment while keeping public entry, reverse proxying, certificates and control-panel management as separate responsibilities.

## Work Implemented

- Designed and deployed the website presentation layer.
- Prepared files and assets for Linux hosting.
- Managed the web domain through HestiaCP.
- Configured Nginx delivery and reverse-proxy integration.
- Managed HTTPS and certificate behavior.
- Checked ownership, permissions, logs and service status after changes.
- Separated website recovery from hosting-software recovery.

## Request Flow

Public DNS resolved the user-facing service. Traffic reached the controlled web entry path, passed through the reverse-proxy layer where applicable, and was delivered by Nginx from the internal hosting environment.

## Filesystem and Permissions

Website files, control-panel application files and generated hosting settings belong to separate operational areas. Validation included path review, ownership, permissions and service-specific checks before and after changes.

## HestiaCP and Generated Settings

HestiaCP managed web-domain settings, certificates and hosting templates. Generated files were changed carefully because regeneration can overwrite unmanaged edits. Custom proxy and network behavior was documented separately from control-panel-managed settings.

## Post-Deployment Validation

- Confirm the website responds through the expected entry path.
- Validate HTTPS behavior and the certificate chain.
- Confirm static assets load correctly.
- Review reverse-proxy headers and routing.
- Check Nginx and related service health.
- Review recent errors.
- Confirm ownership and permissions match the hosting model.

## Public Scope

The repository explains the engineering process without including the original company website, company content or environment-specific values.
