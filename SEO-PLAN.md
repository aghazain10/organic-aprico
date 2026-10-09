# SEO Plan — organicaprico.com (Shilajit-Only)

**Site:** https://organicaprico.com (Nuxt 4 custom build, migrated from Shopify → WordPress/Woo before that)
**Focus:** Shilajit only — 3 products: Resin (`/products/shilajit`), Drops (`/products/shilajit-drops`), Wholesale (`/products/pure-himalayan-shilajit-resin-wholesale`)
**Markets:** Pakistan (primary, COD), Worldwide (UK/US/EU via DHL)
**Data used:** Search Console 28-day query report, crawl stats, page coverage (valid / 404 / blocked / redirects / duplicate / not indexed), full crawl of current Nuxt code.

---

## 1. Executive Summary

| Metric (last 28 days) | Value | Reading |
|---|---|---|
| Total clicks | ~350 | Small but brand-dominated |
| Brand clicks (organic aprico + variants) | ~95 (27%) | Strong, healthy |
| Saffron/zafran clicks | ~190 (55%) | **Will disappear** — saffron removed |
| Shilajit clicks | ~60 (17%) | **The growth pool** |
| Crawl requests wasted on 404s | **19%** | ~90 dead URLs crawled monthly |
| Crawl requests on redirects | 9% | Old Woo/Shopify URL migrations |
| Discovery crawl share | 3% | Google barely finds new content organically |

**The one-line diagnosis:** Google is spending ~28% of your crawl budget on dead URLs from three previous site generations, while your money keyword cluster — *"shilajit price in Pakistan"* and every gram/size/best/original variant — is stuck at positions 6–12 (bottom of page 1 / top of page 2). You are one strong optimization push away from tripling commercial traffic, because the product page targeting this cluster already exists and is already indexed.

**After saffron removal, your realistic ceiling is the shilajit cluster:** ~1,500–2,000 impressions/month today at avg. position ~7–12. Ranking top-3 on the head terms converts that into an estimated **250–500 clicks/month organically** before content work compounds it.

---

## 2. Impact of Removing Saffron (Plan Accordingly)

Saffron was 55% of your clicks (≈190/mo) and the #1 query (`zafran price in pakistan`, 144 clicks, pos 6.0) plus ~7,000 saffron impressions at 0% CTR. Once `/products/pure-zafran` is gone:

- **This traffic is not recoverable on this site** — do not chase it. Do not create "saffron price" content "just in case." Google will re-evaluate the site as a shilajit site; mixed signals (a dead saffron page still indexed, or a stub saffron page) will *slow* shilajit rankings.
- **Action (Week 1):** 301 redirect `https://organicaprico.com/products/pure-zafran` → `https://organicaprico.com/`. Do not 404 it — the page has 3+ years of history and backlinks.
- Remove any saffron mentions from homepage/blog content and internal links (Googlebot was last crawling that page 2026-09-22 — it will retry for weeks).
- Expect a visible **click drop in GSC for 2–4 weeks** after the change. This is expected; do not panic-revert. Track the shilajit cluster separately (instructions in §10).

---

## 3. Keyword Strategy — Shilajit Cluster (from your real query data)

### 3.1 Cluster A — Price/commercial (highest priority, ~60% of shilajit demand)

All currently at positions 6–12. **Landing page: `/products/shilajit`** (already carries this content — keep it as the single price-hub).

| Query | Impr. | Pos. today | Target |
|---|---|---|---|
| shilajit price in pakistan | 669 | 7.4 | Top 3 |
| shilajit price 10 gram in pakistan | 97 | 6.1 | Top 3 |
| shilajit price | 94 | 9.0 | Top 5 |
| shilajit price in pakistan 1kg | 71 | 7.0 | Top 3 |
| shilajit 1kg price in pakistan | 49 | 7.3 | Top 3 |
| original shilajit price in pakistan | 48 | 6.8 | Top 3 |
| pure shilajit price in pakistan | 47 | 7.7 | Top 3 |
| original shilajit price in pakistan | (long-tail) | 6.7 | Top 3 |
| shilajit price pakistan / shilajeet price / salajeet price in pakistan 1kg | ~35 | 6–9 | Top 3 |
| fulvic acid price | 1 | 10.0 | Top 5 |

**Why you're stuck at 6–9:** these SERPs are dominated by marketplaces + recent "2026 price guide" pages with fresh dates. Your product page's price content says **"1400 PKR"** in the body while the live variant data says **1500 PKR**, and lists 2700/6900 vs actual 2900/7100 — stale, contradictory price signals. Fixing this (§5.2) is the single highest-leverage on-page change.

### 3.2 Cluster B — Best/brand-comparison

| Query | Impr. | Pos. today | Target landing |
|---|---|---|---|
| best shilajit brand in pakistan | 51 | 4.0 | Blog post |
| best shilajit in pakistan | 197 | 12.1 | Blog post |
| shilajit brands in pakistan | 25 | 6.4 | Blog post |
| best salajeet in pakistan | 15 | 18.7 | Blog post |
| shilajit brands | 4 | 5.8 | Blog post |

**Action:** make `/blogs/blog/best-shilajit-brands-2026-...` the definitive comparison page (your product listed honestly among criteria + competitors, a comparison table, lab-testing criteria, price-per-gram analysis). Evergreen the title ("Best Shilajit Brands in Pakistan (2026 Updated)") and refresh it quarterly — "best" queries reward freshness.

### 3.3 Cluster C — Informational (build topical authority)

You already have strong posts (authenticity, testosterone, heavy metals, women). Gap topics based on queries you got impressions for but no content, plus People-Also-Ask patterns in Pakistan:

1. `shilajit price in pakistan` — dedicated **2026/2027 price guide blog post** (separate from product page; links to it) — price-per-gram table by size and city, why prices differ, fake-vs-real price ranges.
2. "How to use shilajit resin / dosage" — you have dosage content inside the product tab; promote it to a blog post (`how-to-take-shilajit-resin-dosage-timing`).
3. "Shilajit vs ashwagandha", "shilajit for gym/gym-goers Pakistan", "shilajit side effects" — 3 posts.
4. Roman-Urdu lexicon: Pakistanis search **salajeet / shilajeet / shilajit in urdu** — use these naturally in headings/body of the PK-facing pages (you already do partially — increase in H2s).
5. **Consolidate duplicates:** you have TWO posts on heavy-metals/lab-testing (`...heavy-metals-lab-testing-and-authentic-source...` AND `...heavy-metals-and-lab-testing`) — merge into one, 301 the weaker to the stronger.

### 3.4 Cluster D — Wholesale / B2B (high margin, low competition)

Queries like `shilajit wholesale`, `private label shilajit`, and your existing UK/US wholesale posts. Landing: `/products/pure-himalayan-shilajit-resin-wholesale`.
**Action:** add H1 "Shilajit Wholesale & Private Label from Pakistan", a MOQ/pricing tier table, and target `shilajit wholesale price`, `bulk shilajit supplier`, `shilajit private label pakistan`.

### 3.5 Do NOT target (deliberate de-scoping)

- All zafran/saffron/kesar queries (1,689 + 343 + 272 impressions — gone by design).
- `zarshik` / `zarshak` (product discontinued).
- Generic `organic` terms (`organic village`, `quinoa organic`, `eggs organic`, `organic food delivery` — leftover queries from the dried-fruit era; they will age out).

---

## 4. Technical SEO — Week 1–2 (highest impact first)

### 4.1 Kill the 404 crawl-waste (19% of all crawl budget)

Google crawled **~90 dead product/collection URLs** in the last 28 days — dried fruits, nuts, seeds, honey, oils from the old Shopify store, plus WordPress-era paths (`/product/...`, `/product-category/...`, `/shop/...`, `/tag/...`, `/wp-includes/...`).

**Add a legacy redirect map** (server route or expanded `routeRules` in `nuxt.config.ts`). Group and redirect:

| Legacy group | Example (from your 404 report) | 301 target |
|---|---|---|
| All removed products | `/products/dried-apricot-khubani`, `/products/almond-american`, `/products/organic-beri-honey`, … | `/products/shilajit` |
| All removed collections | `/collections/dry-fruits`, `/collections/organic-honey`, `/collections/seeds`, … | already covered by your `/collections/**` rule — **verify it works live** (see below) |
| Old Woo product paths | `/product/organic-shilajeet-fulvic-aprico-exported-quality/`, `/product/pure-himalayan-shilajit/`, `/product/zarshak-shireen/` | `/products/shilajit` |
| Old Woo category/shop | `/product-category/shilajit/`, `/shop/...`, `/home/`, `/home-2-2/`, `/service/`, `/affiliate-dashboard/` | `/` (some already 301 — keep) |
| Old blog paths | `/himalayan-shilajit-vs-shilajit-fulvic-aprico/` | matching new blog URL |
| Old Shopify *pages* still in the index | `/pages/our-locations` → `/pages/about-us`; `/pages/who-is-behind-organic-aprico` → `/pages/about-us`; `/pages/faq` → `/`; `/pages/lab-reports` → `/certifications`; `/pages/contact-us` → `/`; `/pages/our-mission`, `/pages/our-goals`, `/pages/our-vision` → `/pages/about-us`; `/pages/certifications` → `/certifications`; `/pages/data-sharing-opt-out` → `/policies/privacy-policy`; `/pages/delivery-information` → `/policies/shipping-policy`; `/pages/our-locations` etc. | see left |
| Shopify system paths | `/cart`, `/search`, `/wpm`, `/cdn`, `/b`, `/v1/produce`, `/recent-viewed-products/`, `/customer_authentication/redirect` | `/` (301) |
| Broken junk | `/blogs/blog/ultimate-guide-`, `/blogs/blog/is-`, `/products/%20...health.clevelandclinic...`, `/${t}` | `/blogs/blog` or `/` |
| Tag archives | `/product-tag/...`, `/tag/ashwagandha/` | `/blogs/blog` |

> ⚠️ **Verify your existing rule actually fires:** your 404/crawl reports show `/collections/all?page=6` and `/collections/pure-shilajit` crawled with **200 OK** as recently as 2026-09-17/21, yet `nuxt.config.ts` has `'/collections/**' → /products/shilajit`. Either the rule wasn't deployed at crawl time or query strings bypass it. Test with `curl -I https://organicaprico.com/collections/pure-shilajit` and `curl -I "https://organicaprico.com/collections/all?page=6"` — both must return `301` to `/products/shilajit`.

After deploying the redirect map, in GSC use **URL Inspection → Request indexing** only on the 5 money pages; for everything else let the redirects do the work (they're crawled weekly anyway).

### 4.2 robots.txt hardening

Current robots.txt only blocks `/checkout`. Add:

```
User-agent: *
Allow: /
Disallow: /checkout
Disallow: /admin
Disallow: /cart
Disallow: /*?variant=
Disallow: /*?sort_by=
Disallow: /*?_wpnonce=
Disallow: /*add_to_wishlist
Disallow: /*yith-woocompare
Sitemap: https://organicaprico.com/sitemap.xml
```

This stops future parameter-crawl waste (your "blocked by robots" report shows Google still trying `?sort_by=`, `?id=`, variant URLs from 2024–2026).

### 4.3 Sitemap fixes (`server/routes/sitemap.xml.ts`)

- ✅ Already clean (only real pages). Add:
  - `lastmod` for static pages (use actual file/git dates) — Google currently sees your whole sitemap as dateless.
  - Ensure **every** sitemap URL returns 200 (the old Shopify sitemap habit of listing /pages/* you no longer have must not recur).
  - When saffron product is 301'd, it must vanish from the sitemap (it's not in `STATIC_PATHS` — good; double-check the deployed sitemap).

### 4.4 Structured data upgrades (currently partial)

Your three product pages have `Product` JSON-LD, but:

1. **`image` must be an absolute URL** (`https://organicaprico.com/images/...`) — relative paths fail Google's rich-results validation.
2. Add `priceValidUntil` (end of current quarter), `sku`, `itemCondition: NewCondition`, and use `AggregateOffer` (lowPrice 1500 / highPrice 12900 / offerCount 5) instead of bare offers.
3. **⚠️ Reviews risk:** the page shows 10 hardcoded reviews but schema claims `reviewCount: 200`, and the review form doesn't persist anything. **Google can manual-action self-serving review markup that isn't real.** Either (a) remove `aggregateRating` until reviews are real, or (b) make reviews real (DB-backed via Prisma — you already have it). Recommend (a) now, (b) within 60 days — real reviews then feed the star rating rich result, which lifts CTR on "shilajit price" SERPs by 20–35%.
4. Add **site-wide** `Organization` schema (logo, sameAs social profiles, contactPoint with `+92-331-1116915`, address Skardu + Lahore) — put it in `nuxt.config.ts` `app.head` so it's on every page.
5. Add **`BreadcrumbList`** schema on product + blog pages (markup for the breadcrumbs you already render visually).

### 4.5 Canonical/hygiene checks

- `app/plugins/canonical.ts` is correct (path-based canonical on every page). ✅
- Confirm `/checkout` sends `X-Robots-Tag: noindex` at the HTTP level too (routeRules `robots` covers meta; add a Nitro middleware header for belt-and-braces).
- 404 page: create a proper `app/error.vue` (you have none) with nav + links to the 3 products — softens the 90-URL 404 era for any human visitors.
- Decide **one** canonical host form: `https://organicaprico.com` (no www, no trailing slash) and ensure the host 301s `www` → apex at the hosting/DNS level.

---

## 5. On-Page Optimization — Week 2–3

### 5.1 Title/meta patterns

| Page | Title | Meta description |
|---|---|---|
| `/products/shilajit` | `Shilajit Price in Pakistan 2026 — Pure Himalayan Resin from Rs 1,500 \| Organic Aprico` | `Original gold-grade Himalayan shilajit price in Pakistan: 10g Rs 1,500 · 20g Rs 2,900 · 50g Rs 7,100 · 100g Rs 12,900. Lab-tested 73% fulvic acid, COD nationwide, worldwide shipping.` |
| `/products/shilajit-drops` | `Shilajit Drops Price in Pakistan (30ml, 60ml) — Lab-Tested \| Organic Aprico` | ...include both prices + "9 drops twice daily" |
| `/products/pure-himalayan-shilajit-resin-wholesale` | `Shilajit Wholesale & Private Label from Pakistan — From Rs 95,000/kg` | MOQ, lab reports, export docs in description |
| `/` | keep (brand + category is fine) | keep |
| Blog index | keep | keep |

Rules: put the exact query phrase in the first 40 chars; include a price (prices in titles win the click on PK commercial SERPs); keep `| Organic Aprico` brand tail on everything except homepage.

### 5.2 Price consistency (do this before anything else)

The resin page body currently advertises **1400/2700/4000/6900 PKR** while `app/data/products.ts` sells **1500/2900/4000/7100**. Sync the HTML body to the data file (or better: render the price list from `product.sizes` so they can never drift). Contradictory prices suppress "price" rankings and destroy buyer trust. Same audit for the 1kg wholesale figure (page says "80,000 PKR/kg" in one paragraph, 95,000 in data).

### 5.3 Internal linking architecture

```
Homepage
 ├─ /products/shilajit        (resin hub — Cluster A money page)
 ├─ /products/shilajit-drops
 ├─ /products/...wholesale
 ├─ /certifications, /purification   (E-E-A-T silo)
 └─ /blogs/blog
      ├─ Price guide post ──→ /products/shilajit (top CTA)
      ├─ Best brands post ──→ /products/shilajit + /certifications
      ├─ Authenticity post ─→ /certifications
      └─ Wholesale posts ───→ wholesale page
```

- Every blog post gets exactly one prominent in-content link to its money page (not just footer).
- Product pages link to their supporting blog posts (you already do — extend to the new price guide).
- Add "Related products" cross-links among all 3 products (resin↔drops exists; add wholesale to drops page if missing).

### 5.4 Content freshness signals

- Rename blog slugs/titles containing **2025** → "2026" or evergreen ("...Prices in Pakistan: Complete Guide", then update the date + price table each quarter and bump `lastmod` in the sitemap).
- Add a visible "Last updated: <date>" on the price guide and best-brands posts.
- Since you're a Skardu extractor, add **author byline + bio** on blog posts ("Written by the Organic Aprico production team, Skardu") — cheap E-E-A-T that competitors (resellers) can't copy.

---

## 6. Content Calendar — Weeks 3–12 (2 posts/month is enough, quality > volume)

| Week | Piece | Target cluster |
|---|---|---|
| 3 | Shilajit Price in Pakistan 2026/2027 — Complete Guide (blog) | A |
| 4 | Best Shilajit Brands in Pakistan — rewritten comparison | B |
| 6 | How to Take Shilajit Resin: Dosage, Timing, Mistakes | C |
| 8 | Shilajit for Gym & Athletes in Pakistan | C |
| 10 | Shilajit Side Effects & Who Should Avoid It | C (trust queries convert) |
| 12 | Update wholesale page: MOQ table + export documentation checklist | D |

Each post: 1,200–1,800 words, original photos of your Skardu/Lahore facility (unique images = edge over resellers), FAQ schema-ready Q&A section, one money-page link.

---

## 7. Off-Page & Trust (Weeks 2–12, ongoing)

1. **Google Business Profile** for the Skardu production house and Lahore outlet — you rank #1 for brand, but GBP wins the map pack for "shilajit near me Lahore/Skardu".
2. **Backlinks you can actually get in PK:** Daraz/Instagram/Facebook shop links, PK supplement & herbal directories, press mention via your SECP registration + lab certificates story ("Skardu extractor gets CA lab certification"), 2–3 guest posts on PK health blogs.
3. **Wholesale B2B links:** Alibaba/TradeKey/ExportHub profiles, PK trade-body listings (all link back to the wholesale page).
4. **YouTube/TikTok:** 1 short/month showing the resin texture test, fire test, dissolution test — embed on product page (dwell time + video rich result) and link in bio. Pakistan's shilajit buyers heavily consume these before purchase.
5. **Real review migration:** collect WhatsApp order reviews → publish to DB → replaces the hardcoded reviews (feeds stars in §4.4).

---

## 8. International Track (light-touch, existing posts)

You already target UK/US/DE/NO in blog posts — keep them, and:
- Ensure each country post links to the wholesale page with an anchor like "buy wholesale shilajit in the UK".
- Add one "Shipping worldwide from Pakistan — what to expect (customs, DHL, timelines)" post answering the #1 pre-purchase objection (it's also a long-tail query).
- Don't create country-specific landing pages until a market shows real impressions in GSC — let the data pull you, don't push.

---

## 9. 90-Day Timeline & Expected Outcomes

| Phase | Weeks | Actions | Expected result |
|---|---|---|---|
| 1. Triage | 1–2 | Saffron 301, legacy redirect map, robots.txt, price sync, JSON-LD fixes | Crawl waste 19% → <5%; clean index by week 4 |
| 2. On-page | 2–4 | Titles/metas, price hub content, internal links, schema | Cluster A positions 6–9 → 4–6 |
| 3. Content | 3–12 | 6 posts per calendar, freshness updates | New impressions on Cluster C; B posts into top 5 |
| 4. Authority | 2–12 | GBP, directories, 2–3 backlinks/mo, video | Domain strength for PK shilajit SERPs |
| 5. Reviews | 60–90 days | Real DB-backed reviews + stars in SERP | CTR +20–35% on money pages |

**Realistic 90-day targets (shilajit queries only):**
- `shilajit price in pakistan`: pos 7.4 → **≤3**, 669 → 1,200+ imp
- `best shilajit in pakistan`: pos 12.1 → **≤5**
- Shilajit cluster clicks: ~60/mo → **250–400/mo**
- Crawl waste on 404s: 19% → **<5%**
- Fully offset saffron loss by month 3–4; net growth by month 5–6.

---

## 10. Measurement Ritual (15 min/week)

1. GSC → **Search results → filter query containing "shilajit" OR "salajeet" OR "shilajeet"** (save as a saved filter/report) — this is your true KPI dashboard now; ignore total clicks (saffron noise).
2. Track weekly: clicks, avg position for the 5 head terms in §3.1, and `status:Indexed` page count (should converge to ~45–55 real pages).
3. Monthly: Crawl Stats → confirm 404 share <5% and Discovery share rising above 10%.
4. URL Inspection after each phase-1 deploy on the 5 money pages → Request indexing.
5. Watch "Page indexing" report weekly for 3 weeks after the redirect map ships — the 404 count should decay steadily; if a dead URL keeps getting *crawled* (not just reported), its redirect is missing from the map.

---

## 11. Quick-Wins Checklist (print this)

- [ ] 301 `/products/pure-zafran` → `/`
- [ ] Build legacy redirect map (§4.1 table) — kills 19% crawl waste
- [ ] Verify `/collections/**` redirect actually returns 301 in production
- [ ] robots.txt: block `/admin`, variant/sort_by/wpnonce params
- [ ] Sync body-text prices with `app/data/products.ts` (1500/2900/7100)
- [ ] Absolute image URLs in Product JSON-LD; add `AggregateOffer` + `priceValidUntil`
- [ ] **Remove `aggregateRating` from schema until reviews are real**
- [ ] Add Organization JSON-LD sitewide + BreadcrumbList on product/blog pages
- [ ] New titles/metas per §5.1 (price in title)
- [ ] Create `app/error.vue` 404 page
- [ ] Publish Price Guide post (week 3) + rewrite Best Brands post (week 4)
- [ ] Merge the two duplicate heavy-metals posts, 301 the loser
- [ ] Google Business Profile (Skardu + Lahore)
- [ ] Add "Last updated" + author byline to all posts
