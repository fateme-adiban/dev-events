# PostHog setup report

PostHog browser analytics, two conversion-intent events, global error tracking, and an analytics dashboard were added to the Next.js App Router application.

## Installed and initialized

- Installed `posthog-js` (resolved version `1.409.4` in `package-lock.json`; `package.json` declares `^1.407.2`).
- Initialized the browser SDK once in `instrumentation-client.ts` using `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` from the environment.
- Missing configuration is loud in development and a production no-op, rather than silently disabling analytics during development.
- Exception capture is enabled in the initialization. No provider or second client initialization was added.
- The real environment keys are configured locally through `.env`; `.env.example` documents the required variable names. Their values were not exposed in the run.

## Events instrumented

| Event | What it measures | File |
|---|---|---|
| `events_explored` | Visitor selects the call to action to browse featured developer events. | `components/ExploreBtn.tsx` |
| `event_selected` | Visitor selects a featured event to view its detail page; includes non-PII `event_slug`. | `components/EventCard.tsx` |

The run verified that both captures are in real click handlers. It did **not** observe events arriving in PostHog, so event delivery and volume remain unconfirmed. Captures are anonymous because no stable authenticated user identifier exists.

## Identification

User identification was skipped. The project has no authentication library, login/logout flow, session storage, user model, or stable user identifier. No invented ID or PII was used. If authentication is added, identify a stable user ID after login and on authenticated refresh, and reset on logout/account switch.

## Error tracking

`app/global-error.tsx` was added as the client global error boundary. It calls `posthog.captureException(error)` once when the boundary receives an error and offers a reset button. The run verified the file and build integration, but did not trigger an application error or observe an exception event arriving in PostHog.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/536394/dashboard/1934289)

The dashboard contains a daily `events_explored` trend, `event_selected` broken down by `event_slug`, and an ordered `events_explored` → `event_selected` funnel. These insights were created from the intended event names; the run did not verify that the project has received those events.

## Verified by this run

- `npm install` completed and updated the lockfile with PostHog packages.
- `npm run build` passed with Next.js 16.1.1, including TypeScript validation and static page generation.
- The review found no integration-specific code defect and no Content-Security-Policy configuration requiring changes.

## Issues and unresolved follow-up

- **Pre-existing lint failure:** `npm run lint` reports an unescaped apostrophe at `app/page.tsx:10` and explicit `any` types at `components/LightRays.tsx:57` and `components/LightRays.tsx:62`. These files were not changed by the integration, but lint is not clean.
- **Missing event destination:** the review reported that the `/events/:slug` destination used by `components/EventCard.tsx` is absent from the generated route list. If that route is not supplied elsewhere, event-card navigation costs users the intended detail-page experience even though the capture runs before navigation.
- **Delivery unconfirmed:** no browser session or PostHog arrival was observed, so the run cannot establish that `events_explored`, `event_selected`, or boundary exceptions are being sent.

## Next steps

1. Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` in every deployment environment, not only local `.env`; use `.env.example` as the naming reference.
2. Open the deployed app, click Explore Events and a featured event, then verify `events_explored` and `event_selected` arrive in PostHog. Trigger a safe test error if error-delivery verification is needed.
3. Confirm or implement the `/events/:slug` route and verify the featured-card destination.
4. Resolve the existing lint errors, or document why they are intentionally deferred.
5. Add authentication-aware `identify`/`reset` only when the application gains a stable identity boundary.

## Before you merge

- [ ] Run a full production build in the target environment and fix any lint or type errors introduced by the generated integration code.
- [ ] Run the test suite; instrumented call sites may require updated mocks or fixtures.
- [ ] Confirm the exact environment variable names in `.env.example` are set in deployment environments, not just locally; inspect `instrumentation-client.ts` lines 3–4 and `.env.example` lines 2–3.
- [ ] Exercise the click handlers and verify `events_explored` in `components/ExploreBtn.tsx:7` and `event_selected` in `components/EventCard.tsx:15` arrive in PostHog.
- [ ] Confirm the global boundary error path in `app/global-error.tsx:14` sends an exception event during a controlled test.
- [ ] Confirm the `/events/:slug` destination used at `components/EventCard.tsx:19` exists and works.
