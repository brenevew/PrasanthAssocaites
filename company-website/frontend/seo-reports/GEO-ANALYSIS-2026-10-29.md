# GEO Analysis: prasanthassociates.com

Date: 2026-10-29. Scope: home, /locations/coimbatore, /locations/nilgiris-ooty, /about, /blog, /blog/building-plan-approval-coimbatore-nilgiris, robots.txt, llms.txt. Pages were fetched without running JavaScript, as GPTBot and PerplexityBot do.

Google's own guidance (AI optimization guide, Search Central) is that optimizing for AI Overviews and AI Mode "is still SEO". The findings below are SEO fundamentals applied to AI answers, not a separate discipline.

## 1. GEO Readiness Score: 69/100

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Citability | 25 | 17 | Blog posts open with the answer and use tables. Location-page FAQs dodge the most-asked question (cost). |
| Structural readability | 20 | 16 | One H1 per page, clean H2/H3 order, question headings on blog and FAQs. Some headings lose a space in plain-text extraction. |
| Multi-modal | 15 | 10 | Real project photos, cost calculator, building planner. No video anywhere. |
| Authority and brand signals | 20 | 8 | Posts dated, real reviews on Google. Almost no mentions of the brand off the site; no named people (a deliberate choice for now). |
| Technical accessibility | 20 | 18 | Fully server-rendered, every AI crawler allowed, sitemap and IndexNow in place. Cloudflare bot settings not verified. |

## 2. Platform readiness (not measured)

No AI-visibility tool (DataForSEO, SE Ranking) was used, so these are qualitative.

- **Google AI Overviews:** Good. Citations follow classic rankings, and the pages are crawlable, structured and locally specific.
- **Google AI Mode:** Fair. It leans more on entity authority and freshness, where the site is thin off-site.
- **ChatGPT Search / Perplexity:** Weak. Both lean heavily on third-party sources (directories, Reddit, YouTube, press), and the brand barely appears in any of them.
- **Bing Copilot:** Fair. IndexNow is wired up (`npm run indexnow`); Bing Webmaster Tools verification was not checked.

## 3. AI crawler access

robots.txt allows `*` everywhere except `/api/*`, and names no AI crawler. Each crawler below is therefore allowed by robots.txt:

| Crawler | What it governs | robots.txt |
|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | Allowed |
| Google-Extended | Gemini/Vertex training and grounding (not Search) | Allowed |
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| GPTBot | OpenAI model training | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| ClaudeBot | Anthropic model training | Allowed |
| PerplexityBot | Perplexity search | Allowed |
| Applebot | Siri, Spotlight, Safari search | Allowed |
| Applebot-Extended | Apple Intelligence training opt-out | Allowed |
| CCBot | Common Crawl training data | Allowed |

A request with a GPTBot user agent got a 200. That does **not** prove the real bots get through: Cloudflare identifies verified AI bots by IP, and its "Block AI bots" / AI Crawl Control settings act at the edge, separately from robots.txt. Check this in the dashboard (see change 3).

## 4. llms.txt

Present at /llms.txt (about 30 KB), generated from the same data the pages render: company summary, both offices, every service, service FAQs and key pages. Nothing to fix. Google states llms.txt does not help or hurt Search visibility, and no major AI provider has confirmed using it, so it carries no weight in the score.

## 5. Brand mentions off the site

Web searches for "Prasanth Associates" with Coimbatore, Gudalur or the Nilgiris returned **no third-party page about the company**. The only near match is an unrelated "Prashanth Associates" profile on village.ai. No Wikipedia, Reddit or YouTube presence was found. The Gudalur Google Business Profile still carries the old name "Prasanth Construction" (rename in progress), which splits the entity in two.

Competitors appearing in AI-style "best builder" results are there through directories and listings: Jeevan Build Tech (Architizer), Tofler's Coimbatore top-10 list, RealEstateIndia's Ooty developer directory.

This is the largest gap, because ChatGPT and Perplexity mostly cite third-party sources rather than the firm's own site.

## 6. Passage-level citability

**Strong (keep as is):**
- Blog post "Building plan approval in Coimbatore and the Nilgiris" opens with a direct framing, then answers "Who approves your plan" in the first section, with a table of who approves by plot location (CCMC, DTCP / local planning authority, Nilgiris local body).
- Nilgiris page H3s ("Slopes and drainage", "Cold weather", "Damp and mist", "Hill area rules") are specific, hill-only knowledge that generic competitors don't have.
- Coimbatore FAQs "Where is your Coimbatore office?" and "Which parts of Coimbatore do you work in?" answer directly.

**Weak:**
- Coimbatore FAQ "How much does house construction cost in Coimbatore?" answers "The cost depends on floor area, structural requirements…" and gives no figure. This is the question AI answers are most often asked, and an answer without a number won't be quoted. The site already shows ₹1,950 / ₹2,650 / ₹3,800 per sq. ft. packages in the cost calculator on /request-quote, so the page currently withholds a figure the site publishes elsewhere.

## 7. Server-side rendering

All content is in the initial HTML: 1,914 words on the home page, 1,377 on Coimbatore, 993 on Nilgiris, 670 in the blog post, with headings and JSON-LD present before any script runs. Crawlers that don't run JavaScript see the full pages.

One extraction issue: headings that use `<br />` with no space before it come out joined in plain-text extraction ("How WeWork", "100+ homes built acrossCoimbatoreand the Nilgiris", "Before you startyour project", "OurCoimbatoreoffice"). Crawlers that convert to Markdown handle `<br>` correctly, so this is low impact, but the fix is one character per heading (for example `src/app/page.tsx:285`).

## 8. Top 5 highest-impact changes

1. **Build third-party presence for the brand.** List both offices, with the exact name, address and phone from the site, on Justdial, IndiaMART, Sulekha and Houzz or Architizer. Finish the Gudalur Business Profile rename. Post short walkthroughs of the Pricol tea bungalow and the Manjushree Director's Building renovation on YouTube, and link them from the project pages. A Gudalur hill home was featured by Onmanorama (2024), so regional home-design press is reachable.
   *Depends on:* nothing. *Failed if:* in 3 months, a search for "Prasanth Associates Gudalur" still shows no third-party page. *Watch:* referrals from directories in GA4; brand searches in Search Console.
2. **Give the cost FAQ a real figure.** Quote the per-sq.-ft. range on the Coimbatore page (and the Nilgiris equivalent), stating what it includes and that the BoQ fixes the final price. **Confirm the calculator rates are current before publishing.** See the draft in section 10.
   *Failed if:* Search Console shows no impressions growth for "construction cost coimbatore" queries after 8 weeks.
3. **Check that Cloudflare isn't blocking AI search crawlers.** In Cloudflare go to Security → Bots, then AI Crawl Control: allow OAI-SearchBot, Claude-SearchBot and PerplexityBot (training bots are your choice). In Search Console, make sure the "Search generative AI" setting is left on include.
   *Failed if:* Cloudflare's AI Crawl Control shows blocked requests from those three.
4. **Keep pages visibly fresh.** All ten blog posts carry the same date (2026-10-23). Add or revise one post a month, and update `dateModified` only when content really changes. Location pages have no visible "updated" date; add one, fed by the existing `lastModified.json`.
   *Watch:* Sitemap lastmod and visible dates move together.
5. **Fix the joined headings** by adding `{" "}` before each `<br />` in headings (home, Coimbatore and Gudalur office headings, location FAQ heading).
   *Failed if:* `parse_html.py` still reports joined words after the next deploy.

## 9. Schema

Already in place and correct: `GeneralContractor` with address, geo, opening hours and offer catalog; office entities with `hasMap`; `BreadcrumbList`; `Blog` / `BlogPosting` with dates; `WebSite`. Organization `sameAs` lists Instagram, Facebook and LinkedIn.

- Add new directory and YouTube profiles to the organization's `sameAs` as they go live (change 1). This is the main schema lever for entity recognition.
- `FAQPage` markup exists on the home and location pages. Google retired FAQ rich results on 2026-05-07, so it no longer earns a search feature. No action needed; don't add more for search benefit.
- Don't add `aggregateRating` for your own business: Google ignores self-serving review markup for local businesses.
- `Person` schema for named experts would help authority, but the principals aren't to be named for now. Revisit when that changes.

## 10. Content rewrite: Coimbatore cost FAQ

Current answer: "The cost depends on floor area, structural requirements, site access, material choices and the agreed scope. …"

Draft (rates taken from the /request-quote calculator; **confirm before publishing**):

> House construction in Coimbatore with Prasanth Associates usually costs ₹1,950 to ₹3,800 per sq. ft. of built-up area, depending on the specification: about ₹1,950 for a standard finish, ₹2,650 for a premium finish and ₹3,800 for a luxury finish. A 1,500 sq. ft. house at the middle rate comes to about ₹40 lakh. The final price is set by an itemised BoQ signed before work starts and is fixed for the agreed scope. Design fees, plan approval, interiors and external works are listed separately in that BoQ. Our [guide to reading a construction BOQ](/blog/how-to-read-a-construction-boq) shows how to compare quotes beyond the headline rate.

The tier names and rates match the calculator's Standard, Premium and Luxury packages for a residential house (multiplier 1.0; villas are 1.25×). Add a Nilgiris version if hill sites price differently.

## Sources

- Google, AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Brand search results checked: https://village.ai/company/prashanth-associates (unrelated firm), https://architizer.com/firms/jeevan-build-tech/, https://www.tofler.in/blog/?p=5766, https://www.realestateindia.com/builders-developers-in-ooty.htm, https://onmanorama.com/lifestyle/decor/2024/09/10/cradled-by-nilgiri-hills-contemporary-gudalur-house-exudes-gem-like-exuberance.html
