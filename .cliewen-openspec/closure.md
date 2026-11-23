# Close a Cliewen change

Use native OpenSpec status and the selected change's metadata to establish its schema, outcome, and resolved paths. Apply this reference to cliewen-delivery, cliewen-discovery, and cliewen-all changes. For other schemas, continue their native workflow. Read .cliewen-openspec/config.yaml and respect existing project conventions and authorization. This reference is advisory agent guidance, not a CLI hook or proof that review happened.

## Before archive

For relevant integration review with ciInspection configured and enabled, use .cliewen-openspec/ci-inspection.md. Keep observed requirements, missing or unknown coverage and bypass visibility separate from CI results and archive authorization. Explicit off skips inspection; no extra approval gate or report is required.

For delivery, compare the actual diff, tests, and affected documentation with the reviewed scope and accepted amendments. For each agreed outcome and constraint, check the delivered behavior and its verification result. Distinguish missing behavior from missing or unavailable evidence. Look for unrequested changes and explain necessary supporting edits. Use "Handle scope findings" in .cliewen-openspec/planning.md even when optional planning is disabled. Preserve the review outcome and any accepted amendments with the change, and surface unresolved items before archive. Keep a clean result in an existing task note or handoff.

Use the shared manual-step and observation guidance in .cliewen-openspec/planning.md independently of its optional planning settings. Automate feasible authorized checks before asking for manual work, explain any residual human need, and retain actual observation context and limits in existing records. Distinguish agent checks, human feedback, change approval, and release authorization. Reassess observations affected by later changes; manual evidence retains its existing warnings and freshness requirements. Missing feedback alone adds no routine approval gate.

With features.documentation enabled, reconcile affected explanations, architecture/design documents, examples, and links with the delivered result, using docsRoot and existing paths. With features.decisions enabled, maintain relevant Decision Records and their genuine acceptance status. Disabled facilities impose no matching optional work and preserve authored files.

For affected product intent or journeys, follow .cliewen-openspec/product-context.md. Reconcile enabled documentation with actual behavior and keep desired outcomes distinct from implementation and observed user results. Surface drift or additional wishes through existing scope rules; archive does not authorize them or establish user success.

With learnings.enabled and features.documentation enabled, follow the installed learning guidance: read the index before selecting notes, verify against current authority, retain only reusable evidence-backed observations, and merge or retire stale guidance in place. Otherwise skip learning retrieval and maintenance.

For delivery, apply the existing coverage, assertion-effectiveness, lifecycle, and evidence policies independently. Off skips its matching policy; review discloses unresolved findings and enforce resolves blocking findings. Preserve valid and shared active assertions. Remove obsolete assertions only following explicit accepted retirement, retain reserved IDs, and refresh review records when their inputs change. Evidence failures stay blocking when evidence is enabled.

For discovery or a combined no-change/further-investigation outcome, retain actual findings, uncertainty, recommendation, decision status, and experiment cleanup results. Follow that workflow's native skip-specs contract. These findings do not establish unimplemented product behavior and require no synthetic product execution evidence. Existing outcome consistency and approval rules still apply.

Obtain the required archive authorization without asking again when it was already given. Follow native OpenSpec synchronization and archive, using resolved paths and explicit user choices. Report pending synchronization honestly if the selected native route leaves specs unsynchronized. Do not infer acceptance, ticket completion, deployment, or Git integration from archive alone.

## After the native operation

Inspect the actual result, archive destination, and permanent specs. If archive or synchronization failed or completed only part of the work, inspect current paths and changed files before retrying. State what actually changed, what remains, and the next action; do not report full closure or blindly repeat the operation. A failed or partial operation does not establish successful completion for planning purposes.

After successful archive, repair affected moved-file links and preserve useful knowledge at its established locations. With features.planning enabled, use .cliewen-openspec/planning.md to reassess affected tickets or plan items against actual results, dependencies, and the project's completion criteria. Seek direction for material changes in agreed scope. Prepare the next detailed proposal only when that work is selected. With planning disabled, skip ticket access and plan maintenance.

Use existing authorized ticket tools when applicable. Distinguish read access, write capability, and authorization. If access is read-only, unavailable, fails, or lacks authorization, report the archive result and concrete pending update separately without claiming ticket closure. A ticket may require additional deployment or human verification before completion.

For delivered behavior with evidence enabled, finish the tracked closure edits and commit the reviewed inputs. Once the permanent specs reflect the change, collect fresh evidence and run Cliewen check. For one affected capability, use --capability NAME on both the Node adapter and check. Use the whole-project scope when evidence must cover multiple capabilities together. Archive or any later commit makes earlier reports historical. Keep reports ignored and untracked. Report the tested revision and result, including pending verification. No-delivery outcomes retain their own review contract.

Finish with a brief handoff: actual archive location, spec synchronization result, remaining work or pending updates, and relevant verification limits. Use existing records rather than a mandatory new artifact.

## Writing policy

Read writing.humanizer (default auto; values auto, on, off). With off, skip this policy and continue with baseline writing and independent host requirements. Omit all Humanizer mentions from the handoff, including a note that it was disabled or skipped. Do not look for, invoke, or suggest installing the skill under this policy.

With auto or on, inspect the host's exposed skill inventory. Use a usable Humanizer skill, including a namespaced one. Read and apply its instructions before claiming use. Keep skill discovery and loading in tool calls with no user-facing progress announcement. Do not scan global directories.

Include one brief status per session in the first writing handoff. Use the outcome you observed:

- Humanizer used. Say this only after reading and applying the skill.
- Humanizer detected but inaccessible. Use this when the host identifies the skill and you cannot invoke it.
- Humanizer absent. Use this when the exposed inventory confirms absence. In the same status, link to https://github.com/blader/humanizer#installation and current host instructions unless the user previously declined.
- Humanizer availability unknown. Use this when no inventory is available. A failed load of a guessed name does not establish whether the skill exists.

Check the handoff before sending it. If this is the first writing handoff under auto or on, include the observed status even when availability is unknown. Keep it out of project artifacts and omit it in later replies once reported. On explicitly requests use but remains nonblocking when unavailable. Continue with baseline guidance in every fallback.
Never install/update skills, enable plugins, or modify global configuration automatically. Re-evaluate in a new session; no persistent machine-wide detection cache is required.
Apply the skill to all authored prose, including proposals, specs, tasks, guides, comments, docstrings, commit and PR descriptions, messages, and replies. Preserve code behavior, requirements, commands, identifiers, examples, links, and structured syntax. Check factual claims after rewriting; stylistic editing does not establish correctness. See the installed docs/configuration.md for defaults and limits.
