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
                <a href="#review-form" class="add-review-link">Add a Review</a>
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
          <div class="product-description tab-content">
            <p><strong>Shilajit Drop</strong> is produced by dissolving Pure Himalayan Shilajit Resin in mineral-rich glacier water, ensuring its maximum potency. The process involves filtration and purification to preserve Pure Shilajit's minerals, vitamins, and fulvic acid. The result is a semi-thick, dark, and shiny oil- and alcohol-free Shilajit liquid.</p>

            <h2>Liquid Shilajit: The original shilajit in Pakistan</h2>
            <p>Organic Aprico's Liquid Shilajit is naturally rich in <strong>85 essential minerals</strong>, <strong>64% fulvic acid</strong>, and humic acid, as confirmed by lab tests at Micro Quality Lab, California. It is free from heavy metals, chemicals, and toxins, ensuring safety, high potency, and effectiveness.</p>
            <p>Organic Aprico provides the best Shilajit Online. This convenient Shilajit liquid is best for gym lovers, travelers, and busy professionals who prefer an easy-to-use natural supplement without the hassle of dissolving thick Shilajit.</p>

            <h2>Shilajit Price: A Market Overview of Shilajit Liquid</h2>
            <p>Shilajit Price in Pakistan depends on three factors. The Origin, purification, and dehydration. Firstly, shilajit must be extracted from 17000 above sea level as Organic aprico from the Himalayan mountains of Gilgit Baltistan. Secondly, complete purification as organic aprico purifies it with traditional and scientific methods, using centrifugal force and four key strategies to purify it and free 100 percent toxin from harmful substances. Then, 40 days of sun dehydration from direct sunlight is essential to retain its maximum potency. Organic aprico is the best option for buying the best Shilajit in Pakistan.</p>

            <h2>Packaging and Safety: Best Shilajit Supplier from Gilgit Baltistan</h2>
            <p>Organic Aprico's Shilajit Drop is thoughtfully packaged in an eco-friendly glass container immediately after preparation. The process involves dissolving Himalayan shilajit resin in glacier water, followed by an advanced purification facility to ensure a pure shilajit solution. It is hygienically packed to meet the expectations of valued customers.</p>
            <p>Each bottle includes a dropper for precise measurement. Shilajit Liquid undergoes independent safety testing by US laboratories and is minimally processed to maintain its rich minerals, Vitamins, and Fulvic Acid.</p>

            <h2>How to use Shilajit Drop</h2>
            <p>Measure three half pipettes (9 drops) with the added dropper. It is recommended to take this amount twice daily. Mix the drops with your preferred beverage—milk, coffee, shakes, or juice—or take it directly. For best results, stir the Shilajit drops into half a glass of water; the liquid Shilajit dissolves instantly.</p>

            <h2>Shilajit Drop Benefits</h2>
            <p>You can read the Shilajit benefits with citations on our pure shilajit resin product page.</p>
            <ul>
              <li>99.9% pure</li>
              <li>High bioavailability and absorption rate</li>
              <li>Easy to measure</li>
              <li>Packaged in an eco-friendly container</li>
              <li>Anti-aging Properties</li>
              <li>Promotes Testosterone Levels</li>
              <li>Controls Diabetes</li>
              <li>Supports Fertility</li>
              <li>Improves Metabolism</li>
              <li>Increases Muscle Mass</li>
              <li>Hair Loss</li>
              <li>Improves Hormones</li>
              <li>Fights Cancer Cells</li>
              <li>Promotes Heart Health</li>
              <li>Controls Cholesterol</li>
              <li>Removes Period Pain</li>
              <li>Enhanced Strength</li>
              <li>Detoxifies and Cleanses Body</li>
              <li>Improves Digestion</li>
            </ul>

            <h2>Liquid Shilajit VS Shilajit Resin</h2>
            <p>The liquid form of Pure Shilajit is as concentrated as the resin; it is purer and retains most of the molecular properties due to minimal processing. Therefore, it remains a potent and effective supplement, potentially even more so than other forms. Salajeet price in Pakistan for both Shilajit Liquid and Resin is the same. We add glacier water to the resin to enhance the potency of Shilajit drops.</p>

            <h2>Why choose Organic Aprico?</h2>
            <p>Original Shilajit is found exclusively in the Himalayan mountains of Gilgit-Baltistan, at elevations of over 17,000 feet. This is why a global demand exists for Gilgit Shilajit in Pakistan and abroad. However, Shilajit extraction requires a government license, which the Organic Aprico team possesses.</p>
            <p>We are committed to providing you with gold-grade authentic Himalayan Shilajit and Shilajit Drop, accompanied by certified analysis to verify their authenticity. Our dedication to quality has earned us over 10,000 satisfied clients who have improved their health by incorporating Organic Aprico's Shilajit dosage into their daily routine.</p>

            <h2>Can Liquid Shilajit be Exported from Pakistan?</h2>
            <p>Yes, Organic Aprico holds both an extraction and export license. Our international lab reports certify the quality of our Himalayan Shilajit, allowing for the smooth export of all Shilajit forms from Pakistan.</p>

            <h2>Money Back Guarantee</h2>
            <p>At Organic Aprico, client satisfaction is our top priority. Since 1972, we have consistently met our client's expectations. However, in line with our commitment to quality, we offer a money-back guarantee. Whether you are a national or international client, if there is any issue with Shilajit quality, dissatisfaction, or mistake on our part, we will fully compensate you.</p>

            <h2>Ordering Information</h2>
            <p>You can order Shilajit Drop on the website, through WhatsApp, or by phone for national clients.</p>
            <p>We offer Shilajit Price per kg for international customers searching for Himalayan Shilajit in bulk. Please get in touch with us via the provided phone number, WhatsApp, or email for further details. We have 10,000+ international clients from all over the world.</p>
            <p>We are proud to say that organic Aprico never compromises on the quality of Shilajit and always delivers parcels on time because we have export licenses that help us serve clients worldwide.</p>
          </div>

          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'lab' }" @click="activeTab = 'lab'">Lab Reports</button>
            <button class="tab-btn" :class="{ active: activeTab === 'howto' }" @click="activeTab = 'howto'">How to Use</button>
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

      <section class="reviews-section" id="reviews">
        <div class="wrap">
          <div class="reviews-header">
            <h2>Customer Reviews</h2>
            <div class="reviews-summary">
              <div class="reviews-avg">
                <span class="avg-score">4.8</span>
                <div class="avg-stars">
                  <svg v-for="n in 5" :key="n" class="star filled" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="avg-count">Based on 150+ reviews</span>
              </div>
            </div>
          </div>
          <div class="reviews-grid">
            <div v-for="(review, i) in reviews" :key="i" class="review-card">
              <div class="review-card-top">
                <div class="review-card-stars">
                  <svg v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }" width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="verified-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Verified Purchase
                </span>
              </div>
              <div class="review-card-meta">
                <span class="review-card-name">{{ review.name }}</span>
                <span class="review-card-date">{{ review.date }}</span>
              </div>
              <p class="review-card-text">{{ review.text }}</p>
            </div>
          </div>
          <div class="review-form-wrap" id="review-form">
            <h3>Write a Review</h3>
            <form class="review-form" @submit.prevent="submitReview">
              <div class="review-form-stars" aria-label="Rating">
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  class="star-input"
                  :class="{ filled: n <= (hoverRating || reviewForm.rating) }"
                  :aria-label="`${n} star${n > 1 ? 's' : ''}`"
                  @click="setRating(n)"
                  @mouseenter="hoverRating = n"
                  @mouseleave="hoverRating = 0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </button>
              </div>
              <div class="field">
                <label for="review-name">Name</label>
                <input id="review-name" v-model="reviewForm.name" type="text" placeholder="Your name" />
              </div>
              <div class="field">
                <label for="review-text">Review</label>
                <textarea id="review-text" v-model="reviewForm.text" rows="4" placeholder="Share your experience with this product"></textarea>
              </div>
              <button type="submit" class="btn btn-gold">Submit Review</button>
            </form>
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
const activeTab = ref('lab')
const activeImage = ref(0)

const galleryImages = [
  '/images/products/shilajit-drops-hero.png',
  '/images/products/shilajit-drops-liquid.jpg',
]

const reviews = [
  { name: 'Kamran Shah', rating: 5, date: '1 week ago', text: 'Drops are so convenient compared to resin. I keep a bottle in my office bag and take 9 drops in water twice a day. Energy levels are consistently high.' },
  { name: 'Rabia Aslam', rating: 5, date: '2 weeks ago', text: 'Ye liquid shilajit bohat asaan hai use karne mein. Resin jaisa taste nahi hai, halka sa hota hai. Main 2 mahinay se le rahi hoon aur results ache hain.' },
  { name: 'Faisal Ahmed', rating: 4, date: '1 month ago', text: 'Good product, easy to use. The dropper makes it very precise. I mix it with my morning coffee and cannot even taste it. Will order the 60ml next time.' },
  { name: 'Nadia Rehman', rating: 5, date: '1 month ago', text: 'Perfect for travel! I travel a lot for work and drops are so much easier to carry than the resin jar. Quality is the same as their resin product.' },
  { name: 'Imran Baig', rating: 5, date: '2 months ago', text: 'Been using for 3 months. My blood sugar levels have improved significantly according to my doctor. Very happy with this product.' },
  { name: 'Hina Malik', rating: 4, date: '2 months ago', text: 'Mujhe period pain mein bohat madad mili hai isse. 2 cycle se use kar rahi hoon aur cramps kam ho gaye hain. Taste thoda kadwa hai par results worth it hain.' },
  { name: 'Shahzaib Khan', rating: 5, date: '3 months ago', text: 'Excellent quality liquid shilajit. Dissolves instantly in water as they claim. No artificial taste or smell. Pure and authentic.' },
  { name: 'Amna Yousaf', rating: 5, date: '4 months ago', text: 'I switched from resin to drops because I found resin too strong. The drops work just as well and are so much more convenient. Great value for money.' },
  { name: 'Waqar Younis', rating: 5, date: '5 months ago', text: 'As a professional cricketer I need natural supplements. This is the cleanest shilajit I have found in Pakistan. Lab reports give me full confidence.' },
  { name: 'Sadaf Noor', rating: 4, date: '6 months ago', text: 'Really good product. Took about 3 weeks to feel the full effects but now I sleep better and wake up refreshed. The packaging is also very nice.' },
]

const reviewForm = ref({ name: '', text: '', rating: 5 })
const hoverRating = ref(0)

function setRating(n: number) {
  reviewForm.value.rating = n
}

function submitReview() {
  if (!reviewForm.value.name.trim() || !reviewForm.value.text.trim()) return
  toast.show('Thank you for your review!')
  reviewForm.value = { name: '', text: '', rating: 5 }
}

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
