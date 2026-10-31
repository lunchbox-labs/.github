# Common agent guidance

- Repository-specific guidance supplies local commands and exceptions to these defaults.
- Inspect existing code, configuration, and tests before choosing an approach. Use the repository's established tools and patterns.
- Keep changes focused. Update relevant tests and documentation when behavior changes; keep user-facing READMEs centered on setup and usage.
- Validate the affected behavior with the repository's existing checks. For documentation-only changes, check accuracy and links; report checks actually run and any remaining validation gaps.
- Use direct, natural wording in public commits, issues, PR titles and descriptions, and documentation. Describe project changes and their rationale; leave out private conversations, coordination logs, and commentary about the writing process.

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
