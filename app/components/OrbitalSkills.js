'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'leadership',
    label: 'Design Leadership',
    skills: [
      'Design Systems', 'Cross-functional Collaboration', 'Design Operations',
      'AI Workflow Integration', 'Documentation & Writing', 'Product Roadmap Planning',
      'Design Critiques', 'Stakeholder Alignment',
    ],
  },
  {
    id: 'core',
    label: 'Core Design',
    skills: [
      'End-to-end UX/UI', 'Figma', 'FigJam', 'Framer',
      'Interaction Design', 'Typography', 'Design Thinking', 'Prototyping',
    ],
  },
  {
    id: 'research',
    label: 'Research & Strategy',
    skills: [
      'Usability Testing', 'User Interviews', 'Journey Mapping',
      'A/B Testing', 'Heuristic Evaluation', 'Analytics Iteration', 'Competitive Analysis',
    ],
  },
  {
    id: 'technical',
    label: 'Technical & Delivery',
    skills: ['Vibe Coding', 'Design QA', 'Acceptance Criteria', 'User Stories'],
  },
];

// Elliptical scaling
const RADIUS_X = 140;
const RADIUS_Y = 55;

export default function OrbitalSkills() {
  const [rotation, setRotation] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const rAF = useRef(null);
  const animationControls = useRef(null);

  // Auto rotation loop for idle state
  useEffect(() => {
    if (activeId) return; // Pause auto-rotation when an item is active

    let lastTime = performance.now();
    const loop = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      
      // Advance by a tiny amount per frame (adjust 0.02 for speed)
      setRotation(prev => prev + (delta * 0.02));
      rAF.current = requestAnimationFrame(loop);
    };
    
    rAF.current = requestAnimationFrame(loop);
    
    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, [activeId]);

  const handleNodeClick = (id, index) => {
    if (activeId === id) {
      // Toggle off
      setActiveId(null);
      if (animationControls.current) animationControls.current.stop();
      return;
    }
    
    // Toggle on
    setActiveId(id);
    
    if (animationControls.current) animationControls.current.stop();

    // 1. Where is the node placed originally?
    const baseAngle = (index / CATEGORIES.length) * 360;
    
    // 2. We want the node to rest at the FRONT, which is 90 degrees (Math.sin = 1)
    // The visual angle is (baseAngle + targetRotation) % 360 = 90
    // So targetRotation = 90 - baseAngle.
    const currentMod = rotation % 360;
    let targetMod = (90 - baseAngle) % 360;
    if (targetMod < 0) targetMod += 360;
    
    // 3. Find the shortest rotational path to prevent "unwinding"
    let diff = targetMod - currentMod;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    const targetRotation = rotation + diff;

    // 4. Animate it fluidly natively through Framer Motion
    animationControls.current = animate(rotation, targetRotation, {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      onUpdate: (latest) => setRotation(latest)
    });
  };

  const activeCategory = CATEGORIES.find(c => c.id === activeId);

  // Calculate the mapped nodes with Depth and Z-Indexing
  const nodes = CATEGORIES.map((cat, i) => {
    const deg = ((i / CATEGORIES.length) * 360 + rotation) % 360;
    const rad = (deg * Math.PI) / 180;
    
    // Elliptical coordinate calculation
    const x = Math.cos(rad) * RADIUS_X;
    const y = Math.sin(rad) * RADIUS_Y;
    
    // Depth from 0 (back) to 1 (front)
    const depth = (1 + Math.sin(rad)) / 2;
    
    const opacity = Math.max(0.2, 0.2 + 0.8 * depth);
    const scale = activeId === cat.id ? 1.25 : (0.7 + 0.3 * depth);
    
    // Nodes in the back go under the center hub (z: 100), nodes in the front come over it.
    const zIndex = Math.round(100 - 50 + (depth * 100));

    return { ...cat, index: i, x, y, opacity, scale, zIndex, depth };
  });

  return (
    <div className="orbital-wrapper" style={{ perspective: '800px' }}>
      <motion.div
        className="orbital"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <svg className="orbital__rings" viewBox="-180 -100 360 200">
          <ellipse cx="0" cy="0" rx={RADIUS_X} ry={RADIUS_Y} className="orbital__ring-line" />
        </svg>

        <div className="orbital__center" style={{ zIndex: 100 }}>
          <div className="orbital__center-glow" />
          <svg width="44" height="44" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="orbital__logo">
            <rect width="28" height="27.8137" rx="13.9068" className="orbital__logo-bg" />
            <path d="M8.04297 8.00667C8.83761 7.9903 9.68392 8.01008 10.4876 8.00329C10.4637 8.91452 10.4816 9.92219 10.4834 10.8386L10.483 15.5039C10.036 15.7259 9.74547 15.9214 9.34402 16.2246C9.75355 16.0936 10.1 15.9906 10.5293 15.9285C12.421 15.6547 14.3367 16.2583 15.9009 17.3117C16.1985 17.5122 16.578 17.8231 16.8688 18.0456C17.7818 18.7437 18.4137 19.0403 19.5174 19.2949C19.6836 19.3262 19.8331 19.3476 20 19.3699C19.5246 19.5733 18.9542 19.6889 18.4428 19.7579C14.3613 20.3084 12.8057 16.5585 8.0046 18.3475L8.00528 11.3463L8.00652 9.12751C8.00669 8.82951 7.98929 8.30789 8.01066 8.03347L8.04297 8.00667Z" className="orbital__logo-mark" />
          </svg>
        </div>

        {nodes.map((node) => (
          <button
            key={node.id}
            className={`orbital__node${activeId === node.id ? ' orbital__node--active' : ''}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px)) scale(${node.scale})`,
              opacity: node.opacity,
              zIndex: node.zIndex,
              boxShadow: activeId === node.id ? '0 0 24px rgba(235,90,50, 0.4)' : 'none',
              transition: activeId ? 'transform 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease' : 'opacity 0.1s',
            }}
            onClick={() => handleNodeClick(node.id, node.index)}
            aria-label={node.label}
            aria-pressed={activeId === node.id}
          >
            {node.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeCategory ? (
          <motion.div
            key={activeCategory.id}
            className="orbital-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="orbital-panel__title">{activeCategory.label}</p>
            <div className="orbital-panel__chips">
              {activeCategory.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="orbital-panel__chip"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            className="orbital-panel__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Click a category to explore skills
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
