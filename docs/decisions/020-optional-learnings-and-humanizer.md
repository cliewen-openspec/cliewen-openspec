---
type: decision
category: process
status: proposed
---
# Add optional project learnings and Humanizer support

## Context

The owner approved a roadmap for reusable project lessons and optional Humanizer use. Agents need to find relevant lessons without loading an entire history, and writing guidance must work when an external skill is unavailable. The detailed settings and defaults below are proposed for review; no runtime implementation is claimed.

## Considered options

Relying only on host memory makes reusable lessons host-dependent. Loading every lesson adds unrelated context. Bundling or installing Humanizer would couple Cliewen to an external skill's distribution and host-specific lifecycle.

## Proposed decision

Provide independently configurable, opt-in project learnings and automatic Humanizer discovery by the coding agent. The [change design](../../openspec/changes/project-learnings-and-humanizer/design.md) owns the proposed keys, defaults, mode behavior, and validation cases.

Use a small index to retrieve relevant lessons before planning or editing. Record only useful observations, distinguish tentative guidance from verified guidance, and retire stale lessons without deleting their history. Current requirements and accepted decisions remain authoritative. Prefer promoting recurring lessons into tests, rules, or durable documentation when appropriate.

Use Humanizer when the configured mode requests it and the host exposes a usable skill. Preserve baseline clear-writing guidance in every mode. Missing or inaccessible skills do not block work; suggestions are limited to once per session and respect a refusal. Installation remains an explicit user action.

The owner approved the status-reporting detail on November 2, 2026: in auto/on mode, report one brief Humanizer status per session, distinguishing actual use, detected but inaccessible, confirmed absent, and unknown availability. Claim use only after reading and applying the skill's instructions. Off mode requests no Humanizer status. This approval covers the reporting detail; the rest of this proposed design retains its review status.

## Consequences

Configuration validation and package delivery can be tested deterministically. Lesson relevance, factual accuracy, and actual host discovery/invocation need agent observations and review. Cliewen will not claim to authenticate learned facts, guarantee natural prose, or detect skills through a universal CLI probe.

Generated templates belong to the installer; authored notes, indexes, configuration, and external skills remain project/user-owned under [Decision 014: Own generated resources and recover failed installation changes](014-installer-ownership-and-recoverable-lifecycle.md). Disabled facilities preserve their files.

This extends [Decision 012: Apply clear writing and diagram guidance across agent-authored text](012-clear-writing-across-agent-output.md) and follows [Decision 019: Use spec-driven development with evidence-first verification](019-evidence-first-verification.md). It supersedes neither. This repository's Humanizer requirement for user guides still applies.

## Related sources and status

[Humanizer's upstream README](https://github.com/blader/humanizer#installation), reviewed November 2, 2026, documents host-specific installation and skill use. Link to current upstream instructions rather than embedding an installer command that may drift. Cliewen will not bundle the skill or copy its rules.

Acceptance of the roadmap authorized this design work. This record remains proposed until the detailed design is agreed; implementation, fresh-agent trials, and release acceptance remain open.
