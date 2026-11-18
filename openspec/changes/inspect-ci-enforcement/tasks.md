# Tasks

## 1. Settings and report contract

- [x] 1.1 Add independent ciInspection defaults and validation, preserving authored config; verify missing/partial settings, explicit off, invalid targets/IDs and feature independence, and document defaults and executable configuration examples.
- [x] 1.2 Implement requirement matching and source/bypass reporting; verify exact contexts, optional app bindings, multiple sources, missing versus unknown coverage and exception visibility with positive and negative fixtures, documenting report states and limits.

## 2. Host access and CLI

- [x] 2.1 Add bounded GitHub.com GET access through installed gh; verify target/default-branch resolution, inherited active rules, classic protection, ambiguous 404, hidden bypass data, pagination, malformed/refused/rate-limited responses, deadlines and credential redaction, and document access requirements.
- [x] 2.2 Add ci inspect text/JSON output and advisory exits; verify off/not-configured performs no host calls, absent tools remain unknown, ordinary check/init/update do not query the host, and project hashes and host mutation logs stay unchanged; document commands and failure behavior.

## 3. Workflow delivery and integration

- [x] 3.1 Install shared inspection guidance across all three workflows using existing ownership, preserving project policy; verify packed retrieval, explicit settings and upgrade/conflict behavior, and update affected decisions, changelog and guide with solo/team examples and actual availability.
- [x] 3.2 Run the normal deterministic suite, strict OpenSpec validation, guide build and proportionate Windows/Linux packed integration checks; retain commands, results and limitations, with a read-only live probe only where existing access permits.

## Workflow follow-up

- Review the implementation and observations before native archive; retain unavailable or failed checks honestly.
- Keep release-trial policy separate; this feature adds no agent matrix or repeated guide trials.
- Host policy changes, package publication and external outreach follow their existing project authorization.

The [verification record](../../../docs/testing/ci-enforcement-inspection-001.md) covers the 179-test suite, review regressions and live observations.
