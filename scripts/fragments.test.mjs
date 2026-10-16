import assert from 'node:assert/strict';
import test from 'node:test';
import { fragmentTarget, repairedFragmentUrl } from '../app/lib/fragments.mjs';

const ids = new Set(['career', 'about', 'featured-work', 'results', 'résumé', 'literal#id']);
const repair = (href) => repairedFragmentUrl(href, (id) => ids.has(id));

test('repair a repeated section without losing query parameters', () => {
  assert.equal(repair('https://example.com/?utm_source=review&x=1#career#career'), 'https://example.com/?utm_source=review&x=1#career');
});
test('the last valid section expresses the requested destination', () => {
  assert.equal(repair('https://example.com/#career#about#featured-work'), 'https://example.com/#featured-work');
});
test('cross-page section repair preserves pathname and query', () => {
  assert.equal(repair('https://example.com/work/carbon?ref=home#results#results'), 'https://example.com/work/carbon?ref=home#results');
});
test('valid encoded and literal-hash IDs are left alone', () => {
  for (const hash of ['#career', '#%63areer', '#r%C3%A9sum%C3%A9', '#literal#id']) {
    assert.equal(repair('https://example.com/' + hash), null);
  }
});
test('encoded section IDs decode and canonicalize when repairing', () => {
  assert.equal(fragmentTarget('#r%C3%A9sum%C3%A9'), 'résumé');
  assert.equal(repair('https://example.com/#career#r%C3%A9sum%C3%A9'), 'https://example.com/#r%C3%A9sum%C3%A9');
});
test('unknown IDs, malformed encoding and hash-router URLs are not hidden', () => {
  for (const hash of ['', '#', '#missing', '#career#missing', '#missing#career', '#career#', '#career##about', '#career#%E0%A4%A', '#/signup/start', '#:~:text=career', '#career%23career']) {
    assert.equal(repair('https://example.com/' + hash), null, hash);
  }
  assert.equal(fragmentTarget('#%E0%A4%A'), '');
});
