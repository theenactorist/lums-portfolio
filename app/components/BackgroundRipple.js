'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================
   Personal LLM Knowledge Base — Lums Facts
   ============================================ 
   Each fact is a concise, unique insight about 
   Olumide "Lums" Olusesi. The easter egg cycles 
   through these without repeating until all have 
   been shown.
*/
const LUMS_FACTS = [
  "Lums once redesigned a banking home screen that boosted feature discoverability by 40% — and the CEO personally thanked him.",
  "Before fintech, Lums cut his teeth designing HR systems for 20,000+ employees across 20 African countries at UBA.",
  "Lums is a vibe coder — he builds full-stack apps with AI pair programming because he believes the best designers understand how things are built.",
  "The nickname 'Lums' was crafted by past amazing colleagues — a short form of Olumide Olusesi that just stuck.",
  "Lums mentors over 1,200+ minutes on ADPList. His favorite thing? When mentees land their dream role and text him about it.",
  "He's designed for crypto, lending, logistics, and enterprise — but if you ask him, the hardest UX problem is still onboarding.",
  "Lums built a Resume Engine (AI-powered) from scratch using vibe coding — it generates tailored resumes with ATS scoring.",
  "His design philosophy: ship fast, learn faster, and never fall in love with your first wireframe.",
  "Lums has designed for users across multiple markets and continents. At this point, multi-market UX is basically his native language.",
  "Lums uses Figma, but he'll prototype in code when the animation is too complex to fake in a mockup.",
  "He once helped a supply chain startup (Sabi) build tools that thousands of African SMEs use daily for inventory and distribution.",
  "Lums believes cross-border payments is the most exciting design space right now — that's why he's at Shiga.",
  "Fun fact: Lums can go from user research synthesis to high-fidelity prototype in the same afternoon. Speed is a feature.",
  "He designed Branch International's lending products for emerging markets — making credit accessible and transparent for millions.",
  "Lums has shipped products used by 5M+ people. That number keeps him humble and ambitious in equal measure.",
  "His guilty pleasure? Browsing Dribbble at 2am and reverse-engineering transitions he likes.",
  "Lums treats design systems like gardens — they need pruning, feeding, and someone who actually cares about spacing tokens.",
  "Lums' one genuine source of design anxiety? AI tools shipping faster than he can learn them. There's probably a new model dropping right now.",
  "Lums runs design critiques like jazz sessions — structured enough to be productive, loose enough for creative accidents.",
  "He's worked at Carbon, UBA, Sabi, Branch, and Shiga — each one taught him something the previous one couldn't.",
  "Lums holds a B.Sc. in Civil Engineering — and yes, systems thinking from that degree shows up directly in how he architects design systems.",
  "At Branch International, Lums built an AI tool that cut PRD-to-prototype time from 3 weeks to 3 days. Three weeks. To three days.",
  "He's a certified Information Technology Professional (ITP) in Canada — designer by passion, professional by two degrees.",
  "Lums helped Shiga secure $1.2M in funding from Tether and a spot in the Visa Accelerator — just by translating a founder's vision into product.",
  "He founded a Beta-Testing Community of 120+ participants at Carbon — cutting external research costs by 25% and staying close to real users.",
  "Lums architected a design system called Helium 2.0 from scratch: 263 color variables, full dark/light modes, ready for Android, iOS, and web.",
  "At Branch, his AI tools were adopted 500+ times across 6 teams in 4 countries. That's not a side project — that's infrastructure.",
  "Lums built a Telegram Mini-App POS for Shiga using Gemini and Claude. It was good enough to secure direct funding from Telegram (TON).",
  "He redesigned KYC onboarding at Branch and pushed approval rates from 42% to 56% — that's 14 percentage points of people who now get access to credit.",
  "His MailerLite reactivation campaign at Shiga hit a 73% open rate. For context, industry average is around 20%.",
  "Lums has designed for Kenya, India, Nigeria — simultaneously. Multi-market UX is basically his native language.",
  "He calls himself a 'full-stack product designer' — not because it sounds cool, but because he's actually done the motion graphics, the design systems, the research, and the vibe coding.",
  "Lums dedicates 1 hour every day to studying design trends. Consistent learning, compounding daily. That's not discipline — that's identity.",
  "He prefers small, highly committed teams — 'the 300 of Gideon' — where every person's contribution is indispensable.",
  "Lums has designed for Nigeria, Kenya, India, and the US — four markets, three continents, one consistent design bar.",
];

/* ============================================
   Background Ripple Grid Component
   ============================================ */
export default function BackgroundRipple({
  rows = 8,
  cols = 27,
  cellSize = 56,
  className = '',
}) {
  const [mounted, setMounted] = useState(false);
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [tapCounts, setTapCounts] = useState({});
  const [easterEgg, setEasterEgg] = useState(null);
  const shownFactsRef = useRef(new Set());
  const tapTimerRef = useRef({});
  const rippleClearRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Get a non-repeating random fact
  const getRandomFact = useCallback(() => {
    const shown = shownFactsRef.current;
    // Reset if all facts have been shown
    if (shown.size >= LUMS_FACTS.length) {
      shown.clear();
    }
    const available = LUMS_FACTS.filter((_, i) => !shown.has(i));
    const randomIdx = Math.floor(Math.random() * available.length);
    const factIdx = LUMS_FACTS.indexOf(available[randomIdx]);
    shown.add(factIdx);
    return available[randomIdx];
  }, []);

  const handleCellClick = useCallback((row, col, e) => {
    // Trigger ripple animation
    setClickedCell({ row, col });
    setRippleKey((k) => k + 1);

    // Reset after longest possible animation
    if (rippleClearRef.current) clearTimeout(rippleClearRef.current);
    rippleClearRef.current = setTimeout(() => setClickedCell(null), 1500);

    const key = `${row}-${col}`;
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Clear previous tap timer for this cell (reset on inactivity)
    if (tapTimerRef.current[key]) {
      clearTimeout(tapTimerRef.current[key]);
    }

    setTapCounts((prev) => {
      const current = (prev[key] || 0) + 1;

      if (current >= 5) {
        const fact = getRandomFact();
        // Clamp tooltip X so it stays within viewport
        const halfW = Math.min(240, window.innerWidth / 2 - 12);
        const clampedX = Math.min(Math.max(clickX, halfW + 12), window.innerWidth - halfW - 12);
        // Position above the tap; flip below if too close to top
        const above = clickY > 160;
        setEasterEgg({ fact, x: clampedX, y: clickY, above });

        setTimeout(() => setEasterEgg(null), 8000);
        return { ...prev, [key]: 0 };
      }

      return { ...prev, [key]: current };
    });

    // Reset tap count after 3 seconds of inactivity on this cell
    tapTimerRef.current[key] = setTimeout(() => {
      setTapCounts((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 3000);
  }, [getRandomFact]);

  return (
    <div className={`ripple-grid ${className}`}>
      <DivGrid
        rows={rows}
        cols={cols}
        cellSize={cellSize}
        clickedCell={clickedCell}
        rippleKey={rippleKey}
        onCellClick={handleCellClick}
        tapCounts={tapCounts}
      />

      {/* Easter Egg Popup — portalled to body to escape parent stacking contexts */}
      {mounted && createPortal(
        <AnimatePresence>
          {easterEgg && (
            <motion.div
              className="ripple-easter-egg"
              style={{
                left: easterEgg.x,
                top: easterEgg.above ? easterEgg.y - 16 : easterEgg.y + 16,
                transform: easterEgg.above
                  ? 'translate(-50%, -100%)'
                  : 'translate(-50%, 0%)',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 22, stiffness: 320 }}
              onClick={() => setEasterEgg(null)}
            >
              <div className="ripple-easter-egg__glow" />
              <div className="ripple-easter-egg__icon">✨</div>
              <p className="ripple-easter-egg__text">{easterEgg.fact}</p>
              <span className="ripple-easter-egg__hint">tap to dismiss</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

/* ============================================
   DivGrid — Renders the cell grid
   ============================================ */
function DivGrid({
  rows,
  cols,
  cellSize,
  clickedCell,
  rippleKey,
  onCellClick,
  tapCounts,
}) {
  const cells = useMemo(() => {
    const result = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({ row: r, col: c });
      }
    }
    return result;
  }, [rows, cols]);

  return (
    <div
      key={rippleKey}
      className="ripple-grid__cells"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {cells.map(({ row, col }) => {
        const key = `${row}-${col}`;
        const taps = tapCounts[key] || 0;

        // Calculate ripple distance and delay
        let distance = 0;
        let shouldAnimate = false;

        if (clickedCell) {
          distance = Math.hypot(clickedCell.row - row, clickedCell.col - col);
          shouldAnimate = true;
        }

        const delay = distance * 55;
        const duration = 200 + distance * 80;

        return (
          <div
            key={key}
            className={`ripple-cell ${shouldAnimate ? 'ripple-cell--animate' : ''} ${taps > 0 ? 'ripple-cell--tapped' : ''}`}
            style={{
              '--delay': `${delay}ms`,
              '--duration': `${duration}ms`,
              '--tap-progress': taps / 5,
              animationName: shouldAnimate ? 'cell-ripple' : 'none',
              animationDelay: `${delay}ms`,
              animationDuration: `${duration}ms`,
            }}
            data-ripple-key={rippleKey}
            onClick={(e) => onCellClick(row, col, e)}
          />
        );
      })}
    </div>
  );
}
