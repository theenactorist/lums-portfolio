# Building Branch’s AI UX Writing System

*Approved prose · 1 October 2026*

I packaged Branch’s brand principles, product context and design-system rules as an agent skill, so every team’s AI workflows produced consistent, on-brand UX writing by default. Internally, we called it CopyGPT.

The final harness was Claude Chat with the skill enabled. Product, design, engineering, marketing and customer support teams could send text, attach a screenshot, share a Figma link, use voice or share their screen.

**Branch International · Product Designer, AI Systems · 25 August 2025 to 5 March 2026**

## What CopyGPT included

### Brand principles

The ten principles that defined how Branch should sound:

1. Be Concise and Eliminate Unnecessary Words
2. Use Clear, Simple, and Jargon-Free Language
3. Maintain a Conversational, Human Tone
4. Provide Context and Helpful Guidance
5. Use Specific and Predictable CTAs and an Action-Oriented Language
6. Be Empathetic, Optimistic, Use Positive Wording to Create Good Feelings
7. Optimize for Mobile-Specific Interactions
8. Write Inclusive Microcopy
9. Write Clear and Reassuring Success Messages
10. Write Helpful Error Messages and Failure scenarios

### Used by

- **Teams:** Product, design, engineering, marketing and customer support.
- **Markets:** India, Kenya and Nigeria.

### Contextual framework

- Product, market, screen state and intended action.
- Component, text position, category and use case.
- Tone, character and word limits, sentence phrasing, casing and punctuation.
- Relevant brand principles and examples of good and bad copy.

### Caters for

Error, confirmation, success, feature, empty-state and processing copy, as well as the labels and instructions within those experiences.

## Why Branch needed CopyGPT

Reviewing a single line of UX writing could take 20 minutes of a design review. We would discuss what sounded right while also finding inconsistent casing for the same component across different screens in the app.

The goal was to standardise UX writing: consistent tone and casing, grounded in the product and market, and aligned with Branch’s brand principles. Teams needed to reach that standard without repeatedly spending review time deciding what worked and what did not.

I took ownership of the project from discovery through implementation, with substantial help from colleagues.

## Discovery: how teams were creating copy

I started by looking at the workflows people already used. Colleagues turned to Gemini, ChatGPT, Claude, Perplexity and Google Search. Each approach produced an answer, but there was no shared knowledge base or set of component rules governing those answers.

At the start, the documented UX-writing guidance was the brand principles. The product and component context needed to apply them consistently had not been assembled into a common reference.

Copy for the same feature could differ in tone or casing between India and Nigeria, without consistently following Branch’s principles. I needed a common set of rules that also accounted for each market’s products and terminology.

## Defining the product context and component guardrails

Other product designers helped me collect and clean documentation for the features in their markets. They wrote product overviews and the steps within each flow. This became the core product-context dataset supplied to the LLM: what a feature did, what the person was trying to achieve and what happened at each step.

We then agreed that the writing rules needed to be defined within the design-system components. A button, input label and error-message body serve different purposes. Each needed its own guardrails so the LLM could apply the relevant rules to that part of the interface.

Together, we documented each component’s category, use case, tone, character limit, word count, sentence phrasing, casing, punctuation, applicable principles, good and bad examples, and rationale. The final v7 reference defined **30 component types and 45 text positions**.

For a Primary Button, for example, the documented guidance specified:

| Property | Guidance |
| --- | --- |
| Category | Actionable |
| Use cases | Loan application, repayment and wallet top-up |
| Tone | Clear and action-oriented |
| Character limit | Maximum 25 characters |
| Word count | 1–4 words |
| Sentence phrasing | Verb + object |
| Casing | Title Case |
| Punctuation | No ending punctuation |
| Principles | Clear language, predictable actions and mobile interactions |
| Good examples | Add to Wallet; Pay Now; Start Investment |
| Bad examples | Submit; Proceed; Click Here |

This gave the LLM a specific contract for the component. The product context determined the action; the component rules determined how to write it.

## Researching and prototyping the LLM workflow

This was new territory at Branch. I had to determine how an existing LLM could interpret a screen, find the applicable Branch guidance and follow the component rules in its response. I researched the major LLMs and reviewed literature on how they were built, then structured the operating guide and reference data around that workflow.

I developed an algorithm for the writing workflow: identify the context, select the relevant guidance, generate copy, check it and resolve any conflicts. The operating guide defined that sequence, while JSON reference files supplied the component, market, brand and validation rules.

The first harness was a ChatGPT Custom GPT. We moved to a Claude Project after the team found Claude stronger for the writing task. I continued refining the instructions and reference data through seven versions.

## Refining the system through seven versions

The iterations progressively made the component definitions more complete, the constraints more explicit and the validation more thorough.

| Version | What I refined |
| --- | --- |
| V1 | Assembled the initial brand, market and component references. Thirty component types were listed, with populated text-position rules for twelve. |
| V2 | Added rule precedence and seven lint checks. |
| V3 | Linked component rules to writing principles and consolidated the market structure. |
| V4 | Defined text positions across all components, structured character, word and line limits, and expanded component inference and mapping. |
| V5 | Reduced hard minimum constraints and added ordered alternatives when copy could not fit a component’s limits. |
| V6 | Expanded lint to fifteen checks, standardised naming and market-term validation, and introduced an operating guide. |
| V7 | Aligned conflicting List definitions, specified styling for all forty-five text positions, expanded lint to thirty checks, and added generation patterns and checks against copying examples verbatim. |

### Fixing the List definition

In v6, the component definition expected a headline with optional supporting fields, while the component-selection reference expected title and body. The LLM could consult two files and receive different definitions of the same component.

In v7, I aligned those definitions around a required title and optional body. The instructions also distinguished informational lists from actionable list rows using visual cues such as chevrons and toggles. This connected component recognition to the writing rules that followed.

## How v7 guided the LLM

Colleagues used CopyGPT through a chat harness. They sent a request with text or an app screenshot, supplied missing context when asked, and refined the proposed copy through follow-up messages.

I designed the v7 operating guide to instruct the LLM to identify the screen context, select the applicable Branch rules, generate copy and validate it before responding. The sequence below shows that algorithm.

<!-- v7-workflow-visual -->

1. **Identify the component and context.** `heuristics-v7.json` supplied component synonyms, screen-context clues and visual cues. The LLM identified the component, text position, intended action and market. If the market was missing or the component could not be identified, it asked for clarification.

2. **Map it to Branch’s design system.** `material-map-v7.json` translated other component names into Branch’s vocabulary. A Snackbar mapped to a Toast. It also mapped terms such as headline to title and supporting text to body, so the model could find the appropriate rules.

3. **Apply product and market context.** `markets-v7.json` supplied product information, local terminology, currency formats, identity-verification methods and market restrictions. For example, India used “mobile number,” while Kenya and Nigeria used “phone number.” Kenya’s product terminology used “savings”; Nigeria’s used “investments.” The available detailed flow model covered Nigeria.

4. **Apply the component contract.** `components-v7.json` supplied the required and optional text positions, length limits, casing, punctuation and phrasing patterns. A Primary Button needed a specific action within 25 characters. A multi-part component needed its title, body and action to work together.

5. **Write in Branch’s voice.** `brand-v7.json` supplied the ten principles and the voice attributes: trustworthy, professional, user-friendly, inclusive and optimistic. The LLM generated fresh copy using these principles and the component patterns. Guidance examples illustrated a pattern rather than serving as text to repeat.

6. **Validate and revise.** `lint-rules-v7.json` defined thirty checks in a nine-step sequence: encoding, market terminology, length, casing, punctuation, action verbs, date and currency formatting, standardised terminology, and verbatim-example detection. If the copy exceeded a limit or broke a rule, the instructions directed the model to revise it before responding.

The operating guide instructed the model to return five options by default. Colleagues reviewed the proposals and could continue the conversation to refine them.

To follow the v7 rules through one example, consider a request for the India button labelled “Continue,” where tapping opens the camera. The recognition and mapping references identify a Primary Button, while the market reference establishes the India identity-check context. The component contract requires a verb and object, 1–4 words, Title Case and no ending punctuation, within 25 characters. The principle of predictable actions supports “Start Camera” over “Continue”. The model is then instructed to check the proposal against the applicable lint rules before responding. This illustrates how the v7 rules support the implemented camera-button change.

### Resolving conflicting rules

The LLM needed to know which rule to follow when a request or a general default conflicted with a more specific rule. v7 defined this order: **market requirements → component rules → brand defaults → inference fallbacks**.

The following scenarios illustrate that policy; they are not recorded model responses.

#### Market terminology takes priority

For Nigeria’s investment product, a colleague might reuse a Kenyan label containing “savings.” Reusing familiar wording could serve the brand’s plain-language principle, but the Nigeria reference explicitly required “investments” and prohibited “savings.” The market rule won: the product label had to say **“Investments”**.

#### Component rules override brand defaults

The brand reference defaulted to Title Case for titles and headers. The Banner component, however, required Sentence case for its headline. A banner saying **“Your Account Is Ready”** therefore became **“Your account is ready”**. The component’s specific casing rule took priority over the general brand default.

#### Necessary guidance cannot always fit the component

For an unsuccessful payment, the error-writing pattern called for the problem, a next step and reassurance about funds when relevant. A Toast had a 50-character limit. Shortening the message could remove information the person needed to recover.

Consider a payment interrupted by a connection failure, where the product state confirmed that no money left the account. **“No money left your account. Check your connection and try again.”** is 64 characters, exceeding the Toast limit.

v7 instructed the model to shorten first. If the necessary guidance still could not fit, it could propose an Alert or Text Block and validate against that component’s rules. An illustrative Alert would use **“Payment Not Completed”** as the title, **“No money left your account. Check your connection and try again.”** as the message, and **“Retry Payment”** as the action. These are within the Alert’s respective character limits of 30, 100 and 18; the layout also needed to keep the message within two lines.

The component change remained a design decision for the team. If the copy could not fit any supported alternative, the instructions required human review.

## Packaging it as a Claude Skill

I packaged the workflow as a Claude Skill so every team could use the guidance within Claude Chat. The package contained a main `SKILL.md` instruction file and six Markdown references for components, markets, brand, lint, component recognition and flows.

The Skill instructions directed the model to identify the request and select the references it needed. This made the shared product context and component guardrails available within colleagues’ existing AI workflows, across projects and chats.

## Implementation across the app

I collaborated with one product manager and one engineer from each market to work through the app’s UX writing. We sent screenshot batches to CopyGPT, then recorded the original copy, proposed copy and rationale in a shared Google Sheet.

We reviewed the recommendations against the product context and agreed writing rules. The engineers implemented the changes that passed review, and we recorded the outcomes in the tracker before moving to the next batch.

## Results

The product team implemented **1,778 copy changes**. The cross-market summary also recorded **530 screen-flow appearances reviewed** and **4,390 UI component instances audited**. These totals cover India, Kenya and Nigeria; Kenya and Nigeria figures include directional estimates.

The detailed India tracker contains **617 implemented component entries whose text changed**. Comparing the original and implemented text shows the scope of those changes:

| Change | Implemented entries | Percentage of 617 |
| --- | ---: | ---: |
| Wording | 346 | 56.1% |
| Punctuation | 180 | 29.2% |
| Capitalisation alone | 178 | 28.8% |

More than half changed the wording. Almost three in ten changed only capitalisation, with the words, punctuation and whitespace preserved. That quantified the casing inconsistency we had been discussing in design reviews, alongside the larger work of rewriting instructions, action labels and recovery guidance.

*Wording and punctuation overlap: 125 entries changed both. Wording compares the words while ignoring case and numeric formatting; punctuation counts changes to marks such as full stops, apostrophes and hyphens, excluding separators within numbers. The percentages describe implemented text changes, not model accuracy or time saved.*

The largest volumes of implemented text changes in India were within these components:

| Component | Implemented changed entries |
| --- | ---: |
| Text Block | 176 |
| Info Text | 139 |
| Data Display | 70 |
| Primary Button | 45 |

*The India breakdown counts component entries with different original and implemented text. It is a separate analysis of the detailed tracker, not an extrapolation of the cross-market totals.*

The examples below show what those changes meant for the person using the app: a clearer action, the right market term or a useful next step after an error.

## Examples of implemented changes

These examples come from eight implemented India tracker entries. The two PAN states are grouped together: the same original instruction needed different wording depending on whether the field was empty or already filled.

| Component and context | Original copy | Implemented copy | Why it changed |
| --- | --- | --- | --- |
| Step Indicator · PAN verification | Step 2 of 5: Verify PAN | **Empty field:**<br>Step 2 of 5: Enter PAN<br><br>**Already filled:**<br>Step 2 of 5: Confirm PAN | Match the instruction to the screen state: enter missing information or confirm existing information. |
| Primary Button · next tap opens the camera | Continue | Start Camera | Name the specific tapped outcome. Use a verb and object, Title Case and no ending punctuation, within the button’s limits. |
| Error Message · email is already registered | Email already registered! Try again | This email is already registered. Try a different one. | Explain the issue and give a next step that can resolve it. |
| Input Field Label · India address | Enter your pincode | Enter your PIN code | Use the standard market term and acronym. |
| Info Text · India available credit | You are using ₹4000 of ₹20,000 of your available credit. | You are using ₹4,000 of ₹20,000 of your available credit | Apply currency grouping. The implemented change also removes the ending full stop. |
| Primary Button · requesting an authentication code | Send OTP | Get OTP | Describe the person’s outcome using the preferred authentication action. |
| Input Placeholder · transaction search | Search for anything... | Search transactions | Name the content the field actually searches. |

*Reasons are paraphrased. Final v7 rules explain aligned guidance; the tracker does not identify which version generated each historical change.*

## What I learned

### Richer context requires better documentation

The LLM needed more than writing rules. It needed to understand each market’s products, features and flows. Building that context meant collecting information and writing detailed documentation with other product designers. The richer and more specific that context became, the better the model could match its writing to the product and market. That documentation was a core part of building CopyGPT.

### The model needed a consistent vocabulary

The first component rules we created as a team lived in Google Sheets. We used “header” and “body” for an Accordion, but “title” and “description” for a Text Block. My first attempt at the algorithm failed repeatedly because the LLM struggled to connect those equivalent labels to the right rules. I had to clean the data and standardise the names for equivalent text positions, so the algorithm and references used a consistent vocabulary.

### Clarity came from doing the work

Before I started building, I spent too long researching and trying to resolve the uncertainty on paper. Writing the algorithm and assembling the JSON references made the project clearer: I could see where the data and instructions needed attention. I learned to approach ambiguity by building a first version, then using what it revealed to decide what to do next.

## Try CopyGPT

The case study will include a chatbot harness powered by Sonnet 5.5 through the API, using the v7 operating guide and JSON references.

Visitors will be able to paste UX writing or upload an app screenshot and ask for a rewrite. The model will use Branch’s product context, identify the components, clarify missing context and propose copy using the corresponding brand, market and component rules.

Visitors will use a single chat to submit a request, attach a screenshot and refine the response through follow-up messages.
