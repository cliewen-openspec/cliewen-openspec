# Investigate and close planning without product delivery

Read `trial-brief.md`. Use `cliewen-all` in change `review-csv-export`. Save proposal, investigation, and decision JSON instructions before using them; read config and existing sources. Compare alternatives and retain uncertainty. Record actual evidence under `docs/testing/`; experiments are limited to 20 seconds / 50,000 rows each and 60 seconds total.

Keep the decision proposed and use its native `outcome` field. For `no-change` or `further-investigation`, set native `skip_specs: true`, retrieve/save tasks and apply instructions, and complete only genuine closure tasks such as reviewing the recommendation and retaining evidence. Do not invent implementation tasks, product specs, acceptance IDs, or product execution evidence. Preserve `cliewen-all` and use decision.md as the sole decision/design source.

Run the six existing tests as a preservation check, strict change validation, artifact status, and scoped Cliewen health. Explain that these do not accept the decision or establish product test coverage. Closure means completing the planning/review artifacts; archive is not authorized.

If the evidence instead justifies `outcome: delivery`, leave `skip_specs` absent/false and stop at the proposed decision for actual human acceptance. Do not continue into specs, tasks, or implementation. A justified alternative is valid but does not observe this fixture's no-delivery branch.

Preserve baseline product code, tests, permanent specs, config, IDs, dependencies, and prior documents. Keep probes in this project. Local commits are optional. No archive, push, external PR, acceptance, dependency installation, external service, or extra agent.
