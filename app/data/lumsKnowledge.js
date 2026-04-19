/* ============================================
   Lums Personal Knowledge Base
   ============================================
   Structured knowledge for the "Ask Lums" chatbot.
   This serves as the local personal LLM, enabling
   context-aware responses without API dependencies.
*/

const knowledge = {
  identity: {
    name: 'Olumide Olusesi',
    nickname: 'Lums',
    nicknameOrigin: 'Lums is a short form of Olumide Olusesi — crafted by past amazing colleagues who turned it into a badge of honor.',
    title: 'Senior Product Designer',
    location: 'Ontario, Canada',
    previousLocation: 'Lagos, Nigeria',
    email: 'consistentolusesi@gmail.com',
    bio: 'Lums is a product designer with 6+ years of experience, currently at Shiga Digital. He specializes in fintech, B2B, and cross-border payment design. He\'s shipped products used by millions across Africa and beyond.',
  },

  experience: [
    {
      company: 'Shiga Digital',
      role: 'Senior Product Designer',
      period: 'May 2024 — Present',
      description: 'Shaping the future of cross-border payments and crypto infrastructure for businesses across Africa and beyond. Designing payment flows, settlement systems, and compliance-heavy interfaces.',
      highlights: ['Cross-border payments', 'Crypto infrastructure', 'B2B fintech', 'Compliance UX'],
    },
    {
      company: 'Branch International',
      role: 'Senior Product Designer',
      period: 'Oct 2024 — Mar 2026',
      description: 'Designing lending and financial inclusion products for emerging markets — making credit accessible and transparent for millions of users.',
      highlights: ['Lending products', 'Financial inclusion', 'Emerging markets', 'Mobile-first design'],
    },
    {
      company: 'Carbon',
      role: 'Product Designer',
      period: 'Jun 2022 — Oct 2024',
      description: 'Revamped the home screen experience for a leading digital bank, improving feature discoverability by 40%. The CEO personally recognized the impact of the redesign.',
      highlights: ['Home screen redesign', '40% discoverability boost', 'Digital banking', 'User engagement'],
    },
    {
      company: 'Sabi',
      role: 'Senior Product Designer',
      period: '2021 — 2022',
      description: 'Built tools for supply chain logistics used by thousands of African SMEs daily. Handled inventory, commerce, and distribution at scale.',
      highlights: ['Supply chain', 'SME tools', 'Inventory management', 'B2B commerce'],
    },
    {
      company: 'UBA (United Bank for Africa)',
      role: 'Product Designer',
      period: 'Nov 2019 — Jun 2022',
      description: 'Designed an HR management system from concept to production for 20,000+ employees across 20 African countries.',
      highlights: ['HR systems', 'Enterprise design', '20 countries', '20K+ employees'],
    },
  ],

  tools: {
    design: ['Figma', 'Framer', 'Adobe XD', 'Sketch', 'Adobe Illustrator', 'Photoshop'],
    prototyping: ['Figma Prototyping', 'Framer Motion', 'ProtoPie', 'Principle'],
    research: ['Maze', 'Hotjar', 'UserTesting', 'Google Analytics', 'Mixpanel'],
    development: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Git'],
    collaboration: ['Jira', 'Linear', 'Notion', 'Confluence', 'Slack', 'Miro'],
    ai: ['Claude', 'ChatGPT', 'Gemini', 'Cursor', 'V0', 'AI pair programming'],
    primary: 'Figma is the primary tool — but Lums prototypes in code when animations are too complex to fake in a mockup.',
  },

  skills: {
    core: ['Product Design', 'UX Research', 'Interaction Design', 'Visual Design', 'Design Systems', 'Prototyping'],
    specialized: ['Fintech UX', 'B2B Design', 'Cross-border Payments', 'Crypto/DeFi', 'Mobile-first Design', 'Enterprise UX'],
    soft: ['Design Critiques', 'Mentoring', 'Cross-functional Collaboration', 'Stakeholder Management', 'Design Leadership'],
    process: ['User Research', 'Wire framing', 'Hi-fi Prototyping', 'Usability Testing', 'A/B Testing', 'Design Handoff'],
  },

  industries: {
    list: ['Fintech', 'Digital Banking', 'Crypto/Web3', 'Lending', 'Supply Chain/Logistics', 'Enterprise HR', 'B2B Commerce'],
    primary: 'Fintech is the primary domain — Lums believes cross-border payments is the most exciting design space right now.',
    range: 'From crypto to lending, logistics to enterprise — but onboarding remains the hardest UX problem across all of them.',
  },

  vibeCoding: {
    description: 'Lums is a vibe coder — he builds full-stack apps with AI pair programming because the best designers understand how things are built.',
    projects: [
      'Resume Engine (AI-powered) — generates tailored resumes with ATS scoring, built from scratch with AI pair programming.',
      'This portfolio — a Next.js site with Framer Motion, theme system, and an interactive ripple grid, all vibe coded.',
    ],
    philosophy: 'Ship fast, learn faster. If an animation is too complex for Figma, prototype it in code.',
    tools: 'Claude + Cursor + VS Code — AI pair programming is the ultimate design superpower.',
  },

  mentoring: {
    platform: 'ADPList',
    minutes: '1,200+ minutes',
    approach: 'Lums mentors designers on portfolio reviews, career transitions, and design process. His favorite moment? When mentees land their dream role and text him about it.',
    topics: ['Portfolio reviews', 'Career transitions', 'Design process', 'Interview prep', 'Fintech design'],
  },

  philosophy: {
    design: 'Ship fast, learn faster, and never fall in love with your first wireframe.',
    systems: 'Design systems are like gardens — they need pruning, feeding, and someone who actually cares about spacing tokens.',
    speed: 'Lums can go from user research synthesis to high-fidelity prototype in the same afternoon. Speed is a feature.',
    impact: 'Products used by 5M+ people. That number keeps him humble and ambitious in equal measure.',
    critique: 'Design critiques should be like jazz sessions — structured enough to be productive, loose enough for creative accidents.',
  },

  personal: {
    move: 'Moved from Lagos to Ontario, Canada.',
    food: 'Immediately missed Lagos jollof after moving to Canada. Some things Figma can\'t fix.',
    hobby: 'Browsing Dribbble at 2am and reverse-engineering transitions.',
    funFact: 'Lums moved from Lagos, Nigeria to Ontario, Canada — a chapter change that shaped how he designs for diverse, global markets.',
  },

  contact: {
    email: 'consistentolusesi@gmail.com',
    linkedin: 'linkedin.com/in/olumideolusesi',
    availability: 'Open to interesting projects, freelance collaborations, and mentoring sessions.',
  },
};

/* ============================================
   Response Templates — Organized by Intent
   ============================================ */
const responses = {
  greeting: [
    "Hey! I'm Lums — a product designer based in Ontario, Canada 🇨🇦. I'm currently at Shiga Digital, designing cross-border payment experiences. What would you like to know?",
    "Welcome! 👋 I'm Lums — I design fintech products that millions of people use. Ask me about my experience, tools, or the industries I've worked in.",
    "Hi there! I'm Olumide, but everyone calls me Lums. I've spent 6+ years designing products across fintech, crypto, and enterprise. What can I tell you?",
  ],

  experience: [
    `Lums has worked across 5 companies:\n\n• **Shiga Digital** (Current) — Cross-border payments & crypto\n• **Branch International** — Lending for emerging markets\n• **Carbon** — Digital banking (40% discoverability boost!)\n• **Sabi** — Supply chain logistics for African SMEs\n• **UBA** — HR systems for 20K+ employees across 20 countries\n\n6+ years of shipping products used by millions.`,
    `From Lagos to Ontario — here's the career timeline:\n\n📍 UBA → Sabi → Carbon → Shiga → Branch\n\nEach company taught Lums something the previous one couldn't. UBA was enterprise scale, Sabi was startup speed, Carbon was user obsession, and Shiga is the intersection of crypto + payments.`,
  ],

  tools: [
    `**Design:** Figma (primary), Framer, Adobe XD\n**Prototyping:** Figma + Framer Motion + code when needed\n**Research:** Maze, Hotjar, Mixpanel\n**Dev:** React, Next.js, HTML/CSS\n**AI:** Claude, Cursor, V0 — AI pair programming is the superpower\n\nFigma is home base, but if an animation is too complex to fake in a mockup, Lums will prototype it in code.`,
    `Lums is a Figma power user, but the toolkit goes deeper:\n\n🎨 Design → Figma, Framer, Adobe suite\n🔬 Research → Maze, Hotjar, UserTesting\n💻 Code → React, Next.js, JavaScript\n🤖 AI → Claude + Cursor for vibe coding\n\nThe philosophy: designers who understand how things are built, build better things.`,
  ],

  vibeCoding: [
    `Lums is a vibe coder — he builds full-stack apps with AI pair programming.\n\n**Notable projects:**\n• **Resume Engine** — AI-powered, generates tailored resumes with ATS scoring\n• **This portfolio** — Next.js + Framer Motion + interactive ripple grid\n\nTools: Claude + Cursor + VS Code. Ship fast, learn faster. If you can design it, you should be able to build it.`,
    `"The best designers understand how things are built." — that's Lums' mantra.\n\nHe vibe codes full-stack apps using AI pair programming. Recent builds:\n• A Resume Engine that generates ATS-optimized resumes\n• This portfolio with its interactive ripple grid and AI chat\n\nThe secret weapon? Claude + Cursor for rapid prototyping in code.`,
  ],

  industries: [
    `Lums has designed across:\n\n💰 **Fintech** — Carbon, Shiga, Branch\n🔗 **Crypto/Web3** — Shiga Digital\n📦 **Supply Chain** — Sabi\n🏢 **Enterprise** — UBA\n💳 **Lending** — Branch International\n\nFintech is the primary domain — cross-border payments is the most exciting design space right now.`,
    `From banking to blockchain, lending to logistics:\n\n• Digital Banking (Carbon)\n• Crypto Infrastructure (Shiga)\n• Lending & Financial Inclusion (Branch)\n• Supply Chain & Logistics (Sabi)\n• Enterprise HR (UBA)\n\nThe hardest UX problem across all of them? Still onboarding.`,
  ],

  philosophy: [
    `Lums' design philosophy in a nutshell:\n\n💡 "Ship fast, learn faster, never fall in love with your first wireframe"\n🌿 Design systems are gardens — prune, feed, care about spacing tokens\n⚡ Speed is a feature — user research to hi-fi prototype in one afternoon\n🎵 Critiques are jazz sessions — structured yet loose enough for happy accidents\n\nProducts used by 5M+ people — that number keeps him humble and ambitious.`,
  ],

  mentoring: [
    `Lums mentors designers on ADPList — 1,200+ minutes and counting.\n\n**Topics:** Portfolio reviews, career transitions, design process, interview prep, fintech career paths\n\n**Favorite moment?** When mentees land their dream role and text him about it.\n\nLums is always open to mentoring conversations — reach out!`,
  ],

  carbon: [
    `**Carbon** — Digital Banking (Jun 2022 — Oct 2024)\n\nLums revamped Carbon's home screen experience, improving feature discoverability by 40%. The CEO personally recognized the impact.\n\n**Focus areas:** Mobile banking, user engagement, feature discoverability, iterative testing\n**Impact:** Measurable improvement in how users find and use key banking features.`,
  ],

  shiga: [
    `**Shiga Digital** — Cross-Border Payments (May 2024 — Present)\n\nLums is currently at Shiga, designing the future of cross-border payments and crypto infrastructure for businesses.\n\n**Focus:** Payment flows, settlement systems, compliance UX, crypto rails\n**Why Shiga?** Cross-border payments is the most exciting design space right now — complex problems that impact real businesses.`,
  ],

  branch: [
    `**Branch International** — Lending (Oct 2024 — Mar 2026)\n\nDesigning lending and financial inclusion products for emerging markets — making credit accessible and transparent for millions.\n\n**Focus:** Lending flows, credit assessment UX, emerging market constraints, mobile-first\n**Impact:** Making credit accessible to underserved populations across emerging markets.`,
  ],

  sabi: [
    `**Sabi** — Supply Chain (2021 — 2022)\n\nBuilt tools for supply chain logistics used by thousands of African SMEs daily.\n\n**Focus:** Inventory management, B2B commerce, distribution logistics, SME tools\n**Impact:** Thousands of African small businesses use these tools daily for their operations.`,
  ],

  uba: [
    `**UBA** — Enterprise HR (Nov 2019 — Jun 2022)\n\nDesigned an HR management system from concept to production for 20,000+ employees across 20 African countries.\n\n**Focus:** Enterprise design, multi-country deployment, HR workflows, scalable systems\n**Impact:** 20K+ employees across 20 countries — Lums' first real taste of designing at scale.`,
  ],

  contact: [
    `📧 **Email:** consistentolusesi@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/olumideolusesi\n\nLums is open to interesting projects, freelance collaborations, and mentoring conversations. Don't be a stranger!`,
  ],

  personal: [
    `A few things about Lums beyond the pixels:\n\n🇳🇬→🇨🇦 Moved from Lagos to Ontario, Canada\n🍚 Immediately missed Lagos jollof (some things Figma can't fix)\n🌙 Guilty pleasure: Browsing Dribbble at 2am\n🌍 That move from Lagos shaped how he thinks about designing for diverse, global markets\n\nThe nickname? Crafted by amazing colleagues — a short form of Olumide Olusesi that just stuck.`,
  ],

  skills: [
    `**Core:** Product Design, UX Research, Interaction Design, Visual Design, Design Systems\n**Specialized:** Fintech UX, B2B Design, Cross-border Payments, Crypto/DeFi, Mobile-first\n**Process:** User Research → Wireframing → Hi-fi Prototyping → Testing → Design Handoff\n**Leadership:** Design critiques, mentoring, stakeholder management, cross-functional collaboration\n\n"Speed is a feature" — research to prototype in one afternoon.`,
  ],

  fallback: [
    "Interesting question! I'm a personal knowledge bot, so I'm best at answering about Lums' experience, tools, design philosophy, and industries. Try asking about one of those!",
    "I'm not sure about that one — I specialize in all things Lums. Try asking about experience, tools, vibe coding, or industries I've designed for!",
    "Good question, but that's a bit outside my knowledge. Ask me about Lums' career, design philosophy, or the companies he's worked at!",
  ],
};

/* ============================================
   Intent Detection — Pattern Matching
   ============================================ */
const intents = [
  { key: 'greeting', patterns: [/^(hi|hello|hey|yo|sup|what'?s up|howdy|greetings)/i, /^(who are you|tell me about yourself|introduce)/i] },
  { key: 'carbon', patterns: [/carbon/i] },
  { key: 'shiga', patterns: [/shiga/i] },
  { key: 'branch', patterns: [/branch/i] },
  { key: 'sabi', patterns: [/sabi/i] },
  { key: 'uba', patterns: [/uba|united bank/i] },
  { key: 'vibeCoding', patterns: [/vibe\s*cod/i, /ai\s*(pair|cod|build|programming)/i, /resume\s*engine/i, /code|coding|develop|build.*app/i] },
  { key: 'tools', patterns: [/tool|figma|software|stack|tech|framer|adobe|cursor/i] },
  { key: 'mentoring', patterns: [/mentor|adplist|coach|guidance|teaching/i] },
  { key: 'philosophy', patterns: [/philosophy|approach|principle|belief|mindset|how.*design|process/i] },
  { key: 'industries', patterns: [/industr|sector|domain|fintech|crypto|banking|b2b|enterprise|web3/i] },
  { key: 'skills', patterns: [/skill|capabilit|strength|what.*do|specialt|expertise/i] },
  { key: 'experience', patterns: [/experience|career|work|company|companies|portfolio|background|history|where.*work|job/i] },
  { key: 'personal', patterns: [/personal|fun\s*fact|hobby|lagos|nigeria|jollof|nickname|about.*lums|who.*lums/i] },
  { key: 'contact', patterns: [/contact|email|linkedin|reach|hire|freelance|available/i] },
];

/* ============================================
   Response Generator
   ============================================ */
export function generateResponse(query) {
  const trimmed = query.trim().toLowerCase();

  // Match intent
  for (const { key, patterns } of intents) {
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        const pool = responses[key];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }
  }

  // Fallback
  return responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
}

/* ============================================
   Chip Responses — Direct topic mapping
   ============================================ */
export function getChipResponse(chip) {
  const chipMap = {
    'Experience?': 'experience',
    'Tools?': 'tools',
    'Vibe coding?': 'vibeCoding',
    'Industries?': 'industries',
  };
  const key = chipMap[chip] || 'fallback';
  const pool = responses[key];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default knowledge;
