# npm package conventions

- Use the committed `package-lock.json` and `npm ci` for reproducible dependency installation. Use the Node version supported by the repository and its CI configuration.
- Use the existing package scripts for typechecking, linting, formatting checks, tests, and builds. Inspect what the aggregate check script covers; run applicable package or native integration tests separately when they are not included.
- Verify changes to package exports, included files, or build output through packed-package tests when available. Keep package metadata and user-facing installation examples consistent with the published interface.
- Keep the package version and root package version entries in the lockfile aligned. The existing stable-release convention is a `v`-prefixed tag matching `package.json`'s semantic version. Documentation-only adoption does not require a version bump.
- Preserve repository-specific release validation and publishing configuration. Package access, provenance, compatibility baselines, and integration commands belong in the package repository rather than shared defaults.
