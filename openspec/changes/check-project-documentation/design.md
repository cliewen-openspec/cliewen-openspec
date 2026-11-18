# Read-only documentation checks

## Context

See [the proposal](proposal.md) for the problem and scope. The existing `check` command mixes installation and execution-evidence checks and has early returns. The maintainer guide build depends on VitePress pages and generated output. A separate command can inspect project documents without either prerequisite.

## Goals / Non-Goals

Provide repeatable checks through the installed CLI, with independent policies and an honest account of incomplete work. Preserve project-owned files and native OpenSpec artifact formats. This delivery does not fetch URLs, rewrite documents, execute embedded HTML, render diagrams or assess prose and factual correctness.

## Decisions

### Command and result

Use `cliewen-openspec docs check [--json] [--root PATH]`. It reads the project's Cliewen configuration but needs neither Git, an evidence report nor an OpenSpec subprocess. Keep the existing `check` command's behavior intact; integrating both commands is a later option.

Return stable codes, category, project-relative path, line where available and a concise message. JSON includes selected roots, exclusions, counts, per-category mode/status, supported anchor dialect, Mermaid parser version and findings. Category status distinguishes `passed`, `issues`, `incomplete`, `off` and `not-applicable`. An empty scope is explicit, not evidence that documents passed. Do not print source bodies in findings.

Exit 0 means no blocking finding, including advisory warnings or all checks off. Exit 1 means an enforced category has an issue or cannot complete. Exit 2 means invalid configuration, arguments, unsupported runtime or a command-level failure. JSON distinguishes the exit-policy result from per-category validation status so advisory mode cannot imply valid documents.

### Configuration

Add the following defaults to the existing configuration reader; omitted and partial settings use them without rewriting authored YAML:

```yaml
documentationChecks:
  roots: []
  exclude: []
  links: advisory
  metadata: advisory
  mermaid: advisory
  metadataRules: []
```

Each category accepts `off`, `advisory` or `enforce`. Empty roots selects `docsRoot`. Roots can be project-relative Markdown files or directories. Exclusions match exact paths and directory descendants, with normalized slash direction and segment boundaries; no glob syntax. Root README/CHANGELOG files and active changes can be added explicitly. Selection is independent of context-selection budgets and exclusions, planning, evidence, and optional document-maintenance guidance. A disabled category contributes no validation work; with all categories off, return without walking document roots.

This command audits authored documents; it does not retrieve lessons as agent guidance. Existing lesson-use gates still apply to agents. Shared instructions offer the command when relevant to changed documentation, respect its own modes and scope, and explain any unchecked changed files. They do not require a second report or invent a successful result from an advisory exit code.

Metadata rules use the same exact path/subtree semantics. For example:

```yaml
documentationChecks:
  metadataRules:
    - path: docs/decisions
      required: [type, status]
      values:
        type: [decision]
        status: [proposed, accepted, rejected, superseded]
```

Only the listed keys are accepted. `required` lists top-level field names; `values` maps fields to nonempty allowed string lists. An allowed-value rule checks a field when present; `required` controls presence. Unknown document fields are allowed. Matching rules all apply, so authors can narrow a subtree without implicit precedence. Scope a rule explicitly before requiring metadata on native OpenSpec artifacts.

### Scope and file safety

Collect `.md` and `.markdown` files in stable project-relative order, without following symbolic links or directory junctions. Apply exclusions before content reads and reject absolute/traversal configuration paths. Never traverse `.git` or `node_modules`. Missing configured roots, unreadable selected files and exceeded limits are incomplete checks, with enforcement following the affected category's policy. Invalid settings are exit-2 errors even when a category is off.

Use documented bounds of 1,000 selected Markdown files, 10,000 directory entries, 1 MiB per file and 256 KiB per Mermaid block. Exceeding a bound must not silently truncate the report or produce a pass. These bounds limit a check, not agent context retrieval. A later change can add configuration if real projects need larger scopes.

### Local references and fragments

Use Markdown tokens for inline/reference links and images; ignore link-shaped code examples. Strip frontmatter from the Markdown body without requiring valid metadata to run other categories. Resolve local targets relative to the containing file, decode URI escapes once, separate queries/fragments and preserve filesystem case behavior. Check images and directory targets for existence. A link may legitimately use `..` within the project; an escaping target is an unchecked boundary finding, not permission to read outside it.

For fragment checks, support Markdown heading IDs using the `github-slugger` convention, including duplicate headings and Unicode. Extract heading text through the Markdown parser, and reset slug state per target document. This is a declared dialect, not a claim to reproduce every host. Explicit HTML anchors, renderer-specific heading attributes, generated page routes and non-Markdown fragments remain reported as unsupported when relevant; do not mislabel them as broken GitHub-style headings. External schemes and site-root URLs are intentionally outside local checking and reported in scope counts.

Only read fragment targets within the selected, non-excluded document scope. For other in-project targets, existence can be checked without reading their bodies; report the fragment as unchecked. An unchecked required local fragment makes links incomplete and blocks in enforce mode. This avoids using links to expand the content-reading scope. Unresolved reference definitions and malformed local encodings produce findings rather than disappearing from the parser's output.

Resolve both reference labels through MarkdownIt's escape-aware helper. Match selected fragment targets by filesystem file/directory identity and stored entry names, not an OS-based case rule. Keep separate hard-link entries distinct so identity matching preserves selected scope. Directory-name discovery uses the documented bound; unavailable or ambiguous identity remains unchecked. This corrects the two false failures retained in the [implementation review](../../../docs/testing/documentation-checks-001.md).

### Frontmatter

Use the existing YAML dependency's document parser to reject syntax errors and duplicate keys. A present block must contain a mapping. Absence is valid unless a matching rule requires fields. Validate only explicitly configured field/value rules; keep custom fields, types and statuses available by default. Return actionable locations without rewriting metadata or requiring filenames and directories to match field values.

### Mermaid

Use the pinned supported Mermaid parser through its public parse API, with its required DOM support included in runtime dependencies. Reuse the locally proven parser/DOM approach, separate from the site's VitePress build. Report the actual parser version. The [Mermaid usage documentation](https://mermaid.js.org/config/usage.html) describes its runtime requirement; [github-slugger](https://github.com/Flet/github-slugger) documents the heading convention above.

Parse fenced `mermaid` blocks, supporting the pinned parser's bundled diagram types. Use strict settings without project-supplied plugins, script execution or resource loading. Run parsing in a dedicated child process with bounded input/output and a five-second per-block deadline; stop a hung parser and mark unfinished blocks incomplete. Keep the parser lazy so off mode and documents without Mermaid blocks need no parser initialization. Invalid grammar is an issue; initialization/timeout failures are incomplete. Parsing does not establish visual rendering or consistency with surrounding claims.

### Runtime and package boundary

Set `engines.node` and the release compatibility declaration to 22.12.0 together. Keep OpenSpec 1.15.0+ and the current supported installation-version policy. Promote only needed parser dependencies to runtime dependencies; do not ship the VitePress/browser testing toolchain. Package installation supplies tooling; checking does not install, upgrade or contact services.

## Risks / Trade-offs

- Parser dependencies increase installation size: inspect the packed dependency set and verify a production-only install.
- Host-specific anchors can differ: declare the supported dialect and report unsupported fragments explicitly.
- Advisory mode can be mistaken for success: expose findings and category status independently of exit policy.
- Partial scopes and limits can hide defects: report omissions and incomplete categories; enforce cannot pass them.

## Migration Plan

Land runtime checks and their documentation with the dependency change. Verify the exact Node 22.12.0 minimum, a newer supported runtime, and below-minimum rejection before recovery writes. Existing configs get advisory defaults at read time and retain explicit off/enforce choices. Existing documents, configuration bytes and native integrations remain unchanged by checks and resource updates under their ownership contract.

Document commands as planned until implementation. Then update CLI/configuration guidance, changelog and decisions together, exercise examples against the packed package, run focused positive/negative fixtures, the normal suite, strict OpenSpec validation and the guide build. No new agent trial is required for deterministic parsing; the existing release-trial policy remains separate. Release numbering and publication remain unselected.
