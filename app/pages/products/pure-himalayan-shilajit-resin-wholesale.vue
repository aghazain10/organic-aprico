<template>
  <div class="product-page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="breadcrumb">
      <div class="wrap">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/#products">Products</NuxtLink>
        <span class="sep">/</span>
        <span class="current">Wholesale Shilajit Resin</span>
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
                <span>5.0 (Wholesale partners)</span>
              </div>
              <div class="product-price-block">
                <span class="product-price-now">{{ formatPrice(currentVariant.price) }}</span>
                <span v-if="currentVariant.was" class="product-price-was">{{ formatPrice(currentVariant.was) }}</span>
              </div>
              <p class="product-short-desc">The World's Most Trusted Source for Bulk &amp; Wholesale Shilajit Resin. Direct from extractor, no middlemen. Lab tested, private label available.</p>

              <div class="variant-selector">
                <span class="variant-label">Order Size</span>
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
                <a
                  class="whatsapp-cta"
                  href="https://wa.me/923311116915?text=Hi%20Organic%20Aprico%2C%20I%20would%20like%20a%20wholesale%20quote%20for%20shilajit%20resin."
                  target="_blank"
                  rel="noopener"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Contact for Quote via WhatsApp
                </a>
              </div>

              <div class="product-trust">
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Private label available
                </div>
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  Lab tested &amp; certified
                </div>
                <div class="trust-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="23 7 16 12 16 2 23 7"/></svg>
                  Global supply chain
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
            <button class="tab-btn" :class="{ active: activeTab === 'pricing' }" @click="activeTab = 'pricing'">Wholesale Pricing</button>
            <button class="tab-btn" :class="{ active: activeTab === 'quality' }" @click="activeTab = 'quality'">Quality &amp; Certifications</button>
            <button class="tab-btn" :class="{ active: activeTab === 'faq' }" @click="activeTab = 'faq'">FAQ</button>
          </div>

          <div v-if="activeTab === 'description'" class="tab-content">
            <h2>The World's Most Trusted Source for Bulk &amp; Wholesale Shilajit Resin</h2>
            <p>Organic Aprico is Pakistan's leading licensed extractor and wholesale supplier of <strong>Pure Himalayan Shilajit Resin</strong>. We supply bulk shilajit to retailers, brands, and distributors worldwide — direct from our extraction facility in Skardu, Gilgit-Baltistan. No middlemen, no markups, no compromise on quality.</p>

            <h3>Why Retailers Choose Organic Aprico</h3>
            <ul>
              <li><strong>Gold Grade 73% Fulvic Acid</strong> — the highest quality classification, independently verified</li>
              <li><strong>84+ Trace Minerals</strong> — a complete mineral profile that competitors cannot match</li>
              <li><strong>Free from Heavy Metals</strong> — 8-stage purification removes lead, mercury, arsenic and cadmium</li>
              <li><strong>RO Water Purification</strong> — reverse-osmosis water used at every stage of the process</li>
              <li><strong>Third-Party Lab Tested</strong> — Micro Quality Lab (California), PCSIR (Lahore), Eurofins</li>
              <li><strong>Full Transparency</strong> — batch-level traceability with QR codes linking to lab reports</li>
              <li><strong>In-House Purification Plant</strong> — we control the entire process from mountain to jar</li>
              <li><strong>Global Supply</strong> — we ship to 30+ countries with reliable logistics partners</li>
            </ul>

            <h3>The Purification Process — 8 Steps</h3>
            <ol>
              <li><strong>Extraction</strong> — hand-harvested above 17,000 feet in Gilgit-Baltistan</li>
              <li><strong>Triphala Soaking</strong> — 3–7 days in RO water with Triphala to draw out heavy metals</li>
              <li><strong>Primary Filtration</strong> — repeated filtering with glacier water removes sand and sediment</li>
              <li><strong>Purification</strong> — ion exchange, UV and ozonation remove metals, bacteria and fungus</li>
              <li><strong>Quality Verification</strong> — mid-process testing against internal standards</li>
              <li><strong>Sun Dehydration</strong> — 40+ days in stainless steel under direct Skardu sunlight</li>
              <li><strong>Independent Lab Testing</strong> — Micro Quality Lab California confirms 73% fulvic acid</li>
              <li><strong>Batch Coding &amp; Export Clearance</strong> — unique batch number on every pack</li>
            </ol>

            <h3>Private Label &amp; Custom Branding</h3>
            <p>We offer <strong>private label services</strong> for businesses looking to launch their own shilajit brand. From custom packaging and labelling to formulation adjustments, our team works with you to create a product that meets your market's needs. Minimum order quantities apply — contact us for details.</p>

            <h3>Global Supply Chain</h3>
            <p>With a modern purification plant in Skardu and established logistics networks, we ship bulk orders to over <strong>30 countries</strong>. Whether you're in North America, Europe, the Middle East, or Asia-Pacific, we ensure reliable, temperature-controlled delivery.</p>
          </div>

          <div v-if="activeTab === 'pricing'" class="tab-content">
            <h2>Wholesale Pricing</h2>
            <p>Our wholesale pricing is designed to give retailers and brands healthy margins while keeping the product accessible to end consumers. Below is our current pricing structure.</p>

            <table class="wholesale-table">
              <thead><tr><th>Order Size</th><th>Price</th><th>Per kg</th><th>Savings</th></tr></thead>
              <tbody>
                <tr><td>1 kg</td><td class="highlight">Rs 95,000</td><td>Rs 95,000/kg</td><td>Base price</td></tr>
                <tr><td>5 kg</td><td class="highlight">Rs 475,000</td><td>Rs 95,000/kg</td><td>Consistent pricing</td></tr>
                <tr><td>10+ kg</td><td class="highlight">Contact us</td><td>Custom quote</td><td>Volume discounts</td></tr>
              </tbody>
            </table>

            <h3>What's Included</h3>
            <ul>
              <li>Gold-grade shilajit resin (73% fulvic acid)</li>
              <li>Full lab report package (PCSIR, Micro Quality Lab, Eurofins)</li>
              <li>Certificate of Analysis (CoA) for each batch</li>
              <li>Batch-level traceability with QR codes</li>
              <li>Custom packaging and labelling (private label orders)</li>
              <li>Temperature-controlled shipping</li>
            </ul>

            <h3>Payment Terms</h3>
            <p>We accept bank transfers, LC (Letter of Credit), and cryptocurrency. For first-time buyers, a 50% advance payment is required with the balance due before shipment. Established partners may qualify for net-30 terms.</p>

            <div style="margin-top: 2rem;">
              <img src="/images/products/wholesale-pricing.png" alt="Wholesale pricing overview" style="max-width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>
          </div>

          <div v-if="activeTab === 'quality'" class="tab-content">
            <h2>Quality &amp; Certifications</h2>
            <p>Quality is not a department at Organic Aprico — it is embedded in every step of our process. From extraction to export, every stage is documented, tested, and verified.</p>

            <h3>Third-Party Lab Testing</h3>
            <p>Every batch is tested by three independent laboratories:</p>
            <ul>
              <li><strong>Micro Quality Lab (California, USA)</strong> — fulvic acid content, heavy metals, aflatoxins</li>
              <li><strong>PCSIR Laboratories (Lahore, Pakistan)</strong> — microbiological, heavy metals, mineral profiling</li>
              <li><strong>Eurofins</strong> — additional verification of fulvic acid and purity</li>
            </ul>

            <h3>Certifications</h3>
            <div class="cert-grid" style="margin: 1.5rem 0;">
              <img src="/images/certifications/halal.jpg" alt="Halal certification" loading="lazy" />
              <img src="/images/certifications/gmp.jpg" alt="GMP certification" loading="lazy" />
              <img src="/images/certifications/haccp.jpg" alt="HACCP certification" loading="lazy" />
              <img src="/images/certifications/company-registration.jpg" alt="Company registration" loading="lazy" />
            </div>

            <h3>Lab Reports</h3>
            <div class="lab-grid">
              <img src="/images/lab-reports/micro-quality-fulvic-acid.jpg" alt="Micro Quality Lab fulvic acid test" loading="lazy" />
              <img src="/images/lab-reports/pcsir-heavy-metals.jpg" alt="PCSIR heavy metals analysis" loading="lazy" />
              <img src="/images/lab-reports/pcsir-microbiological.jpg" alt="PCSIR microbiological test" loading="lazy" />
              <img src="/images/lab-reports/pcsir-aflatoxin.jpg" alt="PCSIR aflatoxin test" loading="lazy" />
              <img src="/images/lab-reports/eurofins-fulvic-acid.jpg" alt="Eurofins fulvic acid verification" loading="lazy" />
            </div>

            <h3>What We Test For</h3>
            <table class="wholesale-table">
              <thead><tr><th>Parameter</th><th>Our Result</th><th>Acceptable Limit</th></tr></thead>
              <tbody>
                <tr><td>Fulvic Acid</td><td class="highlight">73%</td><td>Min 50%</td></tr>
                <tr><td>Lead (Pb)</td><td class="highlight">&lt;0.1 ppm</td><td>&lt;10 ppm</td></tr>
                <tr><td>Mercury (Hg)</td><td class="highlight">&lt;0.01 ppm</td><td>&lt;1 ppm</td></tr>
                <tr><td>Arsenic (As)</td><td class="highlight">&lt;0.05 ppm</td><td>&lt;2 ppm</td></tr>
                <tr><td>Cadmium (Cd)</td><td class="highlight">&lt;0.01 ppm</td><td>&lt;0.3 ppm</td></tr>
                <tr><td>Total Plate Count</td><td class="highlight">&lt;100 CFU/g</td><td>&lt;1000 CFU/g</td></tr>
                <tr><td>Yeast &amp; Mould</td><td class="highlight">&lt;10 CFU/g</td><td>&lt;100 CFU/g</td></tr>
              </tbody>
            </table>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem;">
              <img src="/images/products/wholesale-best-brand.png" alt="Best shilajit brand" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
              <img src="/images/products/wholesale-iso.png" alt="ISO certification" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem;">
              <img src="/images/products/wholesale-eurofins.png" alt="Eurofins certification" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
              <img src="/images/products/wholesale-pcsir-micro.png" alt="PCSIR microbiological" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
              <img src="/images/products/wholesale-pcsir-heavy.png" alt="PCSIR heavy metals" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>

            <h3>Purification Plant</h3>
            <div style="margin-top: 1.5rem;">
              <img src="/images/products/wholesale-purification-unit.png" alt="Organic Aprico purification plant" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>

            <h3>Purification Process</h3>
            <div style="margin-top: 1.5rem;">
              <img src="/images/products/wholesale-purification.png" alt="Shilajit purification process" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>
          </div>

          <div v-if="activeTab === 'faq'" class="tab-content">
            <h2>Frequently Asked Questions</h2>

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
        </div>
      </section>

      <section class="guarantee-section">
        <div class="wrap">
          <div class="guarantee-card">
            <div class="guarantee-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="guarantee-text">
              <h2>Quality Guarantee for Wholesale Partners</h2>
              <p>Every wholesale order comes with full lab reports and a quality guarantee. If any batch fails to meet our published specifications, we will replace it at no cost. Your reputation is our reputation.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="related-section">
        <div class="wrap">
          <h2>Our Retail Products</h2>
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

const product = PRODUCTS.find(p => p.key === 'wholesale')!
const productTitle = 'Pure Himalayan Shilajit Resin Wholesale | Organic Aprico'

const selectedSize = ref(product.sizes[0].id)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('description')
const activeImage = ref(0)
const openFaq = ref<number | null>(null)

const galleryImages = [
  '/images/products/wholesale-hero.jpg',
  '/images/products/wholesale-packing-1.jpg',
  '/images/products/wholesale-packing-2.jpg',
]

const currentVariant = computed(() =>
  product.sizes.find(s => s.id === selectedSize.value)!
)

const faqs = [
  { q: 'What is the minimum order quantity for wholesale?', a: 'Our minimum wholesale order is 1 kg. For private label orders, the minimum is 5 kg. Contact us for custom arrangements.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 10–15 business days worldwide. Express shipping (3–5 business days) is available for an additional fee. All orders are temperature-controlled.' },
  { q: 'Do you provide lab reports with wholesale orders?', a: 'Yes. Every wholesale order includes a full Certificate of Analysis (CoA) with results from PCSIR, Micro Quality Lab California, and Eurofins. Reports cover fulvic acid, heavy metals, microbiology, and aflatoxins.' },
  { q: 'Can I rebrand the product under my own label?', a: 'Yes. We offer private label services including custom packaging, labelling, and formulation. Minimum order is 5 kg for private label. Contact us to discuss your requirements.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers (domestic and international), LC (Letter of Credit), and cryptocurrency (BTC, USDT). First-time buyers pay 50% advance; established partners may qualify for net-30 terms.' },
  { q: 'What is the shelf life of the product?', a: 'Our shilajit resin has a shelf life of 24 months from the date of packaging when stored in a cool, dry place away from direct sunlight.' },
  { q: 'Is the product organic certified?', a: 'Our shilajit is wild-harvested from pristine mountains at 17,000+ feet with no chemical processing. We hold GMP, HACCP, and Halal certifications. While shilajit is a natural resin and not a cultivated crop, our purification process meets organic standards.' },
  { q: 'Can I get samples before placing a bulk order?', a: 'Yes. We offer sample kits (10g resin or 30ml drops) for prospective wholesale partners. Contact us to request a sample.' },
]

function onAdd() {
  addToCart('wholesale', selectedSize.value, qty.value)
  justAdded.value = true
  toast.show(`Added ${qty.value} x Wholesale Shilajit ${currentVariant.value.label} to cart`)
  setTimeout(() => { justAdded.value = false }, 1400)
}

useSeoMeta({
  title: 'Pure Himalayan Shilajit Resin Wholesale | Organic Aprico',
  description: 'The World\'s Most Trusted Source for Bulk & Wholesale Shilajit Resin. Direct from extractor, no middlemen. Lab tested, private label available. From Rs 95,000/kg.',
  ogTitle: 'Wholesale Himalayan Shilajit Resin | Organic Aprico',
  ogDescription: 'Bulk shilajit resin for retailers and brands. 73% fulvic acid, 8-stage purification, private label available. From Rs 95,000/kg.',
  ogImage: '/images/products/wholesale-hero.jpg',
  ogType: 'product',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Pure Himalayan Shilajit Resin — Wholesale',
        description: 'Wholesale pure Himalayan shilajit resin for retailers and brands. 73% fulvic acid, 8-stage purification, lab tested. Direct from extractor in Gilgit-Baltistan.',
        image: '/images/products/wholesale-hero.jpg',
        brand: { '@type': 'Brand', name: 'Organic Aprico' },
        offers: product.sizes.map(s => ({
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: 'https://organicaprico.com/products/pure-himalayan-shilajit-resin-wholesale',
        })),
      }),
    },
  ],
})
</script>
