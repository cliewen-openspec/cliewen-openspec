---
type: guide
---
# Exercise project learnings and writing modes

This maintainer fixture checks whether a fresh agent can use the installed proposal instructions, retrieve relevant indexed lessons, and follow Humanizer policy without changing code or existing knowledge. It complements deterministic configuration and ownership tests.

[Result 001: First learnings and Humanizer observations](result-001.md) records six attempts, including retrieval and unsupported-claim failures. Use the [review rubric](rubric.md) with the [neutral prompt](prompt.md); structural success alone is insufficient.

```sh
npm run trial:knowledge:prepare
```

Preparation builds and packs this checkout, creates a CSV baseline with six tests, and seeds a verified formatter lesson, a retired conflicting suggestion, and an unrelated database note. The observation supporting the verified note is captured locally. It prints separate runner suites for auto, off, on, and a custom-root/off variant using `notes/lessons`. Choose one printed suite path for each fresh process:

```sh
node scripts/run-cli-trial.mjs MODE_SUITE codex-cli-primary cliewen-delivery
node scripts/check-knowledge-writing-trial.mjs PROJECT ARTIFACTS
```

Replace the uppercase values with that case's paths. Each suite contains only one case, because the variants use the same agent/schema selector. Do not pass the suite index to the runner. Preparation makes no model calls. The existing Codex profile's limits and authentication apply; no skill is installed or inventory simulated.

The agent writes only a proposal and PR-style summary. The checker verifies preserved baseline files, six passing tests, saved proposal instructions, and expected output files. It cannot prove meaningful lesson retrieval or skill use. Inspect actual commands, prose, and statuses separately. A claimed available skill needs host-inventory evidence and a read of its instructions; do not equate discovery with application.

Record actual host limitations, unrelated-note reads, repeated statuses, or off-mode chatter as findings. Retain originals, package hashes, prompts, exact configuration, CLI/profile identity, and exposed usage. An unknown inventory is a valid fallback observation, not evidence that absent/usable states were exercised. These trials do not establish every host's support or actual installation behavior.
