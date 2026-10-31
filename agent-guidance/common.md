# Common agent guidance

- Repository-specific guidance supplies local commands and exceptions to these defaults.
- Inspect existing code, configuration, and tests before choosing an approach. Use the repository's established tools and patterns.
- Keep changes focused. Update relevant tests and documentation when behavior changes.
- Validate the affected behavior with the repository's existing checks. For documentation-only changes, check accuracy and links; report checks actually run and any remaining validation gaps.
- Use direct, natural wording in public commits, issues, PR titles and descriptions, and documentation. Describe project changes and their rationale; leave out private conversations, coordination logs, and commentary about the writing process.

## Documentation placement

- Before writing, identify the audience, the purpose, and when the reader needs the information. Inspect existing documentation and choose its home accordingly; do not automatically append to the README or create a document for every change.
- Keep the README a concise project introduction with essential setup, usage, and links to further documentation. Respect repository-specific preferences for a minimal README, including personal repositories.
- When the repository wiki is available, prefer it for in-depth human documentation over README sections or repository prose, with separate User and Developer sections as needed. Honor user exclusions, including personal configuration repositories. If the wiki is unavailable, retain existing documentation; verify migrated pages and links before removing originals.
- Keep machine-consumed instructions such as `AGENTS.md` and `SKILL.md`, licenses, and required build assets in the repository.
- Keep durable maintainer operations, such as publishing credential setup and release procedures, in one discoverable maintainer or release document. Use an existing document when available and link to it where maintainers will look; document setup, never credential values.
- Put task plans, detailed test evidence, migration progress, and task-specific decisions in linked issues. Promote only information that future readers need into durable documentation.
- Maintain one authoritative home for each topic. Link instead of copying, and remove obsolete references when moving or replacing documentation.

## Commits and pull requests

- Track new work in an issue and link it from the PR. Use closing keywords only when the PR completes the issue; for partial work, describe the remaining scope without closing it.
- Keep commits focused and describe their intent using the repository's established conventions. Preserve concurrent changes and exclude unrelated work.
- Keep PR titles and descriptions concise, accurate, and current. Lead with the purpose and meaningful final changes; include linked issues, a brief validation summary, and essential caveats. Rewrite them when the scope changes.
- Omit AI attribution and session links, including Claude session links, from PR bodies. Leave out internal coordination, chronological work logs, test transcripts, and incidental commit SHAs. State genuine dependencies briefly with links, without base-branch or package-split coordination sections.
- Have a separate agent review the final PR changes. Address findings and have the reviewer check fixes and any subsequent code changes before declaring the implementation ready. Complete applicable checks and independent review before marking a draft ready; report remaining validation gaps accurately.
- In the user handoff, provide the PR link for review or merge and identify any dependency prerequisites. Follow current user authorization, repository instructions, and settings for consequential actions; review completion does not grant permission to merge, approve, or release.

## Meaningful tests

- Test observable behavior and public contracts. For bug fixes, add focused regression coverage that fails before the fix and passes after it where practical.
- Inspect existing coverage first. Extend or reuse it instead of duplicating assertions or adding tests solely to increase test counts.
- Avoid tests that only freeze prompt wording, source text, private implementation details, configuration snapshots, or fixed names and counts without protecting a meaningful behavior or contract. String assertions and snapshots are appropriate when the asserted output is itself part of that contract.
- Use representative integration paths. For behavior that depends on a host or platform, exercise the real host or native integration when available; mocks and configuration parsing alone do not establish runtime behavior. Report unavailable checks and what remains unverified.
