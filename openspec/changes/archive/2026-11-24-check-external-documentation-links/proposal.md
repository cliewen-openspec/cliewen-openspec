# Check external documentation links

## Why

The documentation checker validates local links. A reader can still follow a link from the guide to an external page that has moved, disappeared, or become restricted.

## What Changes

Add an opt-in, read-only check for HTTP and HTTPS links in selected Markdown documents. Show the source file and link for each finding. Distinguish reachable links, redirects, missing pages, restricted access, and inconclusive network failures. Apply bounded requests and protect local and private network destinations, including redirect targets.

Use our own guide as the first trial. Verify response handling with controlled fixtures. External link results are advisory and do not block a merge.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `documentation-consistency` adds an on-demand external link report.

## Impact

Affects the documentation checker and its CLI guide. See the [documentation consistency specification](../../../specs/documentation-consistency/spec.md).
