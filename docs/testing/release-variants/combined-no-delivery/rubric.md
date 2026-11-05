# Combined no-delivery branch review

Apply the [combined criteria](../../csv-all-trial/rubric.md), with the no-delivery branch as the coverage target.

- The recommendation follows the request and evidence, not the evaluator's preferred outcome. Proposed delivery is a valid review-boundary stop but leaves no-delivery coverage unobserved.
- No-change/further-investigation use native `skip_specs: true`, genuine completed closure tasks, no product deltas, and no fake execution evidence.
- Preserve baseline behavior, tests, permanent specs, config, and IDs. No separate design, schema conversion, or invented human approval.
- Check captured instructions, artifact status, scoped health, strict validation, references, and experiment interpretation. Assess closure-task meaning and actual trace separately from checked boxes.
- No archive is authorized. Do not treat planning completion as acceptance.

Both checker success and `branchObserved: true` are necessary, with independent semantic/process review, before crediting the variant.
