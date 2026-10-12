'use client';

import { useEffect } from 'react';

export default function CaseStudyEnhancements() {
  useEffect(() => {
    let frame=0;
    const update=()=>{
      frame=0;
      const root=document.getElementById('copygpt-case');
      if(!root)return;
      const links=[...root.querySelectorAll('.chapter-nav a, .mobile-chapters a')];
      const headings=[...root.querySelectorAll('.case-section')];
      if(!headings.length)return;
      const navHeight=parseFloat(getComputedStyle(root).getPropertyValue('--nav-height'))||72;
      const current=[...headings].reverse().find(h=>h.getBoundingClientRect().top<navHeight+64)||headings[0];
      const full=headings.map(h=>h.id);
      const ordered=[...new Set(links.map(link=>link.getAttribute('href').slice(1)))];
      const chapter=[...ordered].reverse().find(id=>full.indexOf(id)<=full.indexOf(current.id));
      links.forEach(link=>{if(link.getAttribute('href')===`#${chapter}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer=new MutationObserver(onScroll);
    const root=document.getElementById('copygpt-case');
    const onClick=event=>{
      const button=event.target.closest('.coverage-collapse');
      if(!button)return;
      const disclosure=button.closest('details');
      if(!disclosure)return;
      disclosure.open=false;
      disclosure.querySelector('summary')?.focus();
    };
    root?.addEventListener('click',onClick);
    if(root)observer.observe(root,{childList:true,subtree:true});
    update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{root?.removeEventListener('click',onClick);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);observer.disconnect();if(frame)cancelAnimationFrame(frame);};
  },[]);

  useEffect(() => {
    const root = document.getElementById('copygpt-case');
    if (!root) return;
    let activeHelp = null;
    let dismissedButton = null;
    let positionFrame = 0;
    let dismissTimer = 0;

    const cancelDismiss = () => { window.clearTimeout(dismissTimer); dismissTimer = 0; };

    const closeHelp = () => {
      cancelDismiss();
      if (!activeHelp) return;
      const { button, panel } = activeHelp;
      button.setAttribute('aria-expanded', 'false');
      button.removeAttribute('aria-describedby');
      if (panel.isConnected && panel.matches(':popover-open')) panel.hidePopover();
      activeHelp = null;
    };

    const positionHelp = () => {
      positionFrame = 0;
      if (!activeHelp) return;
      const { button, panel } = activeHelp;
      if (!button.isConnected) { closeHelp(); return; }
      const anchor = button.getBoundingClientRect();
      if (anchor.bottom < 0 || anchor.top > window.innerHeight) { closeHelp(); return; }
      panel.style.maxHeight = `${Math.max(0, window.innerHeight - 16)}px`;
      panel.style.overflowY = 'auto';
      const popup = panel.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const left = Math.max(8, Math.min(anchor.left + anchor.width / 2 - popup.width / 2, viewportWidth - popup.width - 8));
      const below = anchor.bottom + 8;
      const preferredTop = below + popup.height <= window.innerHeight - 8 ? below : anchor.top - popup.height - 8;
      const top = Math.max(8, Math.min(preferredTop, window.innerHeight - popup.height - 8));
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
    };

    const openHelp = (button, pinned = false) => {
      cancelDismiss();
      if (button === dismissedButton && !pinned) return;
      if (activeHelp?.button === button) {
        if (pinned) activeHelp.pinned = true;
        positionHelp();
        return;
      }
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel || !root.contains(panel) || typeof panel.showPopover !== 'function') return;
      closeHelp();
      dismissedButton = null;
      activeHelp = { button, panel, pinned };
      panel.showPopover();
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-describedby', panel.id);
      positionHelp();
    };

    const helpButton = target => target instanceof Element ? target.closest('button[data-workflow-help]') : null;
    const insideActiveHelp = target => target instanceof Node && activeHelp &&
      (activeHelp.button.contains(target) || activeHelp.panel.contains(target));

    const onHelpClick = event => {
      const button = helpButton(event.target);
      if (!button) return;
      if (activeHelp?.button === button && activeHelp.pinned) {
        dismissedButton = button;
        closeHelp();
      } else {
        dismissedButton = null;
        openHelp(button, true);
      }
    };
    const onPointerOver = event => {
      if (event.pointerType !== 'mouse') return;
      if (insideActiveHelp(event.target)) cancelDismiss();
      const button = helpButton(event.target);
      if (button) openHelp(button);
    };
    const onPointerOut = event => {
      if (event.pointerType !== 'mouse' || insideActiveHelp(event.relatedTarget)) return;
      const button = helpButton(event.target);
      if (button && !button.contains(event.relatedTarget)) dismissedButton = null;
      if (activeHelp && !activeHelp.pinned && document.activeElement !== activeHelp.button) {
        cancelDismiss();
        dismissTimer = window.setTimeout(closeHelp, 150);
      }
    };
    const onFocusIn = event => {
      const button = helpButton(event.target);
      if (button) openHelp(button);
    };
    const onFocusOut = event => {
      if (insideActiveHelp(event.relatedTarget)) return;
      dismissedButton = null;
      if (helpButton(event.target)) closeHelp();
    };
    const onOutsidePress = event => {
      if (activeHelp && !insideActiveHelp(event.target)) closeHelp();
    };
    const onEscape = event => {
      if (event.key !== 'Escape' || !activeHelp) return;
      dismissedButton = activeHelp.button;
      closeHelp();
      event.preventDefault();
      event.stopPropagation();
    };
    const onViewportChange = () => {
      if (!positionFrame) positionFrame = requestAnimationFrame(positionHelp);
    };

    root.addEventListener('click', onHelpClick);
    root.addEventListener('pointerover', onPointerOver);
    root.addEventListener('pointerout', onPointerOut);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    document.addEventListener('pointerdown', onOutsidePress);
    document.addEventListener('keydown', onEscape, true);
    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange);
    return () => {
      closeHelp();
      root.removeEventListener('click', onHelpClick);
      root.removeEventListener('pointerover', onPointerOver);
      root.removeEventListener('pointerout', onPointerOut);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('pointerdown', onOutsidePress);
      document.removeEventListener('keydown', onEscape, true);
      window.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
      if (positionFrame) cancelAnimationFrame(positionFrame);
    };
  }, []);
  return null;
}
