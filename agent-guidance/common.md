# Common agent guidance

- Repository-specific guidance supplies local commands and exceptions to these defaults.
- Inspect existing code, configuration, and tests before choosing an approach. Use the repository's established tools and patterns.
- Keep changes focused. Update relevant tests and documentation when behavior changes; keep user-facing READMEs centered on setup and usage.
- Validate the affected behavior with the repository's existing checks. For documentation-only changes, check accuracy and links; report checks actually run and any remaining validation gaps.
- Use direct, natural wording in public commits, issues, PR titles and descriptions, and documentation. Describe project changes and their rationale; leave out private conversations, coordination logs, and commentary about the writing process.
- Keep PR descriptions concise and current: summarize the purpose, final changes, and relevant validation. Omit chronological work logs and base-branch or package-split coordination sections. State any genuine dependency prerequisite briefly.
- Have a separate agent review the resulting PR. The implementing agent should address findings and have the reviewer check the fixes before declaring the implementation ready. Repeat as needed to resolve remaining findings.
