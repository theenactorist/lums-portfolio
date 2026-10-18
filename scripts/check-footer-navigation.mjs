import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const origin = process.argv[2] || 'http://127.0.0.1:3065';
const protectedDeployment = process.argv.includes('--protected');
const exec = promisify(execFile);
const routes = ['/', '/resume', '/work', '/work/pulse', '/work/shiga-onboarding', '/work/carbon', '/work/ai-copywriting', '/work/branch-ai', '/work/sabi', '/work/uba', '/work/branch-ai-v1', '/work/branch-ai-original-v1', '/work/shiga-onboarding-v1', '/this-page-does-not-exist'];
const destinations = [
  { id: 'footer-work', label: 'Work', path: '/', hash: '#featured-work' },
  { id: 'footer-about', label: 'About', path: '/', hash: '#about' },
  { id: 'footer-resume', label: 'Resume', path: '/resume', hash: '' },
];

function checkBrand(container, location) {
  assert.ok(container.includes(`data-brand-mark="${location}"`), `${location} uses the shared mark`);
  const buttons = [...container.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)]
    .filter((button) => button[1].includes('aria-label="About the name Lums"'));
  assert.ok(buttons.length > 0, `${location} has an accessible name explanation control`);
  for (const button of buttons) {
    assert.equal(button[2].replace(/<[^>]*>/g, '').trim(), '*', `${location} asterisk is present`);
    assert.ok(button[1].includes('type="button"'));
    assert.ok(button[1].includes('aria-describedby='));
  }
  const text = container.replace(/<[^>]*>/g, '');
  assert.ok(text.includes('Lums is short for Olumide Olusesi—a name coined by former colleagues.'), `${location} retains the same approved name explanation`);
  for (const anchor of container.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) {
    assert.ok(!anchor[1].includes('<button'), 'Home link and asterisk button remain separate controls');
  }
}

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
      const nav = html.match(/<nav\b(?=[^>]*\bid="main-nav")[\s\S]*?<\/nav>/)?.[0];
      assert.ok(nav, 'Main navigation exists');
      checkBrand(nav, 'header');
      checkBrand(footer, 'footer');
      assert.ok(footer.includes('Open to product design roles where I can shape the product and help ship it.'));
      assert.ok(footer.includes('Designed and built by Lums, with AI.'));
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
