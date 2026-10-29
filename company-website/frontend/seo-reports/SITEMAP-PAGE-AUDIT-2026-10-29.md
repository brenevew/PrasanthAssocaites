# Page Audit: every URL in sitemap.xml

Date: 2026-10-29. Source: https://prasanthassociates.com/sitemap.xml (50 URLs, all with `lastmod`). Each page was fetched as raw HTML (no JavaScript) and checked for on-page SEO, content, technical tags, schema and images. `npm run seo:audit` (broken links, orphans, duplicates, JSON-LD validity) was run alongside it and reported **0 errors, 0 warnings**.

## Score card (all 50 pages)

```
Overall Score: 88/100

On-Page SEO:     84/100  ████████░░
Content Quality: 82/100  ████████░░
Technical:       96/100  ██████████
Schema:          90/100  █████████░
Images:          92/100  █████████░
```

## What passes on every page

- HTTP 200 on all 50; no redirects, no `noindex`.
- Exactly one H1 per page; no duplicate titles, descriptions or H1s across the site.
- Self-referencing canonical on every page.
- Full Open Graph (title, description, image, url) and Twitter card on every page.
- Meta descriptions all 124–159 characters.
- All content images are WebP through `next/image`, with width/height or a sized container (no layout-shift risk), and meaningful alt text. The empty `alt=""` on social icons and on the /projects tab backgrounds is correct: each sits inside a labelled link or button.
- No broken internal links and no orphan pages (`seo:audit`).

## Issues

### High

**1. Six service pages have almost no internal links.** The header's service menu is only added to the page when a visitor opens it, so crawlers see none of its links. The footer links 10 of the 22 service pages. The other 12 depend on /services and a few "related services" links:

| Page | Linked from |
|---|---|
| /services/landscaping-designs | 2 pages (/services, villa-construction) |
| /services/property-portfolio-management | 2 pages |
| /services/plumbing-drawings | 3 pages |
| /services/land-plot-transactions | 3 pages |
| /services/smart-homes | 4 pages |
| /services/chartered-engineer-valuation | 4 pages |
| /services/property-acquisition-advisory | 5 pages |
| /services/electrical-drawings | 7 pages |

The footer-linked service pages get 51–69 internal links each. Pages linked this thinly often sit at "Discovered – currently not indexed" in Search Console.
*Fix:* list all 22 services in the footer (grouped by the four categories), or render the header menu's links in the HTML and hide them with CSS. *Check:* re-run this audit; each service page should show 50+ internal links. *Watch:* Search Console → Pages, for these URLs.

### Medium

**2. Joined words in headings.** *Correction after checking the raw HTML:* only three headings were really joined: "100+ homes built across", "How We Work" (home) and the About H1. Each has a `<br />` with no space. The rest already have a space in the HTML; the parser used here drops the space between a text node and a following `<em>`/`<span>`. Fixed 2026-10-29. The table below is the parser's output, kept for the record.

A `<br />` with no space before it makes text extractors (and some AI crawlers) read the words as one:

| Page | Heading as extracted |
|---|---|
| / | "100+ homes built acrossCoimbatoreand the Nilgiris", "How WeWork" |
| /services | "Engineering &DesignServices" |
| /property-investment | "Our Property & InvestmentServices" |
| /about | "Engineers & Builders forCoimbatore & the Nilgiris", "How We DeliverYour Project" |
| /contact | "Get in Touch with OurArchitectural Team" |
| /request-quote | "Get an itemised quote forResidential Construction" |
| /locations/coimbatore | "Common questions about building inCoimbatore", "OurCoimbatoreoffice" |
| /locations/nilgiris-ooty | "Common questions about building inOoty and the Nilgiris", "OurGudaluroffice" |
| /locations/gudalur | "Common questions about building inGudalur", "OurGudaluroffice" |

*Fix:* add `{" "}` before each `<br />` (and around the styled `<em>`/`<span>` words) in those headings.

**3. Three project case studies are thin (under 250 words).** /projects/manjushree (229), /projects/residential-construction-project (206), /projects/residential-building-perur-coimbatore (191). The other case studies run 409–450. They're short because scope, dates and outcomes haven't been supplied yet (see your project notes), not because of a site problem. *Fix:* add scope, timeline, site conditions and what was delivered, once confirmed.

**4. One project URL isn't descriptive.** `/projects/residential-construction-project` is the Gudalur house; the Coimbatore one is `/projects/residential-building-perur-coimbatore`. A slug like `/projects/residential-building-gudalur`, with a 301 from the old URL and the sitemap updated, would match the pattern.

### Low

**5. 17 titles are 61–65 characters.** Google cuts titles by pixel width (about 600 px), so the end of " | Prasanth Associates" may be truncated on these. The longest are the blog index and "Choosing a Builder in Coimbatore & Nilgiris" (65). Shorten only if Search Console shows these pages with low click-through rates.

**6. Metadata style flags (heuristic check).**
- /locations/coimbatore: the description opens with "Construction company in Coimbatore", the same words as the title. A different opening would use the snippet better, for example: "Houses, villas, commercial buildings and plans from our Gandhipuram office. See our Perur project and get an itemised BoQ quote."
- Six descriptions name "Prasanth Associates" in the body (/projects, /blog, residential, villa, commercial, smart homes, architectural). For a small local brand this is fine; no change needed.

**7. Every blog post shows the same date** (2026-10-23, except turnkey vs labour contract: 2026-10-29). This is accurate, since they launched together. Spread future posts and revisions out over time so the dates show steady activity.

**8. Breadcrumb schema missing on /projects, /about, /contact, /plan-home, /request-quote.** All other inner pages have it. Minor: these are one level deep.

## Per-page summary

| Page | Title chars | Description chars | Words | Internal links in | Notes |
|---|---|---|---|---|---|
| / | 59 | 158 | 1,914 | 231 | Joined headings |
| /services | 59 | 154 | 2,150 | 128 | Joined heading |
| /property-investment | 62 | 135 | 375 | 50 | Joined heading |
| /projects | 59 | 130 | 302 | 109 | No breadcrumb schema |
| /plan-home | 63 | 151 | 297 | 130 | Tool page; word count fine |
| /about | 59 | 142 | 729 | 101 | Joined headings |
| /contact | 62 | 142 | 227 | 124 | Joined heading; utility page |
| /request-quote | 50 | 147 | 345 | 25 | Joined heading |
| /locations/coimbatore | 56 | 156 | 1,377 | 82 | Description echoes title; joined headings |
| /locations/nilgiris-ooty | 58 | 157 | 993 | 85 | Joined headings |
| /locations/gudalur | 60 | 150 | 1,562 | 64 | Joined headings |
| /services/residential-construction | 63 | 154 | 906 | 64 | |
| /services/villa-construction | 63 | 150 | 835 | 58 | |
| /services/commercial-construction | 59 | 153 | 761 | 59 | |
| /services/turnkey-design-build-coimbatore | 56 | 142 | 1,104 | 58 | |
| /services/industrial-factory-construction | 60 | 149 | 662 | 51 | |
| /services/smart-homes | 57 | 151 | 661 | 4 | **Weak internal links** |
| /services/renovation | 61 | 150 | 736 | 10 | Few internal links |
| /services/construction-work-consulting | 57 | 149 | 698 | 12 | Few internal links |
| /services/architectural-designs | 59 | 149 | 801 | 69 | |
| /services/interior-designs | 60 | 155 | 649 | 59 | |
| /services/structural-drawings | 55 | 153 | 712 | 63 | |
| /services/electrical-drawings | 55 | 147 | 675 | 7 | **Weak internal links** |
| /services/plumbing-drawings | 62 | 151 | 654 | 3 | **Weak internal links** |
| /services/landscaping-designs | 61 | 147 | 646 | 2 | **Weak internal links** |
| /services/bank-valuation-report | 58 | 152 | 656 | 58 | |
| /services/structural-stability-certificate | 56 | 152 | 650 | 59 | |
| /services/detailed-estimation-costing | 57 | 153 | 696 | 12 | Few internal links |
| /services/chartered-engineer-valuation | 61 | 151 | 640 | 5 | **Weak internal links** |
| /services/property-acquisition-advisory | 61 | 147 | 599 | 5 | **Weak internal links** |
| /services/land-plot-transactions | 58 | 149 | 586 | 3 | **Weak internal links** |
| /services/real-estate-investment-consulting | 60 | 153 | 592 | 4 | **Weak internal links** |
| /services/property-portfolio-management | 53 | 149 | 544 | 2 | **Weak internal links** |
| /projects/pricol | 50 | 157 | 435 | 17 | |
| /projects/sasthapuri | 48 | 154 | 450 | 16 | |
| /projects/rex-school | 60 | 152 | 409 | 12 | |
| /projects/manjushree | 62 | 138 | 229 | 8 | Thin |
| /projects/residential-construction-project | 53 | 159 | 206 | 12 | Thin; generic slug |
| /projects/residential-building-perur-coimbatore | 61 | 124 | 191 | 12 | Thin |
| /blog | 65 | 149 | 516 | 59 | |
| /blog/building-in-the-nilgiris-three-projects | 58 | 149 | 671 | 12 | |
| /blog/before-you-draw-a-house-plan | 50 | 156 | 880 | 12 | |
| /blog/building-plan-approval-coimbatore-nilgiris | 60 | 154 | 670 | 9 | |
| /blog/how-to-read-a-construction-boq | 52 | 143 | 544 | 10 | |
| /blog/bank-valuation-report-or-stability-certificate | 56 | 154 | 646 | 4 | Few internal links |
| /blog/questions-to-ask-building-contractor-coimbatore-nilgiris | 65 | 145 | 993 | 14 | |
| /blog/building-on-sloping-plot-ooty-gudalur | 63 | 152 | 661 | 14 | |
| /blog/renovate-old-bungalow-nilgiris | 64 | 146 | 655 | 9 | |
| /blog/commercial-building-planning-gudalur | 61 | 150 | 681 | 8 | |
| /blog/turnkey-vs-labour-contract | 60 | 146 | 1,288 | 7 | |

"Internal links in" counts links from the other 49 sitemap pages, including repeated links from the same page. "Words" is the whole page, including header and footer.

## Not covered

- Core Web Vitals and real loading speed (needs PageSpeed or Search Console field data: `/seo google`).
- Index status of each URL in Google (needs Search Console URL Inspection).
- Rendered-browser checks; all pages are server-rendered, so raw HTML matches what crawlers see.
