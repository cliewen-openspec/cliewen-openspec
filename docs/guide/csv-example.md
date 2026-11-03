---
type: guide
---
# CSV example

The [first-change guide](getting-started.md) uses these files. The documentation test installs the packed candidate in a clean repository, copies the same files, runs the tests, collects evidence, and archives the change. This checks the reference workflow. It does not evaluate an agent's ability to write the code or assess assertion quality.

## API and scope

{{include:docs/examples/csv/README.md}}

## Implementation

The function builds the header and data rows in column order. One field encoder handles both headers and values.

{{include:docs/examples/csv/export.mjs}}

## Tests

Each top-level test title has one bracketed AC ID. The reference adapter uses that ID to match execution results to scenarios. Assertions use exact output, including CRLF separators and escaped quotation marks.

{{include:docs/examples/csv/test/export.test.mjs}}

## Try the workflow with an agent

Use a fresh pilot. Ask the agent to describe acceptance cases and verification before implementing small tasks. Review exact output assertions, relevant negative and boundary cases, actual execution results, and limitations. Follow [evidence-first verification](../configuration.md#evidence-first-verification).
