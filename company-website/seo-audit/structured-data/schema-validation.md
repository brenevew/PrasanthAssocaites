# Structured data

## What each location page carries

| Node | Coimbatore page | Gudalur page | Ooty/Nilgiris page | Status |
|---|---|---|---|---|
| `GeneralContractor` company (`#organization`), with `WebSite` | ✓ (sitewide) | ✓ | ✓ | Verified, unchanged |
| Office `GeneralContractor` | `#coimbatore-office` | `#gudalur-branch` | `#gudalur-branch` (same branch, same id) | Verified |
| `parentOrganization` → `#organization` | ✓ | ✓ | ✓ | Verified |
| Address, phone, email, hours, `geo`, `hasMap`, `sameAs` (Google listing) | ✓ | ✓ | ✓ | Verified, unchanged |
| `areaServed` | Coimbatore district | Nilgiris district, Gudalur, Ooty, Coonoor, Kotagiri | Same | Verified, unchanged |
| `description` | **Added** | Added 2026-11-13 | Added (shared) | Implemented, Validated |
| `hasOfferCatalog` | **Added: 22 services** | **6 → 22 services** | **6 → 22** (shared) | Implemented, Validated |
| `WebPage` | ✓ | ✓ | ✓ | Verified, unchanged |
| `Service` for the page | ✓ | ✓ | ✓ | Verified, unchanged |
| `FAQPage` (mirrors visible questions) | 14 (3 added) | 23 | 11 | Validated: identical to visible list |
| `BreadcrumbList` | ✓ | ✓ | ✓ | Verified, unchanged |
| `aggregateRating` / reviews | None | None | None | Correct: self-serving review markup is not allowed |

Every offer points to `https://prasanthassociates.com/services#<slug>` as its `@id` (the same id the company-wide catalog uses) and to the real service page as its `url`, so Google can join them.

## Checks run

| Check | Result |
|---|---|
| All JSON-LD blocks on the built pages parse as JSON | Pass |
| Office nodes have name, address, telephone, url, geo, opening hours | Pass |
| Office ids identical across pages that describe the same office | Pass |
| FAQ structured data equals the visible questions, in order | Pass (14, 23, 11) |
| Schema details match visible content (address, phone, hours, services) | Pass |
| No rating, review or price markup | Pass |
| Google Rich Results Test | **Not yet run.** Needs the deployed pages: https://search.google.com/test/rich-results |
| Schema.org Validator | **Not yet run.** Needs the deployed pages: https://validator.schema.org/ |

Note: valid structured data doesn't by itself earn a rich result or a higher Maps position. FAQ rich results were retired by Google in May 2026; the FAQ markup is kept because it mirrors visible content and helps machines read the answers.
