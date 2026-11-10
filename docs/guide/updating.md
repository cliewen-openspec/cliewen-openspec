---
type: guide
---
# Update an existing installation

Installing a Cliewen npm package updates the CLI, while an existing project keeps its installed schema files. Run `update` to refresh or repair installer-owned schema definitions and templates. The command preserves project configuration, the selected OpenSpec default, authored change artifacts and documents, and the AC registry. Version 0.1.0 accepts only `0.1.0` manifests; it does not migrate earlier alpha installations.

Development source adds tool checks and a reviewable upgrade path from published 0.1.0. Its release number is still 0.1.0; use the source-built tarball below to try these changes. Published 0.1.0 does not provide the new checks or output. Supported sources are published 0.1.0 and the running target version; unknown versions, alpha installations, and downgrades are rejected. A future release's compatibility declaration determines which older installations it accepts.

## Check the requirements

Before installing a candidate package, read its [version requirements](../configuration.md#version-compatibility). Development init/update checks Node 20.19+ and OpenSpec 1.15.0+ on every invocation, including dry runs. OpenSpec 1.17.0 installed through npm needs Node 22.12+ itself. Use a compatible installation rather than assuming Cliewen's Node floor covers every OpenSpec release.

The check prefers the project's OpenSpec npm installation; otherwise it uses PATH. It runs the selected CLI and reports its source and version. A broken or incompatible local installation blocks the operation even if a newer global version exists. Resolve the reported installation before continuing. Cliewen does not install or upgrade OpenSpec for you.

## Install, preview, and apply

First [build the local candidate](getting-started.md#1-build-the-candidate-package). In a project initialized with that candidate, install its tarball and preview the resource update. This example uses the guide's sibling-directory layout; substitute the actual tarball path for another project:

```sh
npm install --save-dev ../cliewen-openspec/cliewen-openspec-0.1.0.tgz
npx --no-install cliewen-openspec update --dry-run --json
```

In development output, inspect `installedVersion`, `targetVersion`, and `compatibility` alongside the paths. `creates` lists missing files to add, `replaces` lists existing files to rewrite, and `deletes` lists retired owned resources to remove. `writes` still contains all created/replaced paths. Manifest changes are included. An unchanged installation has empty path lists. Apply repeats compatibility and conflict checks; a preview does not permit overwriting edits made afterward.

Installing the npm package has already changed dependencies and possibly a lockfile. A failed resource preview or resource rollback does not undo npm installation. Review both the dependency diff and the later generated-resource diff.

OpenSpec separately owns generated agent skills and command integrations. If its version changes, review its native update using the preview supported by that installed version (`openspec update --help` lists the available options). Cliewen update does not run that integration refresh, modify delivery preferences, or rewrite active proposal artifacts.

The tarball selects the local 0.1.0 build. For a registry installation, use `npm install --save-dev cliewen-openspec@0.1.0` instead. The npm install changes package metadata and dependencies as usual; the Cliewen update command is a separate operation on installed resources. An unchanged installation reports no resource changes; missing owned files can be repaired.

Review the preview's `writes` and `deletes` lists. `writes` includes templates/schema files to create or replace and the ownership manifest when it changes. `deletes` contains only retired installer-owned files. A dry run applies no writes, deletions, or interrupted-transaction recovery.

```sh
npx --no-install cliewen-openspec update --json
```

Update does not accept `--default`; it preserves `openspec/config.yaml` byte-for-byte. All commands accept `--root PATH` if you need to select a different project. An unchanged installation reports empty `writes` and `deletes` lists.

## Ownership and conflicts

The existing `.cliewen-openspec/manifest.json` records the hashes of files installed by Cliewen. Update checks every conflict before applying its resource changes:

- An unchanged owned file can be replaced. LF and CRLF line-ending differences are tolerated.
- An owned file already identical to the new package content can keep its content and receive the current ownership hash.
- A missing owned file is recreated from the package. Newly introduced files are installed only if their paths are free.
- An existing unowned file conflicts even when its content matches. Update does not silently adopt it.
- A retired owned file is deleted only when unchanged. Local edits to a current or retired owned file stop the update.

There is no force option. Review a conflict and retain useful custom instructions in a project-owned location before deliberately restoring an installer-owned file. Do not delete the manifest, registry, or authored artifacts to bypass ownership checks. Custom schemas outside Cliewen's owned paths are preserved.

The command validates manifest ownership paths/hashes and current project config/registry before changing resources. A missing manifest requires `init`; update will not reconstruct ownership from filenames. Published 0.1.0 accepts only its own manifest version. Development source explicitly accepts published 0.1.0 and its running target version, with the source-version limits described above. Alpha versions remain unsupported. Do not edit a manifest version to bypass this check. Omitted policy settings use their defaults without rewriting existing configuration.

Test-quality policies default to `review`, so projects may see warnings about incomplete assessments. They become blocking only when you select `enforce`. See [policy configuration](../configuration.md#test-quality-and-lifecycle) to adopt or disable each independently.

## Recovery and verification

Apply uses the existing transaction journal. Content changes and retired-file deletions are recoverable; the new manifest is published last. If a write fails, rollback restores original files, removed files, and the previous manifest. In development source, a normal update checks tool compatibility before recovering a leftover valid journal; a dry run refuses pending recovery without changing anything. Recovery restores the preceding transaction and is reported separately from the resource update. A compatibility failure leaves the journal untouched. Use `recover` to resolve it separately when needed.

After applying, review the Git diff, validate the installed schema you use, and run the project tests:

```sh
npx --no-install openspec schema validate cliewen-delivery
npm test
```

Use `cliewen-discovery` or `cliewen-all` in the validation command for another workflow. Existing proposals, specs, decisions, tasks, and test titles are not rewritten by update. If a new contract requires metadata such as test types, review and add it in authored files yourself. Defaults for omitted config fields are read by the current CLI; update does not fill them into your config.

Commit the intended inputs before collecting fresh evidence for a delivery change. An old report is not rewritten or removed by update; revision freshness and contract checks can require recollection. Discovery and combined no-delivery outcomes retain their documented review-only evidence behavior. The [evidence guide](../testing/evidence.md) explains collection and scope.

The bundle includes an owned learning template and shared learnings/Humanizer instructions. Configuration can omit both settings; learnings default off and Humanizer defaults to auto. Update does not create a knowledge collection, rewrite notes, or install an external skill. See [the settings and host limits](../configuration.md#project-learnings) before opting in.
