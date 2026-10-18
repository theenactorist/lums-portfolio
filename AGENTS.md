<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Page-title convention

Home uses `Lums | Product Design Engineer`. Other portfolio, archive,
print, prototype and missing-page titles use a concise description followed by
` | Lums`. Never use an em dash in a page title. Browser, Open Graph and Twitter
titles must match. Keep Olumide Olusesi in the visible biography, résumé, Person
schema and identity fields; `site.brand` is separate from `site.name`.
Run `python3 scripts/check-page-titles.py ORIGIN` against the production build
before publishing title changes (add `--protected` for a Vercel protected stage).
