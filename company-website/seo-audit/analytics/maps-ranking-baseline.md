# Google Maps ranking baseline: specification

**Status: Not yet measured.** No rank-tracking tool is connected, and Google Maps must not be scraped. This file is a ready-to-run specification for a tool such as Local Falcon, BrightLocal (Local Search Grid) or DataForSEO (Maps SERP API). Run it once to set the baseline, then monthly.

## Grid

5 × 5 points, 1.5 km apart (6 km × 6 km), centred on each office. Row 1 is north; column 1 is west.

### Coimbatore (centre: Gandhipuram office, 11.017756, 76.9688517)

| Row | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| R1 | 11.04489,76.94140 | 11.04489,76.95512 | 11.04489,76.96885 | 11.04489,76.98258 | 11.04489,76.99631 |
| R2 | 11.03132,76.94140 | 11.03132,76.95512 | 11.03132,76.96885 | 11.03132,76.98258 | 11.03132,76.99631 |
| R3 | 11.01776,76.94140 | 11.01776,76.95512 | 11.01776,76.96885 | 11.01776,76.98258 | 11.01776,76.99631 |
| R4 | 11.00419,76.94140 | 11.00419,76.95512 | 11.00419,76.96885 | 11.00419,76.98258 | 11.00419,76.99631 |
| R5 | 10.99062,76.94140 | 10.99062,76.95512 | 10.99062,76.96885 | 10.99062,76.98258 | 10.99062,76.99631 |

### Gudalur (centre: Ooty Main Road branch, 11.5001001, 76.4937999)

| Row | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| R1 | 11.52723,76.46630 | 11.52723,76.48005 | 11.52723,76.49380 | 11.52723,76.50755 | 11.52723,76.52130 |
| R2 | 11.51367,76.46630 | 11.51367,76.48005 | 11.51367,76.49380 | 11.51367,76.50755 | 11.51367,76.52130 |
| R3 | 11.50010,76.46630 | 11.50010,76.48005 | 11.50010,76.49380 | 11.50010,76.50755 | 11.50010,76.52130 |
| R4 | 11.48653,76.46630 | 11.48653,76.48005 | 11.48653,76.49380 | 11.48653,76.50755 | 11.48653,76.52130 |
| R5 | 11.47297,76.46630 | 11.47297,76.48005 | 11.47297,76.49380 | 11.47297,76.50755 | 11.47297,76.52130 |

Gudalur town is small and surrounded by plantations; points on the edges may return few businesses. Keep the same grid for every run so results stay comparable.

## Keywords

**Coimbatore (10):** building contractors in coimbatore · construction company in coimbatore · builders in coimbatore · house construction coimbatore · civil engineers in coimbatore · structural engineers in coimbatore · building plan approval coimbatore · house renovation contractors coimbatore · building estimation coimbatore · architects in coimbatore

**Gudalur (8):** building contractors in gudalur · builders in gudalur · construction company gudalur · house construction gudalur · civil engineers gudalur · architects in gudalur · building plan approval gudalur · bungalow renovation gudalur

Cost per run: 25 points × 18 keywords = 450 lookups.

## Record format (one row per point per keyword)

| Field | Example |
|---|---|
| run_date | 2026-11-20 |
| office | Coimbatore |
| keyword | building contractors in coimbatore |
| row, column | R3, C3 |
| lat, lng | 11.01776, 76.96885 |
| prasanth_rank | 7 (blank if not in top 20) |
| in_top_3 | N |
| top_3 | Hera Construction; D4S Constructions; Civil Tamizha Constructions |
| change_vs_last | +2 |

Per keyword and run, report: share of points in the top 3 (top-3 points ÷ 25), average rank, and points where the listing is absent.

**Competitors to record:** Coimbatore: Hera Construction, Metro City Developers, D4S Constructions, VCPL Viswanathan Constructions, S G Structural Engineers, Vikruti Structures. Gudalur: Angel Constructions, Greenwood Builders & Contractor, Konstrukto.

## Earlier spot checks (not part of the baseline)

These were single Google Maps searches viewed in a browser before this specification existed (2026-10-29 to 2026-11-13). Each is one point, so they aren't comparable with grid results. They show direction only:

| Office | Keyword | Position |
|---|---|---|
| Gudalur | builders / construction company / building contractors / house construction in gudalur | 3 |
| Gudalur | civil engineer / architects / interior designers gudalur | 1 |
| Coimbatore | builders / construction company / building contractors in coimbatore | not in top 12 |
| Coimbatore | civil engineer (street-level view at the office) | 5 |

## Keep organic and Maps separate

Organic positions come from Search Console (Performance → Pages → filter the location page → Queries). Never mix them with grid numbers in the same chart.
