<template>
  <div class="product-page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="breadcrumb">
      <div class="wrap">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/#products">Products</NuxtLink>
        <span class="sep">/</span>
        <span class="current">Shilajit Drops</span>
      </div>
    </div>
    <main>
      <section class="product-hero">
        <div class="wrap">
          <div class="product-hero-grid">
            <div class="product-gallery">
              <div class="product-main-img">
                <img :src="galleryImages[activeImage]" :alt="productTitle" />
              </div>
              <div class="product-thumbs">
                <button
                  v-for="(img, i) in galleryImages"
                  :key="i"
                  class="product-thumb"
                  :class="{ active: activeImage === i }"
                  @click="activeImage = i"
                >
                  <img :src="img" :alt="`${productTitle} view ${i + 1}`" />
                </button>
              </div>
            </div>
            <div class="product-info">
              <h1>{{ productTitle }}</h1>
              <div class="product-rating">
                <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>4.8 (150+ reviews)</span>
              </div>
              <div class="product-price-block">
                <span class="product-price-now">{{ formatPrice(currentVariant.price) }}</span>
                <span v-if="currentVariant.was" class="product-price-was">{{ formatPrice(currentVariant.was) }}</span>
              </div>
              <p class="product-short-desc">Shilajit Drop is produced by dissolving Pure Himalayan Shilajit Resin in mineral-rich glacier water. 64% fulvic acid, 85+ minerals. Oil- and alcohol-free. Lab tested.</p>

              <div class="variant-selector">
                <span class="variant-label">Size</span>
                <div class="variant-options">
                  <button
                    v-for="size in product.sizes"
                    :key="size.id"
                    class="variant-btn"
                    :class="{ active: selectedSize === size.id }"
                    @click="selectedSize = size.id"
                  >
                    {{ size.label }}
                  </button>
                </div>
              </div>

              <div class="product-actions">
                <div class="product-qty-row">
                  <div class="product-qty" aria-label="Quantity">
                    <button type="button" aria-label="Decrease" @click="qty = Math.max(1, qty - 1)">&minus;</button>
                    <output>{{ qty }}</output>
                    <button type="button" aria-label="Increase" @click="qty++">+</button>
                  </div>
                  <button class="btn btn-gold product-add-btn" :class="{ added: justAdded }" @click="onAdd">
                    {{ justAdded ? 'Added to cart' : 'Add to cart' }}
                  </button>
                </div>
              </div>

              <div class="product-trust">
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Money-back guarantee
                </div>
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  Lab tested
                </div>
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="23 7 16 12 16 2 23 7"/></svg>
                  Worldwide delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="product-tabs">
        <div class="wrap">
          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'description' }" @click="activeTab = 'description'">Description</button>
            <button class="tab-btn" :class="{ active: activeTab === 'lab' }" @click="activeTab = 'lab'">Lab Reports</button>
            <button class="tab-btn" :class="{ active: activeTab === 'howto' }" @click="activeTab = 'howto'">How to Use</button>
          </div>
          <div v-if="activeTab === 'description'" class="tab-content">
            <h2>What is Shilajit Drops?</h2>
            <p><strong>Shilajit Drop</strong> is produced by dissolving Pure Himalayan Shilajit Resin in mineral-rich glacier water from the Karakoram mountains. The result is a convenient, ready-to-use liquid form of shilajit that retains all the beneficial compounds of the original resin — including <strong>64% fulvic acid</strong> and over <strong>85 trace minerals</strong>.</p>

            <h3>Key Features</h3>
            <ul>
              <li><strong>64% Fulvic Acid</strong> — lab verified, the active compound responsible for mineral absorption</li>
              <li><strong>85+ Trace Minerals</strong> — iron, zinc, magnesium, copper, manganese, selenium and more</li>
              <li><strong>Oil-free and Alcohol-free</strong> — pure shilajit dissolved only in glacier water</li>
              <li><strong>Convenient Dropper Bottle</strong> — precise 9-drop dosage, easy to carry</li>
              <li><strong>Lab Tested</strong> — third-party verified by PCSIR and Micro Quality Lab California</li>
            </ul>

            <h3>Why Choose Liquid Over Resin?</h3>
            <p>While resin is the purest form of shilajit, drops offer unmatched convenience. No dissolving, no measuring — just 9 drops in water, milk or coffee. Perfect for travellers, busy professionals, or anyone who wants the benefits of shilajit without the preparation.</p>

            <h3>What's in the Bottle</h3>
            <p>Each bottle contains pure Himalayan shilajit dissolved in glacier water. No fillers, no preservatives, no artificial flavours. The dark amber colour is natural and indicates high fulvic acid content.</p>

            <h3>Money-Back Guarantee</h3>
            <p>Like all Organic Aprico products, Shilajit Drops come with a <strong>30-day money-back guarantee</strong>. If you are not satisfied, contact us for a full refund.</p>
          </div>
          <div v-if="activeTab === 'lab'" class="tab-content">
            <h2>Third-Party Lab Reports</h2>
            <p>Every batch of Shilajit Drops is tested by independent laboratories. Below are the latest reports.</p>
            <div class="lab-grid">
              <img src="/images/lab-reports/micro-quality-fulvic-acid.jpg" alt="Micro Quality Lab fulvic acid test" loading="lazy" />
              <img src="/images/lab-reports/pcsir-heavy-metals.jpg" alt="PCSIR heavy metals analysis" loading="lazy" />
              <img src="/images/lab-reports/pcsir-microbiological.jpg" alt="PCSIR microbiological test" loading="lazy" />
              <img src="/images/lab-reports/pcsir-aflatoxin.jpg" alt="PCSIR aflatoxin test" loading="lazy" />
              <img src="/images/lab-reports/eurofins-fulvic-acid.jpg" alt="Eurofins fulvic acid verification" loading="lazy" />
            </div>
            <h3>Certifications</h3>
            <div class="cert-grid">
              <img src="/images/certifications/halal.jpg" alt="Halal certification" loading="lazy" />
              <img src="/images/certifications/gmp.jpg" alt="GMP certification" loading="lazy" />
              <img src="/images/certifications/haccp.jpg" alt="HACCP certification" loading="lazy" />
              <img src="/images/certifications/company-registration.jpg" alt="Company registration" loading="lazy" />
            </div>
          </div>
          <div v-if="activeTab === 'howto'" class="tab-content">
            <h2>How to Use Shilajit Drops</h2>
            <h3>Recommended Dosage</h3>
            <p>Add <strong>9 drops</strong> to a glass of lukewarm water, milk, herbal tea, or coffee. Stir well and drink. Take <strong>twice daily</strong> — once in the morning and once in the evening.</p>

            <h3>Step-by-Step</h3>
            <ol>
              <li>Shake the bottle gently before each use</li>
              <li>Measure 9 drops (approximately 0.5 ml) using the dropper</li>
              <li>Add to 150–200 ml of lukewarm water, milk, or tea</li>
              <li>Stir until evenly mixed — the liquid will turn dark amber</li>
              <li>Drink immediately for best results</li>
            </ol>

            <h3>When to Take</h3>
            <ul>
              <li><strong>Morning (empty stomach)</strong> — for sustained energy and mental clarity throughout the day</li>
              <li><strong>Evening (before bed)</strong> — to support recovery and restful sleep</li>
            </ul>

            <h3>Liquid vs Resin: Which Should You Choose?</h3>
            <table class="wholesale-table">
              <thead><tr><th>Feature</th><th>Drops</th><th>Resin</th></tr></thead>
              <tbody>
                <tr><td>Fulvic Acid</td><td class="highlight">64%</td><td class="highlight">73%</td></tr>
                <tr><td>Convenience</td><td>Ready to use</td><td>Needs dissolving</td></tr>
                <tr><td>Portability</td><td>Travel-friendly dropper</td><td>Jar</td></tr>
                <tr><td>Purity</td><td>Resin + glacier water</td><td>Raw resin</td></tr>
                <tr><td>Best for</td><td>Busy lifestyles, travel</td><td>Maximum potency</td></tr>
              </tbody>
            </table>

            <h3>Storage</h3>
            <p>Store in a cool, dry place away from direct sunlight. Shelf life is <strong>18 months</strong> from the date of packaging. Keep the cap tightly closed after each use.</p>

            <h3>Tips</h3>
            <ul>
              <li>Always use <strong>lukewarm water</strong> — cold water slows dissolution</li>
              <li>Start with 5 drops twice daily for the first week if you are new to shilajit</li>
              <li>Consistent daily use for 30+ days yields the best results</li>
              <li>Do not exceed 18 drops per day unless advised by a healthcare professional</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="guarantee-section">
        <div class="wrap">
          <div class="guarantee-card">
            <div class="guarantee-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="guarantee-text">
              <h2>30-Day Money-Back Guarantee</h2>
              <p>Try Shilajit Drops risk-free. If you're not satisfied within 30 days, contact us for a full refund — no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="related-section">
        <div class="wrap">
          <h2>You might also like</h2>
          <div class="related-grid">
            <NuxtLink to="/products/shilajit" class="related-card">
              <div class="related-card-img">
                <img src="/images/products/shilajit-resin-hero.jpg" alt="Shilajit Resin" loading="lazy" />
              </div>
              <div class="related-card-body">
                <h3>Shilajit Resin</h3>
                <p>Gold-grade raw resin. 73% fulvic acid, sun-dried 40+ days.</p>
                <span class="related-card-price">From Rs 1,500</span>
              </div>
            </NuxtLink>
            <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale" class="related-card">
              <div class="related-card-img">
                <img src="/images/products/wholesale-hero.jpg" alt="Wholesale Shilajit" loading="lazy" />
              </div>
              <div class="related-card-body">
                <h3>Wholesale Resin</h3>
                <p>Bulk shilajit for resellers, brands and retailers.</p>
                <span class="related-card-price">From Rs 95,000/kg</span>
              </div>
            </NuxtLink>
            <NuxtLink to="/certifications" class="related-card">
              <div class="related-card-img">
                <img src="/images/certifications/halal.jpg" alt="Certifications" loading="lazy" />
              </div>
              <div class="related-card-body">
                <h3>Our Certifications</h3>
                <p>Lab tested, Halal, GMP and HACCP certified.</p>
                <span class="related-card-price">View reports →</span>
              </div>
            </NuxtLink>
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

const { count: cartCount, add: addToCart, openDrawer: openCart } = useCart()
const toast = useToast()

const product = PRODUCTS.find(p => p.key === 'drops')!
const productTitle = 'Shilajit Drops | Liquid Shilajit | Buy Online Pakistan'

const selectedSize = ref(product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('description')
const activeImage = ref(0)

const galleryImages = [
  '/images/products/shilajit-drops-hero.png',
  '/images/products/shilajit-drops-liquid.jpg',
]

const currentVariant = computed(() =>
  product.sizes.find(s => s.id === selectedSize.value)!
)

function onAdd() {
  addToCart('drops', selectedSize.value, qty.value)
  justAdded.value = true
  toast.show(`Added ${qty.value} x Shilajit Drops ${currentVariant.value.label} to cart`)
  setTimeout(() => { justAdded.value = false }, 1400)
}

useSeoMeta({
  title: 'Shilajit Drops | Liquid Shilajit | Buy Online Pakistan | Organic Aprico',
  description: 'Shilajit Drop produced by dissolving Pure Himalayan Shilajit Resin in glacier water. 64% fulvic acid, 85+ minerals. Oil- and alcohol-free. Starting at Rs 2,000.',
  ogTitle: 'Shilajit Drops | Liquid Shilajit | Organic Aprico',
  ogDescription: 'Liquid shilajit dissolved in glacier water. 64% fulvic acid, 85+ minerals. Convenient dropper bottle. Starting at Rs 2,000.',
  ogImage: '/images/products/shilajit-drops-hero.png',
  ogType: 'product',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Shilajit Drops — Liquid Himalayan Shilajit',
        description: 'Liquid shilajit produced by dissolving pure Himalayan shilajit resin in mineral-rich glacier water. 64% fulvic acid, 85+ trace minerals. Oil-free and alcohol-free.',
        image: '/images/products/shilajit-drops-hero.png',
        brand: { '@type': 'Brand', name: 'Organic Aprico' },
        offers: product.sizes.map(s => ({
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: 'https://organicaprico.com/products/shilajit-drops',
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '150',
        },
      }),
    },
  ],
})
</script>
