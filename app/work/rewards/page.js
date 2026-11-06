import Link from '../../components/SiteLink'
import Image from 'next/image'
import CaseStudyProgressRail from '../../components/CaseStudyProgressRail'
import CaseStudyTimeline from '../../components/CaseStudyTimeline'
import './rewards-shell.css'
import ZoomableImage from '../pulse/PulseImage'
import HeroMedia from './HeroMedia'
import styles from './rewards.module.css'
import { productionHomeProjects } from '../../data/productionHomeProjects'

// Copy: HANDOVER.md “T5 copy” (approved by Olumide, 6 Nov 2026). Screens: T4's Figma exports at 2x, sample data only.
const branchAi = productionHomeProjects.find((project) => project.id === 'branch-ai')

const phases = [
  { id: 'overview', label: 'At a glance' },
  { id: 'goal', label: 'The goal' },
  { id: 'carbon', label: 'Carbon' },
  { id: 'constraint', label: 'Quarterly review' },
  { id: 'tiers', label: 'Benefits' },
  { id: 'branch', label: 'Branch' },
  { id: 'first-time', label: 'First-time users' },
  { id: 'returning', label: 'Returning users' },
  { id: 'compare', label: 'Side by side' },
  { id: 'results', label: 'Results' },
  { id: 'learned', label: 'What I learned' },
]

const review = [
  { title: 'You use Carbon', text: 'Wallet balance, transactions, savings, bills and on-time repayments all count.' },
  { title: 'Carbon records it', text: 'Every activity is logged against your account.' },
  { title: 'The quarter ends', text: 'One review runs across every customer.' },
  { title: 'Your tier changes', text: 'You move up, stay or move down.' },
  { title: 'The app shows it', text: 'Your new tier, its benefits and the next step.' },
]

// Figma 1981:3376 to 1981:3814 (duplicates of 1963:1642's screens), 750 wide at 2x; heights differ with the benefits.
const tierScreens = [
  { src: 'carbon-tier-1', height: 1624, alt: 'Carbon’s tiers screen on Tier 1, with its benefits and what Tier 2 adds' },
  { src: 'carbon-tier-2', height: 1956, alt: 'Carbon’s tiers screen on Tier 2, with its benefits and what Tier 3 adds' },
  { src: 'carbon-tier-3', height: 2030, alt: 'Carbon’s tiers screen on Tier 3, with its benefits and what Tier 4 adds' },
  { src: 'carbon-tier-4', height: 2194, alt: 'Carbon’s tiers screen on Tier 4, with its benefits and what Tier 5 adds' },
  { src: 'carbon-tier-5', height: 2488, alt: 'Carbon’s tiers screen on Tier 5, with its benefits and what Tier 6 adds' },
  { src: 'carbon-tier-6', height: 2062, alt: 'Carbon’s tiers screen on Tier 6, with all of its benefits and no next tier' },
  { src: 'carbon-tier-6-maintain', height: 1624, alt: 'Carbon’s Tier 6 screen on the Maintain your elite tier status tab, with three ways to keep the tier' },
]

// Recreated in Figma from the live app with sample data (T4), 360 by 800 at 2x.
const firstTimeScreens = [
  { src: 'branch-rewards-empty', alt: 'Branch’s Rewards tab with nothing earned yet: the invite code card with Copy, rows to earn cashback, redeem a code and learn about rewards, and an Invite Friends button' },
  { src: 'branch-invite', alt: 'Branch’s Invite and earn screen with a gift box illustration, the invite code and a Share Invite Code button' },
  { src: 'branch-redeem', alt: 'Branch’s Redeem Invite Code screen with a code field, an open gift box illustration and an Apply Code button' },
]

const returningScreens = [
  { src: 'branch-rewards-balance', alt: 'Branch’s Rewards tab with a ₦1,250 rewards balance and a Spend Rewards button, with cards to invite friends and earn cashback below' },
  { src: 'branch-spend', alt: 'Branch’s Spend Rewards screen with two options, Buy airtime and Buy data' },
  { src: 'branch-rewards-history', alt: 'Branch’s Rewards History with a ₦1,250 balance, ₦6,480 earned and ₦5,230 spent' },
  { src: 'branch-transactions-rewards', alt: 'Branch’s transaction history filtered to Rewards, listing bill pay cashbacks and airtime purchases in April 2026' },
]

const branchRules = [
  ['Bill cashback', 'Pay airtime, data, cable TV or electricity bills of ₦200 or more', '2% back, on up to five bill payments a month and on all airtime and data purchases above ₦200', 'Straight after the payment'],
  ['Referral', 'A friend joins with your invite code and repays their first loan', '₦2,000 for you and ₦2,000 for your friend', 'After your friend’s first repayment'],
  ['Spending', 'Use your rewards balance', 'Airtime or data', 'Straight away'],
]
const branchColumns = ['How you earn', 'What you get', 'When it lands']

const comparison = [
  ['What earns it', 'Wallet balance, transactions, savings, bills and on-time repayments', 'Paying bills of ₦200 or more', 'A friend joining with your code and repaying their first loan'],
  ['What you get', 'Access: better loan and savings rates, faster support, Carbon Zero', '2% back', '₦2,000 each'],
  ['When you see it', 'When the quarterly review moves your tier', 'Straight after the payment', 'After your friend’s first repayment'],
  ['What the design had to do', 'Make a slow change feel worth working toward', 'Show the money arriving and make it easy to spend', 'Make sharing easy and explain the wait'],
]
const comparisonColumns = ['Carbon tiers', 'Branch cashback', 'Branch referrals']

const results = [
  ['Branch', 'Bill payments had been one of the weaker parts of the app. After Rewards launched, more customers paid their bills through Branch, earning cashback and spending it on more bills. Rewards launched on Android in Nigeria, Kenya and India, and it’s still live in Nigeria today, in an app with more than 50 million downloads on Google Play.'],
  ['Carbon', 'Tiers are live in Carbon’s app on iOS and Android, with a help centre guide to all six, and Carbon was still emailing customers about their tier in 2025. Carbon has more than four million customers, and its app has more than 5 million downloads on Google Play.'],
]

const lessons = [
  ['Check what the data can do before designing.', 'At Carbon, the quarterly review shaped the whole experience, not just one screen.'],
  ['Match the screen to how fast the reward arrives.', 'Fast rewards need a visible balance and a history. Slow rewards need a clear picture of what’s coming.'],
  ['Explain once, then get out of the way.', 'New customers need the explainer; returning ones need their balance.'],
  ['Show the next step at every level.', 'Even at the top tier, there’s something to do: keep it.'],
]

function Section({ id, title, children }) {
  return <section className={styles.section} id={id} tabIndex={-1}><h2>{title}</h2><div className={styles.prose}>{children}</div></section>
}

function Definitions({ items }) {
  return (
    <dl className={styles.definitions}>
      {items.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}
    </dl>
  )
}

function Screens({ items, layout, sizes }) {
  return (
    <ul className={`${styles.screens} ${layout}`}>
      {items.map((item) => (
        <li key={item.src}>
          <ZoomableImage src={`/work/rewards/${item.src}.webp`} alt={item.alt} width={item.width ?? 720} height={item.height ?? 1600} sizes={sizes} />
        </li>
      ))}
    </ul>
  )
}

function RulesTable({ caption, columns, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table} ${styles.stacked}`}>
        {caption && <caption>{caption}</caption>}
        <thead><tr><td />{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>
          {rows.map(([heading, ...cells]) => (
            <tr key={heading}>
              <th scope="row">{heading}</th>
              {cells.map((cell, index) => <td key={columns[index]} data-label={columns[index]}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RewardsCaseStudy() {
  return (
    <main id="rewards-case" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/#featured-work">Work</Link><span aria-hidden="true">/</span><span aria-current="page">Rewards</span></nav>
          <h1>Designing Rewards for Growth at Carbon and Branch: Loyalty Tiers, Cashback and Referrals</h1>
          <div className={styles.intro}><p>Carbon and Branch both needed people to use the accounts they’d opened. Carbon rewarded them with tiers that unlock better products, and Branch rewarded them with money. I designed both.</p></div>
        </div>
        <HeroMedia />
      </header>
      <div className={styles.articleLayout}>
        <aside className={styles.chapterRail}><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></aside>
        <details className={styles.mobileContents}><summary>In this case study</summary><CaseStudyProgressRail phases={phases} orientation="vertical" variant="tree" /></details>
        <article className={styles.article}>
          <section className={`${styles.section} ${styles.overview}`} id="overview" tabIndex={-1}>
            <h2 className={styles.overviewLabel}>At a glance</h2>
            <div className={styles.overviewLayout}>
              <dl className={styles.facts}>
                <div><dt>Role</dt><dd>Product Designer at Carbon; Senior Product Designer on the growth team at Branch</dd></div>
                <div><dt>Companies</dt><dd>Carbon Finance, Branch International</dd></div>
                <div><dt>Markets</dt><dd>Carbon in Nigeria; Branch in Nigeria, Kenya and India</dd></div>
                <div><dt>Platforms</dt><dd>Carbon on iOS and Android; Branch on Android</dd></div>
                <div><dt>Team</dt><dd>Product managers and engineers at each company; Branch’s growth pod</dd></div>
                <div><dt>Timeline</dt><dd>Carbon, Jun 2022 to Oct 2024; Branch, Oct 2024 to Mar 2026</dd></div>
                <div><dt>Tools</dt><dd className={styles.tools}><span><Image src="/work/ai-copywriting/tools/figma.svg" alt="" width={18} height={18} />Figma,</span> <span>Neem (Branch’s design system),</span> <span>usability testing</span></dd></div>
              </dl>
              <div className={styles.overviewCopy}>
                <h3>Project TLDR:</h3>
                <ul>
                  <li>In Nigeria you can open an account in minutes with OPay, PalmPay, Kuda, FairMoney, Carbon or Branch. The hard part for each company is getting you to use it.</li>
                  <li>At Carbon I designed six tiers that unlock better loans, savings rates and support. At Branch I designed cashback on bills and a referral reward, both spent inside the app.</li>
                  <li>Both are live today. Carbon’s app has more than 5 million downloads on Google Play; Branch’s has more than 50 million.</li>
                </ul>
              </div>
            </div>
          </section>

          <Section id="goal" title="Getting people to use the accounts they’d opened">
            <p>In Nigeria, anyone who wants a digital account has plenty of choice: OPay, PalmPay, Kuda, FairMoney, Carbon, Branch and more. Opening an account takes minutes, so the harder job is getting people to use it: to keep money in the wallet, pay bills, use the card and come back for a loan.</p>
            <p>I worked on that problem twice. At Carbon the answer was tiers: the more you used Carbon, the higher your tier and the more you could access. At Branch, where Carbon was one of the apps we competed with, the answer was money: cashback when you paid a bill, and a reward when a friend you invited repaid their first loan.</p>
            <p>Both programs reward the same thing, using the app, but they pay out in very different ways. That difference shaped almost every design decision.</p>
          </Section>

          <Section id="carbon" title="Designing six tiers at Carbon">
            <p>Carbon is a credit-led digital bank in Nigeria with more than four million customers. The idea behind tiers was to reward customers who use Carbon well, by keeping money in their wallet, transacting, saving and repaying loans on time, with access that other customers don’t have yet.</p>
            <p>There are six tiers. Moving up unlocks things like higher loan offers at lower interest, applying for a loan twice a day, better savings interest, faster customer support, Carbon Zero (Carbon’s buy now, pay later, which spreads a payment over four instalments at 0% interest) and a direct line to the contact centre.</p>
            <p>Each tier got its own colour and badge, so customers can tell at a glance where they are:</p>
            <figure className={styles.figure}>
              <div className={styles.badgePanel}>
                <div><ZoomableImage src="/work/rewards/carbon-badges.webp" alt="Carbon’s six tier badges, hexagons numbered 1 to 6, each in its own colour" width={1312} height={351} sizes="(max-width: 767px) 80vw, 656px" /></div>
                <div><ZoomableImage src="/work/rewards/carbon-progress.webp" alt="Carbon’s tier progress row on Tier 3: Tiers 1 and 2 ticked, Tier 3 highlighted with You under it, Tiers 4 to 6 locked" width={1434} height={429} sizes="(max-width: 767px) 80vw, 478px" /></div>
              </div>
              <figcaption>The six tier badges. In the progress row, tiers you’ve passed are ticked, yours is highlighted and the ones ahead are locked.</figcaption>
            </figure>
          </Section>

          <Section id="constraint" title="Designing around a quarterly review">
            <p>What I wanted was a points counter that grew with every transfer and repayment, so customers could watch themselves get closer to the next tier. Research on reward programs supports this: people work harder for a reward as they get closer to it.</p>
            <p>The data didn’t allow it. Carbon recorded every activity that counted, from wallet balances and transfers to card payments, savings, Carbon Zero, loans and repayments, but it couldn’t total points in real time. Instead, a query ran across every customer at the end of each quarter and moved them up or down a tier.</p>
            <p>So I designed for what customers could rely on: the tier they’re on, what it gives them now, what the next tier adds and what gets them there. Progress shows as tiers, not points. Here’s how a customer moves between them:</p>
            <figure className={styles.figure}>
              <CaseStudyTimeline items={review} label="How a customer moves between tiers, step by step" className={styles.flow} />
              <figcaption>Tiers change once a quarter, not after each transaction, so the screens focus on what each tier gives you and how to reach the next.</figcaption>
            </figure>
            <p>Dropping a tier feels like losing something, so Carbon warned customers before it happened. Customers at risk of moving down got an email before the quarter closed, with ways to keep their tier, and customers who moved up got a welcome. Here are two of those emails:</p>
            <figure className={styles.figure}>
              <ul className={styles.emails}>
                <li><ZoomableImage src="/work/rewards/email-stay-on-track.webp" alt="Carbon’s email “Stay on Track & Enjoy More Perks!” from 20 March 2025, warning of a lower tier and listing four ways to keep it" width={901} height={1376} sizes="(max-width: 767px) 85vw, 360px" /></li>
                <li><ZoomableImage src="/work/rewards/email-welcome-tier-6.webp" alt="Carbon’s email “Welcome to Tier 6! It’s Time to Enjoy Your Perks” from 27 April 2025, listing what Tier 6 unlocks" width={826} height={1228} sizes="(max-width: 767px) 85vw, 360px" /></li>
              </ul>
              <figcaption>A warning less than two weeks before the quarter ended, with four ways to keep the tier, and a welcome a few weeks after it.</figcaption>
            </figure>
          </Section>

          <Section id="tiers" title="Showing what each tier unlocks">
            <p>Customers reach their tier from two places: a badge on their profile picture on the home screen, and a tier label on the Account page. Both open the tiers screen, which has two tabs. “Your benefits” lists what your tier gives you now and, under it, what the next tier adds. “Level up to the next tier” explains what moves you up: keeping ₦20,000 in your wallet, transacting regularly and saving. A “What are tiers?” link opens a short explainer for anyone seeing tiers for the first time.</p>
            <p>Here’s the flow, from the entry points to the explainers:</p>
            <figure className={`${styles.figure} ${styles.flowFigure}`}>
              <ZoomableImage src="/work/rewards/carbon-flow.webp" alt="Carbon’s tiers flow: the home screen and the Account page both lead to the tiers screen, which leads up to the What are tiers? article and across to the Level up tab, then the level-up sheet and the How to level up article" width={5830} height={5184} sizes="(max-width: 767px) 90vw, 760px" />
              <figcaption>Two ways in, two tabs, and help one tap away. This is the first iteration of the flow; the benefits for each tier were finalised later, in the six screens below.</figcaption>
            </figure>
            <p>Once the benefits for each tier were agreed, I designed all six versions of the screen, so each one shows the right benefits and the right next step. At Tier 6 there’s no next tier, so the second tab becomes “Maintain your elite tier status” and explains how to keep it.</p>
            <figure className={styles.figure}>
              <Screens items={tierScreens.map((screen) => ({ ...screen, width: 750 }))} layout={styles.screensFour} sizes="(max-width: 767px) 42vw, 180px" />
              <figcaption>All six tiers. Benefits build up as you climb, and at Tier 6 the next step becomes keeping your status.</figcaption>
            </figure>
            <p>I tested the screens with customers and refined them from their feedback before they shipped. Tiers are live in Carbon’s app on iOS and Android, and Carbon’s help centre walks customers through all six.</p>
          </Section>

          <Section id="branch" title="Designing cashback and referrals at Branch">
            <p>At Branch I took on rewards as the growth team’s product designer. The product manager and I shaped the flow and journey together; I designed the screens and the gift illustrations, working with the engineers in our growth pod. The goal matched Carbon’s: get customers who already had a Branch account to use it, for transfers, bills, their card and loans.</p>
            <p>This time the reward was money. Rewards launched on Android in Nigeria, Kenya and India. Here’s how customers earn and spend it in Nigeria:</p>
            <RulesTable caption="How rewards work at Branch in Nigeria" columns={branchColumns} rows={branchRules} />
            <p>Tying the referral reward to a repaid loan means Branch only pays for friends who actually borrow and repay. Limiting cashback on bill payments to five a month keeps its cost predictable.</p>
            <p>I designed for two kinds of customer: someone who has just joined and doesn’t know what Rewards is, and someone who has been earning and wants to see what they’ve got.</p>
          </Section>

          <Section id="first-time" title="Explaining rewards to someone who’s just joined">
            <p>A new customer opening the Rewards tab has nothing to see yet, so the tab explains rewards and gives them two ways to start earning straight away. Their invite code comes first, with one line on how referrals work, then the ways to earn, a way to redeem a friend’s code and a link to learn more. The main button is “Invite Friends”.</p>
            <figure className={styles.figure}>
              <Screens items={firstTimeScreens} layout={styles.screensThree} sizes="(max-width: 767px) 42vw, 230px" />
              <figcaption>Before you’ve earned anything, the tab leads with your invite code and the two ways to earn.</figcaption>
            </figure>
            <p>The gift box illustrations came from <Link className={styles.inlineLink} href="/work/branch-ai">the illustration workflow I built at Branch</Link>, so they match the rest of the app.</p>
          </Section>

          <Section id="returning" title="Helping returning customers see and trust their rewards">
            <p>Once a customer has earned something, the balance moves to the top with “Spend Rewards” under it, and the ways to earn become cards below. Spending opens airtime and data.</p>
            <p>A returning customer mostly wants to know one thing: did I get the cashback I expected? So every cashback appears as its own transaction, the transaction history has a Rewards filter, and a rewards history page shows the balance with everything earned and spent.</p>
            <figure className={styles.figure}>
              <Screens items={returningScreens} layout={styles.screensFour} sizes="(max-width: 767px) 42vw, 180px" />
              <figcaption>Your balance first, then the history behind it. Each cashback is its own transaction, so customers can check it against the bill.</figcaption>
            </figure>
            <p>The FAQ answers a question that matters when money is involved: is the bill discounted? No. You pay the full amount, and the cashback lands in your rewards balance straight after.</p>
            <figure className={styles.figure}>
              <Screens items={[{ src: 'branch-faq', alt: 'Branch’s Rewards FAQ with “When paying for a bill, will I pay less the cashback amount?” open, and a Chat with Us button' }]} layout={styles.screensSingle} sizes="240px" />
              <figcaption>Three short answers about earning and paying, with a way to chat with support.</figcaption>
            </figure>
            <p>I built every screen with Neem, Branch’s design system, so Rewards uses the same app bar, cards, list rows and buttons as the rest of the app. We tested the flow internally and with customers across several rounds before launch.</p>
          </Section>

          <Section id="compare" title="Tiers and cashback side by side">
            <p>Both programs reward people for using the app, but they differ in what customers get and how soon they see it:</p>
            <RulesTable columns={comparisonColumns} rows={comparison} />
            <p>The biggest difference is timing. Cashback lands seconds after a bill, while a new tier can take a quarter. That’s why the Carbon screens lean on what each tier unlocks, and the Branch screens lean on the balance and its history.</p>
          </Section>

          <Section id="results" title="Where they are now">
            <Definitions items={results} />
          </Section>

          <Section id="learned" title="What I’d carry into the next rewards program">
            <p>These programs taught me to:</p>
            <Definitions items={lessons} />
          </Section>
          <nav className={styles.next} aria-label="Next case study"><span>Next case study</span><Link href="/work/branch-ai">{branchAi.title}</Link></nav>
        </article>
      </div>
    </main>
  )
}
