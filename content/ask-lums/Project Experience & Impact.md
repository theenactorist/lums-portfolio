# Project Experience & Impact

Public copy for Ask Lums, made from the master file on 17 November 2026. Source-file lists and open questions are left out.

## Project index

1. **Carbon** - Onboarding UX audit and PIN/OTP sequence redesign
2. **Carbon** - Mobile home-screen redesign | Unifying Android and iOS
3. **Carbon** - Carbon Business B2B SME lending
4. **Carbon** - Beta-Testing Community and DesignOps
5. **Shiga** - Pulse | AI-Native Design Engineering: A Payment Product in Five Days
6. **Shiga** - Helium | Design System Engineering: Owning Helium from Figma Library to Production Code
7. **Shiga** - Shiga/ENTA business onboarding | KYB, owner verification and activation
8. **Shiga** - ENTA passkey-led consumer onboarding | Cutting time to value
9. **Shiga** - Product ecosystem and payment expansion
10. **Shiga** - EntaPOS | Stablecoin payments at the counter, without changing checkout
11. **Shiga** - Enta high-fidelity prototypes | Designing in Figma and building working prototypes with AI
12. **Shiga** - Enta Home and wallets | One home for individuals and businesses
13. **Shiga** - Enta Business Multisig | Payment approvals for teams that share a wallet
14. **Shiga** - Enta Payment links | Get paid by link, in crypto or by bank transfer
15. **Shiga** - Enta Move money | Every way money moves, in one place
16. **Shiga** - Enta wallet recovery | Getting back into a wallet after losing a passkey
17. **Branch International** - Building AI tools for consistent product design (formerly Three AIs, One Design System)
18. **Branch International** - Multi-market product modernization and DesignOps
19. **Sabi** - Supply-chain logistics suite
20. **United Bank for Africa** - HCMConnect enterprise HR automation
21. **United Bank for Africa** - Multi-channel banking and design-system foundations

---

## Carbon

### Carbon onboarding UX audit and PIN/OTP sequence redesign

#### Project snapshot

- **Company:** Carbon
- **Dates:** Needs confirmation. An older artifact says June 2022 and one month, but the authoritative project record does not validate this.
- **Role:** Product Designer on the onboarding team; the current résumé also identifies my Carbon role as Product Designer.
- **Product:** Carbon mobile onboarding and tiered KYC.
- **Users:** New Nigerian customers on Android and iOS progressing toward loans, savings, cards, transfers, and Carbon Zero.
- **Problem:** The interface promised phone verification, then interrupted customers with PIN creation when they expected an OTP.
- **Personal ownership:** Usability-test planning and facilitation, synthesis, problem framing, interaction and flow design, final specifications, and engineering handoff.
- **Delivered work (project-record account):** An account-and-login-PIN-first sequence, clearer security copy, a PIN completion state, and a direct phone-to-OTP transition.
- **Strongest supported outcome:** The shipped structure removed the PIN interruption after phone entry and made the verification sequence internally consistent. Faster completion was observed directionally but was not quantified.
- **Key skills:** Product thinking, usability research, funnel analysis, interaction design, systems thinking, technical collaboration, KYC onboarding, and measurement planning.
- **Public disclosure status:** A redacted portfolio story exists. Permission to disclose internal funnel values, cost data, providers, and operational details needs confirmation.

#### Context and challenge

Carbon is a Nigerian mobile financial-services product. Onboarding and tiered KYC were the common gateway into loans, savings, cards, transfers, and Carbon Zero. Friction at this stage could cause abandonment and waste acquisition effort before customers reached product value.

The experience also had to support fraud prevention, the Central Bank of Nigeria's three-tiered KYC requirements, and Customer Due Diligence requirements.

The wider audit found four connected issues:

1. A mismatch between the phone-verification promise and the PIN/OTP task order.
2. An unclear goal-based KYC or account-upgrade path.
3. Selfie capture, processing feedback, recovery, and matching problems.
4. Address-verification, editability, and exact-match limitations.

There was also a separate OTP-provider reliability issue. That service problem was related context, not the root cause of the prioritized interaction problem.

#### Work and ownership

I initiated an evaluation of the live onboarding journey rather than relying only on a heuristic review. I combined:

- Event tracking and funnel evidence.
- Observations from customer meet-and-greet events.
- Exploratory usability testing on Android and iOS.
- Heuristic evaluation.
- Investigation of technical and service dependencies.

I planned and facilitated the usability sessions, synthesized the findings, framed the problem, explored alternatives, designed the revised interaction and flow, prepared final specifications, and handed the work to Engineering.

The prioritized problem appeared near the beginning of onboarding and independently in both presentation-safe sessions. After entering a phone number, customers were told that verification would happen. They therefore expected an OTP. The next screen instead asked them to create a PIN, causing them to wait on the wrong screen or interpret the product as delayed.

The broader audit also produced adjacent initiatives:

| Initiative | Work completed | Status |
|---|---|---|
| Goal-based KYC/account upgrade | Proposed routing from "How do you want to use Carbon?" into the appropriate upgrade path for loans, Carbon Zero, transfers, cards, or savings. | Proposal; implementation needs confirmation |
| Selfie capture and recovery | Identified capture-timing, retake, processing-feedback, recovery, and face-matching issues; proposed clearer capture control and more resilient matching. | Audit and proposal; implementation needs confirmation |
| Address-verification recovery | Identified non-editable address data and exact text matching; proposed review/edit controls, clearer copy, alternative identity data, and more tolerant matching. | Audit and proposal; implementation needs confirmation |
| OTP-provider resilience | Recommended provider failover and redundancy. | Recommendation; implementation ownership needs confirmation |
| Impact measurement | Defined conversion, time, abandonment, retry, recovery, support, and downstream-product measures. | Measurement plan, not an achieved outcome |

#### Key decisions

Three sequence options were compared:

1. **Keep the existing order and add anticipatory copy.** This required the least engineering effort, but still depended on customers reading content that competed with a stronger learned expectation.
2. **Create the account and login PIN before phone verification.** This required more engineering work, but completed account security, reached a stable internal account state, and made phone entry lead directly to OTP.
3. **Verify phone and OTP before PIN creation.** This followed the most familiar convention, but left account creation dependent on an external OTP service and weakened recovery from interruption.

I selected the second option:

`Sign-up -> Create login PIN -> Confirm login PIN -> PIN/account success -> Enter phone number -> Enter OTP`

The decision deliberately accepted more implementation work to improve usability, resilience, and recoverability together. It required reordered API calls and account states, safe handling of partially completed accounts, a resume path, and appropriate limits for unverified accounts.

The guiding principle was: **Close one loop before opening another.**

#### Outcomes

**Supported by the project record**

- The revised structure was implemented.
- "Create PIN" and "Confirm PIN" became "Create login PIN" and "Confirm login PIN."
- A completion state closed the account-security task before phone verification began.
- Phone-number entry led directly to OTP entry.
- The OTP state showed the destination number and resend guidance.

**Directional**

- The project record reports that customers completed the sequence faster after implementation.
- No controlled comparison, observation window, sample size, or exact improvement is available.

**Unsupported or retired claims**

The following figures appear in an older presentation but conflict with the authoritative record and should not be used without the underlying analytics:

- `12-15 more into the funnel`
- `25-30% fewer tickets`
- `90% finish PIN and OTP first try`
- `Under 2 mins to finish sign up down from 6-9 mins`

There is no verified production conversion lift, exact customer increase, support-ticket reduction, or quantified recovery rate.

#### Collaborators, tools, and methods

**Collaborators**

- Product Manager.
- Engineers.
- Olumide as Product Designer.
- Customer meet-and-greet participants supplied observational context.

The involvement of Data, Growth, Customer Support, Marketing, Security, and Compliance needs confirmation.

**Tools and methods**

- Moderated Android and iOS usability testing, according to the authoritative project record.
- Event tracking and funnel analysis; a presentation artifact identifies Grafana dashboard snapshots.
- Customer meet-and-greet observations.
- Heuristic evaluation.
- Jakob's Law.
- Nielsen heuristics: Consistency and Standards, Match Between the System and the Real World, Error Prevention, and Visibility of System Status.
- Figma flow design and before/after specifications.
- Technical dependency investigation and engineering handoff.

#### Evidence and validation notes

- The research sample was exploratory and small: two presentation-safe cross-platform sessions. It can establish usability problems, not their prevalence across Carbon's customer base.
- The Android participant waited about **five minutes** expecting an OTP before contacting me.
- Selfie and address-verification funnels establish wider onboarding leakage; they do not measure the effect of the PIN/OTP redesign. Internal counts, vendor details and cost figures are omitted from this copy.
- The authoritative record describes moderated sessions, while an older presentation calls them asynchronous or unmoderated. The authoritative method is used here, but the conflict should be resolved.
- Restricted participant names, contact details, account information, and internal links must remain excluded.

This is a separate onboarding project from the home-screen case at `/work/carbon`. The source-of-truth record and its evidence matrix support the interaction decision and directional observation; they do not supply independent production analytics. The measurement plan compares common start/end events because moving PIN earlier could shift abandonment rather than remove it.

### Carbon mobile home-screen redesign | Unifying Android and iOS

#### Project snapshot

- **Company:** Carbon.
- **Dates:** February 2023, four weeks, as recorded on the active case. An included usability report is dated October 2022; its relationship to that delivery window remains unresolved.
- **Role:** Product Designer, with user-research scope, within a three-designer team.
- **Product and users:** Carbon’s Android and iOS retail-banking home experience in Nigeria. The four-million-plus customer figure is company context, not measured release reach.
- **Problem:** A crowded home screen obscured credit and everyday actions; inconsistent platform treatments made the same product feel different on Android and iOS.
- **Personal ownership:** Product design and research contribution, including discovery, exploration, usability testing, information architecture and handoff. The current résumé explicitly credits design colleagues.
- **Delivered work:** A shared Hydrogen Design System direction, persistent Loans navigation, Cards in Quick Access, balance privacy and implementation QA.
- **Strongest supported outcome:** A documented cross-platform release. Satisfaction, registration and reactivation figures remain reported team outcomes without underlying analytics.
- **Key skills:** Mobile UX, research, information architecture, design systems, privacy controls, usability testing and engineering QA.
- **Public disclosure status:** The case, selected artifacts and team outcomes are public; private research and analytics are not included here.

#### Context and challenge

Customers needed credit to be easy to find, but competing home-screen elements weakened its prominence. Support tickets and app-store reviews also asked whether Carbon had two applications. Switching phones meant learning a different layout, typography and navigation.

I contributed to a redesign that connected hierarchy, cross-platform familiarity and control over sensitive financial figures. This project is distinct from the earlier PIN/OTP onboarding audit.

#### Work and ownership

Discovery combined data analysis, user interviews, support and app-store feedback, competitive analysis and literature review. Four recorded explorations compared the balance area, credit entry points, Quick Access and transaction history.

The usability conclusions contain an important qualification: participants found loans through cards but overlooked the bottom Loans tab. A persistent route still needed to be noticed. The notes also raised trust, USSD and referral concerns. I use those findings as evidence of the research process, without claiming a measured improvement in discoverability.

The final direction used Hydrogen typography, icons and components across both mobile platforms. Engineering QA compared production with the prototype and annotated balance visibility after returning from Savings, button padding and text alignment, completed-transaction history and Account-icon orientation. The in-app announcement explained where Cards and Loans had moved and how hidden balances affected transaction figures.

#### Key decisions

- **Give credit a persistent route.** Loans grouped applications, history and credit education; Cards moved to Quick Access.
- **Use one shared system.** Hydrogen replaced separate visual treatments across Android and iOS.
- **Make privacy consistent.** Hiding balances extended across account, loan and savings views; account-balance hiding also concealed transaction figures.
- **Test navigation, not just appearance.** The overlooked Loans tab showed why a cleaner hierarchy still needed usability review.
- **Support the transition.** In-app communication explained the new locations in terms of customers’ existing tasks.

#### Outcomes

**Documented release evidence**

- The current case includes final interfaces, a feature-launch video, an in-app announcement, production-versus-prototype QA and captured release feedback.
- The release harmonized Android and iOS. The CEO’s public recognition credits the team, not an individually attributable causal effect.

**Portfolio-reported team outcomes**

- **81%** increase in customer satisfaction.
- **25%** increase in registrations.
- **10%** dormant-account reactivation during the release month.

The case does not provide definitions, baselines, sample sizes or causal analysis. Its new-look poll is separate from the satisfaction figure. The old document’s **15% organic-referral** claim is absent from the current résumé and is not carried forward as a current result.

#### Collaborators, tools, and methods

- Team: 1 Product Manager, 3 Product Designers, 6 Engineers, 1 Product Marketer and 1 QA Engineer.
- Methods: interviews, data and feedback review, competitive analysis, literature review, four design explorations, usability testing, information architecture, design-system application, handoff and implementation QA.
- System: Hydrogen. Exact project-specific design software and analytics tooling are not established by the active case.

#### Evidence and validation notes

The active case is **Unifying Carbon’s banking experience across Android and iOS**. Its original artifacts support the design and delivery account. The October 2022 report date is preserved rather than silently moved into the February 2023 four-week window. Archived and legacy dynamic routes do not override this case.

Public case: [Carbon](https://olumideolusesi.com/work/carbon).

### Carbon Business - B2B SME lending

#### Project snapshot

- **Company:** Carbon
- **Dates:** Within June 2022 to October 2024; exact project dates need confirmation.
- **Role:** Product Designer acting as de facto product owner for delivery.
- **Product:** Carbon Business, Carbon's first B2B working-capital lending product.
- **Users:** Small and medium-sized businesses seeking working-capital loans from NGN 200,000 to NGN 10 million.
- **Problem:** Carbon needed to expand from consumer finance into business lending with a compliant KYB, credit-assessment, and disbursement journey.
- **Personal ownership:** Product strategy, PRDs, sprint leadership, stakeholder management, end-to-end design, and coordination of a five-person cross-functional team.
- **Shipped work:** A zero-to-market B2B lending product with document upload, KYB, credit assessment, and under-48-hour disbursement.
- **Strongest verified outcome:** The current public resume reports CAD 500,000 disbursed within nine months of launch.
- **Key skills:** Zero-to-one product design, B2B lending, KYB, product strategy, product ownership, PRD writing, sprint leadership, and stakeholder management.
- **Public disclosure status:** The product, lending range, team size, delivery scope, and headline disbursement outcome are public on the current resume page. Supporting financial and operational records are not included.

#### Context and challenge

Carbon Business was described as Carbon's first B2B lending product for SME working capital. The product required more than a consumer loan interface: it needed business verification, document collection, credit assessment, stakeholder coordination, and a reliable path from application to disbursement.

#### Work and ownership

I owned product strategy and design, wrote PRDs, ran sprints, managed stakeholders, and coordinated a five-person delivery team. The current resume says this eliminated the need for a contract Product Manager.

My design scope included the full KYB flow, document upload, credit assessment, and the path to disbursement.

#### Key decisions

- **Build a dedicated B2B product.** Carbon Business was not framed as a cosmetic extension of the consumer app.
- **Treat KYB as a core product journey.** Business documents and assessment were integrated into the lending experience.
- **Combine design and product ownership.** PRDs, sprint leadership, and stakeholder management sat alongside interaction design.
- **Optimize for time to capital.** The public resume describes an under-48-hour disbursement path.

#### Outcomes

**Portfolio-reported**

- Product shipped from zero to market.
- CAD **500,000** disbursed within **nine months**.
- Supported working-capital loans from **NGN 200,000 to NGN 10 million**.
- Under-**48-hour** disbursement.

**Unsupported or retired claims**

- No customer count, approval rate, default rate, repeat-borrowing rate, revenue, portfolio quality, satisfaction, or operational-cost measure is provided.
- The public page does not establish what portion of the disbursement outcome was directly attributable to design.

#### Collaborators, tools, and methods

**Collaborators**

- A five-person cross-functional delivery team.
- Stakeholders across product and business functions.

Exact roles and names are not provided.

**Tools and methods**

- Product strategy.
- PRD writing.
- Sprint leadership.
- Stakeholder management.
- KYB flow design.
- Document-upload and credit-assessment design.
- End-to-end delivery coordination.

#### Evidence and validation notes

- This project appears on the current public resume page but does not yet have a dedicated active case-study route.
- The disbursement amount, time window, loan range, and under-48-hour statement are portfolio claims; no supporting dashboard or financial record is embedded in the website.
- Employment dates define the outer boundary, not the exact project timeline.

### Carbon Beta-Testing Community and DesignOps

#### Project snapshot

- **Company:** Carbon
- **Dates:** Within June 2022 to October 2024; exact initiative dates need confirmation.
- **Role:** Product Designer and internal initiative owner.
- **Product:** A customer beta-research community plus standardized design-to-development handoff practices.
- **Users:** Carbon's product designers, developers, scrum masters, researchers, and beta customers.
- **Problem:** The team needed a more direct, repeatable way to test products with customers and a more consistent way to move designs into development.
- **Personal ownership:** Founded and grew the beta community; standardized handoff through guidelines and component libraries.
- **Shipped work:** A 120+ participant research community and documented handoff/component practices.
- **Strongest verified outcome:** The current resume reports a 25% reduction in external research costs and a 30% improvement in design-to-development velocity.
- **Key skills:** Research operations, community building, DesignOps, component libraries, process design, stakeholder enablement, and delivery optimization.
- **Public disclosure status:** The initiative and headline metrics are public on the current resume page; underlying budgets, process baselines, and participant records are not.

#### Context and challenge

Carbon's product team needed regular access to customer feedback without depending entirely on external research recruitment. It also needed a clearer, more repeatable handoff system for designers, developers, and delivery partners.

#### Work and ownership

I founded Carbon's Beta-Testing Community, grew it to more than 120 participants, and used it to collect qualitative and quantitative feedback.

I also standardized design handoff through guidelines and component libraries intended to reduce review cycles and improve design-to-development flow.

#### Key decisions

- **Build a reusable research panel.** The community created a persistent feedback channel instead of recruiting from scratch for every study.
- **Combine qualitative and quantitative input.** The public resume describes both forms of insight.
- **Treat handoff as a system.** Guidelines and component libraries reduced dependence on individual file habits.
- **Optimize the full delivery loop.** The initiative addressed research access and engineering clarity, not only screen production.

#### Outcomes

**Portfolio-reported**

- **120+** beta participants.
- **25%** reduction in external research costs.
- **30%** improvement in design-to-development velocity.
- Fewer review cycles.

**Unsupported or retired claims**

- No recruitment, participation, retention, study-throughput, or research-quality measures are provided.
- "Velocity" is not defined, and the baseline or measurement period is not included.

#### Collaborators, tools, and methods

**Collaborators**

- Product designers.
- Developers.
- Scrum masters.
- Beta customers.

Exact owners and operating partners need confirmation.

**Tools and methods**

- Research-community design and participant management.
- Qualitative and quantitative feedback.
- Handoff guidelines.
- Component libraries.
- Cross-functional process standardization.

#### Evidence and validation notes

- The active resume page is the only current website source for this combined internal initiative.
- The website presents the beta community and handoff work as separate accomplishments. They are grouped here as one DesignOps and research-infrastructure program to avoid inflating closely related internal enablement work.
- The percentages are public portfolio claims without embedded calculations.

---

## Shiga

### Pulse | AI-Native Design Engineering: A Payment Product in Five Days

#### Project snapshot

- **Company:** Shiga.
- **Dates:** July 2026; five working days for the first build. Later product and partner progress is explicitly dated 14 September 2026.
- **Role:** Product design and React frontend delivery. The current résumé names my Shiga role Product Design Engineer.
- **Product:** Embedded crypto collection and fiat settlement, connecting checkout, partner operations and developer integration.
- **Users:** Paying customers and partner Admin, Developer and Viewer/Operations roles.
- **Problem:** A prospective partner needed to evaluate an integrated payment product within a five-day commercial window.
- **Personal ownership:** Product scoping, flow and permission design, Figma-to-React system work, implementation instructions, Codex-assisted frontend delivery, review and corrections. Engineers owned backend services and API integration.
- **Delivered work:** Reviewed React frontend used for the integrated partner demo; later checkout, console, documentation and staging-website evidence extends beyond that initial scope.
- **Strongest supported outcome:** The recorded first demo helped secure Piggyvest as a partner. This is a project-account outcome, not independently audited revenue or transaction performance.
- **Key skills:** AI-assisted product design and engineering, React, design systems, fintech interaction design, role permissions, developer experience, product scoping and cross-functional delivery.
- **Public disclosure status:** The current case names Pulse, Shiga, Helium, Codex, Mintlify and Piggyvest. That public account does not authorize distribution of private code, contracts or operational records.

#### Context and challenge

Shiga already provided on-ramp, off-ramp and payment capabilities through ENTA. Pulse brought them into a business product that could accept crypto inside a partner’s experience and settle in fiat. Business Development managed the prospective partner relationship and arranged the evaluation around an investment-payment use case.

My PM and I protected three jobs: complete a payment, understand its status and see how to integrate. The product needed a credible customer checkout, operations console and developer path within the same demonstration.

The original V1 product record describes stablecoin collection, payment detection and screening, conversion, disbursement and reconciliation. It distinguishes NGN settlement to an end-user virtual account from USD settlement to a partner omnibus account. These historical service rules should not be generalized to every later asset, network or settlement configuration.

#### Work and ownership

I clarified the scope with Product, Business Development and Engineering, designed the critical customer flow in Figma and defined states, roles and permissions. I converted the Figma system into Helium React components and documented them in Storybook. Component properties, variants and interaction states gave design, Codex and Engineering a shared reference.

I wrote product and behavior guidance, then used Codex to assemble the frontend in smaller steps. I reviewed the behavior and directed corrections. The owner-confirmed examples are specific: table-header sorting was missed, table columns were overcomplicated, and creation flows needed simplifying. Those corrections demonstrate design responsibility inside the build; they do not establish a measured speed or quality gain.

I reused Shiga’s Mintlify setup for developer guidance. The current case shows quickstart/API-request and payment-event/webhook documentation. Product, Engineering and Business Development reviewed the working flow, and I handed reviewed React code to frontend engineers for backend API integration.

| Surface | Work and evidence boundary |
|---|---|
| Embedded checkout | Asset/network choice, explicit transfer details, address/QR, quote and payment states. Later examples include expiry, mismatch and cancellation behavior. |
| Partner operations | Role-based navigation, transaction tracing, payment/conversion/settlement status and reconciliation. Later failure-reason feedback belongs to subsequent work. |
| Developer experience | Test credentials, API requests, API keys, webhooks and documentation. Current examples demonstrate the evolved integration experience. |
| Shared system and review | Helium React/Storybook, written states, Codex-assisted implementation and human review. Later PRODUCT/BUILD_PROMPT and DESIGN files are not a complete day-one-to-five delivery log. |
| Later website | I designed and built the Pulse website; the September update records it as complete on staging and awaiting public launch. |

#### Key decisions

- **Connect the three jobs.** Checkout, operations and developer guidance supported one evaluation.
- **Build while backend work progressed.** I delivered the frontend as an integration base, reducing dependence on a sequential static-design handoff.
- **Reuse coded design-system decisions.** Helium helped preserve component behavior while I focused on flows, features and QA.
- **Review generated behavior.** AI implementation required corrections to interaction details and complexity.
- **Standardize the partner product.** The July refinement record favored a reusable dashboard over a bespoke console per partner.
- **Defer self-serve onboarding.** Manual backend provisioning protected the demo deadline. Existing business-onboarding work and the proposed Pulse activation extension remain separate from the five-day proof.

#### Outcomes

**Recorded first-build outcome**

The current case places frontend review on day three, API integration on day four, and continued testing plus the partner demo on day five. It reports that the demo helped secure Piggyvest. The older reconstructed chronology assigned these activities differently; the current published sequence is used here without inventing exact calendar dates.

**Dated later progress, not present-day status**

As of **14 September 2026**, the portfolio records Piggyvest as onboarded, 247Bet and Sayswitch as onboarding, and the website as staging-complete awaiting launch. Later capability includes USDC, USDT or BTC on 20+ networks; this is not the original five-day scope.

**Implementation evidence and limits**

The available prototype and repository demonstrate interaction breadth, roles and operational states. Simulated/in-memory behavior does not independently prove the historical API-connected build. No verified contract value, revenue, transaction volume, conversion improvement, integration-time reduction or support saving is supplied.

#### Collaborators, tools, and methods

- I owned product design, frontend build, implementation guidance and review.
- Frontend engineers consumed backend APIs in the delivered frontend; backend and cloud engineers owned services, webhooks, environments and infrastructure.
- The PM coordinated scope and delivery; Business Development managed the partner relationship and evaluation.
- Tools: Figma, Codex, React, Helium, Storybook and Mintlify.
- Methods: focused proof scoping, documented states and permissions, parallel delivery, team review, corrections and integration testing as reported in the project account.

#### Evidence and validation notes

The new headline is supported by concrete product and frontend ownership, system reuse and review. It does not mean the complete evolved product was built or launched in five days. The September confirmation resolves Mintlify usage; current public documentation references supersede the old “external Docs link only” limitation. Partner names are repeated only as already stated in the current case.

Public case: [Pulse](https://olumideolusesi.com/work/pulse).

### Helium | Design System Engineering: Owning Helium from Figma Library to Production Code

Former entry title: **Helium design system**.

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Helium 2.0 existed in Figma by May 2025. Platform token files went to the mobile team in January 2026. The code layer ran from 21 June to 11 October 2026 (109 commits). The public case study went live on 3 November 2026. Helium 1.0's dates need confirmation.
- **Role:** Design system owner across the Figma library and the production React codebase. The current Shiga employment title is Product Design Engineer.
- **Product:** Helium 2.0, Shiga's design system for Enta (Individual and Business) and Pulse: foundations, 1,608 Figma variables, four themes, 48 components in Figma and React, tokens for web, iOS and Android, a public Storybook, UX patterns, decision records and a Figma-to-code manifest that AI coding agents can read.
- **Users:** Shiga's designers, frontend and mobile engineers, and AI coding agents working in Helium-based repositories. The products built with it serve Enta's Individual and Business users and Pulse's partners.
- **Problem:** Helium 1.0 was a style guide in Figma only. Engineers rebuilt screens by eye from Figma links and screenshots, so copy and styling drifted. Enta then added Business accounts, and AI coding agents started writing frontend code with their own colors, spacing and components.
- **Personal ownership:** Foundations, the Figma library and variable architecture, theming, component specifications, the React code layer built with Claude Code to my rules, review of every component against Figma, UX patterns, decision records, the error-message formula and rewrites, and QA remediation.
- **Delivered work:** 48 components in Figma and React with more than 300 Storybook stories; tokens built by Style Dictionary into CSS, TypeScript, Swift and Android XML; 13 UX patterns; six decision records; a Figma-to-code manifest and AGENTS.md for agents; exported asset sets; a published case study.
- **Strongest supported outcome:** Pulse's console imports Helium's React components, icons and tokens, and Pulse's first build took five working days in July 2026. Helium is also used in Enta prototypes and Claude Design, and the mobile team is bringing its tokens into the Enta app. No measured time or defect savings exist.
- **Key skills:** Design-system strategy, token architecture and theming, Figma variables, component API design, React and TypeScript, Storybook, Style Dictionary, accessibility and contrast, UX patterns and governance, UX writing, AI-agent-ready design systems and design QA.
- **Public disclosure status:** The case study and Storybook are public. The repository, Figma files, Linear issues and Slack records are private; the figures here come from them and from the published case.

#### Context and challenge

Helium is Shiga's design system, used across Enta and Pulse. Helium 1.0 gave designers one place for colors, type and shared components, but nothing tied the code back to the design. Specs reached engineering as Slack links, and small differences reached the live product: in March 2026 the send flows showed mixed casing and a label that read "Ban account" (ENG-956).

Two later changes raised the stakes. In June 2026 Enta added Business accounts, so the system needed four themes instead of two. AI coding agents had also started writing Shiga's frontend code, and left to themselves, agents invent their own values. My goal went beyond consistent screens: a code layer that agents could build with, so a screen comes out right whether a designer, an engineer or an agent builds it.

| When | What happened | Source |
|---|---|---|
| Before 2025 | Helium 1.0: a style guide in Figma only. | Owner account |
| By May 2025 | Helium 2.0 in Figma on the Untitled UI foundation; specs reached engineering as Slack links. | Slack, ADR-0002 |
| November 2025 | Error messages had no standard and drove support tickets. | Linear PRO-45 |
| January 2026 | Tokens handed to Android and iOS as one-off theme files: 263 color tokens in Light and Dark. | Linear PRO-65 |
| March 2026 | Live send flows didn't match the design: mixed casing and "Ban account". | Linear ENG-956 |
| April 2026 | Mobile Revamp: mobile tokens, a component library and a Figma versus mobile parity review. | Linear ENG-1195 to ENG-1201 |
| June 2026 | Enta added Business accounts, making four modes; the code layer started on 21 June. | Slack, repository |
| July 2026 | The React library became a Q3 priority to make prototyping faster and cheaper; Pulse's first build used it. | Q3 Design Roadmap, Pulse case |
| September 2026 | Helium set up in Claude Design for the team; makeshift copies removed. | Slack |
| October 2026 | 48 components, 109 commits, four themes, 311 color tokens per theme. | Repository |

#### Work and ownership

I owned Helium end to end: the foundations, the Figma library, the production React code and the rules that tell people and agents how to use it. I built the code layer with Claude Code. The agent wrote code to rules I set; I owned the decisions, the reviews and the QA, and nothing counted as done until I had checked it against Figma in the browser.

| Area | Work completed |
|---|---|
| Foundations | Instrument Sans for the interface and IBM Plex Mono for amounts, wallet addresses, transaction IDs and codes. A blue ramp from Enta's brand; error, warning and success ramps; 13 accent ramps; greys tuned for light and dark. Eleven type sizes from 12 to 72 px. An 8-point spacing grid, with 2, 4 and 6 px steps for the space inside components. Radius from 2 px to fully rounded. |
| Variables | 1,608 Figma variables in three tiers: primitive, semantic and component. 1,585 carry code syntax for web, iOS and Android, so an agent reading a design through Figma's MCP server gets token names, not hex values. 1,298 are scoped to where they apply. AI was used to test the naming and generate the code syntax. |
| Themes | Individual and Business, each in light and dark. Business swaps the blue and greys for neutrals and uses a neutral logo with a Business caption. Only color changes between themes: 311 color tokens per theme resolve to different values, set with one `data-theme` attribute. |
| Components | 48 components, organized atomically and built in order of product need: buttons, inputs, tabs and the app shell first; tables, statuses and pagination for Pulse; SwapCard, TokenAvatar, WalletCard and Timeline for Enta's money flows. |
| Assets and networks | TokenAvatar shows an asset with its network as a cut-out badge; 22 conversion pairs are drawn as one split coin. Exported sets of 519 currency icons, 235 flags, 99 company logos, 39 payment methods and 232 integration logos. |
| Figma to code | Figma properties become React props. Shiga's Figma plan has no Code Connect, so each component has a link file recording its Figma node and property-to-prop mapping, gathered into one manifest, and each Figma component links back to its Storybook page. AGENTS.md tells agents to reuse components, use tokens and check the manifest. |
| Documentation | A public Storybook with more than 300 stories, a four-mode switch and the Figma design beside the code. Chromatic captures every story in every mode. |
| Behavior | 13 UX patterns and six decision records covering forms, loading, menus, navigation, focus and motion. |
| UX writing | One error formula, say what happened and then how to fix it, applied to more than 100 messages across sign-up, verification and payments. |
| Quality | A two-reviewer audit found 198 issues across the 31 components that existed then; one remediation pass fixed 139 and gave every other finding a disposition. |

#### Key decisions

- **Build on a proven base.** Helium 2.0 extends Untitled UI rather than starting from scratch (ADR-0002); the work went into the foundations, naming and themes on top of it.
- **Name tokens for code, not only for design.** Code syntax on the Figma variables lets agents and engineers reach for the right token instead of hard-coding a value.
- **Theme by type of user.** Business uses neutrals so it's obvious which account you're in and it looks more understated and professional. No component checks its theme; adding a theme means adding a variable mode.
- **Give numbers their own typeface.** IBM Plex Mono separates look-alike characters and covers ₦, ₵, ₿ and the ₮ in USD₮, which Instrument Sans lacks.
- **Keep primary buttons clickable.** Tapping shows what's missing under the field instead of a greyed-out button with no reason (ADR-0005).
- **Grow with the product.** Components were added as Enta and Pulse needed them, not all at once.
- **Link Figma and code without Code Connect.** Link files and a manifest, plus links from Figma back to Storybook, so the connection works in both directions.
- **Write the rules down for agents.** AGENTS.md sets the rules every agent reads before it writes code.
- **Settle hard calls once.** Decision records and a list of settled decisions stop the same debates from reopening.

#### Outcomes

**Documented in the repository, Storybook and the published case**

- **48** components in Figma and React, documented with more than **300** Storybook stories in four themes.
- **1,608** Figma variables; **1,585** with web, iOS and Android code syntax; **1,298** scoped.
- **311** color tokens per theme across **four** themes. Style Dictionary builds **639** CSS variables, typed TypeScript, and iOS and Android files.
- **13** UX patterns and **six** decision records.
- QA audit: **198** findings across 31 components (7 critical, 40 high, 71 medium, 80 low). **139** were fixed in one pass; the rest were found not reproducible (8), left for a product or design decision (31), declined by earlier decision (18), out of scope (1) or not applicable (1).
- Pulse imports `@helium/react`, `@helium/icons` and `@helium/tokens`; its first build took five working days in July 2026.
- The case study went live at olumideolusesi.com/work/helium on 3 November 2026.

**Adoption reported in the case study**

- Enta's onboarding and multisig prototypes use built copies of Helium instead of styling their own controls.
- The mobile team is bringing Helium's tokens and core components into the Enta app.
- Helium is set up in Claude Design for the team.
- Agents working in Helium-based repositories start from AGENTS.md and the manifest.

**Not established**

- Measured time savings, defect reduction or consistency improvement.
- Shipped native theming. The iOS and Android outputs carry the core tokens and the light theme; dark and Business modes are still in progress.
- Published packages. Products use local copies; the packages are version `0.0.0` and not on a registry.
- Automated component tests. Quality relies on type checks, the audit and visual snapshots.
- User testing of the muted text colors that fall below 4.5:1 contrast in some modes; they were kept as a shared decision.

**Superseded or retired claims**

- **"263 color variables."** That was the January 2026 handoff in two modes. Helium now has 311 color tokens per theme across four themes.
- **"Architected from scratch."** Helium 2.0 is built on Untitled UI (ADR-0002).
- **"Production-ready theme files for Android, iOS and web that unified Shiga's identity."** The native outputs cover the light theme only so far, and the current résumé no longer makes this claim.
- **"One-week Pulse delivery window."** The Pulse case records five working days.

#### Collaborators, tools, and methods

**Collaborators**

- Product and Engineering at Shiga.
- Mobile engineering: Badmus received the platform token files under PRO-65, and the mobile team is adopting Helium's tokens and components.
- Claude Code built the code layer to my rules; two AI reviewers ran the QA audit.

The full roster and contribution boundaries need confirmation.

**Tools and methods**

- Figma variables, modes, scoping and code syntax; Figma's MCP server; Untitled UI as the base.
- Claude Code, AGENTS.md and the Figma-to-code manifest.
- React, TypeScript, Storybook, Chromatic and Style Dictionary with DTCG-format JSON tokens.
- Atomic design, architecture decision records and UX pattern documents.
- WCAG AA contrast checks computed across all four themes.
- Review of every component against Figma in the browser.
- Claude Design.

#### Evidence and validation notes

- This account comes from the published case study, the Helium repository and the research behind the case (Linear, Slack and the Q3 Design Roadmap). The case study's figures were checked against the repository while the page was built.
- Repository figures are as of its last commit, 11 October 2026.
- The July snapshot vendored into the Pulse demo had 43 component directories; the October repository has 48. Both are right for their dates.
- The QA audit used two AI reviewers in sequence (find, then verify) held to Helium's own UX patterns, plus a computed contrast audit. A planned third, adversarial review layer did not complete.
- The error-message rewrite is the same work as the 100+ messages in the product ecosystem entry (entry 9). Don't add the two together.
- Helium was not used in EntaPOS (entry 10).

Public case: [Helium](https://olumideolusesi.com/work/helium). Public Storybook: [Helium Storybook](https://helium-design-system-storybook.vercel.app).

### Shiga/ENTA business onboarding | KYB, owner verification and activation

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Exact project dates are not established. The Pulse account records an existing business-onboarding design available when the July 2026 proof was scoped; the current portfolio also presents later prototype views.
- **Role:** Business-onboarding design owner. The current Shiga employment title is Product Design Engineer; that does not establish sole authorship of every later prototype component.
- **Product and users:** ENTA business-account setup for business representatives, beneficial owners and controlling owners, within Shiga’s wider product ecosystem.
- **Problem:** Business setup required ownership and identity verification, visible review status, secure access, recovery and activation before a usable wallet.
- **Personal ownership:** I designed the existing business-onboarding journey referenced in the Pulse record. Later artifacts provide more precise evidence of its flow and states.
- **Delivered work:** A documented flow and implemented interactive demo covering signup, KYB, owner KYC, verification review, passkey/recovery setup and business-wallet activation. Production launch is not established.
- **Strongest supported outcome:** The business journey is represented in inspectable flow definitions and product screens; it supplies a foundation for future Pulse partner activation, whose integration was deferred.
- **Key skills:** B2B onboarding, KYB/KYC, ownership modeling, security and recovery UX, state design and activation planning.
- **Public disclosure status:** Business entry and wallet views now appear alongside consumer onboarding on the public portfolio; private verification records and operational rules are excluded.

#### Context and challenge

Business onboarding addresses a different job from individual wallet access. A representative must establish the organization and its owners, the controlling owner must complete identity checks, and secure wallet activation must follow the relevant review and setup states.

The current consumer case’s authentication map connects individual and business entry points and device choices. This is a documented shared entry context, not evidence that corporate KYB and the consumer’s contextual KYC upgrade are the same journey.

For Pulse, a complete business-onboarding design already existed. The five-day proof used manual provisioning rather than integrating that journey. Pulse-specific partner activation still needed developer invitations, sandbox access, API/SDK selection, webhook and settlement configuration, testing and Live access.

#### Work and ownership

I designed the existing business journey. The current case-study folder identifies the ENTA app as a product demo, built on vendored Helium, and links to the product source. Its journey definitions make the sequence inspectable:

`Account type -> Work email and verification -> Business KYB/beneficial owners -> Controlling-owner KYC -> Verification review -> Passkey and recovery -> Wallet activation -> Business home`

| Stage | Represented work |
|---|---|
| Business signup | Account choice, work email and simulated email verification. |
| KYB | Representative/ownership role, beneficial-owner entries, controlling-owner selection and review. |
| Owner KYC | Controlling-owner profile, address and identity-check steps. |
| Review | Pending verification status and a simulated approval transition. |
| Security | Passkey creation and recovery-email confirmation after the demo’s identity-approval state. |
| Activation | Review and device-passkey authorization leading to the business wallet. |

This is more specific than the older summary that placed security before a generic “business approval.” It records the current prototype’s order, not a verified production compliance sequence. Demo duration labels are navigation guidance, not measured completion times.

#### Key decisions

- **Separate the organization from the person acting for it.** Business ownership and controlling-owner identity have different data and responsibilities.
- **Expose pending and ready states.** The setup dashboard shows what is complete and what still prevents activation.
- **Include recovery in security setup.** Passkey creation and recovery belong to the route into the wallet.
- **Keep Pulse activation distinct.** Business verification is one prerequisite; developer setup and a test payment are additional partner tasks.
- **Protect the initial demo scope.** Existing onboarding was not evidence that self-serve Pulse activation had already shipped.

#### Outcomes

**Demonstrated design and prototype scope**

- The existing design is supported by the Pulse account, selected product screens and later ENTA journey definitions.
- The later demo connects business signup, ownership, identity review, security, activation and home states.
- Helium usage is documented in the case-study folder.

**Not established**

Production launch, verified business volume, real approval decisions, completion or activation rates, measured onboarding time and a shipped Pulse activation extension are not established. Simulated approval and passkeys demonstrate the intended interaction, not live verification or authentication infrastructure.

#### Collaborators, tools, and methods

- My existing-flow design ownership is supported by the first-person Pulse account.
- The wider Shiga résumé supports collaboration with Engineering on KYB and partner workflows. It does not supply a project-specific business-onboarding team roster.
- Tools and artifacts: flow maps, product-screen exports, a React/TypeScript demo and Helium components. The current portfolio describes Figma handoff for the wider onboarding work; exact business-project research, compliance and implementation responsibilities remain open.

#### Evidence and validation notes

The source folder is named Shiga-Onboarding, while the product narrative and app identify ENTA. “Shiga/ENTA” preserves that company/product relationship. The app symlink points to the Shiga project rather than a second independent implementation. Current code confirms prototype coverage, not that every represented state was present before the July proof.

Public context: [ENTA onboarding case](https://olumideolusesi.com/work/shiga-onboarding).

### ENTA passkey-led consumer onboarding | Cutting time to value

#### Project snapshot

- **Company:** Shiga Digital.
- **Dates:** Q1 2026, one-week sprint, as stated in the active case; exact calendar dates remain unconfirmed.
- **Role:** Product Designer with UX-writing scope for this case; the current Shiga employment title is Product Design Engineer.
- **Product:** ENTA individual signup, authentication, wallet access and feature-based identity verification.
- **Users:** Crypto-only users seeking stablecoin send/receive/swap, and crypto-plus-fiat users seeking services that require identity verification.
- **Problem:** Email/password setup, profile completion and upfront KYC put the dashboard behind a lengthy gate, obscuring value before users could try the wallet.
- **Personal ownership:** Flow and UX-writing redesign, funnel/support review, competitive research, stakeholder conversations, passkey and verification-state design, Claude Design exploration and Figma handoff.
- **Delivered work:** Linked onboarding and dashboard-state designs; later interactive demos with mock data and simulated passkeys. A production release is not established by the current case.
- **Strongest supported outcome:** The design moves wallet access earlier and explains verification through locked features. Historical timing claims are unvalidated.
- **Key skills:** Consumer fintech onboarding, passkey UX, contextual verification, UX writing, flow architecture, AI-assisted prototyping and engineering collaboration.
- **Public disclosure status:** The case, selected screens and later demo are public. Private funnel, support and security records are not reproduced.

#### Context and challenge

The previous journey required email/password signup, profile setup and KYC before users reached the dashboard. Funnel review with Engineering followed signup through the first transaction. Support feedback described fatigue and confusion before users had moved money; conversations with Product, Engineering and Compliance clarified feature requirements.

Crypto-only and crypto-plus-fiat intentions needed different paths. The design treats pre-upgrade access as an ENTA product proposal, not a universal statement that crypto transactions are exempt from identity or regulatory requirements.

#### Work and ownership

I reviewed wallet patterns in Rabby, Rainbow, Phantom and Fuse, including authentication, device choice and recovery. I rebuilt the individual journey around an email profile, passkey registration and entry into the dashboard. Verification appeared in the context of the additional feature a person wanted to use.

`Email/profile -> Passkey registration -> Dashboard -> Crypto-only access or contextual verification for additional features`

I used Claude Design for early exploration and feedback, then Figma for design and handoff. The linked flows explained what was available, what was locked and how to unlock it. Copy review ran alongside design QA, focusing on passkey setup and the dashboard’s verification states.

The documented design covers pre-verification, verification-in-progress and Tier 2 wallet states. Its wider authentication map also branches by account type and device. The business KYB/owner-verification route is documented separately in entry 7; a shared account selector does not make its approval requirements part of the consumer flow.

#### Key decisions

- **Bring the wallet forward.** Users can understand the product before completing every upgrade requirement.
- **Tie verification to intent.** Fiat onramp, offramp, conversion and higher limits remain visible with explanations of the required upgrade.
- **Use a consistent dashboard across states.** Available, locked and pending features need clear status and next actions.
- **Design passkeys beyond signup.** Device choice, returning on another device and recovery belong to the same authentication problem.
- **Use prototypes for early feedback.** Claude Design made flows tangible; Figma carried the linked design and engineering handoff.

#### Outcomes

**Documented design and handoff**

- The flow and UX writing replace the password-led structure with passkey-led onboarding and contextual verification.
- Product screens and linked-flow handoff demonstrate the intended states and feature-access model.
- The current public demo offers signup, sign-in, individual-dashboard and business-dashboard views.

**Historical portfolio-reported timings**

- Under **one minute** to the dashboard for crypto-only users.
- Under **four minutes** through KYC for crypto-plus-fiat users.

The current case explicitly attributes these figures to an earlier case study and says the measurement method is undocumented. They are not verified production benchmarks or measured improvements.

**Prototype and release boundary**

The current case identifies mock data and simulated passkeys. Individual signup ends at email confirmation, while the individual dashboard opens a separate Tier 2 prototype. These views do not demonstrate one continuous live signup-to-verification path. The earlier “shipped at the end of the sprint” assertion is not retained as a verified result. No production conversion, activation, retention or KYC-completion lift is established.

#### Collaborators, tools, and methods

- Case team: 1 Product Designer, 1 Product Manager and 3 Engineers.
- Research/stakeholder inputs: Product, Engineering and Compliance, funnel review, support-ticket review and competitive teardown.
- Tools: Claude Design and Figma; later demos provide additional interaction evidence.
- Methods: intent-based flow design, feature-access mapping, locked-state UX writing, passkey/device exploration, linked-flow handoff, design QA and copy review.

#### Evidence and validation notes

The active case is **Cutting time to value with passkey-led onboarding**. Its current wording qualifies the timing claims and simulation more carefully than the older source document. The current résumé no longer contains the old in-progress KYC sentence, so that stale résumé/case contradiction is removed; the exact production status still needs evidence. The Q1 2026 date and “Claude Design” tool label are retained as portfolio statements without inferring a dated tool-use chronology from later screenshots.

Public case: [ENTA onboarding](https://olumideolusesi.com/work/shiga-onboarding).

### Shiga product ecosystem and payment expansion

#### Project snapshot

- **Company:** Shiga Onchain Banking
- **Dates:** May 2024 to present is the consulting engagement range; individual workstream dates need confirmation.
- **Role:** Senior Product Designer (Consultant).
- **Product:** ENTA consumer wallet, FORGE corporate banking, Telegram Mini-App, crypto payment flows, merchant payment tools, lifecycle marketing, KYC, and transaction security.
- **Users:** Consumers, businesses, merchants, crypto-plus-fiat customers, and internal growth/operations teams.
- **Problem:** Shiga needed to turn a founders' vision into a coherent multi-platform product ecosystem and expand beyond a core wallet into merchant and business payment use cases.
- **Personal ownership:** Product strategy, end-to-end experience design, payment-flow simplification, AI-assisted prototype implementation, merchant-tool design, lifecycle automation, and current KYC/security work.
- **Shipped work:** ENTA/FORGE/Telegram product experiences, redesigned payment flows and errors, a Telegram Mini-App POS, merchant payment tools, and segmented MailerLite journeys; some current KYC/security work remains in progress.
- **Strongest verified outcome:** The current resume reports contribution to USD 1.2 million in Tether funding and Visa Accelerator acceptance, plus a Telegram Mini-App proof that directly secured a TON funding round. Supporting investment records are not embedded.
- **Key skills:** Product strategy, crypto payments, cross-platform systems, merchant commerce, UX writing, AI-assisted development, lifecycle marketing, KYC, authentication, and investor-facing product storytelling.
- **Public disclosure status:** These products, funders, headline metrics, and workstreams are public on the current resume page. Commercial agreements, support data, user data, and security implementation details require confirmation.

#### Context and challenge

Shiga was building three connected product surfaces:

- ENTA for consumer wallet and payment experiences.
- FORGE for corporate banking.
- A Telegram Mini-App for chat-native merchant and payment flows.

The work combined zero-to-one product definition with improvements to complex crypto payment journeys, new merchant revenue surfaces, lifecycle activation, and platform security.

#### Work and ownership

The current resume attributes the following work to me:

| Workstream | Work completed | Reported status or outcome |
|---|---|---|
| Product ecosystem and investor readiness | Translated the founders' vision across ENTA, FORGE, and Telegram; designed strategy, pitch decks, and end-to-end experiences. | Contributed to USD 1.2M Tether funding and Visa Accelerator acceptance |
| Crypto payment flows | Reworked IA and navigation for Swap, Onramp, Offramp, and Currency Conversion; rewrote 100+ errors across 12 categories with recovery guidance. | Estimated 40% reduction in payment-related errors based on support trends |
| Telegram Mini-App POS | Built a working merchant experience for onboarding, accounts, crypto/fiat acceptance, and stablecoin/fiat deposits and withdrawals using Gemini and Claude in Antigravity IDE. | Resume says the proof directly secured a Telegram/TON funding round |
| Merchant payment expansion | Designed and prototyped Payment Links with crypto/fiat settlement, a shareable Rate Calculator, and a crypto invoice page. | Expanded product surface beyond the core wallet |
| Lifecycle marketing | Designed and built MailerLite onboarding, post-KYC activation, and win-back journeys for Nigeria, Global, and Business segments. | 73% open rate on the reactivation campaign |
| KYC and transaction security | Redesigning KYC requirement communication and implementing PIN, Passkey, Authenticator, and Email OTP options in Security settings. | In progress on the current resume |

Helium and Pulse are documented as separate projects elsewhere in this file.

#### Key decisions

- **Design one ecosystem across multiple surfaces.** Consumer, corporate, and chat-native experiences shared product primitives while serving different jobs.
- **Make payment errors recoverable.** More than 100 messages were reorganized across 12 categories with clearer next actions.
- **Use working proofs for commercial validation.** The Telegram Mini-App was built as a functional product demonstration, not only a slide concept.
- **Expand around merchant jobs.** Payment links, pricing/rate communication, and invoicing extended the value proposition beyond wallet transactions.
- **Segment lifecycle communication.** Onboarding, activation, and win-back messaging differed by market and customer type.
- **Layer transaction authentication.** PIN, passkey, authenticator, and email OTP were treated as platform security options rather than a single universal control.

#### Outcomes

**Portfolio-reported**

- Contributed directly to **USD 1.2 million** in Tether funding.
- Contributed to Visa Accelerator acceptance.
- Telegram Mini-App proof directly secured a Telegram/TON funding round.
- Estimated **40%** reduction in payment-related errors, based on support-ticket trends.
- More than **100** error messages rewritten across **12** categories.
- **73%** open rate for the reactivation campaign.

**Directional**

- Payment Links, the Rate Calculator, and crypto invoicing expanded Shiga's potential product and revenue surface.
- The working Telegram proof validated a Web3 merchant-commerce direction.

**Unsupported or retired claims**

- No funding documents, attribution model, support-ticket analysis, traffic volume, email audience size, click rate, conversion rate, revenue, payment volume, or customer-adoption data are embedded in the website.
- The 40% error-reduction figure is explicitly described as estimated.
- Product ecosystem funding and Telegram funding are separate claims and must not be merged.

#### Collaborators, tools, and methods

**Collaborators**

- Founders.
- Engineering.
- Marketing and Growth.
- Customer Support.
- Business Operations.

The current resume does not name individuals or define contribution boundaries.

**Tools and methods**

- Product strategy and pitch-deck design.
- End-to-end consumer and business experience design.
- Information architecture and navigation redesign.
- UX writing and error taxonomy.
- Gemini and Claude.
- Antigravity IDE.
- MailerLite segmentation and automation.
- Customer engagement and competitive research.
- Prototyping.

#### Evidence and validation notes

- This record consolidates resume-only Shiga workstreams that share one product ecosystem and consulting engagement.
- It does not merge Pulse, Helium, the business-onboarding project, or the passkey-led consumer-onboarding case; those have their own evidence and snapshots.
- Funding, error-reduction, and email metrics are public portfolio claims without embedded source records.
- The public resume uses both "Shiga Onchain Banking" and product names ENTA/FORGE/Telegram. Exact legal/product naming should be confirmed before reuse in external documents.

### EntaPOS | Stablecoin payments at the counter, without changing checkout

#### Project snapshot

- **Company:** Shiga.
- **Dates:** October to November 2026. The concept handover file was last saved on 8 October 2026; the prototype repository starts on 9 October 2026; eight releases ran from 10 October to 3 November 2026; the production design QA ran from 25 to 28 October 2026.
- **Role:** Product design owner and AI-assisted prototype builder. The current Shiga employment title is Product Design Engineer.
- **Product:** EntaPOS, a point-of-sale payment product that lets Nigerian merchants price in naira, accept USD₮, USDC, BTC and XAU₮ from shoppers' wallets, and follow naira settlement to a bank account.
- **Users:** Merchants with a counter (restaurants, nightclubs, supermarkets and other retail) and their staff; local, visiting and diaspora shoppers.
- **Problem:** Cards are slow and unreliable at Nigerian counters, so most shoppers pay by bank transfer to a printed plaque. Stablecoin acceptance had to fit that behavior instead of adding steps at the counter.
- **Personal ownership:** Product and interaction design, scope and copy decisions, approval of every build task, review of build reports and screenshots, and design QA of Engineering's production build with corrections in Figma.
- **Delivered work:** A live, browser-only prototype covering the website, merchant setup, the counter, the reusable QR plaque, shopper checkout, payments and settlement states, plus a design QA package for Engineering.
- **Strongest supported outcome:** The prototype is live with eight documented releases, and Shiga Engineering implemented EntaPOS as a production product at pos.entashiga.io. Usage, payment volume and commercial outcomes are not established.
- **Key skills:** Point-of-sale payment design, crypto checkout, payment and settlement state modeling, merchant onboarding and KYB, mobile-first UI, AI-assisted design engineering, design QA and engineering handoff.
- **Public disclosure status:** The prototype URL is publicly reachable. No public case study is referenced in the project records. Permission to show production screens, test-merchant data and internal records needs confirmation.

#### Context and challenge

The concept handover started from how people already pay at Nigerian counters. Cards are slow and unreliable, so the counter shows a small plaque with a QR code and an account number, the shopper asks what they owe and sends it from a banking app. EntaPOS keeps that behavior and changes only what sits behind the code: the shopper scans a plaque bound to the merchant, and the amount comes from the merchant instead of the shopper's memory.

An earlier concept had staff key in the amount, generate a payment link and hand over their own phone. That objection was accepted: it added steps, occupied the merchant's device and slowed the queue. The merchant-creates-the-request model survives in the Telegram Mini-App (entry 9), where there is no fixed counter.

The product also had to keep two things apart that staff can easily confuse: a confirmed customer payment and a completed bank settlement.

Later, Shiga Engineering implemented EntaPOS in production at pos.entashiga.io and added features the prototype did not have, such as a Team page with devices, Google sign-in and email-link sign-in. That created a second challenge: bring the production build back in line with the design while respecting what Engineering had added.

#### Work and ownership

I ran the build as a task loop. I owned the decisions and approved every task. Claude Cowork planned tasks, reviewed reports and screenshots and wrote verify rulings; Claude Code built every task from 10 October 2026; Codex took the first backend and data tasks and stayed as a backup for that work. Each task ran on its own branch, ended with a report and screenshots at phone and desktop sizes, and merged only after my approval. Releases pushed to GitHub, which redeployed the Vercel prototype.

| Surface | Work completed |
|---|---|
| Website | Landing page with how it works, ways to accept and questions; a one-row phone header with a full-screen menu. |
| Merchant setup | Email code and password sign-up, then a setup dashboard with three required steps (verify your business, verify a director, settlement account) and two optional ones (business details, store logo); full-screen flows with a bank account-name check. |
| Counter | Naira keypad, optional payment purpose, a four-character order code as the default, with the sale QR behind "Show QR" and the link behind "Share link". |
| Your QR plaque | A permanent merchant QR and short link; horizontal and vertical print layouts; full screen on phones. |
| Shopper checkout | Order code or amount entry; coin and network choice confirmed with Continue; a send screen with the exact amount, a price hold, the address, an optional QR and a connect-wallet path; status and receipt. |
| Payments and settlement | Payment list, filters, date range and payment details, with separate payment and bank-settlement states, including short, overpaid, held, refunded and failed. |
| Demo controls | A demo bar that drives payment and settlement outcomes, plus account (verified or setting up) and data (sample payments or clean) switches for presentations. |

For the production design QA, I compared Engineering's build with the prototype and the approved decisions: 23 desktop screenshots, 7 checkout captures and 29 phone captures at 375 and 390 px, in light and dark. This produced 39 findings (PQ1 to PQ39). The fixes were drawn on Production vs Design Review boards in Figma across eleven batches and a production-fixes board, built with Claude under my review. Every change is written as the issue, its UX or UI reason, then the correction. Fixes for screens the prototype has went into prototype tasks (T23, T25 and T27); production-only fixes went into a Claude Code prompt for Engineering, with reference images.

#### Key decisions

- **Keep the counter behavior.** The plaque stays; only what sits behind the code changes.
- **Make the order code the counter default.** Staff read out a short code that avoids look-alike characters and expires after 30 minutes; the sale QR and link sit behind "Show QR" and "Share link".
- **Separate payment from settlement.** A confirmed payment can still have pending, blocked or failed settlement, and staff see both.
- **Make short payments final.** There is no top-up; shopper and merchant settle the difference offline, and settlement runs on what arrived.
- **Confirm the network before quoting.** The first checkout jumped to the address on a network tap. The design QA found production did the same, so a pinned Continue now confirms the choice and starts the price hold.
- **Keep the prototype browser-only.** After the Upstash free tier ran out, demo data moved into the browser and the demo bar drives outcomes; there is no database.
- **Design phones first.** One 20 px gutter, 44 px touch targets, pinned main actions and a bottom tab bar.
- **Follow production where it is the source of truth.** Checkout networks match production (USD₮ and USDC on eight networks, no Tron). In production, Paid and Settled are the same status today, so the QA dropped a separate "Settled to bank" figure and "Settled" filter.
- **Route each fix to where it can be built.** Prototype first for screens it has; an Engineering prompt for production-only screens.

#### Outcomes

**Documented delivery evidence**

- Live prototype at enta-web-pos.vercel.app, with **eight** releases from 10 October to 3 November 2026.
- **128** commits on the main branch and **368** automated tests passing at the latest release.
- **32** delivered build tasks (T1 to T28, including lettered sub-tasks; T24 and T26 were merged into T25), each with a report and screenshots.
- Shiga Engineering implemented EntaPOS as a production product at pos.entashiga.io.
- Design QA: **39** findings, Figma correction boards across eleven batches, prototype updates in three tasks and a production-only fix prompt for Engineering.

**Not established**

- Pilot merchants, live payments, payment volume, conversion, checkout time, settlement time and revenue.
- Which design QA corrections and phone fixes shipped in production.
- How much of the production build came from the prototype's code or designs.

The prototype simulates verification, quotes, payments, screening, returns and settlement. It is not a ledger and should not be presented as live payment infrastructure.

#### Collaborators, tools, and methods

**Collaborators**

- Dami Etomi (co-founder and COO) wrote the concept handover that framed the plaque model and session codes.
- Shiga Engineering, including Samuel, implemented the production product.
- AI agents: Claude Cowork for planning, review and the Figma boards; Claude Code as the builder; Codex for early backend and data work.

The full team roster and contribution boundaries need confirmation.

**Tools and methods**

- React, TypeScript, Vite, Tailwind CSS and shadcn (Radix UI) components; Helium was not used.
- GitHub and Vercel, with a copy in Shiga's repository.
- Figma for the design QA boards.
- The Pulse checkout as the payment-flow reference.
- Task-based delivery with reports, verify rounds and approval gates.
- Visual QA at 320, 375, 390 and 1280 px in light and dark, with side-by-side contact sheets of the reference and the build.
- Production vs Design Review boards with the issue, reason and correction for each change.

#### Evidence and validation notes

- This account comes from the project records: the product description, the build handover with its decisions and task and release logs, the task reports, the git history and the Figma boards. It has not yet been reconciled with the portfolio or résumé.
- Release, commit and test counts come from git and the release log as of 3 November 2026.
- Some records are out of date: the build handover still mentions an Upstash connection that was removed, and the product description still names the older "Payments: Sample" control and a one-week sample set, both replaced on 3 November 2026.
- Production screenshots use a real test merchant's account; that data is kept out of this copy.

Live prototype: [EntaPOS](https://enta-web-pos.vercel.app).

### Enta high-fidelity prototypes | Designing in Figma and building working prototypes with AI

#### Project snapshot

- **Company:** Shiga.
- **Dates:** September to November 2026, ongoing.
- **Role:** Product design owner and AI-assisted prototype builder. The current Shiga employment title is Product Design Engineer.
- **Product:** One clickable Enta app that brings Home and wallets, Multisig, Payment links and Move money together, for individual and business accounts, on desktop and phone, built on the Helium design system and kept in step with Figma.
- **Users:** Shiga's product, engineering and leadership teams, who walk a flow end to end instead of reading a spec, and Engineering, who build production from it.
- **Problem:** Static Figma files couldn't show how money flows connect across features, accounts and states, and design and code drifted apart between handoffs.
- **Personal ownership:** The plan, every product and design decision, Figma design, review of every screen the AI built against Figma, and approval of every change before it went live.
- **Delivered work:** A live prototype of four features on two layouts, a review process that checks every screen against its Figma frame, a written rule set built from my corrections, and a reusable workflow, lums-build-toolkit.
- **Strongest supported outcome:** Engineering built Multisig and Payment links in production from these prototypes, as they did Pulse (entry 5).
- **Key skills:** AI-assisted design engineering, spec-driven agentic workflows (comparable to the BMAD Method), high-fidelity prototyping, design-to-code alignment, design QA, design systems, fintech flows, and directing AI agents.
- **Useful for teaching and mentoring:** How a designer can direct AI agents to design and build, how to review AI output against a design, and how to turn feedback into rules an AI follows every time.
- **Public disclosure status:** The prototypes are publicly reachable on Vercel. There is no public case study yet.

#### Context and challenge

Each feature started as its own prototype with its own data and look. The goal became one clickable Enta app where the features flow into each other: a payment made on a payer's page lands in the merchant's dashboard, in Transactions and on Home, and every person sees the same world.

The prototypes had to be close enough to Figma and Helium to settle design questions and to hand to Engineering. Phone layouts were added later, beside every desktop frame. And all of it had to run through AI agents without losing decisions from one session to the next.

#### Work and ownership

I split the work between planning and doing. Claude Cowork acted as my planner and reviewer: it wrote each task, reviewed what came back and kept a tracker. Claude Code did the work, one chat drawing in Figma and another building in code. I made every decision, looked at every screenshot beside its Figma frame and approved each change before it went live.

| Part | What I did |
|---|---|
| One app | Joined three separate prototypes into one, with one cast of example people, one sidebar and shared parts reused across features. |
| Alignment | Compared Figma, Helium and the build screen by screen, and decided each difference once. |
| Reviews | Ran a desktop review and a phone review of 274 screens, marking what to change; each round became a fix task. |
| Phones | Designed phone screens beside every desktop frame in Figma, then had them built and reviewed. |
| Rules | Turned each correction into a written rule (about 40 so far), so the AI followed it in every later task. |
| Workflow | Packaged the whole approach as a skill I can reuse on other projects. |

#### Key decisions

- **Plan and review in one place, build in another.** Separating the planner from the builder kept decisions written down and every result reviewed.
- **Figma follows the build once a screen ships.** Design rounds brought Figma up to the reviewed build, so there was one truth.
- **Every correction becomes a rule.** A fix I made once didn't need making again.
- **Nothing goes live without my approval.**
- **Research before design.** Design tasks start with discovery: the product as built, Mobbin references and product records.
- **One example world.** One cast of people and a fixed date keep figures consistent across features.

#### Outcomes

**Supported by the project record**

- Engineering built Multisig and Payment links in production from the prototypes.
- The prototype is the place the team walks flows and the reference for Engineering, with every screen reviewed against Figma on desktop and phone.
- The workflow is now a reusable skill, lums-build-toolkit.

**Not established**

- Measured time saved, defects avoided or other team metrics.

#### Collaborators, tools, and methods

- Dave (Product Manager); Shiga Engineering, including Adedayo and Lekan.
- Claude Cowork for planning, review and tracking; Claude Code for Figma and code; OpenAI Codex briefly at the start.
- Figma and Figma's MCP server, Helium, React and TypeScript, Vercel, GitHub and Mobbin.
- Task briefs, screenshots beside Figma frames, review pages, approval before release, and written rules.

#### Evidence and validation notes

- EntaPOS (entry 10) ran on the same planner-and-builder loop. Count the approach once.
- Comparable industry approach: the BMAD Method, a spec-driven framework that splits AI work into roles (analyst, product manager, architect, developer, QA) and passes context through written stories. I developed this workflow independently and didn't use BMAD. It shares the spec-first, role-split idea and adds a Figma design track and visual QA against Figma.
- Entries 12 to 16 cover the features themselves.

Live prototype: [Enta](https://enta-one.vercel.app).

### Enta Home and wallets | One home for individuals and businesses

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Live in production; the prototype redesign ran from September to November 2026. Launch dates need confirmation.
- **Role:** Product design owner. The current Shiga employment title is Product Design Engineer.
- **Product:** Enta's Home: the wallet card, quick actions (Deposit, Withdraw, Swap, Buy), Recent transactions, the transaction details drawer, the Transactions page and the Rate Calculator, for individual and business accounts.
- **Users:** Individual Enta customers at each verification tier, and business teams with roles from Super admin to Viewer.
- **Problem:** Home had to work for two kinds of account and seven account states, and the recent transactions list mixed meanings, showed raw wallet addresses and used jargon such as "Portal Out".
- **Personal ownership:** Ideation, the account-state model, every Home and transactions decision, and the Figma design, desktop and phone.
- **Delivered work:** Home for both account types in every state, the Transactions page and details drawer, the Rate Calculator, and phone versions of Home, Transactions and the four money flows.
- **Strongest supported outcome:** In production for Enta's individual and business customers.
- **Key skills:** Fintech home and wallet design, account-state modeling, transaction history design, responsive design and UX writing.
- **Useful for teaching and mentoring:** Designing one screen for many account states and roles, and writing transaction lists people read at a glance.

#### Context and challenge

Home is the first screen everyone sees, so what it shows depends on who is signed in and how far their account has come. An individual account moves through four states, from first time to fully verified; a business account moves through three, from wallet setup to active. Some team members can see money but not move it.

A review of the recent transactions list found eight problems, among them one slot carrying two meanings, raw wallet addresses, "Portal Out" jargon, a dead end on expired payments and two different ways of hiding amounts.

#### Work and ownership

| Surface | What I designed |
|---|---|
| Wallet card | The balance with show and hide, "Approximate value in" NGN, EUR or GBP, the assets, and the Move money entry. |
| Quick actions | One card for both account types; a Viewer sees Deposit only. |
| Transactions | Rows that lead with who the money went to or came from; tabs for All, In progress, Completed and Unsuccessful. |
| Details drawer | Details and History, values beside their labels, the network shown with its coin, and a copy button for the sender's address. |
| Rate Calculator | A calculator that opens over any page. |
| Phone | Home with four action tiles, the verification card, Transactions, the details sheet, and Deposit, Withdraw, Swap and Buy as full pages. |

#### Key decisions

- **"Approximate value in", not "Balance in".** "Balance in" read as if the account held pounds.
- **Lead with the counterparty.** Rows say who before what.
- **Verify basics before the dashboard; full verification unlocks fiat.** Locked features stay visible with the reason.
- **One quick actions card for both account types,** limited by role instead of designed twice.
- **Two ways to move money.** The quick actions are the short path for frequent users; Move money is the full page (entry 15).
- **Dates read at a glance:** "Today", "Yesterday", then "16 Sept", with the year only when it isn't this year.
- **Phone sheets close with the X or a swipe,** and messages appear at the top of a phone screen.

#### Outcomes

**Supported by the project record**

- Home and wallets are live for Enta's individual and business customers.

**Not established**

- Usage or behavior metrics.

#### Collaborators, tools, and methods

- Shiga Engineering built production.
- Figma, Helium, and the AI-assisted prototype in entry 11.
- Ideation with concepts, account-state mapping, and screen-by-screen review against Figma.

### Enta Business Multisig | Payment approvals for teams that share a wallet

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Live in production. Design and prototype from September 2026; phone versions in October 2026. Launch date needs confirmation.
- **Role:** Product design owner. The current Shiga employment title is Product Design Engineer.
- **Product:** Payment approvals for Enta Business: approval rules, signers and spending caps, team members and invites, an allow list of trusted addresses, and Requests with an approval trail.
- **Users:** Business owners who want control without approving every small payment, team members who start payments, signers who approve them, and people who only view.
- **Problem:** Most businesses on Enta have more than one person handling money. They needed to decide who must agree before money leaves.
- **Personal ownership:** The product model, the PRD changes, flows, states, the Figma design on desktop and phone, and every decision.
- **Delivered work:** Approval rules, signers and caps, team, allow list, Requests and Transactions with approval trails, on desktop and phone, as a working prototype.
- **Strongest supported outcome:** Engineering built Multisig in production from the prototype.
- **Key skills:** B2B fintech, permission and approval design, rule modeling, state design, passkey interactions and responsive design.
- **Useful for teaching and mentoring:** Modeling roles and permissions, designing rules people can understand, and turning an engineering constraint into a clear interface.

#### Context and challenge

The product keeps two controls apart. Approval rules are Enta's workflow: who must agree before a payment leaves. Spending caps are the wallet's own limit on each signer. They interact, and the design had to make both clear.

A review call with Engineering on 21 September set the wallet infrastructure as the reference. From it I brought in three changes: a reworked allow list, signers, and spending caps.

#### Work and ownership

| Area | What I designed |
|---|---|
| Roles | One Super admin, then Admins and Viewers. Signer is not a role but something a member becomes, in three steps with two passkeys. |
| Approval rules | Up to three rules (all amounts, above, below or between amounts), each with one to three steps naming any signer or one named signer, and an expiry. |
| Spending caps | One amount per signer over a rolling 24 hours or 7 days, with a clear "above your spending cap" state. |
| Allow list | Trusted addresses that block payments elsewhere and never add an approver. |
| Requests | Pending and Done, with approved, declined and expired states, a trail, and approve or decline with a passkey. |
| Phone | Team, Payment controls and Requests on a phone, beside every desktop screen. |

#### Key decisions

- **A named approver's own payment goes through.** Their confirmation counts as their step; an "any signer" step still needs someone else. I found the problem by testing the live prototype.
- **The passkey is the action.** Approving asks for the passkey, the same on desktop and phone.
- **Approve and Decline, never Reject,** and declining asks for a reason.
- **Nothing offers an action the person can't complete.**
- **Clear status words:** "Waiting on you" and "Waiting on member" describe signer setup; "Signer pending" describes a payment.
- **Rules guard the Enta wallet only.** Money that doesn't leave it needs no approval.
- **Readable errors in dark mode.** The error message got a solid background, raising contrast from about 1.9:1 to about 4.8:1.

#### Outcomes

**Supported by the project record**

- Engineering built Multisig in production from the prototype.
- A design pack of over 100 desktop screens with 20 acceptance scenarios, plus phone screens beside each.

**Not established**

- Usage or adoption metrics.

#### Collaborators, tools, and methods

- Engineering (wallet infrastructure and the production build); Dave (Product Manager).
- Figma, Helium, and the AI-assisted prototype in entry 11.
- PRD revisions, acceptance scenarios, live testing and screen-by-screen review.

Live prototype: [Multisig](https://multisig-eight-gamma.vercel.app).

### Enta Payment links | Get paid by link, in crypto or by bank transfer

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Live in production. Earlier versions from November 2025 (PRD v1.4) and March 2026 (v2.0); this version from September 2026. Launch dates need confirmation.
- **Role:** Product design owner and PRD author (v2.1). The current Shiga employment title is Product Design Engineer.
- **Product:** Payment links for Enta: three link types (request a payment, fixed amount, any amount), three places to receive (Enta wallet, external wallet, bank account), a dashboard of active and archived links, and the payer's checkout.
- **Users:** Individuals and businesses who want to get paid, and the people who pay them.
- **Problem:** A payment link could only move crypto. Engineering had built naira bank payouts and naira bank transfer for payers; the merchant flow, the checkout and the dashboard needed designing.
- **Personal ownership:** PRD v2.1, the flows, states and copy, and the Figma design on desktop and phone.
- **Delivered work:** The create flow, the dashboard with link and payment details, and the payer checkout for crypto and bank transfer, with success, receipt, closed, expired and not-found states.
- **Strongest supported outcome:** Engineering built Payment links in production from the prototype, and are now moving the checkout to the Enta POS payment experience from my new frames.
- **Key skills:** Checkout and payment design, merchant tools, crypto and fiat payment states, UX writing and PRD writing.
- **Useful for teaching and mentoring:** Designing both sides of a payment (merchant and payer), writing payer-friendly copy, and handling every state a payment can be in.

#### Context and challenge

PRD v2.1 builds on v1.4 and v2.0 and brings fiat into links: merchants can be paid out to a naira bank account, and payers can send naira by bank transfer. The checkout had to handle crypto (choose a coin and network, send to an address or from a connected wallet, Bitcoin over Spark) and bank transfer, then show success, a receipt, and closed, expired and not-found pages.

#### Work and ownership

| Surface | What I designed |
|---|---|
| Create | Payment details, where to receive (Enta wallet, external wallet or bank account), adding a bank account, review, and the link with sharing. |
| Dashboard | Active and Archived links, search and filters, link and payment details, archive and restore. |
| Checkout | Coin and network choice, an address with a QR, connecting a wallet, naira bank transfer with time-limited account details, success and an email receipt. |
| Edge states | Closed, expired and not-found pages. |
| Phone | The dashboard, create flow and the full checkout on a phone. |

#### Key decisions

- **"Send", never "Pay".** Links also collect donations and contributions.
- **The link title is private.** Payers see only the description.
- **Nothing preselected, except Spark for Bitcoin,** because Spark is the live Bitcoin route.
- **No summary bar on the phone checkout.** It repeated on every step.
- **The main button stays at the bottom of the screen,** with "Secured by Enta" under it.
- **Exact amounts:** a payer's Bitcoin amount keeps all eight decimal places; naira is shown whole.
- **Receipts keep the full date,** because the payer keeps them as a record.
- **Crypto addresses don't expire; naira bank details last 30 minutes.**

#### Outcomes

**Supported by the project record**

- Engineering built Payment links in production from the prototype.
- Engineering (Adedayo) is moving the live checkout to the Enta POS experience from my November frames.

**Not established**

- Usage, payment volume or conversion metrics.

#### Collaborators, tools, and methods

- Dave (Product Manager) set the Bitcoin routes (Spark and Lightning only); Engineering built the backend and production.
- Figma, Helium, Mobbin, and the AI-assisted prototype in entry 11.

#### Evidence and validation notes

- Entry 9 mentions designing and prototyping Payment Links from the résumé. Treat entry 9's line as the summary and this entry as the detail; don't count them twice.

Live prototype: [Payment links](https://payment-links-enta.vercel.app).

### Enta Move money | Every way money moves, in one place

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Live in production from my original design; rebuilt in the prototype in November 2026. Dates of the original design need confirmation.
- **Role:** Product design owner; I designed the original Move money. The current Shiga employment title is Product Design Engineer.
- **Product:** Move money for Enta: one page to choose where money comes from and where it goes, with nine routes between Enta wallets, external wallets, connected wallets and bank accounts, plus authorization, fees and approvals.
- **Users:** Individual customers and business teams.
- **Problem:** Moving money covers many combinations of source and destination, each with its own steps, checks and fees, and it had to stay understandable for individuals and for businesses with approvals.
- **Personal ownership:** The original Move money design and routes, and every decision in the November rebuild.
- **Delivered work:** The Move money page and nine routes as full pages, with authorization, fees, approvals and confirmation, for individual and business accounts.
- **Strongest supported outcome:** Move money is in production from my original design.
- **Key skills:** Money-movement flows, crypto and fiat routing, payment authorization, fee disclosure and approval design.
- **Useful for teaching and mentoring:** Structuring a complex flow as a from-and-to model, and deciding where fees and approvals appear.

#### Context and challenge

Money can come from an Enta wallet, an external wallet, a connected wallet or a bank account, and go to most of the others. My original design set nine routes: Swap; Enta wallet to an external address; Enta wallet to a bank account; deposit crypto; an external wallet to an address; an external wallet to a bank account; a bank account to an Enta wallet; a bank account to an external address; and bank to bank.

In November 2026 I brought Move money into the prototype on the current design system, keeping my routes, steps and states and applying the decisions made since.

#### Work and ownership

| Area | What I designed |
|---|---|
| Routes | Nine routes as full pages: recipient, amount, review, authorize and confirmation. |
| Authorization | Passkey, authenticator app or email code, and what happens when each fails. |
| Fees | Review shows the amount, network fee, total from balance and rate; approvers see the fee too. |
| Approvals | Business approval rules apply to money leaving the Enta wallet. |
| New bank accounts | A new account is confirmed with an email code once. |

#### Key decisions

- **Two ways in.** Home's Move money button opens the full page; Home's quick actions stay as the shorter path for frequent users.
- **Fees only where they're known.** The amount step shows no fee, because the network fee changes; review shows it.
- **Plain words:** "Send" for crypto to an address and "Withdrawal" for money to a bank account, everywhere.
- **Approvals only when money leaves the Enta wallet.**
- **A named approver's own payment goes through** (entry 13).
- **One email code for a new bank account.** Saved, recent and the person's own accounts go straight through.

#### Outcomes

**Supported by the project record**

- Move money is in production from my original design.
- The rebuilt pages became the pattern for the wallet recovery redesign (entry 16).

**Not established**

- Usage or completion metrics.

#### Collaborators, tools, and methods

- Shiga Engineering (production); Lekan for the fee and amount notes.
- Figma, Helium, and the AI-assisted prototype in entry 11.

Live prototype: [Move money](https://move-money.vercel.app).

### Enta wallet recovery | Getting back into a wallet after losing a passkey

#### Project snapshot

- **Company:** Shiga.
- **Dates:** Live in production. Redesign in November 2026; launch date needs confirmation.
- **Role:** Design owner for flows, states and copy. The current Shiga employment title is Product Design Engineer.
- **Product:** Wallet recovery for Enta: setting up recovery at sign-up and in Settings, and recovering a wallet after losing a passkey or device.
- **Users:** Individual Enta customers.
- **Problem:** People without recovery only find out when they lose a device, and each recovery costs Shiga network fees and support time.
- **Personal ownership:** The flows, states and copy, and every design decision, informed by my own test of the recovery feature.
- **Delivered work:** Recovery setup (Settings, Home alerts and a sign-up step), the recovery flow in three steps, and the recovery emails.
- **Strongest supported outcome:** Wallet recovery is in production.
- **Key skills:** Security and recovery UX, pricing disclosure, multi-step flows and UX writing.
- **Useful for teaching and mentoring:** Making a long, security-heavy process feel clear, and being upfront about cost.

#### Context and challenge

Recovery uses guardians across seven networks. Setting it up takes several passkey prompts and a confirmed backup email. Recovering means opening a link sent to the sign-in email, making a new passkey, entering a code from each inbox, then waiting 72 hours, with 30 minutes to cancel.

The redesign follows a paid model: setup is free, and a one-off fee is charged only when a recovery completes. When I tested recovery myself, setup messages disappeared too fast and there was no confirmation after the backup email link.

#### Work and ownership

| Area | What I designed |
|---|---|
| Setup | Settings > Recovery when set up, partly set up and not set up; how recovery works; changing the backup email; Home alerts; a sign-up step. |
| Recover | Three steps: prove it's you, wait 72 hours, then pay and get back into the dashboard. |
| Emails | Six recovery emails. |

#### Key decisions

- **Show status, don't make people read it.** A progress ring and network icons replaced lists of text.
- **Set up recovery at sign-up, with no skip.**
- **Three clear steps:** prove it's you, wait 72 hours, make payment.
- **Say the price up front.** Setup is free; recovering costs a fee.
- **Pay before getting back into the dashboard.**
- **Plain copy:** "Send recovery link" and "Backup email", never "OTP".

#### Outcomes

**Supported by the project record**

- Wallet recovery is in production.

**Not established**

- Recovery rates, support savings or fee revenue.

#### Collaborators, tools, and methods

- Abiola and Dami (pricing and sign-off), Adedayo and Samuel (build), Akin (infrastructure).
- Figma, Helium, Mobbin references (Airwallex, Mercury, Melio, Deel and others), and the AI-assisted workflow in entry 11.

---

## Branch International

### Branch | Building AI tools for consistent product design

Former project title: **Three AIs, One Design System**.

#### Project snapshot

- **Company:** Branch International.
- **Dates:** The programme case records October 2025–February 2026. The owner-confirmed CopyGPT workstream spans 25 August 2025–5 March 2026; the narrower programme label does not replace those workstream dates.
- **Role:** Product Designer, AI Systems for the initiative; Senior Product Designer in the employment résumé.
- **Product:** Illustration GPT, CopyGPT and Neem DS Prototyper: reusable internal workflows grounded in product, market, visual and component rules.
- **Users:** The programme names 5 designers, 4 UX researchers and 15 Product Managers as core users. CopyGPT also served Product, Design, Engineering, Marketing and Customer Support across India, Kenya and Nigeria; these are audiences, not verified active-user counts.
- **Problem:** AI use was widespread but lacked shared Branch context, producing inconsistent copy, illustrations and prototypes that required repeated correction.
- **Personal ownership:** Core system design and implementation, research and workflow definition, instructions and reference architecture, lint/version tuning, testing and review; substantial team contributions are separated below.
- **Delivered work:** Versioned illustration rules and render workflow, a UX-writing system later packaged as a Claude Skill, and a Neem-guided PRD-to-prototype workflow.
- **Strongest supported outcome:** Current portfolio reporting places illustration rollout across all product markets and attributes 1,778 copy changes to the product team. Cross-market copy totals include estimates; the approximately 30% PRD-evaluation improvement is directional PM feedback.
- **Key skills:** AI product design, internal tooling, design systems, product-context modeling, UX writing, prompt/reference architecture, prototyping and human review.
- **Public disclosure status:** The current case and selected source excerpts are public. Private participant details, full internal product datasets and operational records are excluded.

#### Context and challenge

The team supported onboarding, identity verification, lending, repayments, rewards, accounts and support across India, Kenya and Nigeria. Generic tools could produce convincing outputs without knowing which products existed in a market, how Branch named them or which Neem component should carry an interaction.

A reported product-team poll found 65% using ChatGPT and 20% Claude, with others using Gemini. The denominator is not documented. For UX writing specifically, the goal became shared Branch voice, tone, casing and product/market context, reducing repeated debate about wording. The owner-reported example of a line consuming 20 minutes of design review describes the problem; it is not a measured average or saving.

#### Work and ownership

I treated each workflow as an internal product, with users, failure modes, references, testing and human decisions before product use. Inputs included 1:1 conversations, Slack exchanges, output reviews, product presentations and direct testing.

| Workflow | My ownership | Collaboration and delivery |
|---|---|---|
| Illustration GPT | Wrote system instructions and JSON rules, built the manifest/material catalogue, and designed and implemented the render workflow. Reference-image and concept-ideation modes shared that workflow. | Another designer ran the FigJam vote; I led three public reviews. The design team defined the color system and selected final assets. Six documented file versions refined the shared direction. |
| CopyGPT | Owned discovery through implementation with colleague support; designed the context/reference/generation/validation instructions, cleaned naming inconsistencies, and owned lint and version tuning. | Other designers collected and cleaned market feature documentation; the team defined component guardrails. One PM and one engineer per market supported implementation through a reviewed Google Sheet. |
| Neem DS Prototyper | Created a workflow connecting PRDs, Claude Skill interpretation, Figma MCP context, component mapping and token-guided React prototypes. | PMs, designers and developers tested interactions and used stakeholder feedback to refine PRDs before high-fidelity design. |

Illustration instructions governed color, material, camera, lighting, composition and transparency, with rerender/escalation guidance. The current case reports more than 500 image-generation iterations, often 10–15 for a final illustration. Those are iteration claims, not adoption or quality scores.

CopyGPT evolved from a ChatGPT Custom GPT to a Claude Project and then a Claude Skill. The team judged Claude stronger for the writing task. Seven JSON/reference-file iterations preceded the later Skill package; they were not seven proven releases. The v7 package defines 30 component types, 45 text positions and 30 lint checks. These are instructions followed by the model, not a separately executing deterministic validator or evidence of model-weight training.

Original copy, proposed copy and rationale went into a shared tracker. Humans reviewed the suggestions; engineers implemented approved changes and updated status. Examples include “Continue” becoming “Start Camera,” “Send OTP” becoming “Get OTP,” and different “Enter PAN”/“Confirm PAN” instructions for empty versus prefilled states. The tracker does not establish which version generated each historical rewrite.

For prototyping, the Skill supplies component-selection guides, screen patterns, tokens and JSX/CSS references. Figma-linked requests can bring design context and variables; description-led requests follow a separate path. These files substantiate the intended workflow, not a measured compliance score for all generated prototypes.

#### Key decisions

- **Package shared context.** Product facts, market terminology, component purpose and brand principles became reusable references.
- **Resolve rules explicitly.** Market requirements precede component rules, brand defaults and fallback guidance in the writing workflow.
- **Fix the source data.** Inconsistent component labels caused failures; cleanup and clear naming were part of system design.
- **Keep review inside delivery.** Designers selected illustrations, teams approved copy and engineers implemented it, and stakeholders evaluated prototypes.
- **Make PRD feedback concrete.** Interactive prototypes helped stakeholders respond while requirements were still changeable.
- **Distinguish instruction from measurement.** Quality gates and token rules express intended behavior; their existence does not prove accuracy or production readiness.

#### Outcomes

**Current project reporting**

- Illustration rollout is **live across all product markets**, superseding the old “about 60% live” snapshot.
- CopyGPT’s cross-market summary records **530 screen-flow appearances**, **4,390 UI component instances** and **1,778 implemented copy changes** by the product team. India data was audited; Kenya and Nigeria include directional estimates. These are instance counts, not unique screens or strings.
- The owner-confirmed fact sheet records an India-only analysis of **617 Implemented entries with differing original/new text**, including **178 casing-only changes (28.8%)**. This is a documented source analysis, not a fresh workbook audit performed for this update, and is a subset rather than an extra result to add to the cross-market total.
- General PM feedback suggested about **30% less PRD evaluation time**. No timed comparison, sample or observation window is supplied.
- Public Design Lead recognition supports perceived contribution; it is not evidence for an accuracy or timing metric.

**Not carried forward as current verified outcomes**

The old 500+ uses/6 teams/4 countries adoption claim is absent from the current résumé and unsupported by usage logs. The former 50+ consultation total and approximately 40-illustration count are not established by the active programme narrative. No numerical copy/illustration time saving, accuracy score, external-sourcing cost reduction or customer conversion impact is claimed.

#### Collaborators, tools, and methods

- Design colleagues: market documentation, illustration direction, component guardrails and output selection; a colleague ran FigJam voting.
- I led three illustration review sessions and core system work. The Design Lead provided alignment through check-ins.
- Product Managers and engineers: one of each per market for CopyGPT implementation; wider PM/design/developer participation in prototype testing.
- Tools: ChatGPT, Claude/Claude Skills, Figma Make and Figma MCP, FigJam, JSON/Markdown references, Google Sheets and React/CSS prototype guidance.
- Methods: internal interviews and output review, versioned instruction tuning, data cleanup, component mapping, direct testing and human approval loops.

#### Evidence and validation notes

The active programme title is **Building AI tools for consistent product design**. The homepage also features a separate detailed CopyGPT case, **Building Branch’s AI UX Writing System**; it is supporting detail for this programme, not an additional accomplishment to double-count.

The detailed CopyGPT owner-confirmed fact sheet provides finer ownership and workstream dates than the programme summary. Its historical UI/build notes are not current publication-status evidence. The active case and original system files support the workflow descriptions. Generated cover artwork is illustrative, not a recorded prototype output. Archived `*-v1` cases and superseded recognition-image metrics do not override the qualified current outcomes.

Public cases: [Branch AI programme](https://olumideolusesi.com/work/branch-ai) and [CopyGPT](https://olumideolusesi.com/work/ai-copywriting).

### Branch multi-market product modernization and DesignOps

#### Project snapshot

- **Company:** Branch International Financial Services
- **Dates:** Within October 2024 to March 2026; exact workstream dates need confirmation.
- **Role:** Senior Product Designer.
- **Product:** Wallet, rewards, home, loans, KYC, security, onboarding experiments, Neem Design System adoption, Figma information architecture, and web design-system adaptation.
- **Users:** Branch customers in Kenya, India, and Nigeria, plus designers, managers, engineers, Product, Marketing, and People Operations.
- **Problem:** Multiple high-traffic product modules and team workflows needed consistent Neem patterns, faster discovery and delivery, improved KYC data capture, and clearer security experiences.
- **Personal ownership:** Led migration across five modules, redesigned OTP-prefill KYC, created unified Figma IA, adapted the mobile system to web, designed security/onboarding experiments, and ran recurring DesignOps rituals.
- **Shipped work:** Five migrated product modules, an OTP-prefill KYC flow, unified Figma organization, web tokens and Code Connect, security features, onboarding variants, and cross-functional campaign assets.
- **Strongest verified outcome:** The current resume reports KYC approval increasing from 42% to 56% and manual-entry errors falling by 35%.
- **Key skills:** Multi-market fintech, KYC, design-system migration, DesignOps, Figma governance, Code Connect, security UX, experimentation, engineering QA, and roadmap collaboration.
- **Public disclosure status:** The workstreams and headline metrics are public on the current resume page. Product analytics, experiments, customer data, internal files, and campaign records are not embedded.

#### Context and challenge

Branch operated across multiple markets and product areas. The current resume describes a programme spanning wallet, rewards, home, loans, KYC, security, onboarding, internal design operations, and cross-functional business support.

The work addressed two connected needs:

- Customers needed more consistent, lower-friction product experiences.
- Teams needed a clearer system for finding, reviewing, implementing, and scaling design work.

#### Work and ownership

| Workstream | Work completed | Portfolio-reported result |
|---|---|---|
| Neem mobile migration | Led wallet, rewards, home, loan, and KYC migration across Kenya, India, and Nigeria. | 100% visual and functional consistency across 5 modules |
| OTP-prefill KYC | Redesigned a core KYC flow to pre-fill data from OTP-linked information. | Approval increased from 42% to 56%; manual-entry errors reduced 35% |
| Unified Figma IA | Created and led adoption of a shared information architecture and version-control approach. | 30% less designer/manager search time across 200+ prototypes and high-fidelity screens |
| Web design system | Adapted mobile foundations to web with tokens and Code Connect. | 20% faster design-to-delivery across 6 products |
| Security and onboarding | Designed masked balances, transaction history, and multi-variant onboarding experiments. | Resume reports improved loan-application rates without an exact figure |
| Design operations | Led weekly reviews, engineering QA, roadmap planning, and collaboration across Core Design, Product, and Marketing/People Ops. | Operating outcome; no separate metric |
| People Ops and Marketing | Designed an employee recognition badge system and hiring-fair campaign/merchandise assets. | Helped unblock stalled hiring pipelines; no metric |

#### Key decisions

- **Migrate products as a system.** Five modules moved together toward Neem consistency.
- **Reduce avoidable KYC entry.** OTP-based pre-fill addressed manual data-entry friction.
- **Treat design-file organization as product infrastructure.** Figma IA and version control reduced search and coordination cost.
- **Extend mobile foundations to web.** Tokens and Code Connect supported a shared cross-platform system.
- **Balance security and usability.** Masked balances and transaction history made protection visible without hiding customer value.
- **Use recurring review and QA.** Weekly design reviews and engineering sessions connected roadmap intent to implementation quality.

#### Outcomes

**Portfolio-reported**

- **100%** visual and functional consistency across **5** modules.
- KYC approval increased from **42% to 56%**.
- Manual data-entry errors reduced by **35%**.
- Search time reduced by **30%** across **200+** prototypes and high-fidelity screens.
- Design-to-delivery time reduced by **20%** across **6** products.
- Increased downstream loan applications and disbursements, without a stated amount.
- Hiring assets helped unblock stalled recruitment pipelines, without a stated measure.

**Unsupported or retired claims**

- No definition or audit method is supplied for 100% consistency.
- No experiment design, population, time window, or statistical method is supplied for KYC outcomes.
- "Search time" and "design-to-delivery" are not operationally defined.
- No exact loan, disbursement, hiring, or employee-recognition outcome is provided.

#### Collaborators, tools, and methods

**Collaborators**

- Core Design.
- Product.
- Engineers.
- Marketing.
- People Operations.
- Managers across multiple markets.

**Tools and methods**

- Neem Design System.
- Figma and shared information architecture.
- Design tokens.
- Code Connect.
- Design reviews.
- Engineering QA.
- Roadmap planning.
- Multi-variant onboarding experiments.
- Cross-functional campaign and asset design.

#### Evidence and validation notes

- This record consolidates current-resume workstreams that share Branch's multi-market product and DesignOps modernization programme.
- The active case-study route focuses only on the separate AI programme.
- The current website does not provide dedicated case pages, raw analytics, or implementation artifacts for these modernization workstreams.
- Employment dates define the outer boundary, not individual project dates.

---

## Sabi

### Sabi supply-chain logistics suite

#### Project snapshot

- **Company:** Sabi
- **Dates:** 2021 to 2022; the active case page specifies a two-month project.
- **Role:** Senior Product Designer on the portfolio index; the case page labels the discipline as Product Design.
- **Product:** An African B2B supply-chain ecosystem spanning merchant commerce, logistics operations, a driver app, and a supplier platform.
- **Users:** SME merchants, suppliers, warehouse staff, logistics partners, drivers, wholesalers, and retailers across FMCG, electronics, and textiles.
- **Problem:** Fragmented supply chains created delays, inventory problems, weak visibility, difficult restocking, and manual delivery coordination.
- **Personal ownership:** Product design for the e-commerce and delivery applications, including research, logistics dashboards, driver flows, supplier inventory/order tools, prototypes, and usability testing.
- **Shipped work:** Logistics operations dashboards, driver mobile flows, and supplier inventory/order-management experiences; exact production status by surface needs confirmation.
- **Strongest verified outcome:** The case study demonstrates a connected multi-user suite. Its 175,000-merchant, USD 200 million goods-sold, and USD 38 million funding figures are company/platform context, not design-attributable outcomes.
- **Key skills:** B2B commerce, logistics, systems design, dashboards, mobile and web UX, supply-chain research, workflow automation, usability testing, and multi-sided platforms.
- **Public disclosure status:** The case study, designs, platform figures, prototypes, and research approach are public on the portfolio. Customer, operational, and research records are not embedded.

#### Context and challenge

Sabi supported African supply-chain activity across sourcing, distribution, inventory, fulfillment, and delivery. Traditional tools did not fit the operating realities of SME merchants and partners, leading to delays, inventory mismanagement, and poor visibility.

The design challenge was multi-sided. Merchants needed commerce and restocking support, logistics partners needed fulfillment oversight, drivers needed clear trip execution, and suppliers needed inventory and order controls.

#### Work and ownership

The active case page says my role focused on the e-commerce and delivery applications. The documented solution suite included:

| Surface | Key workflows |
|---|---|
| Logistics platform | Operational metrics, pending logistics feed, trips and schedules, vehicle tracking, reports, finance/payment tracking, driver-team management |
| Driver app | Delivery dashboard, item and cost view, pickup status, drop-off details, navigation, profile, and trip history |
| Supplier platform | Business metrics, demand feed, assigned orders and status, product catalog, pricing, details, and stock management |

Research and design work included competitive analysis, literature review, interviews with warehouse staff, supplier personnel, and logistics partners, and usability testing of early prototypes.

#### Key decisions

- **Design for the full operating chain.** Merchant, supplier, logistics, and driver experiences were connected rather than treated as isolated apps.
- **Make operations observable.** Dashboards exposed requests, trips, vehicles, finance, and team activity.
- **Use the language of real work.** Interviews and the "match between system and the real world" heuristic informed terminology and workflow structure.
- **Protect user control.** Prototype testing emphasized navigation, recovery, and avoiding trapped states.
- **Prioritize core tasks.** The case-study learning favored simplicity over exposing every possible feature.

#### Outcomes

**Verified as project scope**

- Designs and prototypes exist for logistics web/mobile, the driver app, and the supplier platform.
- Research included competitive analysis, literature review, user interviews, and usability testing.
- The work addressed merchant, supplier, driver, warehouse, and logistics-partner workflows.

**Company/platform context reported on the portfolio**

- **175,000** wholesalers and retailers.
- **USD 200 million** in value of goods sold.
- **USD 38 million** Series B funding.

**Unsupported or retired claims**

- The active page does not provide a project-specific activation, task-time, delivery-time, inventory-accuracy, order-success, retention, satisfaction, or revenue metric.
- The company/platform figures cannot be presented as outcomes caused by this two-month design project.
- A legacy dynamic project record in the website contains additional conversion and retention claims; it is not the active case-study route and is not used here.

#### Collaborators, tools, and methods

**Collaborators**

- Warehouse staff.
- Supplier personnel.
- Logistics partners.
- Drivers and merchant users represented by the product workflows.

The active case page does not provide the internal team size, roles, or individual ownership split.

**Tools and methods**

- Competitive analysis of TradeDepot, Omnibiz, Tajir, and MarketForce.
- Literature review.
- User interviews.
- Usability testing.
- Jakob's Law.
- Nielsen's Match Between the System and the Real World.
- Nielsen's User Control and Freedom.
- Mobile and responsive web product design.
- Prototyping.

#### Evidence and validation notes

- The active case page provides 2021 to 2022 and two months; the homepage summarizes the project as 2022.
- The work index labels the role Senior Product Designer, while the case-study metadata says Product Design.
- The project page describes the platform's business metrics but does not connect them causally to the design work.
- No dedicated source within the active site proves whether each shown surface shipped or remained a prototype.
- Older generic dynamic-route content is excluded because the active static Sabi page takes precedence.

---

## United Bank for Africa

### HCMConnect enterprise HR automation platform

#### Project snapshot

- **Company:** United Bank for Africa (UBA) Group
- **Dates:** January 2020; 12-month project.
- **Role:** Product Designer.
- **Product:** HCMConnect, an internal Human Capital Management automation web platform.
- **Users:** More than 10,000 employees, HR Business Partners, managers, staff administrators, and platform administrators.
- **Problem:** Paper, email, spreadsheets, Word documents, and dispersed data created backlogs and became especially difficult when COVID-19 forced remote work.
- **Personal ownership:** End-to-end product design across discovery, definition, flows, sketches, wireframes, high-fidelity design, module testing, final design, and developer handoff.
- **Shipped work:** A live internal HR platform with role-based employee and HR workflows, reusable design-system direction, and documented engineering handoff.
- **Strongest verified outcome:** The platform was live and in use, and the project received a formal commendation from UBA's Head of HR Group Shared Service.
- **Key skills:** Enterprise UX, HR technology, service automation, workflow design, research, information architecture, usability testing, design systems, API collaboration, and handoff.
- **Public disclosure status:** The case study, designs, team shape, commendation, and headline financial/efficiency claims are public. Employee data, internal workflows, testing records, and financial calculations are not embedded.

#### Context and challenge

HR Business Partners handled large volumes of employee requests manually. Paper forms, Excel, Word, email approvals, and scattered information made requests difficult to track and slowed responses.

COVID-19 made the problem more urgent. Employees and HR teams moved away from office files and normal operating locations, exposing the limits of manual processes and disconnected enterprise systems.

#### Work and ownership

I worked through:

- Employee and HR stakeholder interviews.
- Literature review.
- Information architecture.
- Cross-role user flows for employees, managers, and administrators.
- Sketching and wireframing.
- High-fidelity interface design.
- Module-by-module usability review.
- Final design and developer handoff.

The case page says each module typically went through two to three Teams-based review sessions with HR and selected employees before implementation sign-off.

User flows also supported technical collaboration by exposing state transitions and backend needs early enough for Engineering to define APIs.

#### Key decisions

- **Replace fragmented processes with one purpose-built platform.** HCMConnect became the central internal HR automation surface.
- **Model role transitions explicitly.** Employee, manager, administrator, and HR journeys were mapped across handoffs and approvals.
- **Test by module.** Two to three review sessions per module allowed iteration before implementation sign-off.
- **Design for remote operation.** Critical requests and information had to work without physical files or office access.
- **Make handoff executable.** Flows, connectors, and notes were organized to improve developer comprehension.
- **Use a shared design-system direction.** Visual and engineering consistency were addressed alongside workflow automation.

#### Outcomes

**Verified**

- The platform was live and in use.
- The project received a formal letter of commendation reproduced on the active case page.
- The case demonstrates delivered employee/HR workflows and developer handoff.

**Portfolio-reported**

- **USD 80,000 per month** saved in third-party license cost.
- **50%** increase in demand for automation.
- The current resume expresses the annualized saving as approximately **USD 960,000** and separately reports **30%** improved HR efficiency.
- More than **10,000 employees** served.

**Unsupported or retired claims**

- No licensing invoice, before/after process study, efficiency definition, employee-adoption data, request-volume data, or automation-demand calculation is embedded.
- The homepage describes the project as serving 20,000+ employees, while the active case page and resume say 10,000+. The lower supported figure is used until reconciled.
- A legacy dynamic route contains additional system-consolidation, processing-time, adoption, component-count, language, and country claims; it is not the active case page and is excluded.

#### Collaborators, tools, and methods

**Collaborators**

- 3 Product Designers.
- 16 Engineers.
- 1 Solution Architect.
- 2 QA Engineers.
- HR Business Partners.
- Employees, managers, and administrators.

**Tools and methods**

- User interviews.
- Literature review.
- Information architecture.
- User flows.
- Sketches and wireframes.
- High-fidelity prototyping.
- Microsoft Teams usability sessions.
- Iterative module sign-off.
- API and backend collaboration.
- Structured developer handoff.

The exact design software is not stated on the active case-study page.

#### Evidence and validation notes

- The active case page supplies January 2020 and 12 months. The homepage labels the selected work as 2021, likely reflecting the release or showcase year.
- The active case page uses more than 10,000 employees; the homepage uses 20,000+; the current resume returns to 10,000+.
- USD 80,000 monthly annualizes to USD 960,000, so the case and resume savings figures are arithmetically consistent if they use the same basis.
- The 50% increase in automation demand and 30% HR-efficiency improvement describe different concepts but lack definitions.
- The formal commendation supports delivery contribution, not the exact financial or operational metrics.

### UBA multi-channel banking and design-system foundations

#### Project snapshot

- **Company:** United Bank for Africa (UBA) Group
- **Dates:** Within November 2019 to June 2022; exact initiative dates need confirmation.
- **Role:** Product Designer.
- **Product:** Consumer mobile banking, ATM and kiosk experiences, plus foundational component documentation, usage patterns, and design tokens.
- **Users:** UBA banking customers across physical and digital form factors, and internal product/design/engineering teams.
- **Problem:** Customer journeys spanned mobile, ATM, and kiosk surfaces while internal teams needed more consistent interface guidance and reusable foundations.
- **Personal ownership:** Wireframing, prototyping, multi-round usability testing, design-system guidance, component documentation, usage patterns, tokens, workshops, and reviews.
- **Shipped work:** Customer-facing cross-form-factor designs and design-system foundations adopted by multiple teams.
- **Strongest verified outcome:** The current resume reports 25% improved product consistency and a 15% increase in user satisfaction associated with the channel work.
- **Key skills:** Omnichannel banking, ATM/kiosk UX, mobile design, design systems, documentation, design tokens, workshops, usability testing, and team enablement.
- **Public disclosure status:** The scope and metrics are public on the current resume page. Product names, screens, research evidence, measurement methods, and adoption records are not included.

#### Context and challenge

UBA's customer experience extended beyond a single app. Mobile banking, ATMs, and kiosks required interaction patterns suited to different environments while still feeling like one banking brand.

Internally, multiple teams needed foundational guidance for components, usage, and tokens to reduce inconsistency and design rework.

#### Work and ownership

I contributed to financial mobile apps, ATM interfaces, and kiosk experiences through wireframing, prototyping, and multi-round usability testing.

I also created foundational design-system guides, component documentation, usage patterns, and design tokens. Adoption was supported through workshops and design reviews.

#### Key decisions

- **Design for the form factor.** Mobile, ATM, and kiosk experiences shared brand intent but had different interaction and environmental constraints.
- **Document reusable decisions.** Components and tokens turned repeated design choices into shared guidance.
- **Support adoption, not only creation.** Workshops and design reviews helped teams apply the system.
- **Test across rounds.** Iterative usability work supported refinement before delivery.

#### Outcomes

**Portfolio-reported**

- **15%** increase in user satisfaction associated with customer-facing mobile, ATM, and kiosk initiatives.
- **25%** improvement in product consistency.
- Reduced design rework.
- Design-system guidance adopted across multiple teams.

**Unsupported or retired claims**

- No project names, platform versions, sample sizes, baselines, time windows, or measurement definitions are provided.
- The current website does not separate Olumide's causal contribution from broader team and product changes.

#### Collaborators, tools, and methods

**Collaborators**

- Multiple product, design, and engineering teams.
- Workshop and design-review participants.

Exact roles and names are not provided.

**Tools and methods**

- Wireframing.
- Prototyping.
- Multi-round usability testing.
- Component documentation.
- Usage-pattern guidance.
- Design tokens.
- Workshops.
- Design reviews.

#### Evidence and validation notes

- This record is based on the current public resume and is separate from the HCMConnect case study.
- It groups closely related banking-channel and design-system foundation work because the website does not name individual projects.
- The public site provides no embedded screens or raw research for these initiatives.
