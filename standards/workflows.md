# GitHub Actions conventions

Use these names when adding a workflow for the corresponding purpose:

| Purpose | Filename | Workflow display name |
| --- | --- | --- |
| Routine checks | `check.yml` | `Check` |
| Separate integration suite, when useful | `integration.yml` | `Integration Tests` |
| Package publication | `publish.yml` | `Publish` |

Keep workflow files in `.github/workflows/`. These are naming defaults, not a requirement to create each workflow.

Use short, descriptive job IDs such as `check`, `native`, `verify`, and `publish`. Where an explicit job display name helps, describe its purpose; for npm publication, the established names are `Verify` and `Publish npm`. Include distinguishing matrix values in custom matrix job names.

Preserve existing filenames, workflow display names, job IDs, and check names when making unrelated changes. They can be referenced by checks, integrations, and publishing configuration. Keep trigger, matrix, concurrency, and validation choices specific to the repository.
