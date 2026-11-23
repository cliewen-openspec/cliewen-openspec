# Select relevant project knowledge

Read contextSelection in .cliewen-openspec/config.yaml. Defaults: mode guided, roots [], exclude [], maxFiles 8. Off requests no additional pass or handoff; existing required spec reading and learning policy still apply. This reference supplies advisory agent instructions, not a retrieval engine or access-control boundary.

## Resolve policy first

Start only after the learning policy is resolved. If learnings.enabled or features.documentation disables lessons, exclude their contents even when a selected root includes them. When enabled, read only the learning README.md index in its own tool call, then selected relevant active notes in a later call under the existing policy. Never preload the collection. Retired lessons do not guide ordinary work; missing or insufficient index information is a limitation, not permission to read everything.

Guided selection is independent of optional planning and documentation maintenance. With those features disabled, use relevant existing supplied records without creating documents, maintaining plans or accessing tickets. Preserve authored paths and project authority. Explicit confidentiality restrictions remain applicable.

## Start with OpenSpec

Use the installed public CLI: `openspec list --specs --json` for inventory, then `openspec show NAME --type spec --json --no-scenarios` for focused overviews where supported. Use equivalent public operations on supported older versions. Read relevant specs in full, including scenarios, before deciding coverage or behavior. Retrieve the selected workflow's native instructions. Keep short project context/rules authoritative at their existing source instead of copying the corpus into them.

`openspec context --json` on OpenSpec 2 describes the resolved root and declared repo/store relationships. It is not a relevance search over decisions or lessons. This package supports repository-local workflows; this reference does not enable external stores or authorize global config/workspace writes.

## Select additional records

Empty roots means docsRoot (default docs). Otherwise use the listed project-relative files/directories. Exclusions are exact project-relative paths and their descendants, using path-segment boundaries; normalize slash direction when comparing. They are not glob patterns. Apply them before reading additional contents. Do not broaden a search across excluded paths, disabled learning collections, credentials, global directories or external repositories.

Use existing indexes, titles, scope and status to choose additional records with authorized host tools. Keep index/metadata reads focused. maxFiles counts distinct additional selected records whose contents are read; required native specs, configuration/instructions and the established learning gate are separate. Read only relevant sections where useful. This budget guides the agent and is not mechanically enforced or a claim that less text was actually read.

Use filenames and directory roles as candidate signals alongside headings, indexes and metadata. A README.md may be an overview or index; existing decisions/, architecture/ or testing/ folders can suggest where relevant knowledge lives. Follow docsRoot and the project's actual organization, including custom paths. Do not require these names, create a standard tree or rename documents. Verify each selected source's meaning and authority rather than assuming either from its location.

Use existing Markdown frontmatter when it helps selection: for example title, status, scope, type and links, interpreted through the project's own conventions. Inspect only allowed candidate files after applying exclusions and learning gates; frontmatter inspection is still a file read. Do not require new fields, rewrite metadata or infer authority from an ID alone. Missing, unknown or stale metadata is a limitation to verify against the selected content and current sources.

Prefer current accepted decisions and applicable constraints. Treat tentative, inferred, superseded or historical records according to their status; a filename or matching phrase alone establishes no authority. Check applicable facts against current specs and available evidence. Surface consequential contradictions instead of choosing silently or inventing missing intent. Supplied task context can identify a useful source without requiring a broad search.

If a missing index, broken reference, excluded source or exhausted budget leaves essential context unknown, state the gap and seek a focused resolution. Do not silently omit an essential constraint or expand scope. Native required reading remains required; if an explicit confidentiality restriction prevents it, report that conflict before dependent work.

## Keep the handoff useful

When useful, briefly name selected sources and why they apply, material conflicts, missing information and scope left unexamined. Use descriptive links; do not copy entire specs or imply complete retrieval. Routine clear work needs no separate report, context artifact, new index or approval checkpoint. Installation creates no project knowledge record.
