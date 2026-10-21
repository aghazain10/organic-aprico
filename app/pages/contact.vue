<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main>
      <section class="contact-hero">
        <div class="wrap">
          <div class="breadcrumb">
            <NuxtLink to="/">Home</NuxtLink>
            <span class="sep">/</span>
            <span class="current">Contact</span>
          </div>
          <h1>Contact Organic Aprico</h1>
          <p class="lede">Talk to the producer. Questions about a batch, a lab report, delivery or an export order — we answer directly, no call centre.</p>
        </div>
      </section>

      <section class="contact-section">
        <div class="wrap contact-grid">
          <div class="contact-card">
            <h2>Call or WhatsApp</h2>
            <p>Quickest way to reach us. Call, message or send a voice note in English or Urdu.</p>
            <a class="contact-link" href="tel:+923311116915">+92 331 1116915</a>
            <a class="contact-link" href="https://wa.me/923311116915" target="_blank" rel="noopener">Message us on WhatsApp</a>
          </div>

          <div class="contact-card">
            <h2>Email</h2>
            <p>For batch lab reports, export documents, wholesale quotes or anything you want in writing.</p>
            <a class="contact-link" href="mailto:organicapricoskardu@gmail.com">organicapricoskardu@gmail.com</a>
          </div>

          <div class="contact-card">
            <h2>Lahore outlet</h2>
            <p>Organic Aprico, Lahore Organic Village, D.H.A. Main Blvd, near Adil Hospital, DHA Phase 1, Lahore.</p>
            <p class="contact-hours">Open daily, 11 AM&ndash;12 AM</p>
            <a class="contact-link" href="https://maps.app.goo.gl/PPcqPsNFQVmvtFU27" target="_blank" rel="noopener">Open in Google Maps</a>
            <NuxtLink class="contact-link" to="/locations/lahore">About our Lahore shop</NuxtLink>
          </div>

          <div class="contact-card">
            <h2>Production house</h2>
            <p>Organic Aprico, Lasu House of Production, Sukamaidan, Skardu, Gilgit-Baltistan.</p>
            <p class="contact-hours">Production and dispatch (not a retail outlet)</p>
          </div>
        </div>
      </section>

      <section class="contact-section contact-tint">
        <div class="wrap">
          <h2>Where to go next</h2>
          <div class="contact-link-grid">
            <NuxtLink to="/products/shilajit" class="contact-quicklink">
              <strong>Buy shilajit resin</strong>
              <span>10g&ndash;100g, from Rs 1,500. COD across Pakistan.</span>
            </NuxtLink>
            <NuxtLink to="/products/shilajit-drops" class="contact-quicklink">
              <strong>Buy shilajit drops</strong>
              <span>Liquid shilajit, 30ml Rs 2,000 &middot; 60ml Rs 4,000.</span>
            </NuxtLink>
            <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale" class="contact-quicklink">
              <strong>Wholesale &amp; private label</strong>
              <span>Bulk resin from 1kg Rs 95,000. Export documents included.</span>
            </NuxtLink>
            <NuxtLink to="/certifications" class="contact-quicklink">
              <strong>Lab reports &amp; certifications</strong>
              <span>Eurofins, PCSIR and Micro Quality Lab results, batch OA-2025-0307.</span>
            </NuxtLink>
            <NuxtLink to="/policies/refund-policy" class="contact-quicklink">
              <strong>Refund &amp; return policy</strong>
              <span>3-day return window and full conditions.</span>
            </NuxtLink>
            <NuxtLink to="/policies/shipping-policy" class="contact-quicklink">
              <strong>Shipping &amp; delivery</strong>
              <span>TCS in Pakistan (3&ndash;5 days), DHL worldwide (10&ndash;14 days).</span>
            </NuxtLink>
          </div>
          <p class="contact-note">Need a batch lab report for a jar you already have? WhatsApp us the batch code printed on the box and we will send the matching report.</p>
        </div>
      </section>
    </main>
    <AppFooter />
    <CartDrawer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { count: cartCount, openDrawer: openCart } = useCart()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Contact' },
      ])),
    },
  ],
})

useSeoMeta({
  title: 'Contact Organic Aprico | Phone, WhatsApp, Email, Lahore Hours',
  description: 'Reach Organic Aprico by phone or WhatsApp at +92 331 1116915, or email organicapricoskardu@gmail.com. Lahore outlet: D.H.A. Main Blvd, near Adil Hospital, DHA Phase 1. Open daily 11 AM–12 AM.',
  ogTitle: 'Contact Organic Aprico',
  ogDescription: 'Call or WhatsApp +92 331 1116915, or visit our Lahore outlet in DHA Phase 1. Open daily 11 AM–12 AM.',
})
</script>

<style scoped>
.contact-hero {
  padding: clamp(100px, 14vw, 140px) 0 clamp(24px, 4vw, 48px);
}
.contact-hero h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.06;
  max-width: 18ch;
  margin-bottom: 1.2rem;
}
.lede { color: var(--stone); font-size: 1.1rem; max-width: 54ch; }

.contact-section {
  padding: clamp(2rem, 5vw, 4rem) 0;
}
.contact-tint {
  border-top: 1px solid var(--line-soft);
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
}
.contact-card {
  border: 1px solid var(--line);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: .75rem;
  background: linear-gradient(180deg, rgba(201,162,74,.04), rgba(201,162,74,0));
}
.contact-card h2 { font-size: 1.35rem; }
.contact-card p { color: var(--stone); font-size: .95rem; line-height: 1.6; }
.contact-hours {
  color: var(--gold-bright) !important;
  font-size: .9rem;
}
.contact-link {
  color: var(--cream);
  font-size: .98rem;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  width: fit-content;
  transition: color .2s var(--ease), border-color .2s var(--ease);
}
.contact-link:hover { color: var(--gold-bright); border-color: var(--gold-bright); }

.contact-tint h2 { font-size: 1.6rem; margin-bottom: 1.5rem; }
.contact-link-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.contact-quicklink {
  border: 1px solid var(--line);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .4rem;
  text-decoration: none;
  transition: border-color .25s var(--ease);
}
.contact-quicklink:hover { border-color: var(--gold); }
.contact-quicklink strong { color: var(--cream); font-weight: 500; }
.contact-quicklink span { color: var(--stone); font-size: .88rem; line-height: 1.5; }
.contact-note {
  margin-top: 1.75rem;
  color: var(--stone);
  font-size: .95rem;
  line-height: 1.6;
  max-width: 62ch;
}

@media (max-width: 820px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-link-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .contact-link-grid { grid-template-columns: 1fr; }
}
</style>
