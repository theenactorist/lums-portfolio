'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fragmentTarget, repairedFragmentUrl } from '../lib/fragments.mjs';

export default function FragmentRecovery() {
  const pathname = usePathname();

  useEffect(() => {
    let frame;
    const repair = () => {
      const oldURL = window.location.href;
      const newURL = repairedFragmentUrl(oldURL, (id) => Boolean(document.getElementById(id)));
      if (!newURL) return;

      // Keep the existing entry and Next's history state so Back still works.
      window.history.replaceState(window.history.state, '', newURL);
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL }));
      frame = requestAnimationFrame(() => {
        document.getElementById(fragmentTarget(new URL(newURL).hash))
          ?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    };

    repair();
    window.addEventListener('hashchange', repair);
    window.addEventListener('popstate', repair);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', repair);
      window.removeEventListener('popstate', repair);
    };
  }, [pathname]);

  return null;
}
