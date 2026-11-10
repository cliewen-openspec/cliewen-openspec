# project-planning Specification

## Purpose
Connect actionable work to one project-selected planning authority while preserving existing tools, documents, and authorization boundaries.

## Requirements

### Requirement: Use one optional planning authority
With features.planning enabled, guidance SHALL use the project's selected ticket system or lightweight local plan and record its project or backlog reference there. It SHALL avoid duplicate status authorities and require neither a backlog for standalone work nor separate goal documents by default.

#### Scenario: External backlog
- **WHEN** the project selects an external ticket system
- **THEN** guidance references its tickets instead of copying their status into a local backlog

#### Scenario: Local milestones
- **WHEN** the project selects local planning
- **THEN** guidance can keep goals and future deliveries in one plan using existing paths and conventions

#### Scenario: Planning disabled
- **WHEN** features.planning is false
- **THEN** guidance requests no planning-authority discovery, ticket access, or plan maintenance and preserves authored documents
- **AND** behavior scoping, relevant verification, and existing approval boundaries still apply

### Requirement: Discover host-mediated ticket access honestly
Planning guidance SHALL discover suitable MCP, connector, or CLI capabilities exposed by the host and distinguish read access, write capability, and authorization. The user SHALL connect services and grant access; credentials alone SHALL NOT authorize external writes.

#### Scenario: Read-only connection
- **WHEN** ticket content can be read but not updated
- **THEN** guidance uses available context and identifies pending updates without claiming they happened

#### Scenario: Missing or failed access
- **WHEN** no suitable tool is exposed or access fails
- **THEN** guidance reports the actual limitation, explains the needed connection where known, and offers links or concrete manual updates
- **AND** it does not claim a hidden integration is absent or that an unperformed update succeeded

### Requirement: Preserve native change naming and ticket references
The guidance SHALL use descriptive OpenSpec kebab-case change names and original ticket IDs with descriptive links in proposal content when applicable. It SHALL introduce no ticket-prefix naming feature or renaming of existing changes.

#### Scenario: Ticket selected
- **WHEN** work comes from ticket ABC-123
- **THEN** guidance retains its original ID and link in the proposal without requiring it in the change directory name

### Requirement: Expose pre-change guidance without replacing OpenSpec integrations
The package SHALL offer planning guidance and documented opt-in project-entry instructions for assessment before change creation. It SHALL explain that schemas cannot prevent earlier actions, and SHALL preserve OpenSpec-generated skills and existing project instructions.

#### Scenario: Project opts in
- **WHEN** a developer adds the documented entry instruction to the existing agent file
- **THEN** it points to installed guidance and the existing planning feature switch without requiring a new host or changing OpenSpec commands

#### Scenario: Schema-only installation
- **WHEN** the project has not added the optional entry instruction
- **THEN** documentation states that guidance becomes available when schema instructions are retrieved and cannot guarantee assessment before creation
