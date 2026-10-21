# SEO Plan 2026 — Organic Aprico

- **Status:** P0 and P1 implemented locally; deployment and indexing pending
- **Site:** https://organicaprico.com
- **Audit date:** 2026-10-21
- **Stack:** Nuxt 4, Vue 3, Nitro, static product/blog data
- **Primary market:** Pakistan (COD)
- **Secondary markets:** UK, USA, EU, Norway, Germany
- **Supersedes:** `SEO-PLAN.md` (deleted in the worktree; do not restore it)
- **Current worktree:** Large uncommitted P0/P1 changes; see `git status`. No commits or deploys.
- **Rule:** Do not commit or deploy unless the owner explicitly asks.

---

## 1. Objective

Make Organic Aprico the clearest, most trustworthy shilajit result in Pakistan, then use that authority to grow UK/US/EU wholesale and export enquiries.

The site has three commercial pages and 20 blog posts. The immediate problem is not a lack of content. It is:

1. Historical migration debt: the 28-day GSC window still contains pre-migration saffron demand and old Shopify/Woo URLs. The last 7 days contain zero saffron queries; shilajit + brand queries account for 31 of 47 clicks. Clean up the old URLs for crawl hygiene, but do not treat saffron as current demand.
2. Weak trust signals: hardcoded reviews, an unverifiable QR claim, conflicting product facts, and a 30-day vs 3-day returns conflict.
3. Unoptimised money pages: the product page is at position 15.3 and the head price query is at 17.9; the best-brands post ranks 7.7 with 0 CTR; the wholesale page gets almost no impressions; the price blog and product page compete.
4. Missing local/entity assets: no `/contact`, no `/locations/lahore`, and no GBP-aligned LocalBusiness schema.

Execution order is **P0 → P1 → P2 → P3**. Do not start P2 content work before P0 is live and verified.

---

## 2. Owner Decisions — Locked

| Item | Decision |
|---|---|
| Reviews | Remove all hardcoded/manual reviews and ratings. Do not add review schema. Show the real Google rating badge only. |
| Google rating | Display **4.8/5 from 40 Google reviews**, linked to the GBP. No `AggregateRating` or `Review` schema. Refresh the count monthly. |
| Certificates | Current and issued to Organic Aprico. ISO 9001 certificate will be uploaded; add the card once the file exists. Do not invent certificate numbers. |
| Confirmed claims | Since 1972, 10,000 customers, native extractor, etc. are verifiable. Leave them. |
| QR claim | Remove. Do not claim QR codes open batch lab reports. |
| Packaging label | The 64% fulvic label is old packaging. Current value is **73%**. Owner will replace the image later. Do not change the 73% site claim. |
| Pricing | Current prices are correct. Do not change them. |
| Returns | **3 days.** Remove 30-day money-back claims and align all copy/schema to 3 days. |
| GBP | https://maps.app.goo.gl/PPcqPsNFQVmvtFU27 |
| Deployment | Owner deploys and has full access. |

---

## 3. Canonical Facts — Use These Everywhere

| Fact | Canonical value | Notes |
|---|---|---|
| Fulvic acid | **73%** | Micro Quality Lab, California. Keep this claim. |
| Eurofins result | **71.8% fulvic acid / 73.3% total humic extract** | Never write “73% fulvic acid by Eurofins.” |
| Old label | 64% | Old packaging only. Do not use in site copy. Replace image later. |
| Serving size | **0.7g** | Label serving size. |
| Starting dose | **300–500mg** | Usage guidance; 0.7g is the full serving. |
| Shelf life | **24 months** | Remove “up to 3 years” unless the label/COA supports it. |
| Altitude | **Above 17,000 ft** | Replace “18,000 ft” occurrences. |
| Minerals | **84+** | Replace “85+.” |
| Purification | **8-stage** | Replace “four-step.” |
| Returns | **3 days** | Exchange/return window. |
| Product prices | 10g Rs1,500; 20g Rs2,900; 30g Rs4,000; 50g Rs7,100; 100g Rs12,900 | Do not change. |
| Wholesale | 1kg Rs95,000; 5kg Rs475,000; 10kg+ on request | Do not change. Old blog prices must be updated to match. |
| Google rating | 4.8 / 40 reviews | Link to GBP; no schema. |
| Lahore NAP | Organic Aprico, Lahore Organic Village, D.H.A. Main Blvd, near Adil Hospital, DHA Phase 1, Lahore | Match GBP exactly. |
| Phone / WhatsApp | +92 331 1116915 | Use one format consistently. |
| Email | organicapricoskardu@gmail.com | |
| Lahore geo | 31.490481, 74.379432 | |
| Lahore hours | 11 AM–12 AM daily | Verify against GBP before publishing. |
| Skardu production | Lasu House of Production, Sukamaidan, Skardu, Gilgit-Baltistan | No dedicated GBP unless one exists. |

---

## 4. Baseline Data

### 4.1 GSC performance — post-migration

**Source:** GSC API, 2026-10-12 to 2026-10-18, with the standard 3-day data lag. This is the current baseline. The 28-day data is historical and includes pre-migration saffron.

| Period | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| Last 7 days (current) | 47 | 952 | 4.94% | 12.46 |
| Previous 7 days | 62 | 2,557 | 2.42% | 11.95 |
| 28-day historical | 667 | 35,084 | 1.90% | 7.12 |
| Previous 28 days | 997 | 62,508 | 1.59% | 7.63 |

- **Saffron is no longer a current traffic source.** The last 7 days contain zero saffron queries. The previous 7 days still had 1,135 saffron impressions but only 1 click (0.09% CTR); that tail disappeared after migration.
- Query-level rows sum to 33 clicks / 501 impressions. The remaining 14 clicks / 451 impressions are anonymized long-tail queries; do not assume they are all shilajit.
- Current identified query mix: **93 shilajit queries = 13 clicks / 289 impressions**; 2 brand-only queries = 18 clicks / 27 impressions; 96 other queries = 2 clicks / 185 impressions.
- Brand + shilajit = **31 of 47 clicks (66%)** before anonymized long-tail. Saffron = 0.
- Shilajit clicks are broadly stable (13 last 7 days vs 14 previous 7 days). The bigger issue is lost impressions/positions, especially on the product page and the head price query.
- The 28-day data is not current demand: `/products/pure-zafran` still shows 375 clicks / 24,723 impressions in that historical window.
- Do not chase saffron traffic. Do not redirect saffron to shilajit.

### 4.2 Key queries — last 7 days

| Query | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| organic aprico | 18 | 24 | 75.00% | 1.00 |
| organic aprico shilajit | 7 | 8 | 87.50% | 1.00 |
| shilajit price in pakistan | 2 | 17 | 11.76% | 17.88 |
| shilajit | 1 | 33 | 3.03% | 10.61 |
| shilajit in pakistan | 1 | 8 | 12.50% | 32.25 |
| shilajit pakistan | 1 | 8 | 12.50% | 23.25 |
| shilajit price | 1 | 9 | 11.11% | 10.11 |
| best shilajit brand in pakistan | 0 | 27 | 0% | 7.70 |
| best shilajit in pakistan | 0 | 24 | 0% | 14.21 |
| best salajeet in pakistan | 0 | 4 | 0% | 19.75 |
| buy shilajit in pakistan | 0 | 2 | 0% | 6.00 |
| 100 gram shilajit price in pakistan | 0 | 1 | 0% | 9.00 |
| 20g shilajit price | 0 | 1 | 0% | 10.00 |

Query-page insights from the 7-day data:

- `shilajit price in pakistan` → `/products/shilajit`: 2 clicks / 8 impressions / **position 31.4**. The product page is not ranking for the head term. The 28-day position 6.87 was historical and must not be used as the current baseline.
- `best shilajit brand in pakistan` → best-brands blog: 0 clicks / 24 impressions / position 7.1. This is a title/CTR problem, not a ranking problem.
- `best shilajit in pakistan` → where-to-source 2025 blog: 0 clicks / 20 impressions / position 11.1; the intent is split across several URLs.
- `shilajit in pakistan` and `shilajit pakistan` → where-to-buy blog: positions 19.6–26.2. This blog is closer to the query than the product page but ranks too low.
- `shilajit` → home: 1 click / 31 impressions / position 7.2.
- Brand demand is strong: `organic aprico` and `organic aprico shilajit` rank #1 and drive 25 clicks.

### 4.3 Key pages — last 7 days

| Page | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| `/` | 32 | 465 | 6.88% | 6.85 |
| `/products/shilajit` | 8 | 131 | 6.11% | 15.28 |
| Best-brands blog | 2 | 84 | 2.38% | 6.64 |
| Price guide blog | 2 | 126 | 1.59% | 11.26 |
| Where-to-buy blog | 2 | 56 | 3.57% | 19.36 |
| Where-to-source 2025 blog | 1 | 9 | 11.11% | 23.67 |
| `/certifications` | 1 | 30 | 3.33% | 1.90 |
| Wholesale product page | 0 | 4 | 0% | 3.75 |
| Shilajit drops | 0 | 15 | 0% | 6.20 |
| `/pages/about-us` | 0 | 42 | 0% | 1.69 |
| `/pages/track-your-order` | 0 | 34 | 0% | 1.65 |

`/products/pure-zafran` is absent from the current 7-day pages. Saffron is a historical crawl/28-day issue, not a current demand issue.

### 4.4 Live site state

- Live sitemap: 33 URLs.
- Live blog index: 17 posts. Local data: 20 posts.
- Three uncommitted posts are missing live:
  - `how-to-take-shilajit-resin-dosage-timing-and-common-mistakes`
  - `shilajit-for-gym-and-athletes-in-pakistan`
  - `shilajit-side-effects-and-who-should-avoid-it`
- Only `/` is prerendered (`nuxt.config.ts` route rules).
- No `Cache-Control` on HTML; TTFB is ~1.3–1.7s.
- `public/images` is ~47MB with several 2–3MB PNGs.
- GSC query-page mapping is available for the 7-day window; use it for cannibalisation decisions.
- The current head-query position is 17.9, not 6.87. Do not use the 28-day position as a baseline.

### 4.5 Redirect/404 state

Live 301s:

| Legacy URL | Target |
|---|---|
| `/products/pure-zafran` | `/` |
| `/collections/pure-shilajit` | `/products/shilajit` |
| `/collections/all` | `/products/shilajit` |
| `/pages/lab-reports` | `/certifications` |
| `/pages/certifications` | `/certifications` |
| `/pages/our-locations` | `/pages/about-us` |
| `/pages/contact-us` | `/` |
| `/pages/who-is-behind-organic-aprico` | `/pages/about-us` |
| `/search` | `/` |
| `/cart` | `/` |

Live 200 pages: `/pages/about-us`, `/pages/company-registration`, `/pages/organic-guaranteed`.

Live 404s: `/policies/contact-information`, `/easy-exchange-and-return/`.

Missing: `/contact`, `/locations/lahore`, `/products`.

---

## 5. P0 — Ship, Trust, Crawl Hygiene

### 5.1 Deploy the three posts

Files: `app/data/blogs.ts`, `server/routes/sitemap.xml.ts`.

- Deploy the current worktree; do not discard the three uncommitted posts.
- Fix sitemap lastmod to `post.updatedISO ?? post.dateISO` (currently `post.dateISO` only).
- Verify live blog index shows 20 posts.
- Verify each new URL returns 200, has a canonical, OG tags, Article schema, and Breadcrumb schema.

**Acceptance:** live sitemap includes all 20 posts; blog index shows 20; no missing-post 404s.

### 5.2 Remove reviews and fake trust signals

Files:

- `app/pages/products/shilajit.vue` — review block around lines 45, 277–330, 478–490.
- `app/pages/products/shilajit-drops.vue`.
- `app/pages/products/pure-himalayan-shilajit-resin-wholesale.vue` — around lines 45 and 534+.
- Any shared review component/data if present.

Remove:

- Star ratings, `5.0`, `4.9`, `200+`, `Verified Purchase`.
- Review forms, submit handlers, toasts, local review arrays.
- Any `Review`/`AggregateRating` JSON-LD.

Replace with factual trust signals:

- Lab report link and batch code.
- PCSIR/Eurofins/Micro Quality Lab results.
- GMP/HACCP/Halal/ISO 9001 certificates.
- Real Google badge: **4.8/5 from 40 Google reviews**, linked to `https://maps.app.goo.gl/PPcqPsNFQVmvtFU27`. No schema.
- 3-day return policy.

**Acceptance:** no review UI remains; no review schema; Google badge links correctly; no claim of “200+ reviews.”

### 5.3 Remove the QR claim

Files:

- `app/pages/products/shilajit.vue` (~line 139).
- `app/pages/products/pure-himalayan-shilajit-resin-wholesale.vue` (~lines 139 and 534).
- `app/components/BenefitsSection.vue` (~line 36).
- `app/data/pages.ts` (~line 51).
- `app/pages/purification.vue` (~line 155).

Replace with: “Every box is batch-coded. Request the lab report for your batch by WhatsApp or email.” Do not imply a QR workflow.

**Acceptance:** no “scan the QR code” claim anywhere in the repo.

### 5.4 Fix redirects and 404s

File: `server/middleware/legacy-redirects.ts`.

Add/update:

| From | To |
|---|---|
| `/policies/contact-information` | `/contact` |
| `/easy-exchange-and-return/` | `/policies/refund-policy` |
| `/pages/contact-us` | `/contact` |
| `/pages/our-locations` | `/locations/lahore` |

- Keep `/products/pure-zafran` → `/`. Do not redirect it to shilajit; the intent is wrong.
- Add the new pages to `LIVE_PAGES` so they are not caught by catch-alls.
- Use 301 for GET/HEAD; 308 only when preserving query strings/methods.
- Ensure no redirect chains.

**Acceptance:** the two legacy 404s resolve; contact/location URLs return 200; old URLs return one 301 to the final target.

### 5.5 Create contact and Lahore location pages

Create:

- `app/pages/contact.vue`
- `app/pages/locations/lahore.vue`

Contact page:

- Phone, WhatsApp, email, hours, address, map link.
- Link to products, wholesale, certifications, policies.
- No contact form unless a real backend endpoint exists; use WhatsApp/email links.
- Breadcrumb: Home → Contact.

Lahore page:

- H1: “Shilajit Shop in Lahore — Organic Aprico.”
- Unique copy: local pickup, COD, directions, hours, products available, nearby areas.
- Google map embed/link; GBP link; photos when available.
- NAP exactly matching GBP.
- FAQs: parking, pickup, COD, product availability, wholesale visits.
- `LocalBusiness`/`Store` schema with `@id`, `geo`, `openingHoursSpecification`, `hasMap`, `sameAs` GBP.
- Do not duplicate the contact page copy.

Add both pages to:

- `app/components/AppNav.vue`
- `app/components/AppFooter.vue`
- `server/routes/sitemap.xml.ts`
- `server/middleware/legacy-redirects.ts` (`LIVE_PAGES`)

**Acceptance:** both pages return 200, are in the sitemap, linked from nav/footer, and have valid LocalBusiness schema.

### 5.6 Update sitewide LocalBusiness schema

File: `nuxt.config.ts`.

- Change both LocalBusiness `url` values from `/pages/about-us` to the relevant location page:
  - Lahore → `/locations/lahore`
  - Skardu → `/contact` or `/pages/about-us` until a Skardu page exists.
- Add to Lahore:
  - `@id`: `https://organicaprico.com/#lahore`
  - `geo` with 31.490481, 74.379432
  - `openingHoursSpecification`: 11:00–24:00 daily (verify GBP)
  - `hasMap`: GBP URL
  - `sameAs`: GBP URL
  - `areaServed`: Lahore, Punjab, Pakistan
- Keep the Organization node; do not create conflicting duplicate businesses.
- Do not add review schema.

**Acceptance:** schema parses; NAP matches GBP; location URLs are correct.

### 5.7 Align return policy to 3 days

Files:

- `app/pages/products/shilajit.vue` (~line 343).
- `app/data/pages.ts` — guarantee page (~lines 42, 54–55) and refund policy (~line 91).
- Any product/wholesale copy mentioning 30 days.

Actions:

- Replace “30-day money-back guarantee” with “3-day return/exchange window.”
- Keep refund-processing language (5 business days) only where accurate.
- Update Product schema return policy to `merchantReturnDays: 3` when added.
- Do not promise “no questions asked” if the policy requires inspection.

**Acceptance:** no “30-day” return promise remains; all return copy says 3 days.

---

## 6. P1 — Money Pages

### 6.1 `/products/shilajit`

File: `app/pages/products/shilajit.vue`.

Title:

`Shilajit Price in Pakistan 2026 | Pure Himalayan Resin`

Meta description:

`Buy pure Himalayan shilajit resin from Skardu. 73% fulvic acid (Micro Quality Lab), PCSIR heavy-metal tested, 10g from Rs 1,500. COD in Pakistan.`

On-page:

- Above the fold: price/variant selector, price per gram, 0.7g serving, stock, delivery, COD, batch/lab-report link.
- H1: keep “Shilajit Price in Pakistan 2026 — Pure Himalayan Resin.”
- H2s:
  - Buy Shilajit Online in Pakistan (COD & Delivery)
  - Shilajit Price per Gram
  - Lab Reports & Batch Traceability
  - How to Take Shilajit Resin
  - FAQs
- Add a compact price table:

| Size | Price | Price/g | Approx. servings |
|---|---:|---:|---:|
| 10g | Rs1,500 | Rs150/g | ~14 |
| 20g | Rs2,900 | Rs145/g | ~28 |
| 30g | Rs4,000 | Rs133/g | ~42 |
| 50g | Rs7,100 | Rs142/g | ~71 |
| 100g | Rs12,900 | Rs129/g | ~142 |

- Add lab-report CTA above the fold: “View lab report for batch OA-2025-0307.”
- Add “73% fulvic acid — Micro Quality Lab” and “PCSIR heavy metals: non-detect” near the price.
- Add 3-day return and delivery clarity.
- Add Google rating badge (4.8/40) with GBP link.
- Keep dosage guidance: 0.7g serving; start with 300–500mg.
- Remove all review UI.
- Add FAQ schema matching visible FAQ.

Schema (`app/utils/seo.ts`):

- Keep Product/AggregateOffer.
- Add `category`: “Dietary Supplement > Herbal Supplement.”
- Add `additionalProperty`:
  - Fulvic acid: 73%
  - Source altitude: above 17,000 ft
  - Purification: 8-stage
  - Batch: OA-2025-0307
- Add `shippingDetails` and `hasMerchantReturnPolicy` with 3 days.
- Add `seller` referencing `https://organicaprico.com/#organization`.
- Do not add `aggregateRating`.

**Acceptance:** title/meta within limits; price table visible; lab-report link above fold; schema has no review fields; 3-day policy reflected.

### 6.2 Wholesale page

File: `app/pages/products/pure-himalayan-shilajit-resin-wholesale.vue`.

Title:

`Shilajit Wholesale Pakistan 2026 — MOQ 1kg, Rs 95,000`

Meta:

`Bulk Himalayan shilajit direct from our Skardu extractor. MOQ 1kg, 73% fulvic acid, PCSIR/Eurofins reports, private label and export documents.`

Actions:

- Move wholesale pricing above the fold; make “Wholesale Pricing” the default tab.
- Show 1kg, 5kg, 10kg+; MOQ; lead time; sample policy; private label; export documents.
- Add “Request a quote” and “Request a sample” WhatsApp CTAs.
- Add FAQ: MOQ, samples, lead time, private label, documents, shipping.
- Remove review UI.
- Add `additionalProperty` for MOQ, fulvic acid, lead time, private label.
- Use `AggregateOffer` for 1kg/5kg; 10kg+ as “contact for quote.”
- Match return policy to 3 days where applicable to wholesale terms.

**Acceptance:** pricing visible without clicking a tab; title/meta live; 0-click page has a clear B2B CTA; schema accurate.

### 6.3 Resolve price cannibalisation

Files: `app/data/blogs.ts`, product page.

- Product page owns `shilajit price in pakistan`.
- Rewrite the price guide title/H1 to:
  - `Shilajit Price per Gram in Pakistan 2026 (10g to 1kg)`
- Keep the blog as an informational price-per-gram guide; link to the product page with “current shilajit price in Pakistan.”
- Do not canonical the blog to the product page; intents differ.
- Add a prominent price table and CTA in the blog.
- Add internal links from the blog to product, wholesale, certifications, dosage post.

**Acceptance:** product page and blog target different primary intents; both link to each other; no duplicate H1/title.

### 6.4 Best-brands post

File: `app/data/blogs.ts`.

- Title/H1: `Best Shilajit Brands in Pakistan 2026 (Lab-Tested)`.
- Add a methodology section: lab reports, fulvic acid, heavy metals, batch traceability, price per gram, sourcing.
- Add a comparison table with honest criteria; include Organic Aprico but do not fake rankings.
- Update wholesale pricing:
  - 1kg Rs95,000
  - 5kg Rs475,000
  - 10kg+ on request
- Remove old 10kg/100kg prices.
- Link to product, wholesale, certifications.
- Refresh date and `updatedISO`.

**Acceptance:** query “best shilajit brand in pakistan” has a matching title; no outdated prices; no fake reviews.

### 6.5 Certifications page

File: `app/pages/certifications.vue`.

- Title: `Lab Reports & Certifications | Organic Aprico`.
- Meta: PCSIR heavy metals, Eurofins fulvic acid, Micro Quality Lab, GMP/HACCP/Halal.
- Add a text summary table: batch, lab, test, result, date, report link.
- Add “Last updated” and batch code.
- Add ISO 9001 card only after the owner uploads the certificate.
- Add internal link from product page above the fold.
- Request indexing after deployment.

**Acceptance:** page has crawlable text results, not just images; ISO 9001 is not claimed until asset exists; legacy `/pages/lab-reports` and `/pages/certifications` resolve here.

### 6.6 Products hub

Create `app/pages/products/index.vue`:

- H1: `Shilajit Products & Prices in Pakistan`.
- Cards for Resin, Drops, Wholesale.
- Price-from, best-for, key lab/trust facts, links.
- Add to nav/footer/sitemap.
- Update product breadcrumbs from `/#products` to `/products`.

**Acceptance:** `/products` returns 200; breadcrumbs use it; no orphan product pages.

---

## 7. P2 — Claims, E-E-A-T, Local, Content

### 7.1 Reconcile claims across the site

Files: product pages, `app/data/blogs.ts`, `app/data/pages.ts`, `app/pages/purification.vue`, home components.

Apply canonical facts from §3:

- 73% fulvic acid (Micro Quality Lab).
- Eurofins: 71.8% fulvic acid / 73.3% total humic extract.
- 0.7g serving; 300–500mg starting dose.
- 24-month shelf life.
- Above 17,000 ft.
- 84+ minerals.
- 8-stage purification.
- 3-day returns.

Do not change the 73% claim because of the old 64% label. Do not use the old label image in new content. Replace it when the owner supplies the new image.

**Acceptance:** no 18,000 ft, 85+, four-step, 30-day, or “73% by Eurofins” copy remains.

### 7.2 Author/E-E-A-T page

Create `app/pages/authors/nawaz-ali.vue` or `/about/nawaz-ali`.

- Bio: role, Skardu production, extraction/export experience, since 1972 family history.
- Photo and credentials.
- Link bylines to the author page.
- Add `Person` schema with `worksFor` Organization and `sameAs` where available.
- Update Article schema `author` to the Person URL.

**Acceptance:** every blog byline links to a live author page; Person schema is valid.

### 7.3 Content audit and consolidation

Audit all 20 posts for overlapping intents:

- Price: price guide vs product page.
- Best/brands: best-brands post vs product page.
- Authenticity: heavy-metals/lab-testing posts.
- UK: UK wholesale, UK scam, UK market, resin vs powder UK.
- USA: USA wholesale, USA trends.
- Germany/Norway: country-specific posts.

Actions:

- Keep one canonical page per intent.
- Merge thin duplicates; 301 the weaker URL.
- Add citations/references to studies; avoid health claims.
- Add “Last updated” and supplement disclaimer.
- Do not mass-publish AI content.

**Acceptance:** documented content map; no duplicate targeting; all redirects one-hop.

### 7.4 Local SEO

- GBP: primary category Organic Grocery; add Health Food Store/Supplement Store if available.
- Add products/services: shilajit resin, drops, wholesale, private label.
- Add hours, photos, Q&A, posts; respond to reviews.
- NAP consistency: fix the Lahore Organic Village listing conflict if it is a partner.
- Add `/locations/lahore` to footer/nav; link from contact.
- Add local FAQs and map.
- Add Skardu page only if a GBP exists; otherwise keep production address on contact/about.

**Acceptance:** GBP and site NAP match; location page is indexed; no duplicate local pages.

### 7.5 Internal linking

- Home → product, wholesale, certifications, blog.
- Product → lab reports, wholesale, price guide, dosage post.
- Blog → product/wholesale/certifications; related posts.
- Footer → products, contact, locations, certifications, policies.
- Breadcrumbs → `/products`.

**Acceptance:** no money page is orphaned; all new pages have at least 3 internal links.

---

## 8. P3 — Performance, Authority, Measurement

### 8.1 Performance

- Convert large PNGs to WebP/AVIF; resize; lazy-load below-fold images.
- Target: hero <200KB; product images <100KB; total image payload <2MB per page.
- Add HTML `Cache-Control` via Nitro route rules.
- Prerender `/`, `/products/**`, `/certifications`, `/blogs/blog`, `/contact`, `/locations/lahore` where safe.
- Re-test TTFB and CWV after PageSpeed quota resets (currently 429).
- Avoid layout shift: explicit image dimensions, font preload already present.

**Acceptance:** image directory reduced substantially; cache headers present; no CLS regression.

### 8.2 Authority

- Pakistani business/export directories; Lahore Organic Village; Skardu local citations.
- Supplier/exporter directories and relevant industry blogs.
- No spam links, no paid link schemes.
- Monthly GBP posts/photos; ask real customers for Google reviews; never fake reviews.

### 8.3 Measurement

Weekly GSC review (last 7 days):

- Total: 47 clicks / 952 impressions / 4.94% CTR / pos 12.46.
- Shilajit queries: 13 clicks / 289 impressions.
- Brand: 18 clicks / 27 impressions (organic aprico + organic aprico shilajit).
- Saffron: 0 clicks / 0 impressions.
- Product page: 8 clicks / 131 impressions / 6.11% CTR / pos 15.28.
- `shilajit price in pakistan`: 2 clicks / 17 impressions / 11.76% CTR / pos 17.88. Product-page query-page position: 31.4.
- `best shilajit brand in pakistan`: 0 clicks / 27 impressions / pos 7.70.
- `best shilajit in pakistan`: 0 clicks / 24 impressions / pos 14.21.
- Wholesale: 0 clicks / 4 impressions; Drops: 0 clicks / 15 impressions.
- Certifications: 1 click / 30 impressions / 3.33% CTR / pos 1.90.
- Local page impressions.
- Indexed URL count and 404s.

Annotate deployments and content changes in GSC. Judge success on non-brand shilajit clicks and positions, not total clicks alone; brand queries already rank #1. Saffron is excluded from the current baseline.

---

## 9. Verification Checklist

Run after each phase:

- `npm run build` passes.
- `npm run dev` smoke test: home, product, wholesale, drops, certifications, blog index, 3 new posts, contact, location, products hub.
- `curl -I` each key URL: 200/301 expected; canonical present; no `noindex` on indexable pages.
- Sitemap includes all intended URLs; blog count = 20; no 404s.
- JSON-LD parses: Product, Breadcrumb, Article, LocalBusiness, FAQPage.
- No review schema or review UI.
- No QR claim.
- No 30-day return copy.
- Prices unchanged.
- 73% claim intact; Eurofins attribution corrected.
- Mobile check at 390px and 768px.

---

## 10. Handoff Protocol

1. Read this file fully before editing.
2. Work in phase order: P0 → P1 → P2 → P3.
3. Do not commit or deploy unless the owner asks.
4. After each phase, report:
   - Files changed.
   - Commands run and results.
   - URLs verified.
   - Remaining blockers.
5. Stop and ask the owner if:
   - A certificate/asset is missing.
   - GBP hours differ from 11 AM–12 AM.
   - A return-policy detail would change the 3-day promise.
   - A new dependency would be required.
6. Leave the worktree ready for review; do not hide unrelated changes.

---

## 11. Owner Tasks

- Replace the old 64% packaging image when ready.
- Upload the ISO 9001 certificate asset.
- Confirm GBP hours if they differ from 11 AM–12 AM.
- Confirm the GBP share URL stays current.
- Deploy after review.
