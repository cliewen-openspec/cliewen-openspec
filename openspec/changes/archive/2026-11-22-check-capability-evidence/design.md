## Selection and evidence

Accept a kebab-case capability name and resolve its repository-local `openspec/specs/<name>/spec.md` through the existing path checks. The checker and adapter use the same scenario selection. Reject missing specs, specs without active scenarios, and commands that combine `--change` with `--capability`.

Use `scope: { "capability": "export" }` in the version 1 report. Require an exact capability match and the full runner exit code. Keep the existing unscoped and change report rules for their callers. Run the explicit test files normally and retain only results matching the selected scenarios. Keep full runner failures visible even when their tests have no selected ID. If execution completes with no matching results, write the scoped report with an empty results list so the checker can name each missing criterion. Reuse current revision, clean-tree, and stale-report protections.

## Review and workflow

Apply the existing coverage and effectiveness rules to selected criteria. If review records are needed, use a capability-specific record with the same scope and freshness rules. For lifecycle review, compare the selected spec at baseline and HEAD, including criteria removed since baseline. Keep cross-capability lookup for checking whether a shared assertion still serves an active criterion. A cross-capability remap needs a whole-project report with passing evidence for the replacement. Keep pending and manual verification outcomes visible under the existing rules.

Use change-scoped checks for pending spec deltas and capability-scoped checks against permanent specs after synchronization. Recollect on the final revision if archive changes HEAD. The same CLI exit status works locally and in any CI runner.
