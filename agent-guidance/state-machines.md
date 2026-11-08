# State machine conventions

Long-lived code keeps state across calls and events, and its failures usually sit in transitions nobody wrote down: a flag that is never cleared, a retry that waits for an event that never comes, a cached failure that lasts until restart. Follow these rules whenever a change adds, removes or alters such state. Document and test the machines a change touches; a change does not need to audit the whole repository.

## What counts as state

- State with transitions over time: lifecycles such as init, load, reload and dispose; pending versus applied changes, such as a setting that is saved but not yet in effect; retries, timers and polls; caches and memos, including cached failures; revisions or tokens that drop stale callbacks; and view or dialog stacks.
- Several flags that must agree with each other, such as `pending`, `reloading` or `firstRun`.
- State that crosses a reload, a process or a client, such as module scope or files read by another process. It is a separate machine from state rebuilt on each load; document both and where they meet.
- Ordering assumptions: which event or hook is expected first, and what happens when two arrive together, one arrives during an attempt in progress, or one never arrives.
- Plain local values, such as a controlled input or a data record, are out of scope unless they drive one of the above.

## Make it explicit

- Prefer one named state over several flags that must agree. A discriminated union, an enum with associated values, or a small controller with named transitions is easier to check than flags read in several places.
- Keep the transitions of one machine together where practical, so every trigger and exit is visible in one place.

## Document it

- Keep a state-machine document in the repository, by default `docs/state-machines.md`, and link it from `AGENTS.md`. As an exception to the wiki preference in [documentation placement](common.md#documentation-placement), it stays in the repository because it changes with the code in the same PR. Keep it out of shipped or published artifacts, because it is for contributors.
- For each machine, give where the state lives (file and symbol, not line numbers), its states, the trigger of each transition, its terminal states, and what resets it: an instance reload, a process restart or a user action. Add a Mermaid `stateDiagram-v2` when a machine has more than three states or any cycle or retry loop.
- Describe current behavior. Known bugs, audits and fix history belong in issues.
- Update the document in the same PR as any change to a machine's states, triggers or exits. New state without documentation is unfinished work.

## Give every state a way out

- Every state either makes progress, succeeds, or is a working fallback; a reported error is an end state only where failing is necessary or no fallback exists. A state that waits needs a way to leave it without a restart: retry on each event that can unblock it, a bounded timeout, or a fallback. Waiting for one specific event is a stuck state when that event may never come.
- Avoid breaking, failing or erroring unless absolutely necessary. When a state cannot make progress, fall back to the host's or platform's default behavior and carry on. At worst, show a notice that names the error or the fallback, such as a toast in OpenCode plugins or an inline message in an app; code with no user interface logs a warning or returns the error for its caller to surface. Never degrade silently.
- Failing is necessary when carrying on would lose or corrupt data, cross a security or permission boundary, or break an error the API promises its callers. Fail at that point, visibly, and leave other state recoverable.
- Bound retries. When the bound is reached, settle on a fallback, tell the user once, and stop retrying.
- Retry a cached or memoized failure when a later event could clear it. Ending in an error that only a restart or another user action can clear is acceptable only when no fallback exists, and the notice says what to do.

## Test it

- Cover every transition, including each failure and recovery path. Drive transitions through the hooks, events and inputs the host or platform delivers rather than by setting internal state; fake clocks and injected failures at those boundaries are fine for timeouts and error paths.
- Cover ordering and concurrency: the same trigger twice, a trigger that arrives while an attempt is in flight, callbacks that fire after their view or instance is gone, and events in an unexpected order.
- Cover re-entry after a reload or reinitialization, where state kept at module or file scope meets freshly built state.
- Where state is shared between processes or clients, such as files in a shared directory or a server used by several clients, cover two writers and writers with different versions, configuration or platforms.
- When a bug comes from a missing or wrong transition, add a regression test for that transition and correct the document. The [meaningful tests](common.md#meaningful-tests) rules apply.

## Review it

- Reviewers check the diff for state the document does not cover, transitions or failure paths without tests, states with no way out, and failures that degrade silently, and report each as a finding.
