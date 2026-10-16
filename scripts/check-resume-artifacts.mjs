import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(readFileSync(new URL('../app/data/resume-artifacts.json', import.meta.url), 'utf8'));
for (const [path, expected] of Object.entries(manifest)) {
  const actual = createHash('sha256').update(readFileSync(new URL('../' + path, import.meta.url))).digest('hex');
  if (actual !== expected) throw new Error('Resume content and download differ. Regenerate with scripts/generate-resume.py before building.');
}
console.log('Resume page content, searchable PDF and print HTML match the generated manifest.');
