# Investigate and prepare a separate delivery handoff

Read `trial-brief.md`. Use `cliewen-discovery` in `investigate-csv-marker`. Retrieve and save proposal, investigation, decision, and apply JSON under `docs/testing/instructions/` before use. Inspect existing specs/code/tests and project configuration.

Compare options and write an evidence-based proposed recommendation. Include `type: decision`, `status: proposed`, and `outcome: delivery`, `no-change`, or `further-investigation` in decision frontmatter. A reasoned alternative is valid; do not invent evidence to force delivery.

If recommending delivery, create a separate `cliewen-delivery` change named `add-csv-marker`, retrieve/save its proposal JSON, and write only its proposal. Link the source investigation and decision from that proposal, and the handoff from the discovery decision. Explain default behavior, intended scope, remaining design questions, and verification needs. Leave discovery on its own schema and proposed status. Do not create delivery specs, design, tasks, product IDs, or implementation before later review.

Record actual commands/results/limits under `docs/testing/`. Run the six original tests, discovery schema and strict source-change validation, status, and scoped health. The delivery proposal is intentionally partial; do not claim it passes full-change validation. Experiments are limited to 20 seconds / 50,000 rows each and 60 seconds total.

Preserve all baseline product inputs and prior documents. No product evidence, acceptance, archive, push, external PR, dependency installation, network service, or extra agent. Keep helpers in this project. Local commits are optional. Stop after the proposed investigation and conditional proposal-only handoff.
