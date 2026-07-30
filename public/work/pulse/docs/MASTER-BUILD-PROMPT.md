# Master build prompt — Pulse Partner SaaS

Use the following prompt to recreate the Pulse Partner SaaS prototype represented by this repository.

---

You are a senior product designer, growth product manager, and master front-end engineer. Build a high-fidelity, fully functional React prototype of the **Pulse Partner SaaS** for the seeded partner **PiggyVest**.

This is an enterprise financial-operations product. Think through the user experience and information architecture before composing each screen. The result must feel calm, exact, accountable, and production-ready—not like a generic AI-generated dashboard.

## Source-of-truth order

Before editing:

1. Inspect the existing repository and preserve working functionality.
2. Read `PRODUCT.md` for product boundaries.
3. Read `DESIGN.md` for the final dashboard design rules.
4. Read the supplied Partner Dashboard PRD for the original functional requirements.
5. Read the anti-slop guidance in `slop.md`.
6. Inspect the locally installed Helium packages and their documentation before building controls.
7. Inspect the existing checkout SDK in `src/App.jsx`. The dashboard preview must reuse that implementation rather than recreating it.

When requirements conflict, follow this order:

1. The latest explicit product and design decisions in this prompt.
2. `DESIGN.md`.
3. The Partner Dashboard PRD.
4. `PRODUCT.md`.

## Product boundary

Build a front-end prototype, not a production system.

- Do not build a backend.
- Do not build real authentication, email delivery, OTP delivery, Slack delivery, webhook delivery, blockchain services, or SSE infrastructure.
- Represent those behaviors through deterministic client-side state and clear tester affordances.
- Keep backend and production requirements as product notes only.
- All mutations remain in the browser session.
- Authentication and appearance preferences may persist locally across refreshes.
- The real engineering implementation will be completed separately by Akintunde and Mofe.

## Technology and component contract

- React 19, TypeScript, Vite, React Router, TanStack Query, and Recharts.
- Consume the local packages `@helium/react`, `@helium/tokens`, and `@helium/icons`.
- Use the Helium **business-light** and **business-dark** themes.
- Use Helium components before creating local UI:
  - `Button`, `Input`, `InputDropdown`, `Checkbox`, `Toggle`, `RadioCard`
  - `SidebarNavigation`, `SidebarItem`
  - `Tabs`
  - table primitives
  - `Badge`, `Tag`, `Alert`, `Skeleton`, `Toast`, `Tooltip`, `Avatar`, `FileUpload`, and `Currency`
- Use Phosphor icons where Helium does not supply the required icon.
- Do not add another UI library.
- Product-specific local patterns are allowed only where Helium has no equivalent: accessible dialogs, drawers, chart shells, reconciliation timelines, multi-select filters, payload inspectors, secret fields, and the checkout preview container.
- Style custom patterns exclusively with Helium tokens and stable local wrappers. Do not target generated Helium class names.
- If a custom component is required, document what it is and why Helium could not cover it.

## Seeded partner and roles

The tenant is:

- Display name: **PiggyVest**
- Legal name: **PiggyTech Global Limited**

Seed these prototype accounts:

- **Admin** — Amina Okafor — `admin@piggyvest.demo`
- **Dev** — Tobi Adeyemi — `developer@piggyvest.demo`
- **User** — Zainab Musa — `viewer@piggyvest.demo`

Credentials:

- Admin and Dev password: `pulse-demo`
- OTP and reset code: `000000`

Role access:

- Admin: full organization, team, developer-tool, notification, audit, and publishing access.
- Dev: transactions, API keys, webhooks, profile, and read-only customization.
- User: read-only transactions, customization, and personal settings.

Navigation visibility and direct-route authorization must both respect the role. Unauthorized direct URLs render an authenticated 403 page.

## Marketing landing page

Keep `/` as the public Pulse landing page.

- Use a full-width editorial hero built around a generated financial-district skyline.
- Generate the imagery with the image-generation model in a stylized editorial gouache-and-pencil mode.
- The daylight version should emphasize expansive sky and skyscrapers during a busy business morning. Avoid foreground people and cars dominating the composition.
- Create a composition-matched moonlit skyline for dark mode.
- Center the hero copy within the sky so it remains legible.
- The label is **“Embedded crypto payment infrastructure”** with no decorative dash before it.
- The main value proposition is: **“Accept crypto. Settle fiat. Reconcile everything.”**
- The hero should not consume the entire first viewport; approximately one-third of the checkout SDK section should remain visible below it.
- Leave deliberate spacing between the hero and the SDK section.
- Add an authored cursor interaction inspired by the interaction quality of `pols.dev/slop`, without copying its content. The cursor should react meaningfully across the hero.
- The SDK section may use a fine interactive dot field that responds subtly to pointer direction.
- Respect `prefers-reduced-motion` and preserve native cursor behavior on touch devices.
- The only account CTA is a primary **Log in** button.
- Do not expose a Sign up button or public sign-up flow.
- Do not show the old Simulation Mode announcement.
- Preserve the landing theme when navigating to authentication.

## Authentication

Routes:

- `/login`
- `/forgot-password`
- `/reset-password`
- `/invite/:token`

Use one stable authentication frame:

- A compact task column on the left.
- A purposeful skyline panel on desktop.
- The visual panel inherits the landing page’s Light or Dark mode and swaps to the matching day or night artwork.
- Cursor states over the image communicate **Collect → Convert → Settle**.
- The layout remains light, simple, and SaaS-appropriate.

Flows:

- Admin and Dev: email → password → OTP → app.
- User: email → OTP → app.
- Wrong values show realistic inline errors.
- Password and OTP helper notes are subtle and include a working copy button.
- Entering the final valid OTP digit automatically completes sign-in.
- “Resend code” shows a dismissible success toast.
- Forgot-password and reset routes are simulated but fully navigable.
- Invite acceptance follows the invited role’s credential flow.
- Do not show “Partner sign in,” “Partner” beside the Pulse logo, “Test workspace,” or “Prototype access” footer copy.
- Authentication copy must remain generic rather than referring to a PiggyVest account before the user signs in.

## Application shell

Authenticated routes live under `/app`.

Global header:

- PiggyVest avatar and name first.
- PiggyTech Global Limited as supporting text on desktop.
- A static **Test mode** badge where relevant.
- Icon-only appearance control with Light, Dark, and System.
- Account avatar with no online-status dot.
- Keep 16px between the appearance control and avatar.
- Do not expose a Test/Live toggle directly in the header. Environment changes belong inside the authenticated account menu to prevent accidental switching.

Sidebar:

1. Home
2. Transactions
3. Team
4. API keys
5. Webhooks
6. Customization
7. Settings
8. Docs

Rules:

- Team is Admin-only.
- Docs opens `https://docs.pulseshiga.io/` in a new tab and shows an external-link icon.
- Active items use Helium’s tinted row and filled icon state.
- Keep rows compact; avoid oversized type and unnecessary gaps.
- Do not add a PiggyVest workspace dropdown when there is only one tenant.
- At the bottom show **Switch role**, then quiet **Pulse** attribution. Do not write “Powered by Pulse.”
- The mobile/tablet sidebar becomes off-canvas.

Prototype controls:

- The only control is active user type: **Admin**, **Dev**, or **User**.
- Role cards have left-aligned text, 14px descriptions, and a 2px selected border.
- The modal must use a translucent overlay over the existing page, not replace the background with black.
- Switching roles immediately updates navigation, permissions, and read-only states.

## Routes

- `/app`
- `/app/transactions`
- `/app/transactions/:orderId`
- `/app/team`
- `/app/developers/keys`
- `/app/developers/webhooks`
- `/app/developers/webhooks/:endpointId`
- `/app/customization`
- `/app/settings/profile`
- `/app/settings/security`
- `/app/settings/notifications`
- `/app/settings/audit`

Do not add Payouts or a separate Compliance route/tab.

## Home — growth and settlement report

Home is one coherent growth-and-analytics report, not a wall of disconnected KPI cards.

Global period control:

- 24 hours
- 7 days
- 30 days
- 90 days
- All time
- Custom

Custom opens a functional date-range calendar. The selected period must update every KPI, chart, outcome title, review count, and recent-settlement result—not only the 30- and 90-day states.

Pulse currently settles only in Naira on Home:

- Remove USD and currency selectors from Home.
- Do not add “NGN” labels or currency explanatory controls.
- Show Naira amounts with `₦`.

Top metrics:

1. Settled volume
2. Transactions
3. Active customers
4. Settlement rate

Each metric must have an exact definition and meaningful comparison copy. Do not show a delta when the prior period has no comparable data. Explain supporting metrics plainly; avoid unexplained “pp” language without context.

Settlement by asset:

- Title: **Settlement by asset**
- Compact toggle labels: **Value** and **Transactions**
- Value shows settled Naira contribution by payment asset.
- Transactions shows settled transaction count by asset.
- Use stable asset colors: USDT green, USDC blue, BTC orange, XAUT gold.
- Pair the time-series stacked bars with a concise asset-mix summary.

Payment performance:

- Show a single journey: Transactions → Customer paid → Converted → Settled, plus Failed.
- Each stage includes a short hover/focus tooltip defining it.
- Fuse the journey with a stacked outcomes-over-time chart.
- The contextual title must reflect the active range, for example:
  - “Payment outcomes over the past 30 days”
  - “Payment outcomes over the past 90 days”
  - equivalent copy for 24 hours, 7 days, All time, and Custom.
- Outcome colors: settled green, failed red, needs-attention amber, in-progress blue.
- Use **Typical time to settle**, defined as the median elapsed time from transaction creation to successful settlement. Add a tooltip explaining that half settled faster and half slower.

Review queue:

- Title: **Payments needing attention**
- Categories: Payment mismatch, Screening hold, Settlement failed, Converted but not settled.
- Each row uses consistent title/description typography, count, and right caret.
- Every row deep-links to the matching filtered Transactions view.
- Place a centered text action below the list: **View all [count]** with a right caret.

Recent settlements:

- Use the same border radius and surface treatment as other Home cards.
- Columns: Customer, Created, Asset, Settled, Status.
- Created uses Instrument Sans, with the date as the title and time as supporting text.
- “View all” is a centered text button in the section header, using a right caret rather than the table-row arrow.
- Rows open the transaction detail.

Charts use semantic and comparative colors, never an all-black palette.

## Transactions

Transactions is the core reconciliation surface.

Toolbar:

- Result count on the left.
- Compact search on the right.
- Filters immediately to the right of search.
- Export above/right as appropriate.
- Search customer, reference, order, or transaction hash.

Filters:

- One wide multi-select filter panel.
- Order: Status first; then Currency; then Token beside Network.
- Permit multiple selections within each category.
- Include mismatch-only.
- Provide **Clear all** and **View results**.
- Encode the filter state in the URL.
- Clicking outside closes the filter popover.
- Export the complete selected result set as CSV or PDF.

Table columns:

1. Customer — name plus customer/order references in one two-line cell.
2. Created — absolute date as title and time as description.
3. Asset — crypto avatar plus network icon and network name.
4. Pegged — fiat amount the partner attached to the order.
5. Customer paid — actual crypto amount received.
6. Settled — fiat amount credited to PiggyVest, or “Not settled.”
7. Status.
8. Row-navigation arrow.

Table rules:

- Remove Gate.
- Use Asset rather than Route.
- Numeric columns align right.
- All data-bearing headers sort the complete filtered dataset.
- Header text is Instrument Sans 14/20, semibold.
- Sort icons are subtle at 12px.
- Primary row text is 14/20.
- Customer/order references use Instrument Sans supporting text, not IBM Plex Mono.
- Use IBM Plex Mono only for standalone amounts and operational identifiers.
- Status badges use Helium’s smallest size, sentence case, and capitalized labels.
- Rows are approximately 64px, vertically centered, and compact.
- Remove stray inner gaps at the left and right edges of the table.
- Pagination and sorting are functional.

Transaction detail:

- Title the primary section **Transaction timeline**.
- The timeline tells one cohesive story: amount pegged → customer paid → converted → settled, or the relevant failure/mismatch state.
- Put the timeline and webhook-events table in the left column.
- Put a single consolidated **Transaction details** record in the right column.
- Avoid duplicating customer, payment, settlement, and status information across cards.
- Right-side detail values use 600 weight.
- Show customer name and identifier, order ID, asset/network, confirmations, address, transaction hash, explorer link, settlement destination, masked account, settlement reference, rate, and last checked where relevant.
- Incomplete transactions have a working Refresh action.
- Pre-terminal Test transactions expose a working Simulate menu for Admin and Dev.
- Webhook-event rows are compact, sortable, capitalized, and replayable.

## Team

Admin-only page.

- Header includes active and pending counts, search, and primary Invite member action.
- Member table: Member, Role, Access, Last active, Actions.
- Role and status labels are title case.
- Last active combines relative time as title and absolute date/time as description.
- Role-change control is a semibold text action with a caret, not a heavy button.
- Dropdowns render on an overlay layer so tables cannot clip them.
- Keep visible spacing between Change role and Deactivate.
- Deactivation uses an anchored confirmation beside the triggering action.
- Protect the last Admin from deactivation or downgrade.
- Pending invitations expose **Cancel invitation** with confirmation.

Invite flow:

- Use a right-side drawer inset 24px from every viewport edge.
- Member details first, descriptive Helium role cards second, persistent footer actions.
- After submission, close the drawer and show:
  - **“Invitation sent to [email].”**
- Do not show or copy a prototype invitation URL.

## API credentials

- Page title: **API credentials**
- Clear description scoped to the current Test or Live environment.
- Test and Live key panels.
- Publishable and secret keys.
- One-time reveal on creation or rotation.
- Created timestamps are absolute, with actor as supporting text.
- Last used may remain relative.
- Default rotation grace period: 24 hours, with Immediate as an option.
- Revoke requires typed confirmation.
- Keep generous spacing between Rotate and Revoke.
- Use consistent panel/table corner radii.
- Client initialization code must be legible in both themes and copyable.
- Do not add vague explanatory banners about the API contract.

## Webhooks

- Environment-specific endpoint list and delivery history.
- Up to five endpoints per environment.
- Endpoint URL, subscriptions, enabled state, secret rotation, test event, delivery filters, payload inspection, and replay must work client-side.
- Test accepts localhost; Live requires HTTPS and rejects localhost.
- Use right carets for endpoint navigation.
- Remove redundant “Deliveries are at least once” and duplicate signing/replay explanation banners.
- Endpoint and delivery tables follow the shared 14px table system, compact row heights, functional sorting, and title-case pills.

## Checkout customization

Use a two-pane editor with settings on the left and the live customer checkout on the right.

The preview must mount the shared checkout/SDK implementation exported from `src/App.jsx`. Do not create a simplified substitute.

Controls:

- Brand and Theme tabs.
- Primary-color presets plus a functional color wheel.
- The color picker includes direct hex entry.
- Enforce WCAG AA contrast and block publishing when it fails.
- The selected primary color updates both light and dark preview states.
- Typeface: Instrument Sans, Inter, DM Sans, Manrope, IBM Plex Sans, Source Sans 3.
- Corner radius: 0–24px with practical presets.
- Light and dark logo upload; validate file type and 512KB limit.
- Available themes: Light and Dark.
- Default theme: **System**, based on the customer’s device preference.

Preview:

- Light/Dark/System behavior is functional.
- Mobile and desktop preview modes.
- USDT, USDC, XAUT, and BTC.
- Only valid network combinations.
- Copy, cancel, asset/network selection, continuation, and status steps work.
- Admin can edit/publish/discard/reset.
- Dev and User can interact with the preview but see read-only settings.
- Draft autosaves in the session and Publish shows a meaningful diff.

## Settings

Tabs:

- Profile
- Security
- Notifications
- Audit log

Profile:

- Lead with the signed-in person: avatar, name, email, and role.
- Put the role badge beside the name; do not add a separate “Role” label column.
- Include workspace/business information on the same page.
- Legal name is a read-only record, not a disabled input.
- Include PiggyVest display name, support email, and workspace logo where editable.
- Include business-verification/KYB status and the Pulse business-partner email.
- Do not create a separate Compliance tab.
- Do not add reliance-agreement or BVN/NIN explanatory clutter.

Security:

- Admin/Dev password update using the visible prototype password helper.
- Active sessions with relative and absolute last-seen timestamps.
- Per-session revoke and revoke-all actions.

Notifications:

- Separate Slack and Email channel cards.
- Each channel has Active/Paused state and a working enable toggle.
- Slack has masked incoming-webhook URL, connection state, test action, and event toggles such as:
  - Payment mismatch
  - Payment success
  - Settlement failure
  - Daily summary
  - Weekly summary
- Email has an add-recipient input and a simple recipient list with a delete icon at the right of each email.
- Email event toggles include critical failures, daily summary, and weekly summary.
- Remove “recipients configured / last tested” success banners.
- Remove prototype-behavior or “Live notifications only” explanation banners.
- Test actions show dismissible success toasts whose close button works.

Audit log:

- Use the same directory layout as Team and Transactions: result count left, search and filters right.
- Filters use a multi-select popover and can combine multiple actors/actions.
- Include Clear all and functional CSV export.
- Shared table typography, compact rows, and sortable headers.

## Data model and functional behavior

Create one deterministic in-memory TypeScript store consumed only through TanStack Query.

Seed:

- Approximately 200 orders per environment over 90 days.
- A fixed logical clock anchored to July 16, 2026.
- All transaction statuses, including successful, in-progress, mismatch, expiry, screening hold, and failure.
- Approximately 8% payment mismatches.
- Customer names and stable prefixed identifiers.
- Two webhook endpoints per environment with 30 days of deliveries.
- API keys.
- Team members and pending invitations.
- Notification preferences.
- Sessions.
- Published customization plus a dirty draft.
- Approximately 50 audit entries.

Assets and valid networks:

- USDT: Arbitrum, Base, Celo, Ethereum, Optimism, Polygon, Plasma, Solana.
- USDC: Arbitrum, Base, Celo, Ethereum, Optimism, Polygon, Solana.
- XAUT: Arbitrum, Ethereum, Polygon, Plasma.
- BTC: Bitcoin, Spark.

Use realistic precision and amount ranges for every asset. Never add crypto quantities together. Keep monetary values as decimal strings and use BigInt-safe aggregation before converting chart values.

All actions must update the relevant surfaces consistently:

- transaction table
- transaction detail
- timeline
- webhook history
- Home metrics
- review counts
- audit log
- toast/confirmation feedback

Every visible button and control must do something appropriate. Do not leave dead controls or decorative affordances that imply unavailable navigation.

## Visual system

Typography:

- Interface: Instrument Sans.
- Operational identifiers and financial numerals: IBM Plex Mono.
- Page title: 28/36, 650–700.
- Financial headline: 28/36, 600.
- Section title: 16/24, 650.
- Subsection: 14/20, 650.
- Body and dense data: 14/20.
- Supporting text: 12/18.
- Prototype-control descriptions: 14px.
- Buttons are semibold.

Spacing:

- 4px base grid.
- Desktop page gutter 32px; tablet 20px; mobile 14px.
- Standard control gap 8px; related fields 12px; section gap 24px.
- Panels use 20–24px padding.

Surfaces:

- Standard control radius 8px.
- Panel/dialog radius 10px.
- Structure uses 1px borders and subtle surface changes.
- Inputs use a consistent 2px semantic focus ring—never the heavy default ring shown in early iterations.
- Use shadows only for overlays, dialogs, and the checkout object.

Colors:

- Black for primary business-theme CTAs, not for every visualization.
- Blue for links, focus, selection, and transaction inflow.
- Green for successful settlement.
- Amber for Test mode and review states.
- Red for failure and destructive actions.
- Purple, orange, and gold may differentiate chart series.

Avoid:

- generic card walls
- all-black charts
- gradients, glows, glassmorphism, and ornamental blur
- excessive pills
- oversized icon tiles
- hover-lift cards
- fake app windows
- eyebrow labels everywhere
- uppercase section labels
- em dashes used as stylistic filler
- vague AI copy
- dead controls
- duplicated content
- clipped dropdowns, tables, or screenshots

Copy must be short, specific, and operational. Lead with the object being managed and state the consequence of an action.

## Accessibility and responsive behavior

- Target WCAG 2.2 AA.
- Keyboard access and visible focus for every control.
- Dialogs trap focus, close with Escape, and expose correct ARIA semantics.
- Destructive dialogs use `alertdialog`.
- Never rely on color alone for status.
- Respect reduced motion.
- Work intentionally at 1440px, 1024px, 768px, and 390px in both themes.
- Tables may scroll horizontally at narrow widths; never crush values into illegibility.

## Verification before handoff

Do not call the work complete until you have:

1. Run TypeScript checking and a production Vite build.
2. Exercised Admin, Dev, and User authentication, invalid credentials, reset, invite, refresh, and sign-out.
3. Verified role navigation and direct-route 403 behavior.
4. Tested both themes and System preference.
5. Checked every route and every visible action.
6. Verified all table sorting, search, filters, pagination, export, copy, popover-dismissal, and overlay behavior.
7. Tested transaction refresh, simulations, timeline synchronization, explorer links, webhook replay, and audit updates.
8. Tested key creation, reveal, rotation, and revoke.
9. Tested webhook CRUD, validation, test events, delivery filters, and replay.
10. Tested team invite, cancel invitation, role change, last-admin protection, and deactivation.
11. Tested notification toggles, recipient add/delete, Slack/email tests, and toast dismissal.
12. Tested customization color wheel, hex input, contrast gate, dark-theme accent, System default, asset/network selection, draft, publish, discard, reset, and read-only roles.
13. Reviewed loading, empty, error, retry, focus, keyboard, reduced-motion, mobile, tablet, desktop, light, and dark states.
14. Visually inspected the final app and screenshots to confirm that no content is cropped.

Deliver the finished prototype, a concise list of product-specific custom components, and a short QA report. Do not hand off a partial mockup.
