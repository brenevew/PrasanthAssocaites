# Project-based blog question research — 23 October 2026

## Research method

Searched for contractor-selection questions in Coimbatore, hill-site construction in the Nilgiris, renovation versus rebuilding, and coordination of hotel/commercial construction. Questions below are editorial adaptations of the themes found in search results, answered using the company's own published project records.

Direct access to Google's results page was blocked by its unusual-traffic check. The research therefore used the available web-search results and source pages. These are not claimed to be a verified Google People Also Ask export, keyword-volume figures, or questions with measured traffic potential. No copied competitor answers are used in the articles.

Google's [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) informed the focus on original experience and useful answers rather than publishing repeated variations of the same page. Search performance still needs measurement after deployment.

## Questions and resulting content

| Question/theme | Search evidence | Content added | Project evidence |
| --- | --- | --- | --- |
| How do I choose a contractor, verify completed work and understand the proposed scope? | [Coimbatore contractor checklist](https://juanconstructions.com/civil-construction-coimbatore-contractor/), [contractor-selection questions](https://www.hindocorp.com/blog/questions-international-clients-should-ask-before-selecting-a-construction-partner-in-india) | `/blog/questions-to-ask-building-contractor-coimbatore-nilgiris` | Perur residence, Gudalur residence, Pricol tea bungalow and Sasthapuri Hotels |
| Can a sloping plot be developed, and what should be checked before design? | Hill-site research; [NDMA/BIS guidance](https://www.bis.gov.in/wp-content/uploads/2022/11/Simplified_Guidelines_Sep_20211-1.pdf) supports the need for professional site investigation | `/blog/building-on-sloping-plot-ooty-gudalur` | Christus Rex school: slopes, rain, drainage and material transport. Pricol: river access and logistics |
| Should an older bungalow be renovated or rebuilt? | [Architect's discussion of renovation and rebuilding](https://teamdesignarchitects.com/journal/renovate-adapt-or-rebuild-asking-better-questions-about-existing-buildings), [architectural FAQs](https://panachearchitect.com/faq) | `/blog/renovate-old-bungalow-nilgiris` | Manjushree Director's Building: existing condition, British-era character and plantation setting |
| What needs coordination before commercial or hotel construction? | [Hospitality project-management scope](https://anpcpmc.com/sectors/hospitality/), [BIS National Building Code overview](https://www.bis.gov.in/standards/national-building-code/?lang=en) | `/blog/commercial-building-planning-gudalur` | Sasthapuri Hotels: limited working/storage area, phased construction and architectural/structural/MEP coordination |
| How should a house plan address natural light and ventilation, and can another house plan be reused? | [BEE residential building envelope guidance](https://beeindia.gov.in/show_content.php?lang=1&level=2&lid=328&ls_id=202) and the company's residential case studies | Expanded `/blog/before-you-draw-a-house-plan` | Perur and Gudalur residences: functional layouts, lighting/ventilation and services coordination |

## Verified project facts used

Source of truth: `src/data/projects.ts`, which supplies the existing project pages.

| Project | Facts used |
| --- | --- |
| [Pricol Limited Tea Bungalow](https://prasanthassociates.com/projects/pricol) | Gudalur; 12,120 sq. ft.; 2015–2017; river crossing; tea plantation; architecture, structure, construction, MEP and site coordination |
| [Sasthapuri Hotels](https://prasanthassociates.com/projects/sasthapruri) | Gudalur town; 38,879 sq. ft.; 2014–2016; limited space; phased construction; architecture, structure, MEP and supervision |
| [Christus Rex Higher Secondary School](https://prasanthassociates.com/projects/rex-school) | Kandal, Ooty; 12,000 sq. ft.; 2018–2019; uneven/sloping terrain, weather, drainage and logistics |
| [Manjushree Director's Building](https://prasanthassociates.com/projects/manjushree) | New Hope, O'Valley; 4,904 sq. ft.; British-era building; cardamom plantation; condition assessment and renovation coordination |
| [Perur residence](https://prasanthassociates.com/projects/residential-building-perur-coimbatore) | Coimbatore; 3,500 sq. ft.; completed 2020; functional planning, lighting/ventilation and electrical/plumbing coordination |
| [Gudalur residence](https://prasanthassociates.com/projects/residential-construction-project) | 2,617 sq. ft.; 2024–2025; functional layouts, lighting/ventilation, structure and services |

Only completed projects with usable written case studies were linked as article evidence. Oxford School and the Ooty residential placeholder were not expanded with invented details. No project price, building approval outcome, certification, foundation specification or quantified saving has been added.

Removed unsupported delivery-frequency and stock-buffer details from the existing three-project article. Project periods remain calendar-year ranges from the project records, not exact durations or forecasts for other buildings.

## Implementation

- Four new articles, seven question headings in the contractor guide and six in each of the hill-site, renovation and commercial guides.
- Two additional questions in the existing house-planning guide.
- Articles include a visible list of supporting completed projects, populated from the same project data as the portfolio.
- Supporting project pages link back to relevant articles.
- Primary technical references are linked as further reading where used. General guidance is kept separate from claims about work carried out on a particular project.
- Article structured data cites the same project pages shown to readers. No additional FAQ rich-result promise or markup was introduced.
- Existing blog metadata and automatic sitemap generation include the new articles.

## Validation

Unit checks verify distinct blog URLs/metadata, sitemap inclusion, valid internal links, service references and completed-project references. SEO, analytics and submission tests: 19 passing. TypeScript and lint checks passed. The production Webpack build passed.

The final local crawl checked 49 sitemap URLs and all 22 services with zero errors. Three advisory warnings remain: homepage title length, contact-page length and Perur project-page length. These are crawler heuristics, not broken links or indexing directives.

All nine articles passed HTTP, metadata, structured-data, project-link and overflow checks at 1440px and 390px. All six supporting project pages expose their related article links. Article headings and content are visible with JavaScript disabled, and unknown article URLs return HTTP 404. No uncaught browser errors were recorded. See [browser validation](blog-content-validation-2026-10-23.json).

Changes are local until deployed. Publishing the material does not establish a ranking improvement; assess indexing, queries and enquiries in Search Console after publication.
