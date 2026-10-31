# Native iOS app conventions

- Inspect the existing Xcode project or workspace, schemes, deployment targets, and dependency setup before making changes. Document the repository's actual build and test commands locally once that setup exists.
- Use an existing scheme and a compatible simulator or device destination for validation. State the Xcode version and destination used, and distinguish simulator results from checks that require a physical device.
- Keep app behavior consistent with its supported iOS versions. Validate affected UI and platform integrations with the relevant tests and device or simulator checks available in the repository.
- Preserve the project's existing version, build number, signing, and dependency conventions. Keep machine-specific settings and generated build output out of changes, following the repository's ignore rules.
- In CI, pin the toolchain with `DEVELOPER_DIR` instead of probing versions, let the test step build what it tests, exclude the unused simulator architecture explicitly, and keep simulator boots inside the test step: a simulator booting while xcodebuild compiles stalls the build for minutes.
- For a repository without an app project yet, report that build and runtime validation are unavailable. Do not invent a scheme, toolchain requirement, or release process to satisfy these guidelines.
