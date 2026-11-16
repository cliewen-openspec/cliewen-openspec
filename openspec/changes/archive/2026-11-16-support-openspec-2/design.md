# OpenSpec 2 repository-local integration

## Context

The [discovery](../../../../docs/analysis/openspec-2-discovery.md) found the existing suite passes with the development CLI updated. Installation still assumes one local spec tree and one Git revision. External stores can break that assumption.

## Goals / Non-Goals

Qualify the existing three schemas on 2.0 and prevent installation into unsupported external planning layouts. Multi-repo execution and a new evidence format need separate design.

## Decisions

Add one preflight in the existing lifecycle before recovery. Inspect the project config and store marker with existing safe-path handling. Reject standalone stores and pointers lacking both local directories. When both directories exist, follow native local precedence. Avoid importing experimental OpenSpec internals or reading its global store registry: absent local directories already prevent fallback initialization.

Keep the current minimums and explicit 1.x fixtures. The development npm dependency requires Node 22.12+, while the product's 1.15 path still supports Node 20.19+. Test 2.0 in the existing packed closure/prototype fixtures and shared integration suite.

Use isolated 1.17-to-2.0 migration to verify the canonical skill and tool integration. Preserve user-customized native copies according to upstream behavior. Cliewen lifecycle checks compare their bytes and link identity; it owns only its existing manifest paths.

## Risks / Trade-offs

The store preflight is deliberately local. It does not discover or configure global stores. Tests cover rejection before recovery and positive local precedence. Direct native operations against stores are outside Cliewen support.

Platform link privileges differ. Record the actual Windows link or copy result; CI runs deterministic checks on Linux as well. Passing fixture checks establish mechanics, not agent compliance.

## Migration Plan

Install the chosen OpenSpec CLI, commit customized native skills, preview native update, then review and apply it. Refresh Cliewen resources separately. No product artifacts are migrated and no published release is changed. Roll back the dependency and committed integration diff together if needed.
