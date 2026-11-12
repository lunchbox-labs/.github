# Release workflow conventions

Releases run entirely in GitHub Actions. A maintainer starts the workflow by hand; the workflow builds the assets, then creates the tag and the GitHub release with its assets, and publishes it. Nobody tags or publishes a release manually.

## Names

| Repository | Filename | Workflow display name | Environment |
| --- | --- | --- | --- |
| One product | `release.yml` | `Release` | `release` |
| Several products, one workflow each | `release-<product>.yml` | `Release <Product>` | `release-<product>` |

Write `<product>` in lowercase with hyphens in the filename and environment, and in Title Case in the display name, for example `release-desktop.yml`, `Release Desktop` and `release-desktop`.

These names replace the earlier `publish.yml` workflows (named `Publish` or `Publish NPM`), the `Build Desktop` workflow, and the `npm`, `macos-release`, `update-signing` and `app-store-metadata` environments. When migrating a repository, move its release secrets and protection rules into the new environment and delete the old workflows in the same change; delete the old environments once the new workflow has released.

## Triggers and inputs

- Trigger release workflows only with `workflow_dispatch`. Do not start a release from a push, tag, schedule or another workflow.
- Keep inputs to the ones the repository has agreed on. Where the version is already in a manifest such as `package.json`, read it from there instead of asking for it.

## Permissions

- Set `permissions: {}` at the workflow level and grant each job only what it needs.
- Only the final release job gets `contents: write`. Building, testing and packaging jobs get `contents: read`.
- A job that publishes to npm with trusted publishing gets `id-token: write` and `contents: read`.
- Run the final release job, and every job that uses release secrets or publishes packages, in the release environment, so the environment's secrets and protection rules apply to them.

## Tags and the GitHub release

- The final release job creates the `v`-prefixed tag on the commit the workflow ran on and creates the GitHub release with `GITHUB_TOKEN`, for example with `gh release create "$TAG" --target "$GITHUB_SHA"`.
- Check that the tag does not exist yet in an early read-only job, before anything is built or published, and fail the run if it does. Tags are immutable, so a repeated release needs a new version.
- Publish packages before the final release job. If a later job fails, use Re-run failed jobs on the same run rather than starting a new release.
- Attach every asset before the release is published: create it with its assets in one step, or create a draft, upload the assets and then publish it.
- A tag or release created with `GITHUB_TOKEN` does not trigger workflows that listen for push, create or release events, so nothing may depend on those events to start further work; do follow-up work in the release workflow itself.

## Repository settings that guard releases

- Do not restrict creation of `v*` tags with a ruleset, because the workflow creates them. Keep the ruleset that restricts updates and deletion of all tags.
- Actions policies and the release environments guard who can run these workflows and what they can reach. Configure environment protection rules in repository settings, for example limiting the release environment's deployment branches to the default branch and adding required reviewers where wanted.
- npm trusted publishers must name the release workflow's filename and environment, for example `release.yml` with `release`. Update the trusted publisher on npm whenever either name changes, or publishing fails.
