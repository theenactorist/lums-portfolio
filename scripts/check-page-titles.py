"""Check served browser and sharing titles, including archives and prototypes."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
from urllib.error import HTTPError
from urllib.request import Request, urlopen

root = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('origin')
parser.add_argument('--protected', action='store_true')
parser.add_argument('--output', type=Path)
args = parser.parse_args()
canonical = ['/', '/resume', '/work', '/work/pulse', '/work/shiga-onboarding',
             '/work/carbon', '/work/ai-copywriting', '/work/branch-ai', '/work/sabi', '/work/uba']
archives = ['/work/branch-ai-v1', '/work/branch-ai-original-v1', '/work/shiga-onboarding-v1']
missing = ['/this-page-does-not-exist', '/work/this-project-does-not-exist']
prototypes = ['/' + p.relative_to(root / 'public').as_posix()
              for p in sorted((root / 'public').rglob('*.html'))]
expected = {'/': 'Lums | Product Design Engineer',
            '/resume': 'Résumé: Senior Product Designer | Lums',
            **{path: 'Page not found | Lums' for path in missing}}


class Titles(HTMLParser):
    def __init__(self):
        super().__init__()
        self.titles = []
        self.meta = {}
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == 'title':
            self.in_title = True
            self.titles.append('')
        if tag == 'meta':
            key = attr.get('property') or attr.get('name')
            if key in ['og:title', 'twitter:title']:
                self.meta.setdefault(key, []).append(attr.get('content', ''))

    def handle_data(self, data):
        if self.in_title:
            self.titles[-1] += data

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False


def fetch(item):
    path, user_agent = item
    url = args.origin.rstrip('/') + path
    if args.protected:
        cli = '/Users/olumide/.npm/_npx/f56f1f0dfbede539/node_modules/vercel/dist/vc.js'
        result = subprocess.run(['node', cli, 'curl', url, '--scope',
                                 'team_rBIoFQo258AbWGjBgNIyGJWp', '--', '--silent',
                                 '--show-error', '--compressed', '--include', '--max-time',
                                 '40', '--user-agent', user_agent], capture_output=True, check=True)
        data = result.stdout
        while True:
            sep = b'\r\n\r\n' if b'\r\n\r\n' in data else b'\n\n'
            head, _, body = data.partition(sep)
            status = int(head.splitlines()[0].split()[1])
            if body.startswith(b'HTTP/'):
                data = body
                continue
            break
    else:
        try:
            response = urlopen(Request(url, headers={'User-Agent': user_agent}), timeout=40)
        except HTTPError as error:
            response = error
        with response:
            status, body = response.status, response.read()
    page = Titles()
    page.feed(body.decode())
    return {'path': path, 'userAgent': user_agent, 'status': status,
            'titles': page.titles, 'sharingTitles': page.meta}


paths = canonical + archives + missing + prototypes
items = [(path, agent) for path in paths for agent in ['Mozilla/5.0', 'Googlebot']]
with ThreadPoolExecutor(max_workers=2 if args.protected else 4) as pool:
    records = list(pool.map(fetch, items))
checks = []


def check(label, passed):
    checks.append({'check': label, 'passed': bool(passed)})


for record in records:
    path, agent = record['path'], record['userAgent']
    label = f'{path} ({agent})'
    titles = record['titles']
    check(label + ': expected status', record['status'] == (404 if path in missing else 200))
    check(label + ': one browser title', len(titles) == 1)
    title = titles[0] if titles else ''
    check(label + ': no em dash; one vertical separator', '—' not in title and title.count(' | ') == 1)
    check(label + ': Lums title branding', title == expected['/'] if path == '/' else title.endswith(' | Lums'))
    if path in expected:
        check(label + ': requested exact title', title == expected[path])
    for key in ['og:title', 'twitter:title']:
        if path not in prototypes or key in record['sharingTitles']:
            check(label + ': ' + key + ' matches browser title', record['sharingTitles'].get(key) == [title])
for path in paths:
    browser, crawler = [r for r in records if r['path'] == path]
    check(path + ': browser and Googlebot title parity', browser['titles'] == crawler['titles'] and browser['sharingTitles'] == crawler['sharingTitles'])

# These demo scripts override document.title after loading; inspect the actual assignments too.
for name in ['public/work/stablecoin-checkout-sdk/app.js', 'public/work/stablecoin-checkout-sdk/concepts.js']:
    assignments = re.findall(r'document\.title\s*=\s*`([^`]+)`', (root / name).read_text())
    check(name + ': runtime title keeps the convention', len(assignments) == 1 and
          all('—' not in title and title.endswith(' | Lums') and title.count(' | ') == 1 for title in assignments))

result = {'origin': args.origin, 'checkedAt': datetime.now(timezone.utc).isoformat(),
          'passed': all(c['passed'] for c in checks), 'routes': len(paths),
          'checks': checks, 'records': records}
if args.output:
    args.output.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'passed': result['passed'], 'routes': len(paths), 'checks': len(checks),
                  'failed': [c for c in checks if not c['passed']]}, indent=2))
raise SystemExit(0 if result['passed'] else 1)
