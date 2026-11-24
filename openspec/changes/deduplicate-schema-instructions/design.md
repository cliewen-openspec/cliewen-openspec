## Approach

Keep the testing guidance in its existing Markdown source. Both bundle builders call the same function with either tasks or apply. Keep routing and Combined approval text at their existing call sites so instruction order stays stable.

## Verification

Install both revisions in fresh OpenSpec projects and compare file paths and bytes under openspec/schemas and .cliewen-openspec/templates. Run the repository test suite.
