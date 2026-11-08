# Project Experience & Impact

## Project index

1. **Carbon** - Onboarding UX audit and PIN/OTP sequence redesign
2. **Carbon** - Mobile home-screen redesign
3. **Carbon** - Carbon Business B2B SME lending
4. **Carbon** - Beta-Testing Community and DesignOps
5. **Shiga** - Pulse embedded stablecoin collection and fiat-disbursement proof
6. **Shiga** - Helium design system
7. **Shiga** - Shiga/Enta business onboarding
8. **Shiga** - ENTA passkey-led consumer onboarding
9. **Shiga** - Product ecosystem and payment expansion
10. **Branch International** - Three AIs, One Design System
11. **Branch International** - Multi-market product modernization and DesignOps
12. **Sabi** - Supply-chain logistics suite
13. **United Bank for Africa** - HCMConnect enterprise HR automation
14. **United Bank for Africa** - Multi-channel banking and design-system foundations


---

## Carbon

### Carbon onboarding UX audit and PIN/OTP sequence redesign

#### Project snapshot

- **Company:** Carbon
- **Dates:** Needs confirmation. An older artifact says June 2022 and one month, but the authoritative project record does not validate this.
- **Role:** Product Designer on the onboarding team; exact formal title needs confirmation.
- **Product:** Carbon mobile onboarding and tiered KYC.
- **Users:** New Nigerian customers on Android and iOS progressing toward loans, savings, cards, transfers, and Carbon Zero.
- **Problem:** The interface promised phone verification, then interrupted customers with PIN creation when they expected an OTP.
- **Personal ownership:** Usability-test planning and facilitation, synthesis, problem framing, interaction and flow design, final specifications, and engineering handoff.
- **Shipped work:** An account-and-login-PIN-first sequence, clearer security copy, a PIN completion state, and a direct phone-to-OTP transition.
- **Strongest verified outcome:** The shipped structure removed the PIN interruption after phone entry and made the verification sequence internally consistent. Faster completion was observed directionally but was not quantified.
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

There was also a separate OTP-provider reliability issue involving Infobip, Termi, and Interswitch. That service problem was related context, not the root cause of the prioritized interaction problem.

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

**Verified**

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
- The selfie funnel image records `52,747 (100.00%)`, `51,586 (97.80%)`, `38,278 (72.57%)`, `36,678 (69.54%)`, `15,923 (30.19%)`, and `15,296 (29.00%)`.
- The utility-bill address-verification funnel image records `36,684 (100%)`, `34,846 (94.99%)`, `12,835 (34.99%)`, and `10,656 (29.05%)`.
- Those funnels establish wider verification-stage leakage. They do not measure the effect of the PIN/OTP redesign. The original event labels should be checked before the numbers are reused externally.
- The audit describes the in-house selfie-matching solution as costing **"$314 for 16k in June."** Its unit, year, accounting basis, and comparison baseline are not documented.
- A historical Amazon Textract address-verification success rate captured six months earlier was described as **close to 30%** under exact text matching. The date range, sample, and event definition are not documented.
- The authoritative record describes moderated sessions, while an older presentation calls them asynchronous or unmoderated. The authoritative method is used here, but the conflict should be resolved.
- Restricted participant names, contact details, account information, and internal links must remain excluded.

**Source files**

- `01_BRIEF/SOURCE_OF_TRUTH.md`
- `01_BRIEF/CLAIMS_AND_EVIDENCE_MATRIX.md`
- `04_ASSETS/raw_sources/Carbon_Onboarding_Audit_Original.pdf`
- `04_ASSETS/raw_sources/Android_User_Research_Original_RESTRICTED.pdf`
- `04_ASSETS/raw_sources/IOS_User_Research_Original_RESTRICTED.pdf`
- `05_DATA/IMPACT_MEASUREMENT_PLAN.md`
- `07_APPENDIX/Carbon_Onboarding_Case_Study_Validated_Previous.md`
- `react-presentation/src/data/selectable-text.json`

#### Needs confirmation

- Exact project dates and duration.
- Exact formal title and whether SME Products was part of the remit.
- Exact team size, names, disciplines, and contribution boundaries.
- Whether Data, Growth, Customer Support, Marketing, Security, or Compliance were formal collaborators.
- Final resolution of the moderated-versus-unmoderated research conflict.
- Number of participants beyond the two presentation-safe sessions.
- Release date and platforms on which the sequence shipped.
- Production sample size, observation window, and post-launch completion time.
- Verified conversion, support, retry, recovery, and downstream-product impact.
- Which goal-based KYC, selfie, address-verification, and OTP-failover proposals shipped.
- Whether internal funnels, provider names, and cost figures may be disclosed publicly.


### Carbon mobile home-screen redesign

#### Project snapshot

- **Company:** Carbon
- **Dates:** February 2023; four weeks.
- **Role:** Product Designer, with product-design and user-research scope.
- **Product:** Carbon's Android and iOS mobile home experience.
- **Users:** Carbon's Nigerian retail-banking customers; the case page describes a customer base of more than 4 million.
- **Problem:** A cluttered home screen obscured the loan product and other important actions, while Android and iOS behaved like inconsistent products.
- **Personal ownership:** Discovery, research, information architecture, design-system application, design exploration, final design, and handoff within a multi-disciplinary team.
- **Shipped work:** A harmonized, design-system-aligned home screen with clearer hierarchy, easier feature discovery, and a masked-balance security control.
- **Strongest verified outcome:** The redesigned home experience launched across Android and iOS. The website reports improved satisfaction, registrations, dormant-account reactivation, and referrals, but the underlying analytics are not included.
- **Key skills:** Mobile product design, user research, information architecture, cross-platform harmonization, design systems, security UX, prototyping, and engineering handoff.
- **Public disclosure status:** The case study, designs, team shape, and headline outcomes are already public on the portfolio. Underlying analytics and internal research artifacts still require disclosure confirmation.

#### Context and challenge

Carbon's home screen was the first product surface customers encountered after opening the app. The active case study says the interface had become cluttered, important features competed for attention, and the core loan product was harder to find than its business importance warranted.

Android and iOS also presented noticeably different interfaces. Support tickets and store reviews reportedly included questions about whether Carbon had two separate applications, creating a cross-device learning burden and weakening product consistency.

#### Work and ownership

My documented scope covered product design and user research across:

- Competitive analysis.
- Literature review.
- User interviews.
- Review of support tickets and app-store feedback.
- Information-architecture improvement.
- Design-system application across Android and iOS.
- Visual and interaction exploration.
- Final designs and developer handoff.

The solution simplified the hierarchy, harmonized the two mobile platforms, improved access to important actions, and added a balance-hiding control in response to safety and privacy concerns.

#### Key decisions

- **Prioritize customer and business value.** The hierarchy gave the loan product and essential actions clearer prominence.
- **Treat Android and iOS as one product.** The redesign used a shared design-system direction instead of maintaining separate interaction languages.
- **Reduce visual competition.** The team favored a cleaner, more scannable home surface over exposing every capability equally.
- **Make privacy visible.** Masked balances addressed the risk of people nearby seeing sensitive financial information.
- **Use customer evidence before launch.** Support feedback, reviews, interviews, and broader market context informed the redesign.

#### Outcomes

**Verified**

- The redesigned home experience was delivered and publicly launched.
- Android and iOS were brought into a more consistent product experience.
- The final design included clearer hierarchy, design-system alignment, and balance masking.
- Carbon's CEO publicly recognized the release in a statement reproduced on the case-study page.

**Portfolio-reported**

- **81%** increase in customer satisfaction.
- **25%** increase in user registrations.
- **10%** reactivation of dormant accounts during the release month.
- The current resume page separately reports a **15%** boost in organic referrals and increased user acquisition.

**Unsupported or retired claims**

- The active case study and resume do not provide the analytics definitions, baselines, sample sizes, observation windows, or causal method behind the reported percentages.
- The 25% registration claim and 15% referral claim may describe different measures, but they must not be merged into one result without validation.

#### Collaborators, tools, and methods

**Collaborators**

- 1 Product Manager.
- 3 Product Designers.
- 6 Engineers.
- 1 Product Marketer.
- 1 QA Engineer.

The active page does not separate individual ownership across the three designers.

**Tools and methods**

- Competitive analysis.
- Literature review.
- User interviews.
- Support-ticket and app-store-review analysis.
- Information architecture.
- Design-system application.
- Iterative visual and interaction design.
- Developer handoff.

The exact software tools and analytics platforms used for this project are not stated on the active page.

#### Evidence and validation notes

- The active case route states February 2023 and four weeks; the homepage lists the work more generally as 2023.
- The active route is the canonical case-study source. A legacy dynamic project record inside the website contains a different research story and a different metric set; it is not used as project truth here.
- The active case-study metrics and current resume metric are preserved as website claims, not independently verified analytics.
- "More than 4 million customers" is company context, not the number of users affected by this specific release.
- The public CEO statement recognizes the broader team and release, not Olumide's individual causal impact.

**Source files**

- `../../lums-portfolio/app/work/carbon/page.js`
- `../../lums-portfolio/app/page.js`
- `../../lums-portfolio/app/work/page.js`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Individual ownership boundaries across the three Product Designers.
- Exact research sample, interview count, and analysis method.
- Analytics definitions, baselines, date ranges, and evidence for 81%, 25%, 10%, and 15%.
- Whether the reported percentages were measured on the same release and population.
- Exact contribution of the masked-balance feature to the release outcomes.
- Release versions, platform rollout sequence, and post-launch follow-up.
- Permission to share underlying internal research and analytics beyond the already-public summary.

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

**Source files**

- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact project start, launch, and measurement dates.
- Team composition and individual contribution boundaries.
- Definition of "under 48 hours" and the stages included.
- Currency-conversion basis for the CAD 500,000 figure.
- Number of businesses funded and the distribution of loan sizes.
- Approval, repayment, repeat use, revenue, risk, and customer-experience outcomes.
- Product surfaces, platforms, research methods, tools, and engineering constraints.
- Permission to share supporting financial, KYB, and operational evidence.

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

**Source files**

- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Initiative dates and whether the two workstreams overlapped.
- Participant recruitment, consent, segmentation, activity, and retention.
- Number of studies or releases supported.
- External research cost baseline and calculation behind the 25% reduction.
- Definition and measurement behind the 30% velocity improvement.
- Exact guidelines, libraries, tools, and governance model.
- Collaborators and long-term ownership after launch.


---

## Shiga

### Pulse embedded stablecoin collection and fiat-disbursement proof

#### Project snapshot

- **Company:** Shiga
- **Dates:** One week / five working days; exact calendar dates need confirmation.
- **Role:** Product design and frontend implementation owner; exact formal title needs confirmation.
- **Product:** Pulse, an embedded stablecoin collection and fiat-disbursement product.
- **Users:** Partner customers paying with stablecoin, partner operations teams, partner developers, and Admin/Developer/Viewer users.
- **Problem:** A prospective fintech partner needed to see a credible, integrated checkout, operations, and developer experience within one week.
- **Personal ownership:** Product and proof scoping, SDK/customer-flow design, partner-console design, developer experience, implementation guidance, React frontend, review, and iteration.
- **Shipped work:** A working frontend across customer, operator, and developer surfaces; frontend engineers connected it to backend APIs for the partner proof.
- **Strongest verified outcome:** The team delivered the proof within the commercial window, and it helped secure the partner business.
- **Key skills:** Product strategy, systems design, fintech operations, interaction design, role and permission design, React, design systems, AI-assisted implementation, and cross-functional delivery.
- **Public disclosure status:** Shiga, Pulse, Helium, Codex, partner identity, screenshots, code, and commercial details require disclosure confirmation.

#### Context and challenge

Pulse evolved from an internal fiat/crypto on-ramp and off-ramp capability into an embedded stablecoin collection and fiat-disbursement proposition.

A prospective partner needed to evaluate the concept within one week. The proof had to make three connected experiences credible:

1. An embedded customer checkout.
2. A partner operations and reconciliation console.
3. A developer integration experience.

The V1 service boundary was:

- The partner owned the customer relationship, the customer-facing product decision, custody, and completed end-user KYC.
- Pulse orchestrated per-order stablecoin collection, payment detection and screening, conversion, fiat disbursement, lifecycle evidence, webhook evidence, and reconciliation.
- A Naira order settled to the end user's named virtual account.
- A USD order settled to the partner's omnibus account for internal crediting.
- Business partners completed corporate KYC/KYB before Live access; Test or simulation mode could expose the product while verification was pending.

#### Work and ownership

I clarified the partner scenario and proof requirements with Product, Business Development, frontend, backend, and cloud contributors. I reframed the work as one thin vertical slice across the customer, operator, and developer experience.

I designed and reviewed the critical embedded checkout in Figma, defined its states and behavior, and wrote an implementation brief covering product context, features, flows, examples, and constraints. I mapped the experience to Helium React components and Storybook patterns, prepared the context for Codex-assisted implementation, and used an existing developer-documentation platform instead of building a custom documentation shell during the week.

I then built the customer checkout, partner console, and developer-facing surfaces in React while backend and cloud work continued in parallel. I presented the working system to Product, Engineering, and Business Development, incorporated priority feedback, and handed the frontend to frontend engineers for API integration.

The work covered:

| Surface | Key work |
|---|---|
| Embedded checkout | Asset and network selection, fiat/stablecoin amounts, address copy, QR, quote timer, payment states, expiration, mismatch handling, cancellation, and reason capture |
| Partner operations | Orders and transactions, pegged/expected/received/delta values, customer payment, conversion, settlement, status, filters, details, and exception handling |
| Developer experience | API credentials, key creation and rotation, webhook endpoints, delivery history, payload/request/response inspection, replay, documentation access, Test/Live environments |
| Access and administration | Admin, Developer, and Viewer roles; role-specific navigation and actions; authenticated 403 handling; team access; settings; security and session concepts |
| Customization | A shared live checkout preview, Admin edit/publish, read-only Developer/Viewer access, and constrained controls for brand color, logo, typography, and corners |
| Delivery workflow | Figma decisions, written behavior, Helium components, Codex-assisted React implementation, combined review, and API integration |

#### Key decisions

- **Build one vertical slice.** The proof connected customer payment, partner operations, and developer integration rather than presenting three disconnected demos.
- **Work in parallel.** The team replaced a sequential `design -> handoff -> frontend -> APIs` dependency with design, coded-system reuse, frontend, backend, cloud, and documentation progressing together.
- **Standardize the product.** The partner console was designed as a reusable operational product rather than a bespoke dashboard for each customer.
- **Reconcile the business journey.** The console followed the full path from fiat intent to customer payment, conversion, and fiat settlement, not only the token transfer.
- **Preserve exception detail.** Underpayment and overpayment retained expected, received, and delta values rather than collapsing into generic errors.
- **Treat roles as different jobs.** Admin, Developer, and Viewer differed in navigation, actions, settings, developer tools, simulations, and authentication behavior.
- **Constrain customization.** Partners could express their brand without fragmenting Pulse into bespoke products. The editor used a `4.5:1` white-text contrast threshold.
- **Protect the one-week critical path.** Complete self-serve business onboarding was deferred; the proof used manual provisioning or simulation.

#### Outcomes

**Verified**

- The proof was delivered within **one week / five working days**.
- I designed and built the frontend.
- Frontend engineers connected the frontend to backend APIs.
- The integrated proof helped the team secure the partner business.
- A later connected interactive prototype demonstrates the breadth of the checkout and authenticated console experience.

**Directional**

- The design-system and coded-frontend approach gave Engineering an integration base rather than a static handoff.
- The available evidence does not quantify time saved or isolate which delivery decision caused the commercial outcome.

**Unsupported or retired claims**

The available evidence does not support:

- Contract value or revenue.
- Pilot or launch date.
- Production transaction volume.
- Partner or customer adoption.
- Conversion improvement.
- Integration-time or support-time reduction.
- A claim that the private partner served "over 6 million customers."
- A claim that all current prototype decisions were made during the original one-week proof.

#### Collaborators, tools, and methods

**Collaborators**

- Olumide - scope, SDK/customer-flow design, partner-console design, developer experience, implementation guidance, and React frontend.
- Frontend engineers - API consumption and integration in the frontend I delivered.
- Backend and cloud engineers - services, webhooks, infrastructure, and environments.
- Product/Product Manager - product scope, coordination, and review.
- Business Development - partner scenario, relationship, proof requirements, and partner presentation.

**Tools and methods**

- Figma.
- Helium design system and Storybook patterns.
- React.
- Codex for AI-assisted implementation.
- Product requirements and behavior documentation.
- Thin-slice scoping and parallel delivery.
- Combined Product, Engineering, and Business Development review.
- Prototype inspection across public checkout and authenticated console surfaces.

#### Evidence and validation notes

- The one-week chronology and ownership boundary are candidate-confirmed and recorded in the source-of-truth files.
- The July 13 meeting note identifies PiggyVest as the active private scenario. It also records the decision to standardize the partner dashboard and assigns me to include detailed transaction identifiers, hashes, and live status.
- A deployed interactive prototype was inspected on **July 17, 2026** and connected a public product/checkout surface to an authenticated partner console.
- **Twelve** portfolio-safe screenshots were captured on July 17.
- The prototype represents three roles, Test/Live concepts, transactions, API-key and webhook tools, team access, settings, and checkout customization.
- API-key rotation includes an optional **24-hour** overlap.
- The V1 product definition uses a **10-minute** locked quote.
- The V1 product definition specifies USDC/USD₮ on EVM and Solana, NGN/USD settlement, and automatic detection. Later prototypes add BTC/XAUT, use GBP/USD examples, and include a manual "I have made payment" action to advance simulated states.
- Those later prototype choices are product drift or simulation behavior, not proof of the V1 product truth.
- The available current code uses simulated or in-memory payment, authentication, webhook, and settlement behavior. It demonstrates interaction design and product breadth but does not prove the original API-connected build.
- Mintlify is named in the project account, while the available files contain only an external Docs link. The documentation itself is not available.

**Source files**

- `CASE_STUDY_2_PULSE/00_SOURCE_OF_TRUTH/FACT_DELTA_2026-07-27.md`
- `CASE_STUDY_2_PULSE/02_STORY/MASTER_STORYLINE_V2.md`
- `CASE_STUDY_2_PULSE/02_STORY/ONE_WEEK_CHRONOLOGY.md`
- `CASE_STUDY_2_PULSE/03_EVIDENCE/CLAIMS_AND_EVIDENCE_REGISTER.md`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/docs/Shiga-Stablecoin-Collection-Disbursement-PRD.md`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/docs/Pulse Refinement – 2026_07_13 11_00 EDT – Notes by Gemini.md`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/DESIGN.md`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/src/`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact calendar dates and formal title.
- Exact team size, names, and day-by-day contribution boundaries.
- Which current prototype features existed in the original one-week proof.
- Link, code, screenshots, or build evidence for the original API-connected version.
- Exact partner feedback and which factors directly influenced the commercial decision.
- Whether PiggyVest may be named publicly.
- Contract type, value, revenue, pilot status, launch status, and subsequent activity.
- The canonical public asset, network, fiat, and payment-detection model.
- Which SDKs shipped. A meeting note mentions React Native, Vanilla JS, and React support, while Vue could integrate through the backend.
- Mintlify usage, documentation content, and handoff ownership.
- Quantitative product, integration, adoption, support, settlement, and transaction metrics.
- Permission to disclose Shiga, Pulse, Helium, Codex, partner identity, screenshots, source code, and internal details.

### Helium design system

#### Project snapshot

- **Company:** Shiga
- **Dates:** Needs confirmation.
- **Role:** Creator and author; exact product-design and code ownership boundaries need confirmation.
- **Product:** Helium 2.0, a Figma-linked design system with React components, icons, 263 color variables, typography, spacing, radius tokens, and cross-platform themes.
- **Users:** Product designers, frontend engineers, and potentially iOS and Android developers building Shiga products.
- **Problem:** Product teams needed shared design and coded building blocks that reduced repeated interpretation between design and implementation.
- **Personal ownership:** Created and authored Helium; used it as delivery infrastructure for Pulse.
- **Shipped work:** React component, icon, and token packages used directly by Pulse, plus production-ready light and dark theme files for Android, iOS, and web reported on the current resume.
- **Strongest verified outcome:** Helium provided the coded system used to assemble the Pulse frontend within its one-week delivery window; the current resume says it unified Shiga's product identity across Android, iOS, and web.
- **Key skills:** Design-system strategy, component design, design tokens, Figma-to-code workflows, React, TypeScript, Storybook, and cross-platform foundations.
- **Public disclosure status:** The Helium 2.0 name, 263-variable claim, supported platforms, light/dark themes, and product role are public on the current resume. Permission to distribute source, packages, and internal design files still needs confirmation.

#### Context and challenge

Fast product delivery required more than visual consistency. Designers and engineers needed shared building blocks that connected Figma decisions to implementation.

For Pulse, Helium acted as the path from design decisions and written behavior to React components, a working frontend, and API integration. It let the team compose an interface from an existing system instead of rebuilding every high-fidelity element after design review.

#### Work and ownership

I created and authored Helium. The available artifacts show:

- A React component library described as built from Figma.
- An icon package generated from the Figma icon set.
- A token package generated from Figma variables.
- CSS, JavaScript/TypeScript, iOS Swift, and Android XML token outputs.
- The current resume reports 263 color variables plus typography, spacing, and radius tokens across light and dark modes.
- Storybook-aligned component patterns.
- Direct use across Pulse authentication, dashboard, operations, and developer surfaces.

The component evidence includes alerts, avatars, badges, breadcrumbs, buttons, checkboxes, currency displays, dropdowns, file upload, inputs, lists, loading indicators, progress components, radio controls, sidebar navigation, skeletons, tables, tabs, tags, text areas, toasts, toggles, tooltips, verification codes, and wizard steps.

Custom product icons include Enta Wallet, Shiga Wallet, Fiat to Stablecoin, Stablecoin to Fiat, and Token.

#### Key decisions

- **Treat the system as delivery infrastructure.** Helium connected design intent to coded components rather than functioning only as a visual library.
- **Support more than web tokens.** The available package includes CSS/TypeScript, Swift, and Android XML outputs.
- **Compose controlled products directly.** Pulse's authenticated console imports Helium components, styles, and tokens.
- **Allow embedded adaptations.** The checkout is Helium-aligned but uses local, self-contained adaptations for the embedded surface.
- The evidence does not establish bundle size as the reason for the embedded adaptation, so that rationale should not be claimed.

#### Outcomes

**Verified**

- Pulse directly imports `@helium/react`, `@helium/icons`, and `@helium/tokens`.
- Helium was used as the coded design-system foundation for the one-week Pulse proof.
- The supplied React package contains **43 named component or component-adjacent directories**.
- The token package includes generated web, iOS, and Android outputs.
- The current resume describes production-ready theme files for Android, iOS, and web that unified Shiga's visual identity.

**Directional**

- The Pulse project account describes earlier API integration and less repeated handoff work.
- No controlled comparison or quantitative time-saving measure is available.

**Unsupported or retired claims**

- Organisation-wide adoption.
- A verified reduction in design or engineering time.
- A verified reduction in UI defects or inconsistency.
- Specific accessibility, reuse, or product-performance improvements.
- A published production version inferred from the local `0.0.0` package snapshot.

#### Collaborators, tools, and methods

**Collaborators**

- Specific design, brand, frontend, mobile, accessibility, and product contributors need confirmation.

**Tools and methods**

- Figma and Figma variables.
- React and TypeScript.
- Storybook patterns.
- Component, icon, and token packages.
- CSS, Swift, and Android XML token generation.
- Design-to-code mapping through active product implementation.

#### Evidence and validation notes

- Authorship was confirmed directly by Olumide in this task.
- The project files corroborate that Helium existed as reusable packages and was used directly in Pulse.
- The package descriptions identify `@helium/react` as a React component library, `@helium/icons` as icons generated from Figma, and `@helium/tokens` as tokens generated from Figma variables.
- The supplied archive version is `0.0.0`. It may be a local snapshot rather than the actual release history.
- The current evidence cannot separate which individual components, icons, tokens, pipelines, or documentation were authored solely by me versus with collaborators.
- The active resume independently publishes the Helium 2.0 name, 263 color-variable count, light/dark modes, and Android/iOS/web scope.

**Source files**

- `CASE_STUDY_2_PULSE/00_SOURCE_OF_TRUTH/FACT_DELTA_2026-07-27.md`
- `CASE_STUDY_2_PULSE/02_STORY/ONE_WEEK_CHRONOLOGY.md`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/vendor/helium/helium-react-0.0.0.tgz`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/vendor/helium/helium-icons-0.0.0.tgz`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/vendor/helium/helium-tokens-0.0.0.tgz`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/package.json`
- `CASE_STUDY_2_PULSE/08_DIRECT_LINK_BUILD/pulse-gbp-demo/src/`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Start date, first release date, and active period.
- Whether the official name/version was Helium or Helium 2.0 at each stage.
- Exact creator scope across the Figma library, components, code, token pipeline, icons, documentation, Storybook, governance, and maintenance.
- Collaborators and contribution boundaries.
- Exact brand coverage, product coverage, and number of adopting teams.
- Adoption across Enta, AfriSignal, Pulse, or other Shiga products.
- Accessibility standards, testing, contribution process, release process, and governance.
- Package publication status and actual version history.
- Quantitative effect on build speed, design consistency, defect rates, handoff time, or reuse.
- Permission to show or distribute Helium source and artifacts publicly.

### Shiga/Enta business onboarding

#### Project snapshot

- **Company:** Shiga
- **Dates:** Needs confirmation.
- **Role:** Product Designer; the source supports design ownership, while exact scope and title need confirmation.
- **Product:** Business onboarding and activation for a Shiga/Enta business account.
- **Users:** Business customers, beneficial owners, controlling owners, and teams preparing to integrate Shiga products.
- **Problem:** Businesses needed a path from signup and corporate verification to approval, secure access, integration, testing, and Live activation.
- **Personal ownership:** Designed the existing onboarding journey referenced by the Pulse case study.
- **Shipped work:** A complete design flow existed before the Pulse proof; build and production status need confirmation.
- **Strongest verified outcome:** The journey was mature enough to be treated as an existing product flow and a planned extension into Pulse activation.
- **Key skills:** Business onboarding, KYB/KYC flows, identity and ownership verification, security setup, activation design, and platform thinking.
- **Public disclosure status:** Product naming, screenshots, business rules, and implementation details need confirmation before public use.

#### Context and challenge

Business partners needed to progress from account creation and corporate verification into a secure, usable integration. A complete business-onboarding journey already existed elsewhere in Shiga when the Pulse proof was planned.

Because the Pulse team had only one week, full self-serve onboarding was kept outside that proof's critical path. Manual provisioning or simulation was used while the existing journey was positioned as a later connection.

#### Work and ownership

The Pulse story describes this as "the onboarding journey I already designed." The represented flow covers:

`Work email -> KYB -> Beneficial owners -> Controlling-owner KYC -> Passkey and recovery -> Business approval`

The related Pulse activation path extends the journey through:

`Invite team -> Obtain sandbox credentials -> Integrate API/SDK -> Configure webhook and settlement -> Run test payment -> Request Live`

The available artifacts include signup, KYB, owner-KYC, and business-home screens.

#### Key decisions

- **Verify the business before Live access.** Corporate KYC/KYB was mandatory.
- **Separate onboarding from the one-week proof.** Full self-serve activation was deferred to protect Pulse's critical delivery path.
- **Use staged activation.** The planned sequence moved from team setup and sandbox access through integration, configuration, a test payment, and a Live request.
- **Support recovery and secure access.** Passkey and recovery setup were included before business approval.

#### Outcomes

**Verified**

- A complete business-onboarding design existed before the Pulse proof.
- The journey covered signup, corporate verification, owner verification, secure access/recovery, approval, and business home.
- It informed the documented next step for Pulse partner activation.

**Directional**

- The existing flow reduced the need to invent business onboarding during the one-week Pulse proof.
- No measured delivery, activation, or customer outcome is available.

**Unsupported or retired claims**

- Production launch or usage.
- Completion, approval, or activation rate.
- Time to complete onboarding or integrate.
- Number of businesses onboarded.
- A claim that the Pulse activation extension shipped.

#### Collaborators, tools, and methods

**Collaborators**

- Product, Engineering, Compliance, Operations, and other contributors need confirmation.

**Tools and methods**

- Product-flow and interaction design.
- KYB/KYC and ownership-verification workflow design.
- Security, passkey, recovery, approval, and activation-state design.
- Specific research, analytics, prototyping, and delivery tools need confirmation.

#### Evidence and validation notes

- The strongest ownership evidence is the first-person statement that this was an onboarding journey I had already designed.
- The files show the flow and screens but do not establish build, release, or production status.
- The project is described across Shiga and Enta contexts. Its official product boundary is not clear.
- The Pulse activation sequence may be a proposed extension rather than an implemented part of the original onboarding product.

**Source files**

- `CASE_STUDY_2_PULSE/PRODUCT.md`
- `CASE_STUDY_2_PULSE/07_STORY_IMAGE_DECK/story.md`
- `CASE_STUDY_2_PULSE/07_STORY_IMAGE_DECK/assets/product/onboarding-signup.png`
- `CASE_STUDY_2_PULSE/07_STORY_IMAGE_DECK/assets/product/onboarding-kyb.png`
- `CASE_STUDY_2_PULSE/07_STORY_IMAGE_DECK/assets/product/onboarding-owner-kyc.png`
- `CASE_STUDY_2_PULSE/07_STORY_IMAGE_DECK/assets/product/onboarding-home.png`

#### Needs confirmation

- Official product and project name.
- Whether the experience was Enta-specific, Shiga-wide, or shared.
- Dates, formal title, collaborators, and exact ownership.
- Research and business requirements that led to the flow.
- Which screens, states, and rules I designed.
- Build, release, and production status.
- Relationship to Helium.
- User, business, risk, or operational outcomes and verified metrics.
- Whether the Pulse activation extension was designed, built, or only proposed.
- Permission to disclose the product, screens, and business rules publicly.


### ENTA passkey-led consumer onboarding

#### Project snapshot

- **Company:** Shiga
- **Dates:** Q1 2026; one-week sprint.
- **Role:** Product Designer with UX-writing scope.
- **Product:** ENTA consumer-wallet signup, authentication, KYC, and first-time dashboard experience.
- **Users:** Crypto-only users who want to send, receive, or swap stablecoins, and crypto-plus-fiat users who need onramp, offramp, conversion, or higher limits.
- **Problem:** Email/password signup and mandatory upfront KYC delayed value, caused fatigue, and blocked users before they could see the wallet.
- **Personal ownership:** Funnel and support review, competitive research, stakeholder interviews, persona-aware flow definition, passkey and locked-state design, UX writing, AI-assisted ideation, Figma delivery, and handoff.
- **Shipped work:** Passkey-led signup, dashboard-first access, deferred contextual KYC, locked feature states, recovery/device-transfer considerations, and linked flows for two user types.
- **Strongest verified outcome:** The active case page says the redesign shipped at the end of the one-week sprint. The reported sub-one-minute and sub-four-minute paths do not include a measurement method.
- **Key skills:** Consumer fintech onboarding, passkeys, KYC strategy, time-to-value design, crypto UX, UX writing, flow architecture, rapid prototyping, and engineering collaboration.
- **Public disclosure status:** The case study, team shape, product flow, prototype, and timing claims are public on the portfolio. Funnel data, support records, and security/compliance details remain private.

#### Context and challenge

The old ENTA flow required email/password signup, profile completion, and KYC before the dashboard. The case study says users were leaving inside identity verification before reaching send, receive, or swap.

The design problem combined two issues:

- Password-based authentication appeared behind the wallet category's move toward passkeys.
- KYC blocked both regulated and unregulated value, even though crypto-only users could use stablecoin send, receive, and swap without completing the same fiat-related checks.

#### Work and ownership

I reviewed the signup-to-first-transaction funnel with Engineering, audited onboarding-related support tickets, compared wallet onboarding patterns in Rabby, Rainbow, Phantom, and Fuse, and interviewed Product, Engineering, and Compliance stakeholders.

I split the journey around two user needs:

- Crypto-only users could create a profile, register a passkey, and reach stablecoin send, receive, and swap.
- Crypto-plus-fiat users could complete KYC in the context of onramp, offramp, conversion, and higher-limit features.

I explored flows in Claude Design, moved the selected direction into Figma, designed passkey enrollment and recovery/device-transfer considerations, defined locked feature states, and delivered linked flows for both personas.

#### Key decisions

- **Replace passwords with passkeys.** Authentication aligned with the security and recovery model expected in the wallet category.
- **Move KYC into the product.** Identity verification became contextual to the regulated feature it unlocked.
- **Show the full product surface.** Locked actions advertised value without pretending they were immediately available.
- **Optimize for time to value.** The primary design goal became reaching useful wallet functionality, not merely finishing every onboarding step.
- **Use one dashboard across verification states.** The same structure supported pre-KYC, verification-in-progress, and Tier 2 states.

The documented flow is:

`Email/profile -> Register passkey -> Dashboard -> Use crypto features or complete contextual KYC for fiat features`

#### Outcomes

**Verified**

- The case page states that the redesign shipped at the end of the one-week sprint.
- Engineering received one Figma file with linked flows for both user types.
- QA ran in parallel with copy review.
- The delivered work included passkey signup/sign-in, first-time dashboard states, verification-on-hold, and Tier 2 unlocked states.

**Portfolio-reported**

- Crypto-only user reaches the dashboard in **under one minute**.
- Crypto-plus-fiat user completes KYC and reaches value in **under four minutes**.
- KYC framing became clearer and tied to the feature being unlocked.

**Unsupported or retired claims**

- No baseline time, test sample, production funnel, conversion lift, activation rate, passkey success rate, KYC completion rate, or post-launch retention measure is included.
- The case page's statement that contextual dashboard prompts drove verification more effectively than a forced flow is a learning claim without a supplied comparison.

#### Collaborators, tools, and methods

**Collaborators**

- 1 Product Designer.
- 1 Product Manager.
- 3 Engineers.
- Product, Engineering, and Compliance stakeholders.

**Tools and methods**

- Funnel review.
- Support-ticket audit.
- Competitive teardown.
- Stakeholder interviews.
- Persona-aware flow design.
- Feature-accessibility mapping.
- Claude Design for early ideation.
- Figma for high-fidelity delivery and handoff.
- Parallel design QA and copy review.

#### Evidence and validation notes

- The homepage, work index, and active case route agree on Q1 2026 and a one-week project.
- The active route is used instead of the older `shiga-onboarding-v1` duplicate.
- The current resume page separately says a KYC redesign is being spearheaded. It is unclear whether that statement refers to this shipped consumer flow, a later iteration, or a different KYC project.
- The under-one-minute and under-four-minute figures are presented as case-study impact metrics, but no source or method is embedded.
- Funnel leakage and support fatigue are described qualitatively; no counts are public.

**Source files**

- `../../lums-portfolio/app/work/shiga-onboarding/page.js`
- `../../lums-portfolio/app/page.js`
- `../../lums-portfolio/app/work/page.js`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact sprint dates and release versions.
- Whether the flow shipped to production, a controlled rollout, or a proof environment.
- Measurement method for the under-one-minute and under-four-minute paths.
- Baseline funnel, KYC drop-off, activation, retention, and first-transaction outcomes.
- Passkey provider, platform support, recovery rules, and security constraints.
- Compliance approval and exact pre-KYC transaction limits.
- Individual contribution boundaries with the Product Manager and Engineers.
- Whether the current resume's in-progress KYC statement refers to this project.
- Permission to disclose internal funnel, support, security, and compliance evidence.

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

**Source files**

- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact dates and status for each workstream.
- Exact ownership and collaborator boundaries.
- Evidence and attribution for the USD 1.2M Tether funding and Visa Accelerator acceptance.
- Amount, instrument, date, and attribution for the Telegram/TON funding round.
- Baseline, sample, categories, and calculation behind the estimated 40% error reduction.
- Products, platforms, and markets covered by the 100+ error messages.
- Build, launch, usage, and payment-volume status for the Telegram Mini-App POS.
- Launch and commercial status for Payment Links, Rate Calculator, and crypto invoicing.
- Reactivation audience size, delivery rate, click rate, conversion, and downstream behavior behind the 73% open rate.
- Scope and ship status for the current KYC and transaction-authentication work.
- Permission to disclose funder, commercial, support, lifecycle, and security evidence.

---

## Branch International

### Three AIs, One Design System

#### Project snapshot

- **Company:** Branch International Financial Services
- **Dates:** October 2025 to February 2026.
- **Role:** Product Designer; the case-study scope covers AI workflows, UX writing, and prototyping.
- **Product:** Three governed internal workflows: Illustration GPT, Copywriting AI, and Neem DS Prototyper.
- **Users:** 5 designers, 4 UX researchers, 15 Product Managers, plus developers and stakeholders involved in testing and review.
- **Problem:** Teams already used AI, but generic outputs lacked Branch product truth, market language, brand voice, component context, and Neem design-system logic.
- **Personal ownership:** Internal research, workflow strategy, rule-system design, tool creation, iteration, testing, review facilitation, and human-oversight design.
- **Shipped work:** A governed illustration system, a market-aware copy audit/generation workflow, and a Neem-aligned PRD-to-prototype workflow.
- **Strongest verified outcome:** The active case page records 1,778 implemented copy changes across 530 screens and 4,390 audited components; it reports about 30% faster PRD evaluation based on general PM feedback.
- **Key skills:** AI product design, internal tools, design systems, UX writing, research, JSON rule systems, prompt architecture, prototyping, governance, and cross-market product operations.
- **Public disclosure status:** The programme, users, markets, workflows, metrics, examples, and recognition are public on the portfolio. Internal prompts, product rules, audit data, and employee research details may require additional approval.

#### Context and challenge

Branch's product team worked across India, Kenya, and Nigeria on onboarding, KYC, loans, repayments, rewards, account management, support, risk, and operations.

AI adoption already existed. The active case page reports a product-team copywriting poll in which 65% used ChatGPT, 20% used Claude, and others used Gemini. The problem was that every person supplied different context, prompts, and quality standards.

Generic tools could write polished copy or generate plausible screens, but they did not reliably understand product availability by market, component behavior, Branch terminology, brand voice, or Neem design patterns.

#### Work and ownership

I treated each AI workflow as an internal product with users, failure modes, rules, testing, feedback loops, quality gates, and human approval.

Research inputs included:

- 1:1 conversations with PMs, researchers, and designers.
- Slack DMs.
- A product-team copywriting poll.
- Product-wide reviews and presentations.
- FigJam voting.
- Direct testing with PMs, designers, and developers.

The programme included:

| Initiative | Work completed | Website-reported result |
|---|---|---|
| Illustration GPT | Defined structured rules for color, material, lighting, perspective, relevance, composition, quality, and market adaptability; ran reviews and iteration across six versions. | Around 40 illustrations; all ready and about 60% live |
| Copywriting AI | Built a seven-version rule system covering brand, markets, products, components, heuristics, lint rules, material maps, and workflow guidance. | 530 screens reviewed, 4,390 components audited, 1,778 changes implemented |
| Neem DS Prototyper | Connected PRD input, Claude interpretation, Figma context, Neem components, token-compliant React output, stakeholder review, and PRD refinement. | About 30% reduction in PRD evaluation time based on general PM feedback |

#### Key decisions

- **Design governance, not better one-off prompts.** Shared rules replaced personal prompting habits.
- **Encode product and market context.** The workflows captured market availability, terminology, component constraints, brand voice, and product truth.
- **Keep humans in control.** AI accelerated the starting point; people remained responsible for review and approval.
- **Turn repeated feedback into constraints.** Recurring issues became system rules, while isolated preferences were not over-weighted.
- **Tune guardrails over time.** The illustration system evolved through six versions and the copy system through seven.
- **Prototype before high fidelity.** Interactive Neem-aligned prototypes gave stakeholders something concrete to evaluate while the PRD was still changeable.

#### Outcomes

**Verified as implemented work**

- Three governed workflows were designed and tested.
- Copy improvements were implemented across live product surfaces.
- Illustration sets reached rollout.
- PMs, designers, researchers, developers, and stakeholders participated in review or testing.
- The programme received public recognition from Branch's Design Lead.

**Portfolio-reported**

- **50+** people consulted through combined research and review channels.
- Poll result: **65% ChatGPT**, **20% Claude**, others Gemini.
- Around **40** illustrations across markets; about **60%** live.
- **530** screens reviewed.
- **4,390** components audited.
- **1,778** copy changes implemented.
- About **30%** reduction in PRD evaluation time based on general PM feedback.

**Unsupported or retired claims**

- The current resume separately says the suite was adopted **500+ times across 6 teams in 4 countries**. The active case page does not reconcile this usage claim with its named core-user population or provide usage logs.
- The resume says the suite eliminated dependence on external illustration sourcing; the case page describes reduced sourcing/review friction but does not provide a cost or agency baseline.
- No measured time saving is supplied for copywriting or illustration review.

#### Collaborators, tools, and methods

**Collaborators**

- Designers.
- UX Researchers.
- Product Managers.
- Developers.
- Product-wide stakeholders.
- Branch Design Lead.

The active page does not provide a complete ownership matrix for individual contributors.

**Tools and methods**

- ChatGPT.
- Claude.
- Figma MCP/context.
- JSON rule systems.
- React prototype output.
- 1:1 interviews and Slack research.
- Product-wide review sessions.
- FigJam voting.
- Direct workflow testing.
- Versioned rule tuning.
- Human approval loops.

#### Evidence and validation notes

- The active `/work/branch-ai` page is used as the canonical case study. Older `branch-ai-v1`, `branch-ai-original-v1`, and dynamic-route versions contain different claims and are not used as current truth.
- The work index supplies the October 2025 to February 2026 dates; the active case page supplies role, users, markets, and implementation detail.
- The copy-impact image is captioned as combining audited India workbook data with directional estimates for Kenya and Nigeria.
- "About 30%" is explicitly directional and based on general PM feedback.
- The active page says I ran a full-team poll and consulted 50+ people; no poll instrument, response count, or participant register is embedded.
- The public recognition quote supports perceived contribution, not a quantified product outcome.

**Source files**

- `../../lums-portfolio/app/work/branch-ai/page.js`
- `../../lums-portfolio/app/page.js`
- `../../lums-portfolio/app/work/page.js`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact formal role for the initiative versus the employment title.
- Exact participant count and whether all poll invitees responded.
- Ownership boundaries for research, FigJam voting, illustration direction, rule writing, audits, implementation, and rollout.
- Raw India audit data and estimation method for Kenya and Nigeria.
- Definition and counting method for screens, components, and implemented copy changes.
- Illustration count, current live percentage, markets, and rollout date.
- Definition, sample, and method behind the 30% PRD-evaluation figure.
- Usage logs and definitions behind the resume's 500+ uses, 6 teams, and 4 countries.
- External illustration-sourcing baseline and any cost/time reduction.
- Permission to disclose internal product rules, prompts, audit files, and employee research evidence.

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

**Source files**

- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact dates, product owners, markets, and release versions for each workstream.
- Definition and audit process behind 100% consistency.
- KYC baseline, population, experiment/control design, date range, and causal attribution.
- Meaning and measurement of manual data-entry errors.
- Search-time study method and the exact population behind 200+ files/screens.
- Definition and measurement of 20% faster design-to-delivery across 6 products.
- Exact security and onboarding experiments, outcomes, and launch status.
- Hiring-fair campaign scope, channels, collaborators, and measured outcome.
- Ownership boundaries across design, product, engineering, marketing, and People Ops.
- Permission to disclose internal design-system, analytics, experiment, and campaign evidence.

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

**Source files**

- `../../lums-portfolio/app/work/sabi/page.js`
- `../../lums-portfolio/app/page.js`
- `../../lums-portfolio/app/work/page.js`

#### Needs confirmation

- Exact project dates inside the 2021 to 2022 range.
- Formal engagement and role status.
- Internal team composition and contribution boundaries.
- Which commerce, logistics, driver, and supplier surfaces shipped.
- Research sample sizes, markets, interview method, and usability-test findings.
- Product requirements, technical constraints, and engineering collaboration.
- Project-specific adoption, task, fulfillment, delivery, inventory, satisfaction, retention, and business outcomes.
- Source dates and permission to reuse the platform-level merchant, goods-sold, and funding figures.

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

**Source files**

- `../../lums-portfolio/app/work/uba/page.js`
- `../../lums-portfolio/app/page.js`
- `../../lums-portfolio/app/work/page.js`
- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Exact start, launch, and rollout dates.
- Whether January 2020 is project start, release, or case-study date.
- Canonical employee population: 10,000+ or 20,000+.
- Individual ownership across the three Product Designers.
- Modules and workflows included in the delivered platform.
- Calculation and contractual basis for USD 80,000 monthly / USD 960,000 annually.
- Definition and measurement of 50% automation demand and 30% HR efficiency.
- Adoption, task time, error, backlog, request-volume, satisfaction, and support outcomes.
- Exact research sample and module-testing participants.
- Permission to disclose internal HR workflows, research, and financial records.

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

**Source files**

- `../../lums-portfolio/app/resume/page.js`

#### Needs confirmation

- Names, dates, scope, and status of the mobile, ATM, and kiosk projects.
- Target customer segments, countries, and form-factor constraints.
- Team composition and individual ownership.
- Research participants and usability-test methods.
- Definition and evidence for 15% user-satisfaction improvement.
- Definition and evidence for 25% product-consistency improvement.
- Number of components, tokens, teams, workshops, and adopted products.
- Exact effect on design rework and delivery.
- Permission to share customer-facing screens and internal system documentation.

