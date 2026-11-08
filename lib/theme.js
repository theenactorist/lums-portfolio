// One theme rule for the whole site (Olumide, 7 Nov 2026): a theme the visitor picked with the
// toggle always wins. Without one, the visitor's local time decides: light from 7:00 am to
// 6:59 pm, dark from 7:00 pm to 6:59 am. The inline script below applies it before the first
// paint; the theme provider reads the result from <html data-theme>.

export const THEME_STORAGE_KEY = 'lums-theme-choice';
// Earlier keys: lums-theme-2 (current pages) and lums-theme (the older routes). A choice saved
// under either is moved to the new key once, the current pages' key first.
export const LEGACY_THEME_KEYS = ['lums-theme-2', 'lums-theme'];
export const DAY_FROM_HOUR = 7;
export const NIGHT_FROM_HOUR = 19;

export function themeForTime(date) {
  const hour = date.getHours();
  return hour >= DAY_FROM_HOUR && hour < NIGHT_FROM_HOUR ? 'light' : 'dark';
}

export function readSavedTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

// Moves a choice saved under an old key to the new key, once (the same steps as the inline
// script, for pages where that script doesn't run).
export function migrateLegacyTheme() {
  try {
    const storage = window.localStorage;
    if (readSavedTheme()) return;
    const legacy = LEGACY_THEME_KEYS.map((key) => storage.getItem(key)).find((value) => value === 'light' || value === 'dark');
    if (legacy) storage.setItem(THEME_STORAGE_KEY, legacy);
    for (const key of LEGACY_THEME_KEYS) storage.removeItem(key);
  } catch {
    // Storage blocked: nothing to move.
  }
}

// The theme the rule gives right now: the saved choice, or the clock.
export function resolveTheme(date = new Date()) {
  migrateLegacyTheme();
  return readSavedTheme() ?? themeForTime(date);
}

export function saveTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
}

// Runs in <head> before anything paints. Kept small and dependency-free; every storage call is
// guarded because blocked storage throws.
export const themeInitScript = `(function(){var d=document.documentElement,t=null;try{var s=localStorage,k=${JSON.stringify(THEME_STORAGE_KEY)},o=${JSON.stringify(LEGACY_THEME_KEYS)},v=s.getItem(k),i;if(v!=='light'&&v!=='dark'){v=null;for(i=0;i<o.length&&!v;i++){var l=s.getItem(o[i]);if(l==='light'||l==='dark')v=l}if(v)s.setItem(k,v);for(i=0;i<o.length;i++)s.removeItem(o[i])}t=v}catch(e){}if(!t){var h=new Date().getHours();t=h>=${DAY_FROM_HOUR}&&h<${NIGHT_FROM_HOUR}?'light':'dark'}d.setAttribute('data-theme',t)})();`;
