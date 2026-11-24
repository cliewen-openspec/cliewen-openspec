# Design

## Context

The existing checker already selects and parses Markdown in configured scope. Its local checks are useful in offline and enforced workflows.

## Approach and Alternatives

Add `docs check --external-links` and append a separate advisory report. Reuse the parsed Markdown tokens, group sources by normalized destination, and strip fragments before probing. Use bounded HEAD requests and fall back to GET for 405 or 501 without reading the response body. Report redirects as observed, leaving their targets uncontacted.

Resolve public addresses before connecting and pin the connection to an allowed address while preserving the HTTP hostname and TLS identity. Keep the external report independent of the existing category modes and exit code.

## Durable Decisions

The CLI guide documents opt-in scope, response labels, resource limits, and advisory behavior.

## Risks and Verification

Use deterministic fixtures for HTTP classification, address restrictions, deduplication, coverage limits, and exit policy. Run the opt-in check on our guide to observe real network results. A reachable response covers the URL request only.
