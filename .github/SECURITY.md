# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| Latest (`main`) | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue. Instead, report it privately by:

1. Opening a [GitHub Security Advisory](https://github.com/rblake2320/justin-did-you-know/security/advisories/new) on this repository.
2. Providing a clear description of the vulnerability, steps to reproduce, and potential impact.

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

This project is a read-only fact display app. The primary security considerations are:

- **Authentication** — Manus OAuth handles session management. No passwords are stored in this application.
- **Database** — All database credentials are injected via environment variables and never committed to source control.
- **API keys** — All API keys and secrets are managed via the platform's secrets manager, not hardcoded.
- **XSS** — React's default escaping protects against XSS in rendered content.

Thank you for helping keep this project secure.
