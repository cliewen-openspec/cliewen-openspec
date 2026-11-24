## Implementation

- [x] Configure the release note mode and destination. Exercise defaults, custom targets, disabled settings, unsafe paths, and upgrades without configuration rewrites for NOTE-001.
- [x] Install release note guidance in the shared closure reference and update the user guide. Verify the guidance is reachable and covers the delivery and opt-out paths for CLOSE-001. Run one focused agent trial and record the observed decisions.

## Workflow follow-up

Review the delivered scope and test results before archive. Collect revision-bound evidence on committed inputs.

## Verification

The 28 focused tests passed, including native archive and packaged closure guidance on OpenSpec 1.15.0, 1.17.0, and 2.0.0. The documentation build checked 560 local links, and strict OpenSpec validation passed.

A fresh read-only Claude Code 2.1.331 session using Sonnet 5.5 inspected four disposable projects. It recognized the existing note in VERSIONS.md and avoided a duplicate, asked which of two plausible files to use, suggested CHANGELOG.md and waited when no destination existed, and skipped the project with release notes off. It treated missing or deferred notes as nonblocking. Trace inspection confirmed that it read the installed reference and checked the relevant configuration and files. The trial observed the proposed actions. It did not perform edits or archive.

Installed closure reference SHA-256: "32d87f4b5c7450d7c8556a22c607c3f35de90e719b6ed3d58fea53dd01ead9a6".

## Delivery review

The owner approved the implemented change. The scoped evidence check passed on an isolated snapshot and reported advisory warnings for the missing effectiveness and lifecycle review records.
