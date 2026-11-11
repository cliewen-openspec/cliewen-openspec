For all text you create or edit, including plain-text files, Markdown, proposals, specs, tasks, code comments, docstrings, commit messages, pull-request descriptions, user-facing messages, and conversational replies, adapt the explanation to the intended reader and format without assuming knowledge of the conversation.
Lead change descriptions with the problem, resulting behavior, and practical impact.
Use plain language, concrete examples, and only details needed to understand behavior, constraints, risks, or tradeoffs.
Write natural prose using the fewest words that preserve meaning and required detail, whether or not a writing skill is available.
Explain unfamiliar terms.
Link references with their ID and descriptive title, and explain their relevance when needed; avoid unexplained IDs.
For example, write "Decision 002: Distinguish the shared base from selectable workflows", not just "Decision 002"; preserve exact IDs in machine-readable fields.
State each fact once and link to supporting detail.
Remove filler and repetition without losing requirements, acceptance criteria, important exceptions, or required artifact sections.
Code comments explain intent, constraints, or surprising behavior instead of restating code.
Commit messages summarize the concrete change, adding rationale or consequences in the body when useful.
Use diagrams only where the format supports them and they improve understanding.
Preserve code behavior, structured data, required syntax, and exact identifiers.
Apply the same diagram guidance across these texts.
For PR descriptions, include relevant validation and limitations.
Before handing off authored or edited documents, resolve local Markdown links relative to each containing file, verify existing targets and any fragments with available link/render checks, and correct broken links. A proposal under openspec/changes/CHANGE/ reaches project-root docs/ with ../../../docs/, not ../../../../docs/. Describe planned files as planned paths until they exist instead of making broken links. Report the checks actually run and any unchecked link limits; passing tests alone does not validate document links.
Check documented defaults, allowed inputs, and examples against the implementation and accepted requirements. Exercise the examples and boundary values covered by a claim; correct contradictions before finishing.
Distinguish the accepted contract from observed behavior on a particular runtime. Before claiming that an input cannot work based on an implementation detail, probe a relevant counterexample or state that the restriction is unverified.
Describe values at the boundary actually checked: producing text does not establish its encoded bytes or downstream behavior.
Name the verification command actually run and what it establishes. Artifact validation, installation health, test execution, and assertion review check different things; do not substitute one result for another.
For unspecified inputs or unverified behavior, state the limit instead of promising an outcome.
Ground motivation and problem claims in the request, inspected project sources, or observed results. Mark an unverified hypothesis explicitly; do not turn plausible background knowledge into an observed project problem.
Before using universal claims such as "never starts with", "exactly one", or "no marker", check supported caller content that could already contain the character or pattern. Describe what the operation adds or changes separately from content it must preserve. A downstream benefit inferred from technical background remains a hypothesis unless inspected evidence supports it; the request for an option is sufficient motivation on its own.
When a request only asks for an option or capability, that request is sufficient motivation. Do not attribute consumer failures, business needs, or other inferred reasons to the requester. Label relevant technical background as unverified context rather than as a reported project defect or the requester's stated reason.
Review clarity and brevity before finishing; do not impose a fixed word limit.
Before requesting a decision on a proposal, Decision Record, PR, or handoff, check that an unfamiliar reader can understand the problem, user-visible change, scope boundaries, and decision needed without the conversation or implementation code. Remove repeated detail and use descriptive links to supporting specs. Preserve required artifact sections, requirements, acceptance criteria, and important exceptions. Follow existing diagram settings; use a diagram with a short explanation when clearer, without requiring one or repeating each step in prose. This is agent review, not automatic proof of readability.
