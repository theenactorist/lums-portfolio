'use client';

import { useCallback, useSyncExternalStore } from 'react';

const serverSnapshot = () => null;
function subscribe(onChange) {
  // The trusted reading content can be replaced during a server refresh. Keep
  // portals attached to the current slots instead of detached previous nodes.
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

export default function useCaseStudySlot(id) {
  const snapshot = useCallback(() => document.getElementById(id), [id]);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
