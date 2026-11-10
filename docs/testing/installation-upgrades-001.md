---
type: test-report
---
# Installation and upgrade review

Development source now checks Node/OpenSpec compatibility before init/update writes, previews resource changes with version information, and declares the supported upgrade route from published 0.1.0. The owner approved the proposal; review of the completed implementation and archive remain pending.

## Results

| Check | Actual result |
|---|---|
| Full package suite on Windows, Node 24.0.0 | 108 passed, zero failed or skipped |
| Focused lifecycle/upgrade suite on Linux, Node 22.22.0 | 23 passed, zero failed, one Windows-only executable fixture skipped; the two subsequently added Node/default-alias regressions were checked on Windows |
| Packed minimum-runtime fixture | Node 20.19.0 and OpenSpec 1.15.0 passed init preview/apply, update preview/apply, check with evidence disabled, and native validation of all three schemas |
| Published-resource upgrade | Actual published 0.1.0 upgraded to the candidate with OpenSpec 1.15.0 and 1.17.0 on both platforms; authored-file hashes, active/archived changes, configuration, agent skills, and ID allocation were preserved |
| Version-routing fixture | An isolated copy with synthetic target version 0.2.0 accepted the supported 0.1.0 source, directed init to update, checked the resulting installation, and rejected downgrade |
| Controlled faults | Assertions detected both accepting incompatible OpenSpec and overwriting a conflicting local resource; neither result was a setup or syntax failure |
| Guide build | 13 pages, 497 local links, four diagrams, and CLI defaults checked |

The published tarball's SHA-256 is `7a676e4ac3cd99443f1f6f060468bc8cbb9440432ca68be123c8231923956f8c`; its recorded npm SHA-512 integrity is asserted by both packed tests. The final Windows packed consumer and minimum-runtime fixture used candidate SHA-256 `804dacb4448dcb3023094120aa6dc77421cec71538eb8f99bf588d715ec537c2`. Linux used an earlier package snapshot identified separately in the retained data. Product code was unchanged between those snapshots; documentation and test refinements followed.

## What the checks establish

An incompatible selected local OpenSpec does not fall back to PATH. Missing, invalid, prerelease, failed, or timed-out probes block init/update, including previews, without modifying installation files or pending recovery state. A later invocation checks the tools again. Explicit recovery remains available without a compatible OpenSpec installation.

Preview and apply share resource planning while existing core return values and CLI JSON fields remain usable. Added fields expose tool sources, installed/target versions, created/replaced paths, and whether a preceding transaction was recovered. Intervening edits still conflict. Existing ownership, unowned-collision, retired-file, rollback, symlink, and ID-preservation checks remain green. Explicit default selection preserves unrelated YAML values or refuses shared aliases that would change them.

The packed fixtures preserve 24 authored/integration files on Windows and 20 on Linux. These counts reflect native integration outputs, not different preservation rules. The existing three schema graphs still validate and return native instructions. Planning, documentation, learnings, and product evidence were disabled in the packed adoption fixture; authored records were preserved rather than rewritten. Existing package tests cover other evidence settings.

## Limits and retained attempts

The development version remains 0.1.0. The actual package comparison therefore proves published-resource refresh, while the different-version path uses explicitly synthetic metadata. Recheck the finally selected release version before publication. The manifest format and project-content syntax were not migrated; unsupported sources and downgrades remain blocked.

Standalone selection was exercised through a small Windows executable fixture and a POSIX executable fixture. No upstream standalone distribution was downloaded. Platform tests cover the selected environments and version endpoints; they do not certify every newer OpenSpec release, shell shim, or agent configuration. The minimum-runtime fixture is narrower than the full package suite.

An initial Linux launch used the source dependency directory accidentally and interfered with a simultaneous Windows test. Those infrastructure-affected results are retained separately. The process was stopped, dependencies restored, and final Windows and isolated Linux checks passed. Earlier focused failures also remain recorded: a test over-specified the error after Node module-resolution caching, and the shim parser initially accepted `.js` but not `.cjs`. The fixture and parser were corrected before final verification.

No agent trial was run for this increment. Deterministic checks cover executable lifecycle decisions and data preservation; agent comprehension remains for the approved [next-release three-agent checkpoint](../decisions/022-proportionate-agent-validation.md#next-release-three-agent-compatibility-check). No unresolved behavioral question currently warrants a separate additional trial.

[The retained data](installation-upgrades-001.json) includes package identities, platform diagnostics, minimum-runtime commands, controlled-fault results and script snapshots, and paths/hashes for local logs. The guide, [Decision 014: Own generated resources and recover failed installation changes](../decisions/014-installer-ownership-and-recoverable-lifecycle.md), and roadmap describe development behavior separately from published 0.1.0. Resource checks do not establish publication or complete release readiness.
