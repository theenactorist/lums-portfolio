import assert from 'node:assert/strict';
import test from 'node:test';
import { homeWorkGroups, productionHomeProjects } from '../../app/data/productionHomeProjects.js';

// Home shows the work cards in groups. Every project must sit in exactly one group,
// or a newly listed case study would be missing from Home while still on /work.
test('every Home project sits in exactly one work group', () => {
  const projectIds = productionHomeProjects.map((project) => project.id);
  const groupedIds = homeWorkGroups.flatMap((group) => group.projectIds);

  assert.deepEqual([...groupedIds].sort(), [...projectIds].sort());
  assert.equal(new Set(groupedIds).size, groupedIds.length, 'a project is listed in more than one group');
});

test('every work group has a heading and an intro', () => {
  homeWorkGroups.forEach((group) => {
    assert.ok(group.title && group.intro, `group ${group.id} needs a title and an intro`);
  });
});
