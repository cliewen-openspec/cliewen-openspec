# Proposal

## Why

CI can pass while a branch accepts changes without those checks. Projects need to see whether their expected checks are required, which exceptions are visible, and what could not be inspected.

## What Changes

- Add read-only `cliewen-openspec ci inspect` with text and JSON output, starting with GitHub.com.
- Compare project-selected check names and optional app IDs against active branch rules and classic protection. Distinguish observed requirements, missing requirements and unknown access; report bypass information separately.
- Use independent advisory defaults and an off option. Host access starts only with an explicitly configured repository and expected checks; ordinary local checks and installation do not query GitHub.
- Explain findings in shared review/closure guidance without changing project integration policy or adding routine human gates.

| Example | Report |
|---|---|
| A selected check is required by an active rule | Requirement observed, with its source and bypass visibility |
| All supported sources are known and omit a selected check | Requirement missing |
| Permissions or an incomplete response prevent a conclusion | Unknown, with the missing information named |

## Capabilities

### New Capabilities

- `ci-enforcement-inspection`: report whether selected CI checks are required for a selected branch, with explicit visibility and policy limits.

### Modified Capabilities

None. Existing local validation, archive and installation contracts remain unchanged.

## Impact

CLI, independent configuration, shared workflow guidance and user documentation. Projects that use inspection supply GitHub CLI. [Discovery](../../../../docs/analysis/ci-enforcement-discovery.md) records the APIs and a live read-only probe. The [design](design.md) defines the configuration and report.

The owner approved the proposal on November 18, 2026. The completed change was archived on November 19 after [review and hosted verification](../../../../docs/testing/ci-enforcement-inspection-001.md).
