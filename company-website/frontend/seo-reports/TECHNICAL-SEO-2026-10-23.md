# Technical SEO review — 23 October 2026

Reviewed the local production build and https://prasanthassociates.com. Changes below are local and have not been deployed.

## Confirmed issues fixed

1. **Content depended on JavaScript for visibility.** With scripts disabled, the homepage H1 and 23 reveal sections were transparent; the services H1 and 24 sections were also transparent. Service, project and contact headings had the same problem. Reveal content now starts visible in server HTML. JavaScript opts only offscreen elements into animation, with reduced-motion and missing-observer fallbacks.
2. **Invalid service quote URLs returned an HTTP 200 error page.** `/request-quote?service=seo-missing-service` now returns HTTP 404 and a `noindex` directive. Valid service forms and the default quote form still render normally. Validation runs on the server before the page's Suspense boundary.
3. **The turnkey short URL discarded visitors with a 404.** `/services/turnkey-construction` now permanently redirects (308) to `/services/turnkey-design-build-coimbatore`, retaining query parameters. Only the destination remains in the sitemap.
4. **Prominent internal service links still targeted hub fragments.** Footer and homepage FAQ service links, the Nilgiris villa link, and the modal's details link now target dedicated canonical service pages. Existing hub category/hash navigation remains supported.

The audit crawler also reuses successful sitemap checks when checking inbound links and retries transient network/429/5xx failures. Recovered failures remain visible as hosting warnings; unresolved failures still fail the audit.

## Verification

| Check | Result |
| --- | --- |
| Production build | Pass with `next build --webpack` |
| TypeScript | Pass |
| ESLint for source and changed audit scripts | No errors |
| SEO, analytics and submission regression tests | 18 passing |
| Local sitemap crawl | 39 URLs, 22 services, 0 errors, 5 advisory warnings |
| Canonicals, titles, descriptions, Open Graph, JSON-LD and internal links | No errors found by the crawler |
| No-JavaScript browser checks | H1 and reveal content visible on home, services, architectural design, Pricol project and contact pages |
| Redirect and invalid quote route | Browser HTTP checks confirm 308 and 404/noindex respectively |
| Existing service flows | All 22 quote forms render; filters, modal options and quote handoff still work |
| Responsive browser checks | Pages from all four service sectors fit desktop and mobile viewports; no uncaught browser errors |

The five local advisories are the 67-character homepage title and four relatively short pages (contact, Manjushree, Perur residential and the residential construction project). These are crawler heuristics, not missing tags or broken routes. Copy was not padded to satisfy a word-count threshold.

Current browser evidence: [browser-validation.json](browser-validation.json). Re-run unit checks with `npm run test:seo` and `npm run test:submissions`; crawl a running build with `npm run seo:audit -- http://127.0.0.1:3113`.

## Live hosting finding still open

The initial live crawl encountered intermittent 503 responses on several service URLs and a missing-page check. Targeted rechecks returned the expected 200/404 responses. A final crawl with retries completed across all 39 URLs with zero unresolved crawl errors, but two URLs required retries after a 503 and a network error:

- `/services/residential-construction`
- `/projects/residential-construction-project`

This is an observed availability problem, not proof of a persistent broken page. Its cause is unconfirmed; hosting/Cloudflare logs and Search Console crawl statistics are needed to distinguish runtime failures, edge failures and throttling. The local fixes do not resolve or establish the cause of these live failures.

Both `http://prasanthassociates.com/` and `https://www.prasanthassociates.com/` returned a 301 to the canonical HTTPS non-www homepage. No domain redirect correction was needed.

This review verifies technical responses and markup. Search Console indexing status, ranking changes and production field Core Web Vitals were not measured.

## References

- [Google: crawlable links and descriptive internal linking](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: canonical URLs and permanent redirects](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: HTTP status codes, soft 404s and server errors](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
- [Google: structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
