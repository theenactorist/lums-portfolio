import assert from 'node:assert/strict';
import test from 'node:test';
import { careerStart, yearsOfExperience, homeAboutLead } from '../../app/data/profile.js';

// Olumide's product design career started in November 2019. The site states completed years,
// so the number only goes up on 1 November each year.
test('career starts in November 2019', () => {
  assert.equal(careerStart.year, 2019);
  assert.equal(careerStart.month, 11);
});

test('years of experience counts completed years since November 2019', () => {
  assert.equal(yearsOfExperience(new Date(2026, 10, 6)), 7);
  assert.equal(yearsOfExperience(new Date(2026, 10, 1)), 7);
  assert.equal(yearsOfExperience(new Date(2026, 9, 31)), 6);
  assert.equal(yearsOfExperience(new Date(2027, 9, 31)), 7);
  assert.equal(yearsOfExperience(new Date(2027, 10, 1)), 8);
});

test('the About paragraph states the computed years', () => {
  assert.match(homeAboutLead, new RegExp(`^I’ve spent ${yearsOfExperience()} years designing at every size\\.`));
  assert.doesNotMatch(homeAboutLead, /Toronto|\+ years/);
});
