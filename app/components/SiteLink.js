'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Native fragment navigation avoids the router's cached-hash concatenation.
// A same-page fragment also keeps the current query string (including tracking).
export default function SiteLink({ href, ...props }) {
  const pathname = usePathname();
  if (typeof href === 'string' && href.includes('#')) {
    const hashIndex = href.indexOf('#');
    const page = href.slice(0, hashIndex);
    const destination = page === pathname ? href.slice(hashIndex) : href;
    return <a href={destination} {...props} />;
  }
  return <Link href={href} {...props} />;
}
