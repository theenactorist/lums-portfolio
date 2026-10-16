export function fragmentTarget(hash) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ''));
  } catch {
    return '';
  }
}

// Repair only a sequence of real section IDs. Unknown fragments, hash routers,
// text fragments, malformed encoding and IDs that contain '#' stay untouched.
export function repairedFragmentUrl(href, hasTarget) {
  const url = new URL(href);
  if (!url.hash || hasTarget(fragmentTarget(url.hash))) return null;
  const parts = url.hash.slice(1).split('#');
  if (parts.length < 2) return null;
  const targets = parts.map(fragmentTarget);
  if (targets.some((target) => !target || !hasTarget(target))) return null;
  url.hash = encodeURIComponent(targets.at(-1));
  return url.href;
}
