# Design

## Context

See [the proposal](proposal.md) for the problem and scope. Decision 024 already establishes optional user-selected experiments. Shared scoping guidance, the installed pre-change reference, discovery investigation instructions, and the combined workflow provide the relevant carriers.

Native explore in inspected OpenSpec 1.15.0 and 1.17.0 permits inspection and confirmed artifact capture but prohibits code implementation. Experimental code therefore runs from an investigative change, not from explore. Normal conversational sketches and read-only analysis remain ordinary exploration rather than a new experiment protocol.

## Goals / Non-Goals

Make prototype selection, limits, findings, and disposition concrete within existing workflows. Preserve existing configuration, native graph, product approval boundaries, and project ownership. This increment is guidance and examples rather than an experiment runner or an automatic sandbox.

## Decisions

Recommend a short cliewen-discovery change: question, limits, and decision criteria in its existing proposal; bounded experiments and actual feedback in investigation; findings and next-step recommendation in decision. This proposal scopes the experiment, not the eventual production delivery. A later cliewen-delivery proposal uses the findings when that delivery is selected. The owner accepted this recommended default with the implementation instruction on November 10, 2026. An explicitly selected cliewen-all remains supported and keeps its existing decision boundary.

A separate discovery change keeps uncertain experimental work apart from later product obligations. Using cliewen-all by default would keep everything together but creates the larger active change the owner wants to avoid when the eventual delivery is still unknown. Both existing workflows remain valid choices; introduce no new schema or fixed prototype artifact.

Install .cliewen-openspec/prototyping.md as a common manifest-owned reference sourced from schemas/base/instructions/prototyping.md. Extend the exact ownership allowlist and reuse preview, conflict, recovery, update, and uninstall rules. Add short shared scoping cues and investigation guidance that point to it, including the pre-change planning reference after its context-policy instructions. Guide users through existing native workflows rather than editing OpenSpec-generated skills.

The agent first checks whether ordinary inspection or clarification can resolve the uncertainty. A prototype suggestion names the question, expected learning, estimated effort, proposed workspace/outputs, resource bounds, and next decision. Agree material missing limits before writes. Reuse sufficient existing authorization and respect native capture rules when leaving explore. Optional grill-me remains user-invoked and neither requests nor authorizes a prototype automatically.

Use an agreed isolated workspace, preferably an existing ignored project-local scratch location. State the real isolation boundary: an ignored directory or prompt restriction does not establish OS-enforced protection. Experimental code and checks stay separate from production paths and product evidence. Existing product code, acceptance contracts, permanent specs, AC identities, and external-action permissions retain their authority. Request direction before material expansion. Respect approved cleanup; preserve authored work and reference material when it is to be retained.

Record method, inputs, actual result, user feedback and source, interpretation, limits, and next step in the existing investigation artifact. With planning enabled, link to or update the selected authority without copying its status elsewhere. With learnings enabled and documentation active, retain only useful reusable observations under the current index-first policy. Disabled facilities skip their optional maintenance; native investigation artifacts still hold the result. A missing user response is not positive feedback or approval.

A clear task proceeds normally. A declined experiment leaves uncertainty visible and permits normal clarification. After an agreed experiment, record code disposition and the next decision. Reuse in production requires review against the selected delivery contract and tests; prototype checks alone do not establish product acceptance.

## Risks / Trade-offs

A prototype protocol could become routine paperwork. Keep the suggestion and records proportional, reuse existing artifact sections, and require no explanation for skipping a prototype on understood work.

Instruction delivery does not prove agents respect experiment boundaries. Use deterministic installer/native-input checks and one bounded post-implementation observation covering an approved experiment, a clear task, and a declined suggestion. Label scripted feedback separately from real user observations and preserve failures. Do not claim host isolation from a prompt or direct observation of skill invocation from inventory alone.

## Migration Plan

Add guidance and a reference to development source without new config keys, CLI commands, evidence fields, or automatic directory creation for experiments. Existing supported ownership lifecycle applies to the resource. General cross-version upgrades remain roadmap priority 3. Published 0.1.0 remains unchanged and lacks this guidance. No experiment, archive, or publication is executed by preparing this proposal.
