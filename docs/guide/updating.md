---
type: guide
---
# Update an existing installation

Installing a Cliewen npm package updates the CLI. Run `update` to refresh the files Cliewen installed in your project, such as schema definitions and templates. It preserves project configuration, the OpenSpec default, authored changes and documents, and the AC registry.

The unpublished 0.3.0 candidate accepts manifests from 0.1.0, 0.2.0, and the candidate itself. Use the preview below to see which resources it will change. Alpha or unknown manifests and downgrades are rejected.

## Check the requirements

The 0.3.0 candidate requires Node 22.12+ and OpenSpec 1.15.0+. Init and update check those requirements before changing project files or recovering a transaction. Upgrade Node before installing the candidate. [Version compatibility](../configuration.md#version-compatibility)

The check prefers the project's OpenSpec npm installation; otherwise it uses PATH. It runs the selected CLI and reports its source and version. A broken or incompatible local installation blocks the operation even if a newer global version exists. Resolve the reported installation before continuing. Cliewen does not install or upgrade OpenSpec for you.

## Install, preview, and apply

First [build the local candidate](getting-started.md#1-build-the-candidate-package). In a project with a supported Cliewen installation, install the tarball and preview the resource update. Adjust the path if your project is not beside the source checkout.

If your project already has the candidate CLI, start with the preview.

```sh
npm install --save-dev ../cliewen-openspec/cliewen-openspec-0.3.0.tgz
npx --no-install cliewen-openspec update --dry-run --json
```

In the preview, check `installedVersion`, `targetVersion`, and `compatibility`. The `creates`, `replaces`, and `deletes` lists describe the proposed file changes. `writes` includes both creations and replacements, including the manifest. Apply repeats compatibility and conflict checks in case files changed after the preview.

Installing the npm package has already changed dependencies and possibly a lockfile. A failed resource preview or resource rollback does not undo npm installation. Review both the dependency diff and the later generated-resource diff.

OpenSpec separately owns generated agent skills and command integrations. If its version changes, review its native update using the preview supported by that installed version (`openspec update --help` lists the available options). Cliewen update does not run that integration refresh, modify delivery preferences, or rewrite active proposal artifacts.

The tarball selects the 0.3.0 candidate. The current registry release is available with `npm install --save-dev cliewen-openspec@0.2.0`.

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

Update validates the manifest's paths and hashes, the project config, and the registry before writing. Use `init` if the manifest is missing. Keep the original manifest version so the CLI can select a supported upgrade path. Omitted policy settings use their defaults without changing the config file.

Test-quality policies default to `review`, so projects may see warnings about incomplete assessments. They become blocking only when you select `enforce`. See [policy configuration](../configuration.md#test-quality-and-lifecycle) to adopt or disable each independently.

## Recovery and verification

Apply uses a transaction journal and writes the new manifest last. A failed write rolls back the files and manifest. A dry run stops if recovery is pending. A normal update checks tool compatibility before recovering a valid journal and reports recovery separately. Use `recover` if you need to restore the preceding transaction on its own.

After applying, review the Git diff and validate the installed schema you use:

```sh
npx --no-install openspec schema validate cliewen-delivery
```

Use `cliewen-discovery` or `cliewen-all` for another workflow. Schema validation checks the installed workflow definition. To validate a change, run `npx --no-install openspec validate CHANGE --strict` with its name. Run the project's usual tests if it has any. For a project without a test command, review the resource diff and run the checks that apply to the affected files.

Use [`docs check`](cli.md#docs-check) to check selected documents after the update. If your project has configured [`ci inspect`](cli.md#ci-inspect), use it to inspect required checks on GitHub. Read the report statuses and findings even when either advisory command exits 0.

Commit the intended inputs before collecting fresh evidence for a delivery change. An old report is not rewritten or removed by update; revision freshness and contract checks can require recollection. Discovery and combined no-delivery outcomes retain their documented review-only evidence behavior. The [evidence guide](../testing/evidence.md) explains collection and scope.

The bundle includes an owned learning template and shared learnings/Humanizer instructions. Configuration can omit both settings; learnings default off and Humanizer defaults to auto. Update does not create a knowledge collection, rewrite notes, or install an external skill. See [the settings and host limits](../configuration.md#project-learnings) before opting in.

## Move to OpenSpec 2

OpenSpec 2 stores native skills in `.agents/skills/` and uses links or fallback copies for tools that need their own directory. It replaces the old `/opsx:` command files with skills. Ask the agent to propose, apply, or archive a change, or invoke the native skill by name, such as `/openspec-propose` in Claude Code or `$openspec-propose` in Codex.

Commit current work and customized native skills before upgrading. OpenSpec refreshes its canonical skills and can replace edits there. Keep lasting project guidance in `openspec/config.yaml` or a separately named project skill.

```sh
npm install --save-dev --save-exact @fission-ai/openspec@2.0.0
npx --no-install openspec update --dry-run
npx --no-install openspec update
```

The first command changes the dependency and lockfile. The preview reports integration changes; update applies them. Review the diff and any retained customized command or skill copies. Remove duplicates only after preserving useful instructions. Cliewen's resource update is a separate operation.

On Windows, committed links need Developer Mode and Git's `core.symlinks` enabled. If links check out as text files, native update restores tool skill copies. See [OpenSpec's upgrade instructions](https://openspec.dev/docs/upgrade-to-2) for the supported setup and customization rules.

Development-source Cliewen checks cover repository-local OpenSpec 2 workflows. External stores and multi-repo evidence require separate support; source init/update reject those layouts before recovery or installation writes. Published 0.2.0 predates these new layout checks. Use a project with local specs and changes for this integration.
