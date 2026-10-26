<template>
  <div class="product-page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="breadcrumb">
      <div class="wrap">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/products">Products</NuxtLink>
        <span class="sep">/</span>
        <span class="current">Shilajit Resin</span>
      </div>
    </div>
    <main>
      <section class="product-hero">
        <div class="wrap">
          <div class="product-hero-grid">
            <div class="product-gallery">
              <div class="product-gallery-row">
                <div class="product-thumbs">
                  <button
                    v-for="(img, i) in galleryImages"
                    :key="i"
                    class="product-thumb"
                    :class="{ active: activeImage === i }"
                    @click="activeImage = i"
                  >
                    <img :src="img" :alt="galleryAlts[i] ?? productTitle" />
                  </button>
                </div>
                <div class="product-main-img">
                  <img :src="galleryImages[activeImage]" :alt="galleryAlts[activeImage] ?? productTitle" />
                  <button class="gallery-arrow gallery-arrow-left" aria-label="Previous image" @click="prevImage">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button class="gallery-arrow gallery-arrow-right" aria-label="Next image" @click="nextImage">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="product-info">
              <h1>{{ productTitle }}</h1>
              <a class="product-rating google-badge" href="https://maps.app.goo.gl/PPcqPsNFQVmvtFU27" target="_blank" rel="noopener" aria-label="Organic Aprico on Google: 4.8 out of 5 from 40 Google reviews">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span><strong>4.8/5</strong> from 40 Google reviews</span>
              </a>
              <div class="product-price-block">
                <span class="product-price-now">{{ formatPrice(currentVariant.price) }}</span>
                <span v-if="currentVariant.was" class="product-price-was">{{ formatPrice(currentVariant.was) }}</span>
              </div>
              <p class="product-unit-price">
                {{ formatPrice(pricePerGram) }} per gram &middot; about {{ servingsCount }} servings per jar
                (0.7 g serving)
              </p>
              <p class="product-short-desc">Pure Himalayan shilajit resin from the mountains of Gilgit-Baltistan. 73% fulvic acid, lab verified from PCSIR and Micro Quality Lab California. 8-stage purification, sun-dried 40+ days.</p>

              <ul class="product-facts">
                <li><strong>73% fulvic acid</strong> &mdash; Micro Quality Lab, California</li>
                <li><strong>PCSIR heavy metals: non-detect</strong></li>
                <li><strong>In stock</strong> &mdash; dispatched within 24 hours</li>
                <li><strong>Cash on delivery</strong> in Pakistan</li>
                <li><strong>Delivery</strong> 3&ndash;5 working days in Pakistan (Rs 250 flat), 10&ndash;14 days worldwide</li>
              </ul>
              <NuxtLink to="/certifications" class="product-lab-cta">
                View lab report for batch OA-2025-0307 &rarr;
              </NuxtLink>

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
                    {{ size.label }} &middot; {{ formatPrice(size.price) }}
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
                  3-day returns
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

      <section class="buy-section">
        <div class="wrap">
          <h2>Buy Shilajit Online in Pakistan (COD &amp; Delivery)</h2>
          <p>Ordering takes a couple of minutes. Pick your size above, choose <strong>cash on delivery</strong> or pay in advance by bank transfer, JazzCash, EasyPaisa or card, and we dispatch from Skardu within 24 hours. Delivery inside Pakistan runs 3 to 5 working days by TCS; international orders ship in 10 to 14 days with customs papers and the batch lab report included.</p>
          <ul class="buy-list">
            <li><strong>Cash on delivery</strong> available in all major cities of Pakistan.</li>
            <li><strong>Dispatch in 24 hours</strong> &mdash; every parcel carries its batch code and matching lab report reference.</li>
            <li><strong>Pick up in Lahore</strong> if you prefer &mdash; our outlet is in Lahore Organic Village, D.H.A. Main Blvd. See <NuxtLink to="/locations/lahore">our Lahore shop</NuxtLink>.</li>
            <li><strong>3-day returns</strong> &mdash; if the jar does not match the quality you ordered, contact us within 3 days of delivery. Full terms in our <NuxtLink to="/policies/refund-policy">refund policy</NuxtLink>.</li>
            <li><strong>Questions before you order?</strong> WhatsApp <a href="https://wa.me/923311116915" target="_blank" rel="noopener">+92 331 1116915</a> or email <a href="mailto:organicapricoskardu@gmail.com">organicapricoskardu@gmail.com</a>.</li>
          </ul>
        </div>
      </section>

      <section class="price-section" id="price-table">
        <div class="wrap">
          <h2>Shilajit Price per Gram</h2>
          <p>Every jar below is the same 73% fulvic acid, 8-stage purified gold-grade resin &mdash; the price changes only with the jar size. The serving size on our label is 0.7 g.</p>
          <table class="price-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Price</th>
                <th>Price per gram</th>
                <th>Approx. servings (0.7 g)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in priceRows" :key="row.id">
                <td>{{ row.label }}</td>
                <td class="price-cell">{{ formatPrice(row.price) }}</td>
                <td>{{ formatPrice(row.perGram) }} / g</td>
                <td>{{ row.servings }}</td>
              </tr>
            </tbody>
          </table>
          <p class="price-note">Need more than 100 g? Bulk resin is available from 1 kg at Rs 95,000 &mdash; see <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">wholesale &amp; private label</NuxtLink>. For a size-by-size breakdown of the market, read our <NuxtLink to="/blogs/blog/shilajit-prices-in-pakistan-what-you-need-to-know">shilajit price per gram guide</NuxtLink>.</p>
        </div>
      </section>

      <section class="product-tabs">
        <div class="wrap">
          <div class="product-description tab-content">
            <p>Organic Aprico offers <strong>Pure shilajit</strong> from the Himalayan mountains of Gilgit-Baltistan, extracted at altitudes above <strong>17,000 feet</strong>. With a starting shilajit price of just <strong>1,500 PKR</strong>, we provide original shilajit in Pakistan with lab testing from the USA and PCSIR Pakistan.</p>
            <p>Our Shilajit undergoes an 8-stage filtration and purification process to ensure it is free from heavy metals and impurities while retaining <strong>73% fulvic acid</strong>, as verified by the lab tests given below.</p>
            <p>Since 1972, we've specialized in Gold-grade Himalayan shilajit, providing purely natural shilajit for improved health and vitality. Free from microbiological contaminants.</p>

            <h2>Pure Shilajit: Origin and Potency</h2>
            <p>Shilajit is a black, sticky substance found in the rocks of the Himalayan mountains, especially in Gilgit-Baltistan. This region produces the <strong>Best Shilajit in Pakistan</strong>, and Organic Aprico holds a government-issued license to extract Shilajit from this pristine area, which is widely demanded worldwide. It forms over centuries from the decomposition of plants in the Himalayan mountains. Research indicates that Shilajit extracted from 17,000 feet above sea level is the most potent gold-grade shilajit.</p>
            <p>Pure Shilajit contains over <strong>85 essential minerals</strong> and is rich in fulvic and humic acid, which boost strength, stamina, and vitality while aiding in tissue repair. You can read more about the origin and benefits of shilajit in our <NuxtLink to="/blogs/blog/ultimate-guide-to-shilajit-2026-benefits-usage-dosage-purity-tips-where-to-buy-authentic-resin">complete shilajit guide</NuxtLink>.</p>
            <p>We ensure the purity of our original Shilajit through a meticulous 8-stage purification process and a <strong>40-day sun dehydration method</strong>, enhancing its potency. Celebrated for its energy-boosting, immunity-strengthening, and mind-enhancing properties, our Shilajit is available globally in grams and bulk Shilajit. With licenses for extraction and export, we guarantee smooth deliveries worldwide.</p>

            <h2>Shilajit Price in Pakistan 2026: A Market Overview</h2>
            <p>The price of original Shilajit in Pakistan varies based on its quality and level of purification. Many sellers lack the necessary production facilities, equipment, and expertise to purify Shilajit properly. Extracted from depths below 16,000 feet, their products often contain harmful sediments and heavy metals that pose serious risks to human health. Such unrefined Shilajit price in Pakistan is sold below 60,000 PKR in 2026, making it a dangerous choice for consumers. For a size-by-size breakdown, see our <NuxtLink to="/blogs/blog/shilajit-prices-in-pakistan-what-you-need-to-know">2026 shilajit price-per-gram guide</NuxtLink>.</p>
            <p>Organic Aprico offers premium gold-grade Aftabi Salajeet with a starting shilajit price per kg of <strong>95,000 PKR</strong>, ensuring superior quality and purity. With over 10,000 satisfied customers worldwide, Organic Aprico sets a benchmark for excellence.</p>
            <p>Globally, Himalayan Shilajit is witnessing increased demand as a natural health supplement known for its mineral richness and benefits like enhanced energy, improved immunity, and better cognitive function. As consumers prioritize organic and pure products, the market for premium-quality Shilajit has expanded, supported by online platforms that make it readily available to a global audience. Choose wisely!</p>

            <h3>Latest Shilajit Price in Pakistan 2026:</h3>
            <ul>
              <li v-for="size in product.sizes" :key="size.id">
                Shilajit {{ size.label }} price in Pakistan: {{ formatPrice(size.price) }}
              </li>
            </ul>
            <p>The full price-per-gram table is in the <a href="#price-table">Shilajit Price per Gram</a> table above.</p>

            <h2>How to get Himalayan Shilajit from Pakistan</h2>
            <p>Organic Aprico offers the best shilajit price in Pakistan, consisting of grade A quality, 73% fulvic acid and full third-party lab testing, at an affordable price. Dedicated to excellence, Organic Aprico provides Pure Himalayan shilajit backed by export and extraction license, company registration, and operational outlets in Skardu and Lahore. With an advanced ultra filtration and purification unit in Lahore Organic Village, we maintain strict quality and hygiene standards. You can conveniently buy shilajit by visiting our outlets. For international deliveries, certified shilajit analysis ensures authenticity, smooth customs clearance, and seamless worldwide shipping.</p>
            <p>Our commitment to delivering original shilajit has earned the trust of over <strong>10,000 customers worldwide</strong>. From anywhere in the world, you can buy pure shilajit online at organicaprico.com or contact us at 03311116915. Ordering shilajit online takes a couple of minutes, and every order ships with its batch number and lab report reference.</p>

            <h2>What you get in every jar of Organic Aprico shilajit</h2>
            <p>Instead of unproven promises, here are the specifications we can document for every batch we sell.</p>
            <ul>
              <li><strong>Origin</strong> — Hand-harvested above 17,000 feet in Gilgit-Baltistan, Skardu.</li>
              <li><strong>Fulvic acid</strong> — 73% verified independently by Micro Quality Lab, California.</li>
              <li><strong>Minerals</strong> — 84+ naturally occurring trace minerals plus humic acid.</li>
              <li><strong>Purification</strong> — 8 chemical-free stages: Triphala soak, RO filtration, ion exchange, UV treatment and ozonation.</li>
              <li><strong>Dehydration</strong> — Sun-dried for more than 40 days in stainless steel containers.</li>
              <li><strong>Heavy metals</strong> — Tested by PCSIR Lahore and Eurofins for lead, arsenic, cadmium and mercury.</li>
              <li><strong>Aflatoxins and microbes</strong> — Negative for Aflatoxin B1, B2, G1 and G2, with a clear microbiological panel.</li>
              <li><strong>Traceability</strong> — Every box carries a batch code. Request the lab report for your batch by WhatsApp or email.</li>
              <li><strong>Sizes</strong> — 10 g, 20 g, 30 g, 50 g and 100 g glass jars. Bulk and private label available.</li>
              <li><strong>Licences</strong> — Government extraction licence, export licence and SECP company registration.</li>
              <li><strong>Formats</strong> — Raw resin, liquid drops, and bulk resin for businesses.</li>
            </ul>
            <p><em>Organic Aprico shilajit is a food supplement, not a medicine. It is not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication or managing a medical condition, consult a qualified healthcare professional before use.</em></p>

            <h2>Best Shilajit to Buy</h2>
            <p>Organic Aprico stands out in this market by offering top-tier, 100% Pure Himalayan Shilajit sourced directly from the Himalayan mountains of Gilgit Baltistan. Known for its commitment to quality, Organic Aprico ensures purity and authenticity by providing lab-tested Shilajit, and our original Shilajit price is moderate. See how we compare in our <NuxtLink to="/blogs/blog/best-shilajit-brands-2026-the-complete-guide-to-finding-quality-himalayan-shilajit">guide to the best shilajit brands</NuxtLink>. With its focus on verifiable quality and affordability, Organic Aprico shilajit suits buyers who want a lab-tested supplier with documented fulvic acid content, batch traceability and worldwide shipping.</p>

            <h2>Key Stages of Processing Bulk Shilajit / Raw Shilajit</h2>
            <p><strong>Extraction → Filtration → Purification → Dehydration</strong></p>
            <ul>
              <li><strong>Extraction:</strong> We source organic Shilajit from the pristine Himalayan mountains of Gilgit Baltistan at an altitude of over 17,000 feet. This environment yields Gold-Grade Shilajit, rich in fulvic acid and 84 essential minerals.</li>
              <li><strong>Filtration:</strong> Using mineral-rich glacier water, we filter the Shilajit to remove sand particles, impurities, and sediments. This potent liquid undergoes repeated filtration over several weeks to ensure purity.</li>
              <li><strong>Purification:</strong> Employing both traditional and scientific methods, we remove heavy metals, lead, arsenic, bacteria, and fungus while preserving Shilajit's enzymatic and mineral properties for maximum potency.</li>
              <li><strong>Dehydration:</strong> Shilajit is placed in stainless steel containers and exposed to direct sunlight, retaining natural minerals, high levels of fulvic acid, and maximum potency.</li>
            </ul>

            <h2>Our Export-Grade Production Process (8-Stage)</h2>
            <p>At our state-of-the-art facilities in Skardu and Lahore, every batch of Shilajit undergoes a meticulous 8-Stage Ultra-Filtration and Purification Process before it is cleared for export.</p>
            <ol>
              <li><strong>Extraction</strong> — Raw Shilajit is hand-harvested from the pristine Himalayan ranges of Gilgit Baltistan at over 17,000 feet above sea level — in one of the world's most untouched natural environments.</li>
              <li><strong>Triphala Soaking — Natural Heavy Metal Removal:</strong> Raw Shilajit is soaked in RO purified water with Triphala for 3 to 7 days. This traditional Ayurvedic method naturally draws out heavy metals while supporting and enhancing the resin's natural Fulvic Acid content — no chemicals, no shortcuts, just nature doing what it does best.</li>
              <li><strong>Primary Filtration</strong> — The raw resin is filtered using mineral-rich glacier water/RO water to remove sand, sediments, and surface impurities. Repeated Filtration: The resin undergoes multiple rounds of filtration over several weeks, progressively removing all physical contaminants.</li>
              <li><strong>Purification</strong> — Advanced Ion Exchange, UV treatment and ozonation eliminate heavy metals, arsenic, lead, bacteria, and fungus — with absolutely no chemicals used at any stage.</li>
              <li><strong>Quality Verification</strong> — Each batch is tested mid-process to ensure compliance with our strict internal quality standards before proceeding.</li>
              <li><strong>Dehydration</strong> — Purified resin is placed in stainless steel containers and sun-dried under direct sunlight for 40+ days, preserving natural Fulvic Acid levels, minerals, and full potency.</li>
              <li><strong>Lab Testing</strong> — Every batch is independently tested by Micro Quality Lab, California, confirming 73% Fulvic Acid content, absence of heavy metals, and zero toxins.</li>
              <li><strong>Batch Coding &amp; Export Clearance</strong> — Each production cycle is assigned a unique batch number printed on all packaging, ensuring complete traceability, authenticity, and transparency for international buyers.</li>
            </ol>

            <h2>Export Quality Private Label Packaging Options</h2>
            <p>Organic Aprico offers flexible packaging solutions tailored to your business needs:</p>
            <ul>
              <li>Bulk Raw Shilajit — available in 1kg, 10kg, 100kg and custom quantities</li>
              <li>Premium Gold-Foiled Rigid Box Sets with jar holder and spoon</li>
              <li>Cylindrical Packaging with gold foil finishing</li>
              <li>Custom Branded Packaging — designed to your exact specifications</li>
              <li>Private Label — your brand, our premium Shilajit</li>
            </ul>

            <h2>Salajeet and Its Quality Assurance by Organic Aprico</h2>
            <p>Organic Aprico Shilajit undergoes rigorous testing at Micro Quality Lab, California, confirming 73 per cent of fulvic acid content and the absence of heavy metals, chemicals, or toxins. We also hold a Certificate of Incorporation and a certification from the Pakistan Council of Scientific &amp; Industrial Research Laboratories Complex in Lahore, confirming the absence of Aflatoxin B1, B2, G1, and G2. We provide certification for both national and international clients, ensuring trust and confidence in our product.</p>

            <h2>How to Take Shilajit Resin</h2>
            <p>Organic Aprico Shilajit can be included in your daily routine. Due to its high purity, only a minimal amount is needed. The label serving size is <strong>0.7 g</strong> (about a pea-sized portion). If you are new to shilajit, start with <strong>300&ndash;500 mg</strong> and build up to a full 0.7 g serving. Dissolve it in lukewarm water, milk, herbal tea, or coffee.</p>
            <ul>
              <li><strong>Start low:</strong> 300&ndash;500 mg once a day for the first week, then increase to the full 0.7 g serving.</li>
              <li><strong>Best time:</strong> morning on an empty stomach, or before exercise.</li>
              <li><strong>Use lukewarm liquid</strong> only &mdash; boiling water can degrade fulvic acid.</li>
              <li><strong>Store</strong> in a cool, dry place away from direct sunlight. Shelf life is 24 months from the packaging date.</li>
            </ul>
            <p>Full dosing, timing and timing-mistake details are in our <NuxtLink to="/blogs/blog/how-to-take-shilajit-resin-dosage-timing-and-common-mistakes">how to take shilajit guide</NuxtLink>.</p>

            <h2>Returns and exchanges</h2>
            <p>At Organic Aprico, client satisfaction is our top priority. Since 1972, we have consistently met our clients' expectations. If you receive a jar with any issue, dissatisfaction, or a mistake on our part, contact us within <strong>3 days of delivery</strong> for an exchange or return — for national and international clients alike. See our <NuxtLink to="/policies/refund-policy">refund policy</NuxtLink> for the conditions.</p>

            <p><strong>Ingredients:</strong> Shilajit Resin</p>
          </div>

          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'lab' }" @click="activeTab = 'lab'">Lab Reports</button>
            <button class="tab-btn" :class="{ active: activeTab === 'howto' }" @click="activeTab = 'howto'">How to Use</button>
          </div>
          <div v-if="activeTab === 'lab'" class="tab-content">
            <h2>Lab Reports &amp; Batch Traceability</h2>
            <p>Every batch of Organic Aprico shilajit is tested by independent laboratories. Below are the latest reports for our shilajit resin, and the batch code printed on every jar.</p>
            <table class="price-table batch-table">
              <thead>
                <tr>
                  <th>Batch code</th>
                  <th>Laboratory</th>
                  <th>Test</th>
                  <th>Result</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OA-2025-0307</td>
                  <td>Micro Quality Lab, California</td>
                  <td>Fulvic acid content</td>
                  <td>73%</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>OA-2025-0307</td>
                  <td>PCSIR, Lahore</td>
                  <td>Heavy metals (lead, arsenic, cadmium, mercury)</td>
                  <td>Non-detect</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>OA-2025-0307</td>
                  <td>PCSIR, Lahore</td>
                  <td>Aflatoxin B1, B2, G1, G2</td>
                  <td>Negative</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>OA-2025-0307</td>
                  <td>Eurofins</td>
                  <td>Total humic extract</td>
                  <td>73.3% (71.8% fulvic acid)</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
              </tbody>
            </table>
            <p class="price-note">Your jar carries its own batch code &mdash; send it to us on WhatsApp or email and we will send the matching lab report for that batch. All current results are published as text on our <NuxtLink to="/certifications">lab reports &amp; certifications page</NuxtLink>.</p>
            <div class="lab-grid">
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/micro-quality-fulvic-acid.jpg', 'Micro Quality Lab fulvic acid test')">
                <img src="/images/lab-reports/micro-quality-fulvic-acid.jpg" alt="Micro Quality Lab fulvic acid test" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/pcsir-heavy-metals.jpg', 'PCSIR heavy metals analysis')">
                <img src="/images/lab-reports/pcsir-heavy-metals.jpg" alt="PCSIR heavy metals analysis" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/pcsir-microbiological.jpg', 'PCSIR microbiological test')">
                <img src="/images/lab-reports/pcsir-microbiological.jpg" alt="PCSIR microbiological test" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/pcsir-aflatoxin.jpg', 'PCSIR aflatoxin test')">
                <img src="/images/lab-reports/pcsir-aflatoxin.jpg" alt="PCSIR aflatoxin test" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/eurofins-fulvic-acid.jpg', 'Eurofins fulvic acid verification')">
                <img src="/images/lab-reports/eurofins-fulvic-acid.jpg" alt="Eurofins fulvic acid verification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
            </div>
            <h3>Certifications</h3>
            <div class="cert-grid">
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/iso-9001.jpg', 'ISO 9001 certification')">
                <img src="/images/certifications/iso-9001.jpg" alt="ISO 9001 certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/iso-22000.jpg', 'ISO 22000 certification')">
                <img src="/images/certifications/iso-22000.jpg" alt="ISO 22000 certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/halal.jpg', 'Halal certification')">
                <img src="/images/certifications/halal.jpg" alt="Halal certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/gmp.jpg', 'GMP certification')">
                <img src="/images/certifications/gmp.jpg" alt="GMP certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/haccp.jpg', 'HACCP certification')">
                <img src="/images/certifications/haccp.jpg" alt="HACCP certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/company-registration.jpg', 'Company registration')">
                <img src="/images/certifications/company-registration.jpg" alt="Company registration" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
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

      <section class="faq-section" id="faqs">
        <div class="wrap">
          <h2>FAQs</h2>
          <div class="faq-list">
            <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ open: openFaq === i }">
              <button class="faq-q" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? null : i">
                <span>{{ faq.q }}</span>
                <svg class="faq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="faq-a">
                <p v-for="(p, j) in answerParts(faq.a)" :key="j" :class="{ 'faq-a-p': answerParts(faq.a).length > 1 }">{{ p }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="reviews-section" id="google-reviews">
        <div class="wrap">
          <div class="reviews-header">
            <h2>Rated on Google</h2>
            <div class="reviews-summary">
              <div class="reviews-avg">
                <span class="avg-score">4.8</span>
                <div class="avg-stars">
                  <svg v-for="n in 5" :key="n" class="star filled" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="avg-count">From 40 Google reviews</span>
              </div>
            </div>
          </div>
          <p class="reviews-note">
            We do not publish customer reviews on this site. Our rating comes straight from our Google Business Profile:
            <a href="https://maps.app.goo.gl/PPcqPsNFQVmvtFU27" target="_blank" rel="noopener" class="add-review-link">View our 4.8/5 rating from 40 Google reviews</a>
          </p>
        </div>
      </section>

      <section class="guarantee-section">
        <div class="wrap">
          <div class="guarantee-card">
            <div class="guarantee-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="guarantee-text">
              <h2>3-Day Return / Exchange Window</h2>
              <p>If your jar does not match the quality you ordered, contact us within 3 days of delivery for an exchange or return. Every return is inspected on arrival. Full terms are in our <NuxtLink to="/policies/refund-policy">refund policy</NuxtLink>.</p>
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
    <Teleport to="body">
      <div v-if="lightbox.src" class="lightbox-backdrop" @click="closeLightbox">
        <button type="button" class="lightbox-close" aria-label="Close" @click="closeLightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="lightbox-content" @click.stop>
          <img :src="lightbox.src" :alt="lightbox.alt" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS, formatPrice } from '~/data/products'
import { buildProductJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from '~/utils/seo'

const { count: cartCount, add: addToCart, openDrawer: openCart } = useCart()
const toast = useToast()

const product = PRODUCTS.find(p => p.key === 'resin')!
const productTitle = 'Shilajit Price in Pakistan 2026 — Buy Pure Himalayan Resin'

const selectedSize = ref(product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('lab')
const activeImage = ref(0)
const openFaq = ref<number | null>(0)

const GRAMS: Record<string, number> = { '10g': 10, '20g': 20, '30g': 30, '50g': 50, '100g': 100 }
const SERVING_G = 0.7

const priceRows = computed(() => product.sizes.map((size) => {
  const grams = GRAMS[size.id] ?? 0
  return {
    id: size.id,
    label: size.label,
    price: size.price,
    perGram: Math.round(size.price / grams),
    servings: Math.floor(grams / SERVING_G),
  }
}))

const currentVariant = computed(() =>
  product.sizes.find(s => s.id === selectedSize.value)!
)

const pricePerGram = computed(() => {
  const row = priceRows.value.find(r => r.id === selectedSize.value)
  return row ? row.perGram : 0
})

const servingsCount = computed(() => {
  const row = priceRows.value.find(r => r.id === selectedSize.value)
  return row ? row.servings : 0
})

const lightbox = reactive({ src: '', alt: '' })

function openLightbox(src: string, alt: string) {
  lightbox.src = src
  lightbox.alt = alt
  if (import.meta.client) document.body.classList.add('no-scroll')
}

function closeLightbox() {
  lightbox.src = ''
  lightbox.alt = ''
  if (import.meta.client) document.body.classList.remove('no-scroll')
}

if (import.meta.client) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && lightbox.src) closeLightbox()
  }
  onMounted(() => document.addEventListener('keydown', onKey))
  onUnmounted(() => document.removeEventListener('keydown', onKey))
}

function prevImage() {
  activeImage.value = (activeImage.value - 1 + galleryImages.length) % galleryImages.length
}
function nextImage() {
  activeImage.value = (activeImage.value + 1) % galleryImages.length
}

const galleryImages = [
  '/images/products/shilajit-resin-jar-spoon.jpg',
  '/images/products/shilajit-resin-jar-pure.jpg',
  '/images/products/shilajit-resin-box-front.jpg',
  '/images/products/shilajit-resin-box-jar.jpg',
  '/images/products/shilajit-resin-box-back.jpg',
  '/images/products/shilajit-resin-box-summary.jpg',
  '/images/products/shilajit-resin-purity-comparison.jpg',
  '/images/products/shilajit-resin-features.jpg',
  '/images/products/shilajit-resin-how-to-use.jpg',
  '/images/products/shilajit-resin-why-choose.jpg',
  '/images/products/shilajit-resin-side-benefits.jpg',
  '/images/products/shilajit-resin-packaging.jpg',
]

const galleryAlts = [
  'Organic Aprico Shilajit Resin jar with measuring spoon',
  'Pure Himalayan Shilajit Resin in the glass jar',
  'Shilajit Resin box, front panel',
  'Shilajit Resin box and glass jar together',
  'Shilajit Resin box, back panel',
  'Shilajit Resin box, product summary panel',
  'Shilajit Resin purity comparison',
  'Shilajit Resin features panel',
  'Shilajit Resin how to use guide',
  'Shilajit Resin why choose panel',
  'Shilajit Resin packaging side panel',
  'Shilajit Resin packaging and jar',
]

function onAdd() {
  addToCart('resin', selectedSize.value, qty.value)
  justAdded.value = true
  toast.show(`Added ${qty.value} x Shilajit Resin ${currentVariant.value.label} to cart`)
  setTimeout(() => { justAdded.value = false }, 1400)
}

function answerParts(answer: string | string[]): string[] {
  return Array.isArray(answer) ? answer : [answer]
}

const faqs = [
  {
    q: 'What is the current shilajit price in Pakistan?',
    a: 'Gold-grade resin starts at Rs 1,500 for 10 g and goes up to Rs 12,900 for 100 g. That works out to Rs 150/g at 10 g and Rs 129/g at 100 g. Bulk orders start at 1 kg for Rs 95,000. Every price is listed in the price-per-gram table above.',
  },
  {
    q: 'How do I know the shilajit is pure and not adulterated?',
    a: 'Each jar carries a batch code, and the matching third-party lab report is available on request — 73% fulvic acid from Micro Quality Lab, California, heavy metals tested at PCSIR Lahore, and a Eurofins total humic extract result. Read the current results on our lab reports and certifications page.',
  },
  {
    q: 'How much shilajit should I take per day?',
    a: 'The label serving size is 0.7 g. If you are new to shilajit, start with 300–500 mg once a day for the first week, then move up to the full 0.7 g serving. Dissolve it in lukewarm water, milk or herbal tea.',
  },
  {
    q: 'Do you offer cash on delivery in Pakistan?',
    a: 'Yes. Cash on delivery is available in all major cities of Pakistan, with delivery in 3 to 5 working days by TCS. You can also pay in advance by bank transfer, JazzCash, EasyPaisa or card, and collect from our Lahore outlet if you prefer.',
  },
  {
    q: 'What is the return policy?',
    a: 'You have 3 days from delivery to request a return or exchange if the jar does not match the quality you ordered. Every return is inspected on arrival. The full conditions are in our refund policy.',
  },
  {
    q: 'Do you ship shilajit outside Pakistan?',
    a: 'Yes. International orders ship in 10 to 14 days with customs papers, the batch lab report and export documentation included. We ship to the UK, USA, EU, Middle East, Australia and Canada.',
  },
  {
    q: 'Can I buy bulk or private-label shilajit for my business?',
    a: 'Yes. Wholesale resin starts at 1 kg for Rs 95,000, with 5 kg at Rs 475,000 and 10 kg+ on request. Private label and custom packaging are available — see the wholesale and private label page.',
  },
]

useSeoMeta({
  title: 'Shilajit Price in Pakistan 2026 | Buy Pure Himalayan Resin',
  description: 'Buy pure Himalayan shilajit resin from Skardu. 73% fulvic acid (Micro Quality Lab), PCSIR heavy-metal tested, 10g from Rs 1,500. COD in Pakistan.',
  ogTitle: 'Shilajit Price in Pakistan 2026 — Pure Himalayan Resin from Rs 1,500',
  ogDescription: 'Gold-grade resin, 73% fulvic acid, 8-stage purification, lab tested in California and Pakistan. 10g Rs 1,500 · 50g Rs 7,100 · 100g Rs 12,900.',
  ogImage: '/images/products/shilajit-resin-jar-spoon.jpg',
  ogType: 'product',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildProductJsonLd(product, {
        url: '/products/shilajit',
        images: galleryImages,
        skuPrefix: 'OA-SHILAJIT-RESIN',
        name: 'Pure Himalayan Shilajit Resin',
        description: 'Gold-grade Himalayan shilajit resin with 73% fulvic acid. 8-stage purification, lab tested. From 17,000 feet in Gilgit-Baltistan.',
        category: 'Dietary Supplement > Herbal Supplement',
        additionalProperties: [
          { name: 'Fulvic acid', value: '73%' },
          { name: 'Source altitude', value: 'Above 17,000 ft' },
          { name: 'Purification', value: '8-stage' },
          { name: 'Batch', value: 'OA-2025-0307' },
          { name: 'Serving size', value: '0.7 g' },
        ],
        returnWindowDays: 3,
        shippingDetails: {
          shippingRate: 250,
          handlingTime: { minValue: 0, maxValue: 1 },
          transitTime: { minValue: 3, maxValue: 5 },
          shippingDestination: { '@type': 'PostalAddress', addressCountry: 'PK' },
        },
        sellerId: 'https://organicaprico.com/#organization',
      })),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildFaqJsonLd(faqs)),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Pure Himalayan Shilajit Resin' },
      ])),
    },
  ],
})
</script>
