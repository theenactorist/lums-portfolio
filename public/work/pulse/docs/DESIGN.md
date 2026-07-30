# Pulse Partner Dashboard Design System

This document is the source of truth for the authenticated Partner Dashboard. It complements `.interface-design/system.md`, which contains the detailed checkout SDK geometry. When the two documents overlap, use this file for the dashboard shell and `.interface-design/system.md` for the embedded checkout.

## Product character

Pulse is an enterprise payment-operations product. It should feel calm, exact, accountable, and ready for production. The interface is not a token-price dashboard and not a collection of decorative cards. It helps PiggyVest reconcile the path from an on-chain payment to an NGN or USD disbursement.

Use the patterns common to strong enterprise dashboard references:

- Keep the partner identity and current environment globally visible. Environment changes belong inside the authenticated account menu, not in an exposed global switch.
- Put high-frequency navigation in a stable left rail.
- Use tables for credentials, webhooks, transactions, team members, sessions, and audit history.
- Pair list views with focused detail or inspector views.
- Keep customization as a two-pane editor and live preview.
- Place secondary filters beside the page title or immediately above the dataset they affect.
- Prefer one clear operational report over a wall of unrelated cards.

## Typography

### Families

- Interface and display: **Instrument Sans** through `--helium-font-family-display` and `--helium-font-family-body`.
- Financial values, identifiers, timestamps, keys, hashes, addresses, payloads, and code: **IBM Plex Mono** through `--helium-font-family-number`.
- Do not introduce a third interface typeface. Typeface choices inside checkout customization affect the preview only.

### Dashboard type scale

| Role | Desktop | Mobile | Weight | Use |
| --- | --- | --- | --- | --- |
| Page title | 28/36 | 24/32 | 650–700 | One per route |
| Financial headline | 28/36 | 24/32 | 600 | KPI amounts; IBM Plex Mono |
| Modal title | 20/28 | 20/28 | 650 | Dialog headings |
| Section title | 16/24 | 16/24 | 650 | Report, panel, and detail headings |
| Subsection title | 14/20 | 14/20 | 650 | Form groups and compact modules |
| Body | 14/20 | 14/20 | 400–500 | Primary explanatory copy |
| Dense data | 14/20 | 14/20 | 400–600 | Table rows and compact operational controls |
| Supporting | 12/18 | 12/18 | 400–500 | Metadata, hints, deltas, and secondary labels |
| Micro | 11/16 | 11/16 | 400–600 | Timestamps, network names, and tertiary metadata only |

Rules:

- Use sentence case. Do not use uppercase eyebrow text in the dashboard.
- Keep page titles visually dominant but compact. Authenticated pages do not use marketing-sized headlines.
- Reserve bold for headings, totals, selected states, and decisive values. Do not bold full paragraphs.
- Use tabular or monospaced numerals for amounts and operational identifiers.
- In two-column detail lists, keep left-side labels regular and tertiary; set right-side values to 600 weight and primary foreground color.
- Never use monospace for navigation, buttons, prose, or section headings.
- Preserve Helium's component typography tokens. Do not apply a `font` shorthand reset to dashboard buttons or form controls; primary and secondary button labels remain semibold through `--helium-font-weight-semibold`.
- Text fields, textareas, input dropdowns, tag inputs, and verification-code fields use Helium's semantic focus colors with a consistent 2px focus ring; error focus uses the corresponding error-ring token.
- Keep body copy between 45 and 75 characters per line where practical.
- Do not use letter spacing as decoration.

### Operational table headers

- Every dashboard table header uses the dense-data scale: Instrument Sans at 14/20 with 600 weight and tertiary foreground color.
- Every dashboard table body uses Instrument Sans at 14/20 for primary content and 12/18 for supporting content.
- Primary transaction-row labels—customer name, date, asset, and financial values—use the 14/20 dense-data scale. Customer and order references beneath a name use Instrument Sans at 12/18; reserve mono styling for standalone operational identifiers and amounts.
- Status pills inside dense operational tables use Helium's smallest `Badge` size so they remain secondary to the row data.
- Pills use sentence case and always begin with a capital letter.
- Every data-bearing column is sortable through the shared Helium `TableHeaderCell` pattern. Utility-only columns such as Actions, Replay, or row navigation remain unsortable.
- Sort controls are real buttons with keyboard access and an active ascending or descending state. Numeric headers and their sort controls align right.
- Sort-direction icons use a subtle 12px size throughout dashboard tables.
- Text columns default to ascending on first selection; dates, amounts, counts, and latency default to descending. Selecting the active column reverses its direction.
- Sorting applies to the complete filtered dataset before pagination. Local summary tables sort their complete visible dataset before any display limit is applied.
- Table actions use Helium text buttons with semibold labels; menus that may cross table bounds render on the page overlay layer.
- Activity timestamps show relative time as the primary value and the absolute date and time as supporting context.
- Pending team invitations expose a destructive text action labeled “Cancel invitation”; cancellation requires an anchored confirmation and removes the pending member from the session-only directory.
- Sending a team invitation closes the drawer and confirms success with “Invitation sent to [email].”; do not expose or repeat the prototype invite URL.
- Directory pages place their result count on the left and compact search/actions on the right; Transactions keeps Filters immediately to the right of search.

## Spacing and density

- Base unit: **4px**.
- Preferred sequence: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.
- Desktop dashboard gutter: 32px. Tablet: 20px. Mobile: 14px.
- Standard control gap: 8px. Related field gap: 12px. Section gap: 24px.
- Dashboard search fields use a 2px focus ring; do not inherit Helium's heavier 4px field ring in dense toolbars.
- Dashboard table rows use a 64px compact height with vertically centered cells; two-line content remains grouped inside that alignment.
- Single-line operational tables, such as webhook events, use a 56px compact height with vertically centered cells.
- Panel padding: 20–24px desktop, 16–18px mobile.
- Use whitespace to group related work; do not give every element its own container.
- Present verified business attributes such as legal name as read-only records, never as disabled or editable-looking form controls. Keep workspace branding and contact fields in a separate editable section.
- Keep account settings consolidated: Profile is available to every role and leads with the signed-in person’s name, email, and role. The same page groups PiggyVest’s legal name, KYB status, Pulse business-partner email, and workspace details; do not add a separate Compliance tab.
- Team invitations use a right-side drawer inset 24px from the viewport, with member details first, descriptive Helium role cards second, and persistent footer actions. Destructive member actions require a compact confirmation anchored beside the triggering button.

## Layout

- Authentication uses one reusable frame: a 404px task column and, above 1000px, a purposeful business-day skyline. Sign-in, verification, recovery, reset, and invitation routes keep the same form geometry so the task changes without the interface jumping.
- Authentication inherits the landing page’s persisted Light or Dark mode. The visual panel switches between composition-matched business-day and moonlit skyline artwork, and its fine-pointer cursor follows the reconciliation sequence Collect → Convert → Settle across the image; preserve native touch behavior and reduced-motion preferences.
- Prototype credentials appear as quiet, copyable micro-notes directly after the related field. Six-digit codes use Helium's compact `VerificationCode` size so the full group fits the task column and small screens.
- Global header: 64px desktop, 58px mobile.
- Separate the appearance control from the account avatar by 16px on desktop and 12px on compact headers so utilities and account actions read as distinct groups.
- Sidebar: 240px desktop, 224px compact desktop, and off-canvas at 840px and below so tablet workspaces keep a usable content width.
- Sidebar navigation uses 36px rows, 13/20 labels, 20px icons, 12px side gutters, 2px row gaps, and 8px group separation.
- Keep PiggyVest identity in the global header. Do not add a tenant switcher when only one partner workspace exists.
- The navigation order is Home, Transactions, Team; API keys, Webhooks, Customization; Settings, Docs. Team is a true Admin-only top-level route at `/app/team`; preserve role-based visibility elsewhere.
- Active navigation uses Helium’s tinted row plus the filled Phosphor icon variant. External destinations include a visible external-link icon and open in a new tab.
- Main content maximum width is determined by the workspace, not a narrow marketing container.
- Use a 12-column mental grid. Common splits are 8/4 for report plus exception queue and 7/5 for editor plus preview.
- Tables may scroll horizontally on narrow screens; do not compress identifiers into illegibility.
- The reconciliation progression is the signature component. Reuse the same pegged → customer paid → converted → settled sequence in transaction details, simulations, and related status explanations.
- Transaction tables expose those three financial values separately: the fiat amount the partner pegged, the crypto amount the customer paid, and the fiat amount settled to the partner. Never collapse or relabel these stages as generic target/received values.
- Keep transaction filtering behind one multi-select control. Search remains persistent; status leads the filter panel, followed by currency, with token and network adjacent. All options remain URL-restorable and clearable together.
- Home is one growth-and-settlement report, not a KPI card wall: Helium period tabs control four non-duplicative metrics; “Settlement by asset” uses compact “Value” and “Transactions” tabs to switch between fiat contribution and settled transaction count; the payment journey, selected-period review queue, and compact recent-settlements table complete the report.

## Surfaces, borders, and elevation

- Use Helium business-light and business-dark tokens for the application shell.
- Separate structure primarily with 1px borders and subtle surface changes.
- Standard control radius: 8px. Panel and dialog radius: 10px. Do not use excessive pill shapes.
- Use no gradients, glows, glassmorphism, or ornamental blur.
- Limit shadows to overlays, dialogs, and the checkout preview object. Dark mode relies on borders rather than shadows.
- Do not lift cards on hover. Interactive rows use a restrained background change and visible focus state.

## Color roles

- Neutral: structure, text, dividers, and inactive controls.
- Black: primary dashboard CTAs in the Helium business theme. It is an action color, not the entire product palette.
- Blue: focus, links, selected progress, created-order chart series, and checkout primary actions.
- Green: completed settlement and verified success.
- Amber: Test mode, open review work, grace periods, and non-blocking caution.
- Red: failed processing, destructive actions, and blocking validation.
- Orange, gold, and purple: additional data-series and asset differentiation where they improve comparison.
- Charts must use distinct Helium data or semantic colors. Do not render every series in black and gray.
- Never use crypto asset colors as the primary application theme.
- NGN and USD values remain separate. Do not combine crypto quantities or fiat currencies into one total.

## Helium component contract

Use `@helium/react` before creating a local control:

- `Button`, `Input`, `InputDropdown`, `Checkbox`, `Toggle`, and `RadioCard` for actions and forms.
- `SidebarNavigation` and `SidebarItem` for product navigation. Use `SidebarAccountSwitcher` only when the product genuinely supports multiple partner workspaces; the single PiggyVest tenant stays in the global header.
- `Tabs` for environment, settings sections, preview mode, and other peer views.
- `Table` primitives for every operational collection.
- `Badge`, `Tag`, `Alert`, `Skeleton`, `Toast`, `Tooltip`, `Avatar`, `FileUpload`, and `Currency` for their intended states.

Local patterns are allowed only when Helium has no equivalent or when the pattern is product-specific. Current examples are the accessible dialog shell, reconciliation progression, multi-select filter popover, chart container, secret field, payload inspector, and checkout preview.

Do not target generated Helium class names. Style through stable local wrappers, public component props, and Helium tokens.

The checkout customization preview must mount the shared `PulseCheckoutPreview` export from `src/App.jsx`. It is the same interactive SDK used by the landing-page demo. Never recreate the checkout flow, asset picker, payment screen, or status states inside the dashboard.

## Navigation and permissions

- The partner name **PiggyVest** and legal identity **PiggyTech Global Limited** remain visible in the global header on desktop. PiggyVest remains visible on mobile.
- The header shows a static environment badge. Switching Test/Live requires opening the account menu; Test uses amber and Live uses green when available.
- A visible icon-only appearance control must exist at every breakpoint. Its Helium dropdown offers Light, Dark, and System.
- PiggyVest identity leads the global header. Pulse appears as quiet provider attribution at the bottom of the sidebar.
- Prototype controls contain one variable only: active user type.
  - **Admin:** full organization, team, compliance, developer, and publishing access.
  - **Dev:** transactions and developer tools; checkout appearance is view-only.
  - **User:** read-only transactions, checkout appearance, and personal settings.
- Hidden navigation does not replace authorization. Unauthorized direct routes render the authenticated 403 state.

## Copywriting

- Lead with the user’s operational object: order, credential, endpoint, delivery, payout, or verification.
- State consequences explicitly: what is locked, what will change, and whether an action can interrupt an integration.
- Use “Test” and “Live” consistently. Do not use “sandbox,” “production,” and “environment” interchangeably in labels.
- Prefer “Requires review,” “Unsettled,” and “Delivery failed” over vague labels such as “Issue” or “Error state.”
- Avoid greetings, promotional slogans, exclamation marks, and generic AI copy.
- Buttons use direct verbs: Rotate key, Add endpoint, Replay delivery, Publish changes, Switch view.

## Charts and data visualization

- Every chart must answer a named operational question and use real fixture data.
- Axis units and currency context must be explicit.
- Do not plot NGN and USD on one numeric axis.
- Use distinct Helium data colors for peer series. Blue may represent created/inflow, while green represents completed/settled; amber and red retain their caution and failure meanings.
- Asset distributions use stable color assignments: USDT green, USDC blue, BTC orange, and XAUT gold.
- Provide the exact value in tables or summaries when a chart is only directional.
- Avoid decorative charts and generated pseudo-data.

## Imagery and icons

- Use Helium Currency artwork for assets and networks when available.
- Use Phosphor icons inside Helium controls. Match icon weight and size to the surrounding control.
- Generate imagery only when it carries product meaning, such as a checkout brand asset or a purposeful empty-state illustration. Do not add decorative raster art to operational pages.

## Accessibility and motion

- All interactive elements require keyboard access, visible focus, and an accessible name.
- Maintain at least 4.5:1 contrast for normal text and block publishing when checkout accent contrast fails.
- Dialogs close with Escape and expose `aria-modal`; destructive dialogs use `alertdialog`.
- Respect reduced motion. Use 120–200ms transitions for menus, drawers, and state changes.
- Never encode status with color alone; pair it with text or an accessible icon label.

## Review checklist

Before shipping a dashboard change, confirm:

1. The hierarchy still works in business-light and business-dark.
2. PiggyVest, environment, and appearance controls remain visible.
3. The page uses Helium primitives for standard UI.
4. Amounts, identifiers, and status copy follow the typography rules.
5. Role permissions work through both navigation and direct URLs.
6. Empty, loading, error, and long-content states are intentional.
7. The layout works at 1440, 1024, 768, and 390px.
8. No gradient, glow, arbitrary font, decorative chart, or repeated card wall has been introduced.
