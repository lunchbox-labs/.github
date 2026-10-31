# GitHub Actions conventions

Use these names when adding a workflow for the corresponding purpose:

| Purpose | Filename | Workflow display name |
| --- | --- | --- |
| Routine checks | `check.yml` | `Check` |
| Separate integration suite, when useful | `integration.yml` | `Integration Tests` |
| Package publication | `publish.yml` | `Publish` |

Keep workflow files in `.github/workflows/`. These are naming defaults, not a requirement to create each workflow.

Use short, descriptive job IDs such as `check`, `native`, `verify`, and `publish`. Where an explicit job display name helps, describe its purpose; for npm publication, the established names are `Verify` and `Publish npm`. Include distinguishing matrix values in custom matrix job names.

Preserve existing filenames, workflow display names, job IDs, and check names when making unrelated changes. They can be referenced by checks, integrations, and publishing configuration. Repository-specific triggers, matrices and validation choices stay in the repository; the defaults below apply unless the repository documents why not.

## Keeping checks fast

A pull request waits for its slowest job, so read job and step durations from recent runs before changing a workflow, and state the before and after in the pull request.

- Cache the installed dependencies, not only the package manager's download cache. Key the cache by runner image, architecture, toolchain version and the lockfile plus manifest; install only on a miss, and save the install before the checks run so a failing run still seeds it.
- Cancel superseded pull request runs with a concurrency group per pull request. Never cancel runs on the default branch.
- Gate expensive jobs on what a pull request changes with a small tested script that reads the changed files from the merge commit and reports whether the jobs are needed. Keep at least one job unconditional, run every job on pushes to the default branch and on manual runs, and run every job whenever the script cannot show what changed. A failed gate fails the run; it never skips work silently.
- Run slow platform lanes, such as Windows or simulator jobs, on pushes to the default branch and on manual runs, and run the fast lane on pull requests. Give such workflows a `workflow_dispatch` trigger so a branch can be run in full before a risky merge.
- Do not add steps that only confirm a prerequisite the real step would fail without, such as toolchain version probes or a build the test step repeats. Do not run platform-independent checks (typecheck, lint, formatting) on more than one platform, or lane-independent work in more than one matrix lane.
- Build only the architecture the job runs. On Apple platforms exclude the unused simulator slice explicitly; `ONLY_ACTIVE_ARCH` is ignored for generic destinations.
- A job skipped by an `if` condition still satisfies a required status check; a matrix leg that is not generated does not. Keep required-check lists to the jobs that run on every pull request.

## Diagnosing failed checks

- Use normal command output and failure exit status by default, with bounded timeouts. Where useful, upload already-produced logs or test result files on failure; artifact uploads and separate diagnostic steps are not required in every workflow.
- Make process stacks, system log collection, and diagnostic probes opt-in for a specific investigation. Bound that work within the job timeout and preserve the original failure status; do not mask it with diagnostics or blind retries.
- Verify reliability fixes against the observed failure. Faster builds or fewer compiled architectures do not establish that unrelated runner or runtime failures are fixed.
