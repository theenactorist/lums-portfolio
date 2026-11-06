// Annotated screens for the rewards case study (T5 V5). Steps are word for word from “T5 copy”. Region boxes are
// fractions of each frame (0 to 1, from its top-left), copied from T4a's regions.json (measured in Figma from layer
// bounds on 6 Nov 2026, not by eye). The images are the same frames exported at 2x.
// Branch returning: regions.json has five regions; “T5 copy” has six steps top to bottom (T4a Q1). Its two-box
// region 5 is split: Redeem (the first box) is step 4 and Learn (the second box) is step 6; the history row is step 5.

export const carbonTier3 = {
  src: '/work/rewards/carbon-tier-3.webp',
  width: 750,
  height: 2030,
  alt: 'Carbon’s tiers screen on Tier 3, with its benefits and what Tier 4 adds',
  label: 'How the Tier 3 screen is ordered, from the top',
  steps: [
    { title: 'Where you stand.', text: 'Your photo with your tier badge, and “You’re on TIER 3” in your tier’s colour. It’s the first thing customers look for, so it leads the screen.', boxes: [{ x: 0.1587, y: 0.1025, width: 0.6827, height: 0.0488 }] },
    { title: 'How far you’ve come.', text: 'Six steps in a row: tiers you’ve passed are ticked, yours is marked “You”, and the ones ahead are locked. It shows progress without a points total the data couldn’t keep up to date.', boxes: [{ x: 0.1231, y: 0.1749, width: 0.7538, height: 0.0613 }] },
    { title: 'What tiers are.', text: 'A small “What are tiers?” link for anyone new, which opens a short explainer. It’s kept quiet so it doesn’t compete with your status.', boxes: [{ x: 0.3707, y: 0.2621, width: 0.2587, height: 0.0197 }] },
    { title: 'Now or next.', text: 'Two tabs separate what you have today from how to get more, so neither list gets long.', boxes: [{ x: 0.0427, y: 0.3054, width: 0.9147, height: 0.0433 }] },
    { title: 'Your benefits first.', text: 'What you can use right now, each with an icon and one line on what it means for you.', boxes: [{ x: 0.0427, y: 0.3724, width: 0.9147, height: 0.1852 }] },
    { title: 'What’s next.', text: 'The next tier’s benefits sit right under yours, so every visit shows what you’d gain by moving up.', boxes: [{ x: 0.0427, y: 0.6049, width: 0.9147, height: 0.2522 }] },
    { title: 'One next step.', text: '“Level up to the next tier” closes the list and opens the second tab.', boxes: [{ x: 0.0427, y: 0.8808, width: 0.9147, height: 0.0197 }] },
  ],
}

export const carbonLevelUp = {
  src: '/work/rewards/carbon-level-up.webp',
  width: 750,
  height: 2454,
  alt: 'Carbon’s Level up tab for Tier 3: the next tier, what Tier 4 adds, how to level up and a Learn more link',
  label: 'How the Level up tab is ordered, from the top',
  steps: [
    { title: 'The goal.', text: '“Next tier: Tier 4”, with a lock, so the target is concrete.', boxes: [{ x: 0.0427, y: 0.3081, width: 0.9147, height: 0.0391 }] },
    { title: 'The reward.', text: 'What Tier 4 adds, repeated here so customers don’t have to switch tabs to remember why it’s worth it.', boxes: [{ x: 0.0427, y: 0.3667, width: 0.9147, height: 0.2086 }] },
    { title: 'The steps.', text: 'Three things that count, in plain words: keep ₦20,000 in your wallet, transact regularly and save.', boxes: [{ x: 0.0427, y: 0.6145, width: 0.9147, height: 0.3081 }] },
    { title: 'The detail, if you want it.', text: '“Learn more” opens the full article on how each activity earns points.', boxes: [{ x: 0.0427, y: 0.9421, width: 0.9147, height: 0.0163 }] },
  ],
}

export const branchFirstTime = {
  src: '/work/rewards/branch-rewards-empty.webp',
  width: 720,
  height: 1600,
  alt: 'Branch’s Rewards tab with nothing earned yet: the invite code card with Copy, rows to earn cashback, redeem a code and learn about rewards, and an Invite Friends button',
  label: 'How the Rewards tab is ordered for a new customer, from the top',
  steps: [
    { title: 'Your invite code.', text: 'The one thing a new customer can act on right away, so it leads, with Copy attached.', boxes: [{ x: 0.0444, y: 0.1013, width: 0.9111, height: 0.16 }] },
    { title: 'The deal.', text: '“Earn ₦2,000 in rewards when friends you invite repay their first loan. They earn ₦2,000 as well.” It sits right under the code, so the reason to share is next to the thing you share.', boxes: [{ x: 0, y: 0.2612, width: 1, height: 0.09 }] },
    { title: 'The other way to earn.', text: '“Earn 2% cashbacks on bill payments” is a row, not a card, because it’s the second option.', boxes: [{ x: 0, y: 0.3812, width: 1, height: 0.07 }] },
    { title: 'Joined through a friend?', text: '“Redeem invite code” is there for customers who came in with a code.', boxes: [{ x: 0, y: 0.4512, width: 1, height: 0.07 }] },
    { title: 'Questions.', text: '“Learn about rewards” opens the FAQ, last.', boxes: [{ x: 0, y: 0.5212, width: 1, height: 0.07 }] },
    { title: 'One main button.', text: '“Invite Friends”, pinned at the bottom of the screen.', boxes: [{ x: 0.0416, y: 0.8, width: 0.9111, height: 0.08 }] },
  ],
}

export const branchReturning = {
  src: '/work/rewards/branch-rewards-balance.webp',
  width: 720,
  height: 1600,
  alt: 'Branch’s Rewards tab with a ₦1,250 rewards balance and a Spend Rewards button, with cards to invite friends and earn cashback below',
  label: 'How the Rewards tab is ordered for a returning customer, from the top',
  steps: [
    { title: 'Your balance.', text: 'What you’ve earned and not spent, in the largest type on the screen.', boxes: [{ x: 0.0444, y: 0.1013, width: 0.9111, height: 0.13 }] },
    { title: 'Spend it.', text: '“Spend Rewards” is attached to the balance and opens airtime and data, so earning leads straight to spending.', boxes: [{ x: 0.0444, y: 0.2313, width: 0.9111, height: 0.05 }] },
    { title: 'Keep earning.', text: 'Invite and earn and bill cashback move down into cards: still easy to reach, but no longer the headline.', boxes: [{ x: 0.0444, y: 0.3113, width: 0.9111, height: 0.28 }] },
    { title: 'Redeem a code.', text: 'Still one tap away for anyone who has a friend’s code.', boxes: [{ x: 0, y: 0.6212, width: 1, height: 0.07 }] },
    { title: 'Check it.', text: '“View rewards history” shows everything earned and spent.', boxes: [{ x: 0, y: 0.6913, width: 1, height: 0.07 }] },
    { title: 'Questions.', text: '“Learn about rewards” opens the FAQ, last.', boxes: [{ x: 0, y: 0.7612, width: 1, height: 0.07 }] },
  ],
}
