# Optional native-first context selection

## Context

The [discovery](../../../docs/analysis/project-context-discovery.md) identifies a selection gap around existing OpenSpec inventories and instructions. Existing learning policy already controls lesson retrieval. The optional pass must start after that policy has been resolved.

## Goals / Non-Goals

Help agents find applicable durable knowledge with explicit scope and honest limits. This delivery adds no search engine, document graph, external connector, schema or required project record.

## Decisions

Add `contextSelection` to the existing project configuration: `mode: off|guided`, `roots: []`, `exclude: []`, `maxFiles: 8`. Empty roots means the configured `docsRoot`; exclusions are exact project-relative files or directory subtrees, not glob expressions. The budget is an integer from 1 to 100 and counts additional selected record contents, not required native specs or the existing learning gate. Index/metadata reads must remain focused.

Validate settings without reading document contents or rewriting authored config. Validate project-relative paths with the existing safe-path mechanism and reject traversal, absolute paths and unsupported glob syntax. Defaults are read-time behavior for older configs; installation does not fabricate a context index.

Install `.cliewen-openspec/context-selection.md` through the existing manifest lifecycle. A short shared entry makes it available to delivery, discovery and combined artifact/apply instructions. The optional pre-change reference points to it after the learning gate. Off mode requests no read of that reference or extra selection pass.

Guided mode uses native spec inventory and overviews before full relevant specs. Additional project knowledge comes from existing indexes and targeted host-tool reads, with status, applicability and source conflicts assessed explicitly. Neither a budget nor an index proves completeness. Critical missing context calls for focused resolution; ordinary well-understood work needs no new report or approval checkpoint.

Keep these controls independent of planning and documentation maintenance. Learning retrieval retains its existing gates even if selected roots include that collection. Native required reading and supplied project context are unaffected by the optional pass. Explicit confidentiality restrictions take precedence; surface a conflict if required work cannot be performed within them.

## Risks / Trade-offs

Agent guidance cannot enforce read boundaries or semantic relevance. Tests verify validated configuration, owned resource delivery and native instruction retrieval, not actual model compliance. A fresh-agent selection fixture is a later qualification step under the existing proportionate policy; no automatic matrix is introduced.

## Migration Plan

Older settings default off. Package installation and resource refresh remain separate operations. Existing manifests can receive the new owned reference only at a free path; unowned or edited content conflicts. Uninstall removes unchanged owned guidance and retains authored configuration and records.
