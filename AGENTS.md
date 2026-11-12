# Repository guidance

Read [common agent guidance](agent-guidance/common.md). When editing category guidance, consult the relevant file: [workflows](agent-guidance/workflows.md), [releases](agent-guidance/releases.md), [npm packages](agent-guidance/npm-packages.md), [iOS apps](agent-guidance/ios-apps.md), [agent tooling](agent-guidance/agent-tooling.md), or [state machines](agent-guidance/state-machines.md).

Keep shared guidance broadly applicable within its category; project-specific commands, versions, and exceptions belong in the adopting repository. Keep the root README as the index of this meta repository's resources and `profile/README.md` as the organization profile.

For documentation changes, check relative links, consistency across the index and guidance, and `git diff --check`. This repository currently has no build or test suite.
