---
type: guide
---
# Exercise project learnings and writing modes

This maintainer fixture checks whether a fresh agent can use the installed proposal instructions, retrieve relevant indexed lessons, and follow Humanizer policy without changing code or existing knowledge. It complements deterministic configuration and ownership tests.

[Result 001: First learnings and Humanizer observations](result-001.md) records six attempts, including retrieval and unsupported-claim failures. Use the [review rubric](rubric.md) with the [neutral prompt](prompt.md); structural success alone is insufficient.

[Result 002: Index-first retrieval, maintenance, and fallback review](result-002.md) adds actual maintenance, a hypothetical host-policy exercise, and a project-bootstrap comparison. It preserves a CLI-version mismatch and remaining retrieval/link failures. Future preparations correct two unsupported claims in the earlier seeded notes; compare package hashes and fixture inputs before treating runs as equivalent.

```sh
npm run trial:knowledge:prepare
```

Preparation builds and packs this checkout, creates a CSV baseline with six tests, and seeds a verified formatter lesson, a retired conflicting suggestion, and an unrelated database note. The observation supporting the verified note is captured locally. It prints separate runner suites and profile IDs for auto, off, on, a custom-root/off variant using `notes/lessons`, maintenance, a hypothetical host-policy exercise, and bootstrap. Choose one printed suite path and its profile for each fresh process:

```sh
node scripts/run-cli-trial.mjs MODE_SUITE PROFILE cliewen-delivery
node scripts/check-knowledge-writing-trial.mjs PROJECT ARTIFACTS
```

Replace the uppercase values with that case's paths and profile ID. Auto and bootstrap use the pinned OpenCode profile, maintenance uses Claude Code, and other variants use Codex. Bootstrap adds the [documented project instruction](../../configuration.md#instructions-before-context-collection) to the fixture's authored `AGENTS.md`, making the read order available before OpenSpec instructions are requested. It is an explicit project setup, not installer behavior. Each suite contains only one case, because some variants use the same agent/schema selector. Do not pass the suite index to the runner. Preparation makes no model calls. Each profile's existing limits and authentication apply; no skill is installed. Run only the cases needed for the current evaluation.

Retrieval variants write only a proposal and PR-style summary. Maintenance adds overlapping and outdated CSV notes, then asks the agent to reconcile them, verify a reusable observation, preserve history, and consider promotion to a durable rule. The [maintenance prompt](maintenance-prompt.md) authorizes those documentation changes. The checker verifies preserved baseline files, six passing tests, saved proposal instructions, and expected outputs; maintenance also checks retirement, historical text preservation, and a new verified note's date. Review relevance, factual support, links, promotion, and actual commands separately.

The [host-policy prompt](host-policy-prompt.md) asks the agent to interpret 11 hypothetical cases with two prose turns each. These cover absent, unknown, inaccessible, off, refusal, and fresh-session behavior. The installed project's actual mode is off; case inputs apply only to the exercise. Structured answers are checked separately from their status wording. This exercise tests policy interpretation and cannot establish actual host discovery, denied invocation, or installation behavior. No real inventory is replaced.

The checker cannot prove meaningful retrieval or skill use. A claimed available skill needs host-inventory evidence and a read of its instructions; do not equate discovery with application.

Record actual host limitations, unrelated-note reads, repeated statuses, or off-mode chatter as findings. Retain originals, package hashes, prompts, exact configuration, CLI/profile identity, and exposed usage. An unknown inventory is a valid fallback observation, not evidence that absent/usable states were exercised. These trials do not establish every host's support or actual installation behavior.
