'use client';

import { usePathname } from 'next/navigation';

// The router caches an incoming fragment and can reuse it even for a page link.
// Native navigation gives every destination its own URL and browser history.
export default function SiteLink({ href, ...props }) {
  const pathname = usePathname();
  let destination = href;
  if (typeof href === 'string' && href.includes('#')) {
    const hashIndex = href.indexOf('#');
    const page = href.slice(0, hashIndex);
    // A same-page fragment retains the current query, including tracking.
    if (page === pathname) destination = href.slice(hashIndex);
  }
  return <a href={destination} {...props} />;
}
