<template>
  <div class="hub-page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="breadcrumb">
      <div class="wrap">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <span class="current">Products</span>
      </div>
    </div>
    <main>
      <section class="hub-hero">
        <div class="wrap">
          <h1>Shilajit Products &amp; Prices in Pakistan</h1>
          <p class="hub-lede">Three ways to buy Organic Aprico shilajit: gold-grade resin in jars, liquid drops for daily use, and bulk resin with private label for retailers and brands. Every product is the same 8-stage purified resin from our own extraction facility above 17,000 ft in Skardu, with batch-level lab reports.</p>
          <ul class="hub-facts">
            <li><strong>73% fulvic acid</strong> &mdash; Micro Quality Lab, California</li>
            <li><strong>Batch code on every pack</strong> &mdash; lab report on request</li>
            <li><strong>Cash on delivery</strong> in Pakistan</li>
            <li><strong>3-day returns</strong> on retail orders</li>
          </ul>
        </div>
      </section>

      <section class="hub-section">
        <div class="wrap">
          <h2>Compare the range</h2>
          <div class="hub-grid">
            <article v-for="card in products" :key="card.href" class="hub-card">
              <div class="hub-card-img">
                <img :src="card.image" :alt="card.imageAlt" loading="lazy" width="600" height="400">
              </div>
              <div class="hub-card-body">
                <h3>{{ card.name }}</h3>
                <p class="hub-price">{{ card.priceFrom }}</p>
                <p class="hub-best"><strong>Best for:</strong> {{ card.bestFor }}</p>
                <p>{{ card.summary }}</p>
                <ul class="hub-trust">
                  <li v-for="fact in card.trust" :key="fact">{{ fact }}</li>
                </ul>
                <NuxtLink :to="card.href" class="btn btn-gold">View {{ card.cta }}</NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="hub-section hub-tint">
        <div class="wrap">
          <h2>Shilajit prices at a glance</h2>
          <p class="hub-lede">Retail jars start at Rs 1,500 for 10 g. Bulk orders start at 1 kg for Rs 95,000. Prices below are current and unchanged for 2026.</p>
          <div class="table-scroll">
            <table class="hub-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Size</th>
                  <th scope="col">Price</th>
                  <th scope="col">Price per gram</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in priceRows" :key="row.id">
                  <td>{{ row.product }}</td>
                  <td>{{ row.size }}</td>
                  <td class="hub-price-cell">{{ row.price }}</td>
                  <td>{{ row.perGram }}</td>
                </tr>
                <tr>
                  <td>Wholesale resin</td>
                  <td>1 kg</td>
                  <td class="hub-price-cell">Rs 95,000</td>
                  <td>Rs 95 / g</td>
                </tr>
                <tr>
                  <td>Wholesale resin</td>
                  <td>5 kg</td>
                  <td class="hub-price-cell">Rs 475,000</td>
                  <td>Rs 95 / g</td>
                </tr>
                <tr>
                  <td>Wholesale resin</td>
                  <td>10 kg+</td>
                  <td class="hub-price-cell">On request</td>
                  <td>Volume quote</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="hub-note">10 kg+ volume pricing is on request. See the <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">wholesale &amp; private label page</NuxtLink> for MOQ, lead time and export documents, or our <NuxtLink to="/blogs/blog/shilajit-prices-in-pakistan-what-you-need-to-know">shilajit price guide</NuxtLink> for the market context.</p>
        </div>
      </section>

      <section class="hub-section">
        <div class="wrap hub-cta">
          <h2>Not sure which to order?</h2>
          <p>Resin is the strongest value per gram and the format most people start with. Drops are the easiest to take daily. Wholesale is for resellers and brands.</p>
          <div class="hub-cta-actions">
            <NuxtLink to="/products/shilajit" class="btn btn-gold">Buy shilajit resin</NuxtLink>
            <NuxtLink to="/certifications" class="btn btn-ghost">See lab reports</NuxtLink>
            <NuxtLink to="/contact" class="btn btn-ghost">Ask us on WhatsApp</NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
    <CartDrawer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS, formatPrice } from '~/data/products'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { count: cartCount, openDrawer: openCart } = useCart()

const resin = PRODUCTS.find(p => p.key === 'resin')!
const drops = PRODUCTS.find(p => p.key === 'drops')!

const products = [
  {
    href: '/products/shilajit',
    name: 'Shilajit Resin',
    image: '/images/products/shilajit-resin-hero.jpg',
    imageAlt: 'Organic Aprico gold-grade Himalayan shilajit resin jar',
    priceFrom: 'From Rs 1,500 (10 g) — Rs 12,900 (100 g)',
    bestFor: 'Best value per gram, and the format most buyers start with',
    summary: 'Gold-grade raw resin in 10 g, 20 g, 30 g, 50 g and 100 g glass jars. Label serving size 0.7 g, so 100 g gives about 142 servings.',
    trust: [
      '73% fulvic acid — Micro Quality Lab, California',
      'PCSIR heavy metals: non-detect',
      '8-stage purification, sun-dried 40+ days',
      'Batch code and lab report on every jar',
    ],
    cta: 'resin',
  },
  {
    href: '/products/shilajit-drops',
    name: 'Shilajit Drops',
    image: '/images/products/shilajit-drops-hero.png',
    imageAlt: 'Organic Aprico shilajit drops bottle',
    priceFrom: 'From Rs 2,000 (30 ml) — Rs 4,000 (60 ml)',
    bestFor: 'Anyone who wants the easiest daily routine, with no spoon or dissolving',
    summary: 'Pure resin dissolved in mineral-rich glacier water. Nine drops twice a day in water, milk or tea. Oil-free and alcohol-free.',
    trust: [
      'Same 8-stage purified resin as the jars',
      'Liquid — no mixing or mess',
      'Batch code and lab report included',
      'Cash on delivery in Pakistan',
    ],
    cta: 'drops',
  },
  {
    href: '/products/pure-himalayan-shilajit-resin-wholesale',
    name: 'Wholesale & Private Label',
    image: '/images/products/wholesale-hero.jpg',
    imageAlt: 'Bulk Himalayan shilajit resin for wholesale buyers',
    priceFrom: 'From Rs 95,000 (1 kg) — 5 kg Rs 475,000, 10 kg+ on request',
    bestFor: 'Retailers, resellers, importers and private-label brands',
    summary: 'Bulk resin direct from our Skardu extraction and purification facility. MOQ 1 kg, private label packaging, and the full export document set included.',
    trust: [
      'MOQ 1 kg, dispatched within 24 hours',
      '73% fulvic acid, lab reports for every batch',
      'Private label and custom packaging',
      'Customs, health certificate and export documents',
    ],
    cta: 'wholesale',
  },
]

const priceRows = [
  { id: 'r10', product: 'Shilajit Resin', size: '10 g', price: formatPrice(resin.sizes[0].price), perGram: 'Rs 150 / g' },
  { id: 'r20', product: 'Shilajit Resin', size: '20 g', price: formatPrice(resin.sizes[1].price), perGram: 'Rs 145 / g' },
  { id: 'r30', product: 'Shilajit Resin', size: '30 g', price: formatPrice(resin.sizes[2].price), perGram: 'Rs 133 / g' },
  { id: 'r50', product: 'Shilajit Resin', size: '50 g', price: formatPrice(resin.sizes[3].price), perGram: 'Rs 142 / g' },
  { id: 'r100', product: 'Shilajit Resin', size: '100 g', price: formatPrice(resin.sizes[4].price), perGram: 'Rs 129 / g' },
  { id: 'd30', product: 'Shilajit Drops', size: '30 ml', price: formatPrice(drops.sizes[0].price), perGram: 'Liquid format' },
  { id: 'd60', product: 'Shilajit Drops', size: '60 ml', price: formatPrice(drops.sizes[1].price), perGram: 'Liquid format' },
]

useSeoMeta({
  title: 'Shilajit Products & Prices in Pakistan 2026 | Organic Aprico',
  description: 'Shilajit resin from Rs 1,500, drops from Rs 2,000 and wholesale from Rs 95,000/kg. 73% fulvic acid, 8-stage purification, batch lab reports, COD in Pakistan.',
  ogTitle: 'Shilajit Products & Prices in Pakistan 2026 — Organic Aprico',
  ogDescription: 'Resin, drops and wholesale. 73% fulvic acid, lab reports with every batch, cash on delivery in Pakistan.',
  ogImage: '/images/products/shilajit-resin-hero.jpg',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Products' },
      ])),
    },
  ],
})
</script>

<style scoped>
.hub-page { padding-top: 76px; }

.hub-hero {
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
  border-bottom: 1px solid var(--line);
}
.hub-hero h1 {
  font-size: clamp(2.1rem, 4.2vw, 3.4rem);
  line-height: 1.08;
  max-width: 18ch;
  margin-bottom: 1.1rem;
}
.hub-lede {
  color: var(--stone);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 68ch;
  margin-bottom: 1.5rem;
}
.hub-facts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: .7rem;
  max-width: 60rem;
}
.hub-facts li {
  color: var(--stone);
  font-size: .95rem;
  padding-left: 1.1rem;
  position: relative;
}
.hub-facts li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .6em;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
}
.hub-facts strong { color: var(--cream); font-weight: 600; }

.hub-section { padding: clamp(2.5rem, 5vw, 4rem) 0; }
.hub-tint { background: linear-gradient(180deg, rgba(23,20,14,.55), rgba(7,6,4,0)); }
.hub-section h2 { font-size: 1.7rem; margin-bottom: 1.5rem; }

.hub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.hub-card {
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(23,20,14,.6), rgba(7,6,4,0) 60%);
}
.hub-card-img { border-bottom: 1px solid var(--line-soft); }
.hub-card-img img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 3 / 2;
}
.hub-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .7rem;
  flex: 1;
}
.hub-card-body h3 { font-size: 1.3rem; }
.hub-card-body p { color: var(--stone); font-size: .94rem; line-height: 1.6; }
.hub-price { color: var(--gold-bright); font-weight: 600; font-size: 1rem; }
.hub-best strong { color: var(--cream); }
.hub-trust {
  list-style: none;
  padding: 0;
  margin: .2rem 0 .6rem;
  display: flex;
  flex-direction: column;
  gap: .35rem;
}
.hub-trust li {
  color: var(--stone);
  font-size: .88rem;
  padding-left: 1.1rem;
  position: relative;
}
.hub-trust li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
}
.hub-card-body .btn { align-self: flex-start; margin-top: auto; }

.table-scroll { overflow-x: auto; }
.hub-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 34rem;
  margin-bottom: 1.25rem;
}
.hub-table th,
.hub-table td {
  padding: .75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--line-soft);
  font-size: .94rem;
}
.hub-table th { font-family: var(--serif); font-weight: 600; color: var(--stone); }
.hub-table td { color: var(--cream); }
.hub-table tr:last-child td { border-bottom: none; }
.hub-price-cell { color: var(--gold-bright); font-weight: 600; }
.hub-note { color: var(--stone); font-size: .92rem; max-width: 74ch; }
.hub-note a { color: var(--gold-bright); }

.hub-cta { text-align: center; }
.hub-cta p { color: var(--stone); max-width: 60ch; margin: 0 auto 1.5rem; }
.hub-cta-actions { display: flex; gap: .85rem; justify-content: center; flex-wrap: wrap; }

@media (max-width: 820px) {
  .hub-card-body .btn { width: 100%; text-align: center; }
}
</style>
