<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main>
      <section class="lahore-hero">
        <div class="wrap">
          <div class="breadcrumb">
            <NuxtLink to="/">Home</NuxtLink>
            <span class="sep">/</span>
            <span class="current">Shilajit Shop in Lahore</span>
          </div>
          <h1>Shilajit Shop in Lahore &mdash; Organic Aprico</h1>
          <p class="lede">Our Lahore outlet and dispatch point: buy shilajit resin in person, inspect the batch and lab documentation before you pay, and collect your order the same day.</p>
          <div class="lahore-actions">
            <a href="https://maps.app.goo.gl/PPcqPsNFQVmvtFU27" class="btn btn-gold" target="_blank" rel="noopener">Get directions on Google Maps</a>
            <a href="https://wa.me/923311116915" class="btn btn-ghost" target="_blank" rel="noopener">WhatsApp before you visit</a>
          </div>
        </div>
      </section>

      <section class="lahore-section">
        <div class="wrap lahore-grid">
          <div>
            <h2>Where we are</h2>
            <address class="nap">
              <strong>Organic Aprico</strong><br>
              Lahore Organic Village<br>
              D.H.A. Main Blvd, near Adil Hospital<br>
              DHA Phase 1, Lahore
            </address>
            <ul class="lahore-facts">
              <li><strong>Hours:</strong> 11 AM&ndash;12 AM, daily</li>
              <li><strong>Phone / WhatsApp:</strong> +92 331 1116915</li>
              <li><strong>Email:</strong> organicapricoskardu@gmail.com</li>
            </ul>
            <h2>What you can buy at the counter</h2>
            <p>Everything on our website is available in store: shilajit resin in 10g, 20g, 30g, 50g and 100g jars, Shilajit Drops in 30ml and 60ml bottles, and bulk orders arranged on request. Each box carries its batch code, and we can print out or show the matching Eurofins, PCSIR and Micro Quality Lab results before you buy.</p>
          </div>
          <div>
            <h2>Order pickup</h2>
            <p>Orders placed online with delivery inside Lahore can be collected from the outlet instead of shipping via TCS. Choose COD or pay in advance, WhatsApp us your order number when you are on the way, and we will have the parcel ready.</p>
            <h2>Cash on delivery, online or in person</h2>
            <p>Paying at the counter works exactly like COD online: inspect the sealed jar, check the batch code and tamper seal, then pay by cash, card, JazzCash or EasyPaisa. Nationwide COD orders placed online are dispatched from this address via TCS.</p>
          </div>
        </div>
      </section>

      <section class="lahore-section lahore-tint">
        <div class="wrap">
          <h2>Finding us in DHA Phase 1</h2>
          <p>The outlet sits on D.H.A. Main Blvd, near Adil Hospital &mdash; the same junction known to anyone who drives DHA regularly. If you are coming from the Ring Road, take the phase exits toward Main Blvd and look for Lahore Organic Village on the main strip. On-street parking is available along Main Blvd, and the shops opposite Adil Hospital have additional paid parking.</p>
          <p>Nearby areas we serve same-day: DHA Phases 1&ndash;6, Cantt, Gulberg, Model Town, Johar Town and Bahria Town. Outside these, your parcel rides TCS like any other COD order.</p>
          <h2>Wholesale buyers</h2>
          <p>Retailers, resellers and private-label brands can visit the outlet to see the resin, the packaging options and the full lab and export documentation. Bulk quotes start at 1kg Rs 95,000, so <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">wholesale pricing</NuxtLink> is arranged in advance &mdash; WhatsApp us before travelling if you want samples or specific batch documentation ready for your meeting.</p>
        </div>
      </section>

      <section class="lahore-section">
        <div class="wrap">
          <h2>Lahore shop FAQ</h2>
          <div class="faq-list">
            <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ open: openFaq === i }">
              <button class="faq-q" @click="openFaq = openFaq === i ? null : i">
                <span>{{ faq.q }}</span>
                <svg class="faq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="faq-a">{{ faq.a }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="lahore-section lahore-tint">
        <div class="wrap lahore-cta">
          <h2>Not near Lahore?</h2>
          <p>We deliver nationwide with cash on delivery, usually within 3 to 5 working days via TCS.</p>
          <NuxtLink to="/products/shilajit" class="btn btn-gold">Order shilajit online from Rs 1,500</NuxtLink>
        </div>
      </section>
    </main>
    <AppFooter />
    <CartDrawer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { buildBreadcrumbJsonLd, SITE_URL } from '~/utils/seo'

const { count: cartCount, openDrawer: openCart } = useCart()

const openFaq = ref<number | null>(null)

const faqs = [
  {
    q: 'Is there somewhere to park at the Lahore outlet?',
    a: 'Yes. There is on-street parking along D.H.A. Main Blvd, and paid parking at the plazas opposite Adil Hospital. We are on the main strip, a short walk from both.',
  },
  {
    q: 'Can I collect my online order at the shop instead of waiting for TCS?',
    a: 'Yes. Place your order online, then WhatsApp us at +92 331 1116915 with your order number. We will hold the parcel at the counter for pickup during opening hours (11 AM–12 AM daily).',
  },
  {
    q: 'Is cash on delivery available?',
    a: 'Yes, both ways: pay cash at the counter after inspecting your jar, or order online and pay cash to the TCS rider anywhere in Pakistan. Bank transfer, card, JazzCash and EasyPaisa are also accepted in store.',
  },
  {
    q: 'Are all products in stock in Lahore?',
    a: 'Resin jars (10g–100g) and Shilajit Drops (30ml/60ml) are regularly stocked. For large quantities or specific batch sizes, WhatsApp us a day ahead so we can confirm stock before you drive over.',
  },
  {
    q: 'Can wholesale buyers visit the outlet?',
    a: 'Yes. Retailers, resellers and private-label brands can inspect the resin, packaging and documentation in person. Contact us first so we can prepare samples and the batch lab reports you need for the meeting.',
  },
  {
    q: 'What are your opening hours?',
    a: 'The Lahore outlet is open from 11 AM to 12 AM (midnight), every day of the week.',
  },
]

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${SITE_URL}/#lahore`,
  name: 'Organic Aprico — Lahore Organic Village',
  description: 'Organic Aprico retail outlet and order dispatch office in DHA Phase 1, Lahore — shilajit resin, drops and wholesale counter.',
  image: `${SITE_URL}/images/logo.png`,
  url: `${SITE_URL}/locations/lahore`,
  telephone: '+92 331 1116915',
  email: 'organicapricoskardu@gmail.com',
  priceRange: 'Rs 1,500 – Rs 95,000/kg',
  currenciesAccepted: 'PKR',
  paymentAccepted: 'Cash on Delivery, Bank Transfer, JazzCash, EasyPaisa, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lahore Organic Village, D.H.A. Main Blvd, near Adil Hospital',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: '54000',
    addressCountry: 'PK',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 31.490481, longitude: 74.379432 },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '11:00',
    closes: '24:00',
  }],
  hasMap: 'https://maps.app.goo.gl/PPcqPsNFQVmvtFU27',
  sameAs: ['https://maps.app.goo.gl/PPcqPsNFQVmvtFU27'],
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  areaServed: ['Lahore', 'Punjab', 'Pakistan'],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Shilajit Shop in Lahore' },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }),
    },
  ],
})

useSeoMeta({
  title: 'Shilajit Shop in Lahore | Organic Aprico',
  description: 'Buy shilajit in Lahore: Organic Aprico, Lahore Organic Village, D.H.A. Main Blvd, near Adil Hospital, DHA Phase 1. Open 11 AM–12 AM daily. Batch lab reports, COD and same-day pickup.',
  ogTitle: 'Shilajit Shop in Lahore — Organic Aprico',
  ogDescription: 'Visit our Lahore outlet in DHA Phase 1 for lab-tested shilajit resin and drops. Open 11 AM–12 AM daily, near Adil Hospital on D.H.A. Main Blvd.',
})
</script>

<style scoped>
.lahore-hero {
  padding: clamp(100px, 14vw, 140px) 0 clamp(24px, 4vw, 48px);
}
.lahore-hero h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.06;
  max-width: 18ch;
  margin-bottom: 1.2rem;
}
.lede { color: var(--stone); font-size: 1.1rem; max-width: 54ch; margin-bottom: 1.75rem; }
.lahore-actions { display: flex; gap: .85rem; flex-wrap: wrap; }

.lahore-section {
  padding: clamp(2rem, 5vw, 4rem) 0;
}
.lahore-tint {
  border-top: 1px solid var(--line-soft);
}
.lahore-section h2 { font-size: 1.5rem; margin-bottom: .9rem; }
.lahore-section p {
  color: var(--stone);
  font-size: .98rem;
  line-height: 1.7;
  max-width: 68ch;
  margin-bottom: 1rem;
}
.lahore-section p :deep(a) { color: var(--cream); text-decoration: underline; text-underline-offset: 3px; }
.lahore-section p :deep(a:hover) { color: var(--gold-bright); }

.lahore-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
}
.nap {
  font-style: normal;
  color: var(--cream);
  line-height: 1.7;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--line);
  margin-bottom: 1.5rem;
  background: linear-gradient(180deg, rgba(201,162,74,.05), rgba(201,162,74,0));
}
.lahore-facts {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .45rem;
  margin-bottom: 2rem;
}
.lahore-facts li { padding-left: 1.2rem; position: relative; color: var(--stone); font-size: .95rem; }
.lahore-facts li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .6em;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
}
.lahore-facts strong { color: var(--cream); font-weight: 500; }

.lahore-cta { text-align: center; }
.lahore-cta p { margin: 0 auto 1.5rem; }

.faq-list {
  display: flex;
  flex-direction: column;
  max-width: 72ch;
  border: 1px solid var(--line);
}
.faq-item { border-bottom: 1px solid var(--line-soft); }
.faq-item:last-child { border-bottom: none; }
.faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.05rem 1.25rem;
  text-align: left;
  color: var(--cream);
  font-size: .97rem;
  transition: color .2s var(--ease);
}
.faq-q:hover { color: var(--gold-bright); }
.faq-arrow { flex-shrink: 0; transition: transform .25s var(--ease); }
.faq-item.open .faq-arrow { transform: rotate(180deg); }
.faq-a {
  display: none;
  padding: 0 1.25rem 1.15rem;
  color: var(--stone);
  font-size: .92rem;
  line-height: 1.65;
}
.faq-item.open .faq-a { display: block; }

@media (max-width: 820px) {
  .lahore-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .lahore-actions { flex-direction: column; }
  .lahore-actions .btn { width: 100%; }
}
</style>
