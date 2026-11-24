---
type: reference
---
# Command reference

Run commands from the project root. All commands accept `--root PATH` to select another project. For example, `npx --no-install cliewen-openspec check --root ../my-project --json`. The examples below omit `npx --no-install` for readability.

This reference covers Cliewen 0.4.0. Use the bundled reference for an older package.

## init

```sh
cliewen-openspec init --dry-run
cliewen-openspec init
cliewen-openspec init --default
```

Requires OpenSpec's `specs` and `changes` directories. Installs `cliewen-delivery`, `cliewen-discovery`, `cliewen-all`, Decision Record and learning templates, default project config, a docs entry point if missing, a local ignore file, and an owned-file manifest. Repeating an unchanged installation produces an empty writes list. Conflicting owned files or another manifest version stop installation.

`--default` selects `cliewen-delivery` as the default schema in `openspec/config.yaml`; without it the current selection is preserved. Select discovery explicitly when creating a change with OpenSpec. `--dry-run` lists writes without applying them. Init prints its writes as JSON; `--json` also requests JSON errors. `--default` is supported only for init. Dry-run also works with update.

Installing a different package does not automatically refresh an existing installed schema. Use update for supported ownership manifests; do not delete project configuration or the registry to work around conflicts.

Version 0.2.0 also installs manifest-owned planning, closure, and prototype references. The [optional archive-session setup](workflow.md#use-the-reference-from-a-separate-archive-session) points OpenSpec's project-owned guidance to the closure reference; installation does not add that configuration entry.

It also installs `.cliewen-openspec/product-context.md` for optional product intent and journeys. It creates no project goal or journey documents; existing records, configuration, and OpenSpec integrations retain their ownership. See [the workflow example](workflow.md#keep-the-users-outcome-in-view).

Development source additionally installs `.cliewen-openspec/context-selection.md`. The extra selection pass defaults to guided; [context-selection settings](../configuration.md#optional-context-selection-in-development-source) describe the explicit off choice and advisory limits. Published 0.2.0 does not install this reference.

Init/update check the running Node and selected OpenSpec CLI before recovery or installation writes, including previews. Development source requires Node 22.12+ and stable OpenSpec 1.15.0+; published 0.2.0 retains Node 20.19+. The project's npm installation takes precedence over PATH. See [version compatibility](../configuration.md#version-compatibility) for selection, timeout, and runtime limits.

## Choose or change a setup profile

In the development version, interactive `init` asks how you work on the project. Choose **Solo**, **Team**, or **Choose later**. For a script, pass the profile explicitly or omit it to keep the ordinary setup. Previews and JSON mode run without prompts.

```sh
cliewen-openspec init --profile solo --json
```

When a teammate joins a project where you had turned off review guidance, preview the switch and ask for recommendations for shared review:

```sh
cliewen-openspec profile team --shared-review --json
```

The preview shows the profile change and recommends enabling `features.review`. Apply just those two choices with the command below. [Requirements for switching profiles](../../openspec/specs/project-setup-profiles/spec.md#requirement-change-profiles-in-an-existing-project)

```sh
cliewen-openspec profile team --shared-review --apply --enable-review --json
```

To save just the profile in a script, run `cliewen-openspec profile team --apply --json`. To select settings interactively, run `cliewen-openspec profile team --apply` in a terminal. If separate clones or worktrees allocate IDs concurrently, answer yes when asked or pass `--concurrent` to see how to preview Git coordination. [Profile defaults and storage](../configuration.md#setup-profiles) · [Requirements for reserving IDs across clones](../../openspec/specs/acceptance-id-coordination/spec.md#requirement-durable-atomic-reservations)

## ci inspect

Available in Cliewen 0.3.0 and later.

```sh
cliewen-openspec ci inspect
cliewen-openspec ci inspect --json
```

Reads configured GitHub.com branch policy and reports whether your selected CI checks are required. It changes no project files or host settings. Requires Node 22.12+ and an installed GitHub CLI with existing repository access. It does not install tools or start login.

Configure `ciInspection.repository` and a nonempty `requiredChecks` list first. The default mode is advisory; explicit `off` skips inspection. An omitted branch selects the repository's current default branch. See [defaults, examples and access limits](../configuration.md#ci-requirement-inspection-in-development-source).

Reports show observed, missing or unknown requirements and separate bypass visibility. For example, green CI can coexist with a missing requirement, allowing integration without that check. This command inspects policy; use CI logs to diagnose a failing test or build. Exit 0 means an advisory report completed, including missing/unknown results. Invalid settings or usage and unsupported Node exit 2.

Init, update and ordinary `check` do not query GitHub for this feature. JSON contains the inspected target and time, per-check sources, coverage and findings. Host policy can change after inspection, and the report does not authorize integration.

## docs check

Available in Cliewen 0.3.0 and later.

```sh
cliewen-openspec docs check
cliewen-openspec docs check --json
```

Reads the project's Cliewen configuration and selected Markdown, reports findings, and changes no files. Requires Node 22.12+; Git, an evidence report and an OpenSpec subprocess are unnecessary. Standard installation supplies the Mermaid parser.

Local links, optional frontmatter and Mermaid syntax default to advisory checks. Set each category to `enforce` to block or `off` to skip it. The default scope is `docsRoot`; select root documents or active OpenSpec changes explicitly when needed. See [configuration, rules and limits](../configuration.md#documentation-checks-in-development-source).

| Exit | Meaning |
|---|---|
| 0 | No blocking findings; advisory warnings may still exist |
| 1 | An enforced category found an issue or could not finish |
| 2 | Invalid arguments/configuration, unsupported Node or command failure |

Inspect `categories` and `findings` in JSON. Status distinguishes `passed`, `issues`, `incomplete`, `off` and `not-applicable`; `ok` describes exit policy. No selected files is an explicit empty scope. This command checks mechanical consistency; it does not establish factual correctness or visual rendering, and it does not replace native OpenSpec validation or execution evidence.

### Check external links

The development version can check public HTTP and HTTPS destinations from the same selected Markdown files. Run it when reviewing or maintaining external links:

```sh
cliewen-openspec docs check --external-links
cliewen-openspec docs check --external-links --json
```

The report lists each destination once with its source files and lines. A successful response is reachable. A redirect is reported without following it. HTTP 404 and 410 mean missing, while 401, 403, and 451 mean restricted. Rate limits, server errors, and connection failures are inconclusive. The check skips credential-bearing URLs, non-default ports, and destinations without an eligible public address.

The report covers Markdown links and images. URL fragments and raw HTML are outside its scope. It uses HEAD, with a GET fallback for servers that return 405 or 501, and discards the response body. It probes up to 100 destinations from up to 1,000 references, with six probes at once, four seconds per destination and 20 seconds for the network phase. URLs longer than 4,096 bytes are omitted. JSON includes these limits, source collection status, and any omitted references under `externalLinks`.

External results are advisory. The existing local checks still determine the exit code. Run the command without the flag for an offline check.

## update

```sh
cliewen-openspec update --dry-run --json
cliewen-openspec update --json
```

Refreshes or repairs owned schema files and templates using the installed package. Output contains `dryRun`, `writes`, and `deletes`. It adds new bundle files, replaces unchanged owned content, and deletes unchanged retired owned files. Edited files conflict unless they already match the new package. See [the update guide](updating.md).

Configuration, default schema, AC registry, authored changes/docs, and evidence are preserved. Apply recovers an interrupted transaction first and uses rollback; dry-run does neither. The command has no `--default` or force option. Usage, config, ownership, or write failures exit 2; success exits 0. See [the update guide](updating.md) for the full workflow and conflict rules.

Development output adds `installedVersion` (null before first installation), `targetVersion`, `compatibility`, `creates`, `replaces`, and `recoveredTransaction`. Existing `dryRun`, `writes`, and `deletes` remain. `creates` and `replaces` partition `writes`; deleted paths remain in `deletes`. Preview applies no resource changes. Apply checks current inputs again, so a conflicting edit made after preview still blocks it. If apply restores a preceding transaction, the result or subsequent error reports that recovery separately.

## uninstall

```sh
cliewen-openspec uninstall --dry-run --default-schema spec-driven --json
cliewen-openspec uninstall --default-schema spec-driven --json
```

Removes only unchanged installer-owned resources and the ownership manifest, preserving authored files, config, registry, evidence, and custom resources. If the project default is not being removed, omit `--default-schema`; an unnecessary replacement flag is rejected. Otherwise an explicit replacement must validate through the public OpenSpec CLI. Active changes using removed schemas block uninstall, including inherited-default references. No change metadata is rewritten.

Output includes `dryRun`, `writes`, and `deletes`. Apply supports recovery and rollback. Missing owned files are tolerated. Edited owned files conflict. The candidate accepts the same manifest versions as [update](#update), and requires a manifest. Success exits 0. Usage, validation, conflict, or operation failures exit 2. See [the uninstall guide](uninstalling.md).

## ac next

```sh
cliewen-openspec ac next --capability csv-export
cliewen-openspec ac next EXP
```

Allocates one ID and writes the registry. The capability must be registered in `ac.capabilities`. The positional form accepts only a registered active prefix. There is no implicit global prefix. This command has no dry-run or JSON option.

The allocator considers the stored high-water mark and bracketed IDs in OpenSpec Markdown, including active and archived changes. Commit the registry. Local mode does not coordinate independent clones; development source adds [optional Git coordination](#ac-coordinate-sync-resume-and-abandon).

## ac rename-prefix

```sh
cliewen-openspec ac rename-prefix csv-export EXPORT
```

Updates config and registry together. It preserves existing IDs and continues the capability's number sequence. The old prefix stays reserved and cannot allocate new IDs. The command rejects prefixes owned by another capability, historical prefixes, and target prefixes already present in OpenSpec documents. It has no dry-run or JSON option.

## ac coordinate, sync, resume, and abandon

These commands are available in development source, after published 0.2.0. Local allocation remains the default. Choose coordination for concurrent agents or contributors, including solo projects using several clones or worktrees.

```sh
cliewen-openspec ac coordinate origin
cliewen-openspec ac coordinate origin --apply
cliewen-openspec ac sync
cliewen-openspec ac next --capability csv-export
```

The first command previews the shared ref and starting counters. It reads the selected remote and may populate Git's object cache, but changes no project files or remote reservations. `--apply` publishes the seed to `refs/heads/cliewen/ac-allocator` and selects that authority in `.cliewen-openspec/ac-coordination.json`. Commit this settings file and the registry. Setup and allocation use the same single fetch/push destination; they never push your integration branch.

Run setup from a reconciled project baseline before parallel work. Upgrade all participating clients to a version containing these commands. Old clients ignore coordination settings and cannot guarantee unique reservations. Teammates pull the settings and registry, then run `ac sync`. Sync reads the authority and refreshes local counters and compatible prefix mappings; it does not allocate. If local reservations exceed the authority, preview and apply setup again to seed them before parallel use.

Normal `ac next` and `ac rename-prefix` now use the shared authority. Allocation requires online write access. Missing or replaced authority state, conflicting mappings, denied access and outages fail without local fallback. If setup was interrupted, repeat `ac coordinate` with the original remote and `--apply`; a retained setup marker blocks allocation until completion. Never reset, delete, or rewrite the allocator ref: it preserves permanent reservations and retry identities.

If another clone wins first-time setup, Git's explicit creation rejection is retained so repeating setup can join that winner. An uncertain push outcome does not allow joining a different authority automatically. Git discovery errors also stop allocation; repair Git access rather than changing or removing recovery state.

```sh
cliewen-openspec ac resume
cliewen-openspec ac abandon
```

After an interrupted request, `resume` reconciles its existing result before requesting anything new. A published reservation stays reserved even if the local write failed. `abandon` explicitly clears the pending request after checking the authority; any published number remains consumed. These commands use local Git metadata to retain the request and require the selected authority to be reachable. They have no dry-run or `--json` flag.

State writes hold an exclusive local lock. After a crash, a leftover lock blocks new writers rather than being stolen automatically. The error gives its path. Stop all Cliewen writers for that worktree before removing only that stale lock, then resume the request. Git projects keep runtime files under Git metadata; non-Git local projects use a machine-temporary directory identified by the error.

To return to local allocation, finish or abandon pending requests, run `ac sync`, and change the project-owned coordination file to `{"version":1,"mode":"local"}`. Commit that choice. This ends cross-clone uniqueness protection; serialize subsequent work. Ordinary init, update and uninstall preserve this file and do not change the shared ref.

## check

```sh
cliewen-openspec check --change add-csv-export --json
cliewen-openspec check --capability export --json
cliewen-openspec check --json
cliewen-openspec check --change add-csv-export --fail-on-pending
```

Use `--change` to check a pending delta, or `--capability` to check one permanent spec. With neither option, the check covers all permanent specs. Collect a matching report first. `--json` returns `ok` and findings. [Collect evidence for one capability](../testing/evidence.md#collect-evidence-for-one-capability)

Installation and registry checks remain active when evidence is explicitly disabled. Evidence errors include missing reports, failed/skipped tests, missing/unknown/duplicate references, stale revisions, and dirty working trees. Pending with a reason is a warning unless `--fail-on-pending` is set. Manual verification is a warning. See [the report contract](../testing/evidence.md).

For a change whose OpenSpec metadata selects `cliewen-discovery`, check performs installation and registry checks only and reports `discovery-review-required` when evidence is enabled. It does not request a product test report or validate the investigation. See [discovery review](discovery.md#configuration-and-verification).

For `cliewen-all`, check requires valid decision outcome/status fields. Delivery requires accepted status, unskipped product specs, and ordinary evidence when enabled. No-delivery outcomes require native `skip_specs: true` and no Markdown product deltas, and return `discovery-review-required`. Findings include `all-decision-required`, `all-decision-unaccepted`, and `all-outcome-conflict`. These outcome checks remain active with evidence disabled; actual human agreement and research sufficiency require review. See [the combined workflow](all.md).

| Exit code | Meaning |
|---|---|
| 0 | No error findings; warnings and informational findings can remain |
| 1 | One or more check findings are errors |
| 2 | Command usage, configuration, report parsing, or another operation failed |

Task verification follows [evidence-first verification](../configuration.md#evidence-first-verification).

`--change` is supported only by check; `--fail-on-pending` is only supported by check. Check is read-only and does not recover a transaction or generate evidence. The separate [Node test adapter](../testing/evidence.md#collect-evidence-for-one-change) also accepts `--change NAME` when collecting reports. Use the same change name for collection and checking; a mismatched declared scope is an error.


## recover

```sh
cliewen-openspec recover
```

Restores originals and removes new files recorded in an interrupted transaction journal. With no journal, there is nothing to restore. Use it when check reports `interrupted-transaction`; review the restored files afterward.

## Version and help

```sh
cliewen-openspec --version
cliewen-openspec --help
```

OpenSpec commands such as `new change`, `validate`, and `archive` belong to OpenSpec, not this CLI.
