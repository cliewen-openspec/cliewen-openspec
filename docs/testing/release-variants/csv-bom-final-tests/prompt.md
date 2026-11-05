# Deliver the CSV option with final-suite verification

Read `trial-brief.md`, the existing specs, and project configuration. Use `cliewen-delivery` and change `add-optional-csv-bom`. Preserve the six original test titles/assertions and scenario IDs; allocate new IDs with the Cliewen CLI.

Retrieve and save JSON instructions for proposal, specs, design, tasks, and apply under `docs/testing/instructions/`. Plan acceptance cases and their checks before implementation. Follow configured end-of-change placement: each task needs a suitable completion check, while the automated suite belongs in a final verification section linked to the tasks. Do not claim a command ran merely because it appears in tasks.

Implement the small dependency-free option. Review assertions, run the full existing/new suite and strict OpenSpec validation, exercise the README example, and record actual commands/results/limitations under `docs/testing/`. Update README and write `docs/testing/pr-description.md`. Keep unresolved advisory findings visible.

Commit inputs locally, collect real evidence scoped to this change from clean HEAD, and run `cliewen-openspec check --change add-optional-csv-bom --json`. Recollect after later commits. Stop before archive, push, or external PR. Use only existing local dependencies; keep probes in a project-local ignored directory. No extra agents, external services, or installations.
