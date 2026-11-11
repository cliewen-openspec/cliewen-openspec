# Support meaningful human review and verification

## Why

The owner wants proposals that make decisions easy to assess and manual observations that explain what was actually checked. Roadmap priority 5 makes these expectations concrete while keeping routine authorized work efficient.

## What Changes

- Ask agents to review decision material for clarity: problem, user impact, scope, and decisions needed. Remove repetition, link details, and use diagrams when clearer.
- Record useful human observations with attribution, tested version, conditions, results, and limits in existing project records.
- Distinguish observation, change approval, and release authorization. Missing feedback stays unknown.
- Challenge proposed manual steps, automate feasible checks and preparation, and explain any remaining need for human judgment, access, or authority.
- Supply shared workflow guidance and short guide examples under existing settings, with no mandatory human checkpoint.

## Capabilities

### New Capabilities

- `human-verification`: Record and interpret actual human observations without inventing feedback or authority.

### Modified Capabilities

- `factual-writing`: Review decision material for understandable consequences before requesting a decision.

## Impact

Shared schema instructions, closure guidance, user documentation, and focused checks will change. Existing configuration, native artifact graphs, and version-1 execution reports remain compatible. Manual results retain their warning status; guidance cannot authenticate a person or prove usability.

See [the design](design.md) for integration and [Decision 026: Make human review useful without routine approval gates](../../../../docs/decisions/026-meaningful-human-review-and-verification.md) for the proposed policy.
