# Agent tooling conventions

Repositories that add contributor procedures or reviewer roles for Codex, Claude Code and OpenCode share one layout, so each procedure has a single source and each tool only registers it.

## Layout

- Write each procedure once in `.agents/skills/<procedure>/SKILL.md`. That file is canonical; adapters point to it and add only the no-edit instruction.
- Register a named role, such as a reviewer, with one thin adapter per tool: `.codex/agents/<role>.toml`, `.claude/agents/<role>.md` and `.opencode/agents/<role>.md` (with `mode: subagent`). The adapter body is: "Read `.agents/skills/<procedure>/SKILL.md` from the repository root and follow it. Report findings without editing files." A role may share its procedure's name or use its own.
- Claude Code reads skills from `.claude/skills`, so add a forwarder at `.claude/skills/<procedure>/SKILL.md` whose body is: "Read `.agents/skills/<procedure>/SKILL.md` from the repository root and follow it."
- Give a role's skill, forwarder and adapters the same `description`. Each tool uses it to decide when the role applies, so the copies are required and must stay identical.
- Keep instructions in `AGENTS.md`. A `CLAUDE.md`, where a repository has one, contains only `@AGENTS.md`.
- In `AGENTS.md`, document only the repository's routing (which changes go to which role) and its exceptions, and link here for the mechanics.

## Discovery and invocation

| | Codex | Claude Code | OpenCode |
| --- | --- | --- | --- |
| Procedures | Discovers `.agents/skills`; run one with `$<procedure>` | Discovers the `.claude/skills` forwarders; run one with `/<procedure>` | Discovers `.agents/skills` and loads one through its skill tool |
| Named roles | Discovers `.codex/agents`; ask Codex to use `<role>` | Discovers `.claude/agents`; ask Claude Code to use `<role>` | Discovers `.opencode/agents`; mention `@<role>` |

OpenCode also scans `.claude/skills`, so it sees a forwarder and its canonical skill under the same name. Keep every forwarder pointing at the canonical file, so whichever copy loads leads to the same procedure.

## Reviewer permissions

- Claude Code adapters set `tools: Read, Glob, Grep`.
- OpenCode adapters deny everything except reading and searching:

  ```yaml
  permission:
    "*": deny
    read: allow
    glob: allow
    grep: allow
    list: allow
  ```

- Sandbox and approval settings in a Codex custom agent file don't override the parent; a reviewer inherits the parent session's settings. Not editing is an instruction, not an enforced boundary. When a review must be read-only, run the parent session with a read-only sandbox.
- Claude Code and OpenCode reviewers cannot run checks or collect artifacts, so the implementing agent supplies the diff, test output, screenshots and runtime evidence.

## Independence and reporting

- Use the named role for independent review. Running a procedure directly in the implementer's context does not count as an independent review.
- If a runtime cannot start the role, hand the canonical procedure to another independent reviewer when one is available, and report the gap. Do not call a self-review independent.
- Report discovery (the tool lists the role or skill) separately from invocation (the role ran and returned a result). A file that parses proves neither.
- The review cycle itself is in [common guidance](common.md#commits-and-pull-requests).
