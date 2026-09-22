<template>
  <div class="product-page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="breadcrumb">
      <div class="wrap">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/#products">Products</NuxtLink>
        <span class="sep">/</span>
        <span class="current">Shilajit Resin</span>
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
                <span>4.9 (200+ reviews)</span>
              </div>
              <div class="product-price-block">
                <span class="product-price-now">{{ formatPrice(currentVariant.price) }}</span>
                <span v-if="currentVariant.was" class="product-price-was">{{ formatPrice(currentVariant.was) }}</span>
              </div>
              <p class="product-short-desc">Pure Himalayan shilajit resin from the mountains of Gilgit-Baltistan. 73% fulvic acid, lab verified from PCSIR and Micro Quality Lab California. 8-stage purification, sun-dried 40+ days.</p>

              <div class="variant-selector">
                <span class="variant-label">Weight</span>
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
            <h2>Pure Himalayan Shilajit Resin</h2>
            <p>Organic Aprico offers <strong>Pure Himalayan Shilajit Resin</strong> sourced directly from the rugged mountains of Gilgit-Baltistan, Pakistan. Extracted by our licensed team at altitudes above <strong>17,000 feet</strong> in the Karakoram range near Skardu, this gold-grade resin represents the pinnacle of natural shilajit quality.</p>

            <h3>Why Organic Aprico Shilajit?</h3>
            <ul>
              <li><strong>73% Fulvic Acid</strong> — independently verified by Micro Quality Lab (California) and PCSIR Laboratories (Lahore)</li>
              <li><strong>84+ Trace Minerals</strong> — including iron, zinc, magnesium, copper, manganese, and selenium</li>
              <li><strong>8-Stage Purification</strong> — Triphala soak, glacier water filtration, ion exchange, UV and ozone treatment, sun dehydration over 40+ days</li>
              <li><strong>Gold Grade</strong> — the highest quality classification for shilajit resin</li>
              <li><strong>Batch Traceability</strong> — every jar has a unique batch code linked to full production history and lab reports</li>
            </ul>

            <h3>Price Overview</h3>
            <p>With a starting price of just <strong>Rs 1,500 for 10g</strong>, Organic Aprico makes pure Himalayan shilajit accessible to everyone. Larger sizes offer better per-gram value — our most popular 30g jar costs Rs 4,000 and the 100g jar is Rs 12,900.</p>

            <table class="wholesale-table">
              <thead><tr><th>Size</th><th>Price</th><th>Per Gram</th></tr></thead>
              <tbody>
                <tr><td>10 g</td><td>Rs 1,500</td><td>Rs 150/g</td></tr>
                <tr><td>20 g</td><td>Rs 2,900</td><td>Rs 145/g</td></tr>
                <tr><td>30 g</td><td>Rs 4,000</td><td class="highlight">Rs 133/g</td></tr>
                <tr><td>50 g</td><td>Rs 7,100</td><td class="highlight">Rs 142/g</td></tr>
                <tr><td>100 g</td><td>Rs 12,900</td><td class="highlight">Rs 129/g</td></tr>
              </tbody>
            </table>

            <h3>The Purification Process</h3>
            <p>Our purification follows eight rigorous stages — from hand-harvesting at 17,000+ feet to independent lab testing in California. No shortcuts, no chemicals, no exceptions. Raw shilajit is soaked in RO water with Triphala for 3–7 days to draw out heavy metals, then filtered through glacier water, treated with ion exchange, UV and ozone, and finally sun-dehydrated for over 40 days in stainless steel trays under direct Skardu sunlight.</p>

            <h3>Origin</h3>
            <p>Our extraction team ascends to altitudes above 17,000 feet in the Karakoram range near Skardu, Gilgit-Baltistan. The raw shilajit is carefully hand-harvested from rock crevices during the warm months (June to September) when the resin naturally seeps from the mountain. This is <strong>not</strong> reconstituted or diluted — it is pure, raw shilajit resin as nature intended.</p>

            <h3>Money-Back Guarantee</h3>
            <p>We stand behind every jar with a <strong>30-day money-back guarantee</strong>. If you are not satisfied with the quality, contact us and we will refund your purchase — no questions asked.</p>
          </div>
          <div v-if="activeTab === 'lab'" class="tab-content">
            <h2>Third-Party Lab Reports</h2>
            <p>Every batch of Organic Aprico shilajit is tested by independent laboratories. Below are the latest reports for our shilajit resin.</p>
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
            <h2>How to Use Shilajit Resin</h2>
            <h3>Recommended Dosage</h3>
            <p>Dissolve a <strong>pea-sized portion (approximately 700 mg)</strong> in lukewarm water, milk, herbal tea, or coffee. Stir until fully dissolved. The water may turn a dark amber colour — this is normal and indicates the presence of fulvic acid and minerals.</p>

            <h3>When to Take</h3>
            <ul>
              <li><strong>Morning (empty stomach)</strong> — for best absorption and energy throughout the day</li>
              <li><strong>Before exercise</strong> — to support stamina and recovery</li>
              <li><strong>Afternoon</strong> — as a natural energy booster instead of caffeine</li>
            </ul>

            <h3>Tips</h3>
            <ul>
              <li>Always use <strong>lukewarm or room-temperature water</strong> — boiling water can degrade fulvic acid</li>
              <li>Avoid mixing with cold water or ice, as this slows dissolution</li>
              <li>Start with a smaller portion (half pea-sized) for the first week to assess tolerance</li>
              <li>Consistent daily use for 30+ days yields the best results</li>
            </ul>

            <h3>Storage</h3>
            <p>Store in a cool, dry place away from direct sunlight. The resin has a shelf life of <strong>24 months</strong> from the date of packaging. Keep the lid tightly closed after each use.</p>

            <h3>What to Expect</h3>
            <p>Many users report improved energy, better sleep quality, and enhanced mental clarity within the first 2–3 weeks. Shilajit is an adaptogen and works gradually — benefits accumulate with consistent use over time.</p>
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
              <p>If you're not completely satisfied with the quality of our shilajit, contact us within 30 days for a full refund. No questions asked. We stand behind every jar we produce.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="related-section">
        <div class="wrap">
          <h2>You might also like</h2>
          <div class="related-grid">
            <NuxtLink to="/products/shilajit-drops" class="related-card">
              <div class="related-card-img">
                <img src="/images/products/shilajit-drops-hero.png" alt="Shilajit Drops" loading="lazy" />
              </div>
              <div class="related-card-body">
                <h3>Shilajit Drops</h3>
                <p>Liquid shilajit dissolved in glacier water. 9 drops twice a day.</p>
                <span class="related-card-price">From Rs 2,000</span>
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

const product = PRODUCTS.find(p => p.key === 'resin')!
const productTitle = 'Pure Himalayan Shilajit Resin | Gold-Grade, Lab-Tested'

const selectedSize = ref(product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('description')
const activeImage = ref(0)

const galleryImages = [
  '/images/products/shilajit-resin-hero.jpg',
  '/images/products/shilajit-resin-packaging.jpg',
]

const currentVariant = computed(() =>
  product.sizes.find(s => s.id === selectedSize.value)!
)

function onAdd() {
  addToCart('resin', selectedSize.value, qty.value)
  justAdded.value = true
  toast.show(`Added ${qty.value} x Shilajit Resin ${currentVariant.value.label} to cart`)
  setTimeout(() => { justAdded.value = false }, 1400)
}

useSeoMeta({
  title: 'Pure Himalayan Shilajit Resin | Gold-Grade, Lab-Tested | Organic Aprico',
  description: 'Organic Aprico offers Pure shilajit from the Himalayan mountains of Gilgit-Baltistan, extracted at altitudes above 17,000 feet. 73% fulvic acid, lab verified. Starting at Rs 1,500.',
  ogTitle: 'Pure Himalayan Shilajit Resin | Organic Aprico',
  ogDescription: 'Gold-grade resin, 73% fulvic acid, 8-stage purification. Lab tested in California and Pakistan. Starting at Rs 1,500.',
  ogImage: '/images/products/shilajit-resin-hero.jpg',
  ogType: 'product',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Pure Himalayan Shilajit Resin',
        description: 'Gold-grade Himalayan shilajit resin with 73% fulvic acid. 8-stage purification, lab tested. From 17,000 feet in Gilgit-Baltistan.',
        image: '/images/products/shilajit-resin-hero.jpg',
        brand: { '@type': 'Brand', name: 'Organic Aprico' },
        offers: product.sizes.map(s => ({
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: 'https://organicaprico.com/products/shilajit',
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '200',
        },
      }),
    },
  ],
})
</script>
