import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const origin = process.argv[2] || 'http://127.0.0.1:3065';
const protectedDeployment = process.argv.includes('--protected');
const exec = promisify(execFile);
const routes = ['/', '/resume', '/work', '/about', '/work/pulse', '/work/shiga-onboarding', '/work/carbon', '/work/ai-copywriting', '/work/branch-ai', '/work/sabi', '/work/uba', '/work/branch-ai-v1', '/work/branch-ai-original-v1', '/work/shiga-onboarding-v1', '/this-page-does-not-exist'];
const destinations = [
  { id: 'footer-work', label: 'Work', path: '/', hash: '#featured-work' },
  { id: 'footer-about', label: 'About', path: '/', hash: '#about' },
  { id: 'footer-resume', label: 'Resume', path: '/resume', hash: '' },
];

async function get(path) {
  if (!protectedDeployment) {
    const response = await fetch(origin + path);
    assert.equal(response.status, path === '/this-page-does-not-exist' ? 404 : 200);
    return response.text();
  }
  const cli = process.env.VERCEL_CLI_PATH || 'vercel';
  const command = cli.endsWith('.js') ? process.execPath : cli;
  const args = cli.endsWith('.js') ? [cli] : [];
  const { stdout } = await exec(command, [...args, 'curl', origin + path, '--scope', 'team_rBIoFQo258AbWGjBgNIyGJWp', '--', '--silent', '--show-error', '--compressed', '--max-time', '30'], { maxBuffer: 5 * 1024 * 1024 });
  return stdout;
}

// Check rendered labels against the current site's intended destinations.
// An old page returning HTTP 200 must not satisfy the About section contract.
const results = [];
for (let index = 0; index < routes.length; index += 3) {
  const batch = await Promise.all(routes.slice(index, index + 3).map(async (path) => {
    try {
      const html = await get(path);
      const footer = html.match(/<footer\b(?=[^>]*\bid="footer")[\s\S]*?<\/footer>/)?.[0];
      if (path === '/this-page-does-not-exist' && !footer) {
        assert.ok(html.includes('Page not found.'), 'Branded 404 remains available');
        return { path, passed: true, footerPresent: false, note: 'This branded 404 does not render a shared footer.' };
      }
      assert.ok(footer, 'Visible footer exists');
      const anchors = [...footer.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
      const links = destinations.map((expected) => {
        const matches = anchors.filter((a) => a[1].includes(`id="${expected.id}"`));
        assert.equal(matches.length, 1, `${expected.label} footer link is unique`);
        const [, attributes, content] = matches[0];
        assert.equal(content.replace(/<[^>]*>/g, '').trim(), expected.label);
        const href = attributes.match(/\bhref="([^"]*)"/)?.[1];
        const url = new URL(href, origin + path);
        assert.equal(url.origin, new URL(origin).origin);
        assert.equal(url.pathname, expected.path, `${expected.label} must reach its current page`);
        assert.equal(url.hash, expected.hash, `${expected.label} must reach its current section`);
        return { label: expected.label, href, destination: url.pathname + url.hash };
      });
      return { path, passed: true, links };
    } catch (error) {
      return { path, passed: false, error: error.message };
    }
  }));
  results.push(...batch);
}
const passed = results.every((result) => result.passed);
console.log(JSON.stringify({ origin, protectedDeployment, passed, routes: results }, null, 2));
process.exitCode = passed ? 0 : 1;
