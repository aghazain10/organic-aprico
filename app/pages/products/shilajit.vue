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
                    <img :src="img" :alt="galleryAlts[i] ?? productTitle" loading="eager" decoding="async" />
                  </button>
                </div>
                <div class="product-main-img">
                  <img :src="galleryImages[activeImage]" :alt="galleryAlts[activeImage] ?? productTitle" loading="eager" decoding="async" />
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
              <p class="product-short-desc">Pure Himalayan shilajit resin from the mountains of Gilgit-Baltistan. 73.3% total humic extract (71.8% fulvic acid), lab verified from PCSIR and Eurofins. 8-stage purification, sun-dried 40+ days.</p>

              <ul class="product-facts">
                <li><strong>73.3% total humic extract (71.8% fulvic acid)</strong></li>
                <li><strong>PCSIR heavy metals: non-detect</strong></li>
                <li><strong>In stock</strong> &mdash; dispatched within 24 hours</li>
                <li><strong>Cash on delivery</strong> in Pakistan</li>
                <li><strong>Delivery</strong> 3&ndash;5 working days in Pakistan (Rs 250 flat), 10&ndash;14 days worldwide</li>
              </ul>
              <NuxtLink to="/certifications" class="product-lab-cta">
                View lab report for batch OA-26-0408 &rarr;
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
          <p>Ordering takes a couple of minutes. Pick your size above, choose <strong>cash on delivery</strong> or pay in advance by bank transfer, and we dispatch from the Organic Aprico Outlet, Lahore within 24 hours. Delivery inside Pakistan runs 3 to 5 working days by Postex; international orders ship in 10 to 14 days with customs papers and the batch lab report included.</p>
          <ul class="buy-list">
            <li><strong>Cash on delivery</strong> available in all major cities of Pakistan.</li>
            <li><strong>Dispatch in 24 hours</strong> &mdash; every parcel carries a batch number, scan bar and matching lab report reference.</li>
            <li><strong>Pick up in Lahore</strong> if you prefer &mdash; our outlet is in Lahore Organic Village, D.H.A. Main Blvd. See <NuxtLink to="/locations/lahore">our Lahore shop</NuxtLink>.</li>
            <li><strong>3-day returns</strong> &mdash; if the jar does not match the quality you ordered, contact us within 3 days of delivery. Full terms in our <NuxtLink to="/policies/refund-policy">refund policy</NuxtLink>.</li>
            <li><strong>Questions before you order?</strong> WhatsApp <a href="https://wa.me/923311116915" target="_blank" rel="noopener">+92 331 1116915</a> or email <a href="mailto:info@organicaprico.com">info@organicaprico.com</a>.</li>
          </ul>
        </div>
      </section>

      <section class="price-section" id="price-table">
        <div class="wrap">
          <h2>Shilajit Price per Gram</h2>
          <p>Every jar below is the same 73.3% total humic extract (71.8% fulvic acid), 8-stage purified gold-grade resin &mdash; the price changes only with the jar size. The serving size on our label is 0.7 g.</p>
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
              <!-- Bulk row: answers "1 kg shilajit price in Pakistan" (a page-1
                   query with zero clicks) directly in the table Google pulls
                   snippets from, and links to the page that owns supplier intent. -->
              <tr class="price-bulk">
                <td><NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">1 kg (bulk)</NuxtLink></td>
                <td class="price-cell">Rs 95,000</td>
                <td>Rs 95 / g</td>
                <td>1,428</td>
              </tr>
            </tbody>
          </table>
          <p class="price-note">Need more than 100 g? The <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">1 kg shilajit price in Pakistan</NuxtLink> is Rs 95,000, with 5 kg at Rs 475,000 and 10 kg+ on request. The per-gram column above shows the effective rate for every jar size.</p>
        </div>
      </section>

      <section class="product-tabs">
        <div class="wrap">
          <div class="product-description tab-content">
            <p>Organic Aprico offers <strong>Pure shilajit</strong> from the Himalayan mountains of Gilgit-Baltistan, extracted at altitudes above <strong>17,000 feet</strong>. With a starting shilajit price of just <strong>1,500 PKR</strong>, we provide original shilajit in Pakistan with lab testing from PCSIR Pakistan.</p>
            <p>Our Shilajit undergoes an 8-stage filtration and purification process, with heavy metals within safe limits, while retaining <strong>73.3% total humic extract (71.8% fulvic acid)</strong>, as verified by the lab tests given below.</p>
            <p>Local family business since 1972; SECP registered in 2020, exporting shilajit directly since 2020. We specialize in Gold-grade Himalayan shilajit, providing purely natural shilajit for improved health and vitality. Free from microbiological contaminants.</p>

            <h2>Pure Shilajit: Origin and Potency</h2>
            <p>Shilajit is a black, sticky substance found in the rocks of the Himalayan mountains, especially in Gilgit-Baltistan. This region produces the <strong>Best Shilajit in Pakistan</strong>, and Organic Aprico holds a government-issued license to extract Shilajit from this pristine area, which is widely demanded worldwide. It forms over centuries from the decomposition of plants in the Himalayan mountains. Research indicates that Shilajit extracted from 17,000 feet above sea level is the most potent gold-grade shilajit.</p>
            <p>Pure Shilajit contains <strong>85+ trace minerals</strong> and is rich in fulvic and humic acid, which support strength, stamina and tissue repair. You can read more about the origin and benefits of shilajit in our <NuxtLink to="/blogs/blog/ultimate-guide-to-shilajit-2026-benefits-usage-dosage-purity-tips-where-to-buy-authentic-resin">complete shilajit guide</NuxtLink>.</p>
            <p>We ensure the purity of our original Shilajit through a meticulous 8-stage purification process and a <strong>40-day sun dehydration method</strong>, enhancing its potency. Celebrated for its energy-boosting, immunity-strengthening, and mind-enhancing properties, our Shilajit is available globally in grams and bulk Shilajit. With licenses for extraction and export, we guarantee smooth deliveries worldwide.</p>

            <h2>Shilajit Price in Pakistan 2026: A Market Overview</h2>
            <p>The price of original Shilajit in Pakistan varies based on its quality and level of purification. Many sellers lack the necessary production facilities, equipment, and expertise to purify Shilajit properly. Extracted from depths below 14,000 feet, their products often contain harmful sediments and heavy metals that pose serious risks to human health. Such unrefined Shilajit price in Pakistan is sold below 60,000 PKR in 2026, making it a dangerous choice for consumers. For a size-by-size breakdown, see the <a href="#price-table">price-per-gram table above</a>.</p>
            <p>Organic Aprico offers premium gold-grade Aftabi Salajeet with a starting shilajit price per kg of <strong>95,000 PKR</strong>, ensuring superior quality and purity. With 1M+ satisfied customers worldwide, Organic Aprico sets a benchmark for excellence.</p>
            <p>Globally, Himalayan Shilajit is witnessing increased demand as a natural health supplement known for its mineral richness and benefits like enhanced energy, improved immunity, and better cognitive function. As consumers prioritize organic and pure products, the market for premium-quality Shilajit has expanded, supported by online platforms that make it readily available to a global audience. Choose wisely!</p>

            <h3>Shilajit Price in Pakistan by Size (10 g to 100 g)</h3>
            <ul>
              <li v-for="size in product.sizes" :key="size.id">
                Shilajit {{ size.label }} price in Pakistan: {{ formatPrice(size.price) }}
              </li>
            </ul>
            <p>The full price-per-gram table is in the <a href="#price-table">Shilajit Price per Gram</a> table above.</p>

            <h2>Original Shilajit Price in Pakistan: What You Are Paying For</h2>
            <p>"Original" in the Pakistani market usually means resin that has been cleaned and lab tested, not raw sand-heavy lumps sold by weight. The price gap is real: material that still holds sediment and moisture sells for a fraction of purified gold-grade resin, which is why two jars of the same weight can differ by thousands of rupees.</p>
            <p>Our every jar carries the batch number that matches the PCSIR results on our <NuxtLink to="/certifications">lab reports and certifications page</NuxtLink>. If a seller cannot show a fulvic acid figure, a heavy-metals result and a batch code, the low price is the only thing you can verify.</p>

            <h2>How to get Himalayan Shilajit from Pakistan</h2>
            <p>Organic Aprico offers the best shilajit price in Pakistan, consisting of grade A quality, 73.3% total humic extract (71.8% fulvic acid) and full third-party lab testing, at an affordable price. Dedicated to excellence, Organic Aprico provides Pure Himalayan shilajit backed by export and extraction license, company registration, and operational outlets in Skardu and Lahore. With an advanced ultra filtration and purification unit in Lahore Organic Village, we maintain strict quality and hygiene standards. You can conveniently buy shilajit by visiting our outlets. For international deliveries, certified shilajit analysis ensures authenticity, smooth customs clearance, and seamless worldwide shipping.</p>
            <p>Our commitment to delivering original shilajit has earned the trust of <strong>1M+ satisfied customers worldwide</strong>. From anywhere in the world, you can buy pure shilajit online at organicaprico.com or contact us at 03311116915. Ordering shilajit online takes a couple of minutes, and every order ships with its batch number and lab report reference.</p>

            <h2>What you get in every jar of Organic Aprico shilajit</h2>
            <p>Instead of unproven promises, here are the specifications we can document for every batch we sell.</p>
            <ul>
              <li><strong>Origin</strong> — Hand-harvested above 17,000 feet in Gilgit-Baltistan, Skardu.</li>
              <li><strong>Fulvic acid</strong> — 71.8% verified by Eurofins (73.3% total humic extract).</li>
              <li><strong>Minerals</strong> — 85+ naturally occurring trace minerals plus humic acid.</li>
              <li><strong>Purification</strong> — 8-stage 100% organic cold process: Triphala cleansing, cool RO dissolution, ion exchange and 0.1&ndash;0.2 micron ultra-filtration.</li>
              <li><strong>Dehydration</strong> — Sun-dried for more than 40 days in a sealed glass &amp; food-grade stainless steel chamber.</li>
              <li><strong>Heavy metals</strong> — Tested by PCSIR Lahore and Eurofins for lead, arsenic, cadmium and mercury.</li>
              <li><strong>Aflatoxins and microbes</strong> — Negative for Aflatoxin B1, B2, G1 and G2, with a clear microbiological panel.</li>
              <li><strong>Traceability</strong> — Every box carries a batch code. Request the lab report for your batch by WhatsApp or email.</li>
              <li><strong>Sizes</strong> — 10 g, 20 g, 30 g, 50 g and 100 g glass jars. Bulk and private label available.</li>
              <li><strong>Licences</strong> — Government extraction licence, export licence and SECP company registration.</li>
              <li><strong>Formats</strong> — Raw resin, <NuxtLink to="/products/shilajit-drops">liquid shilajit drops</NuxtLink>, and bulk resin for businesses.</li>
            </ul>
            <p><em>Organic Aprico shilajit is a food supplement, not a medicine. It is not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication or managing a medical condition, consult a qualified healthcare professional before use.</em></p>

            <h2>Best Shilajit to Buy</h2>
            <p>Organic Aprico stands out in this market by offering top-tier, 100% Pure Himalayan Shilajit sourced directly from the Himalayan mountains of Gilgit Baltistan. Known for its commitment to quality, Organic Aprico ensures purity and authenticity by providing lab-tested Shilajit, and our original Shilajit price is moderate. See how we compare in our <NuxtLink to="/blogs/blog/best-shilajit-brands-2026-the-complete-guide-to-finding-quality-himalayan-shilajit">guide to the best shilajit brands</NuxtLink>. With its focus on verifiable quality and affordability, Organic Aprico shilajit suits buyers who want a lab-tested supplier with documented fulvic acid content, batch traceability and worldwide shipping.</p>

            <h2>Our Export-Grade Production Process (8-Stage, 100% Organic)</h2>
            <p>At our state-of-the-art facilities in Skardu and Lahore, every batch of Shilajit undergoes a meticulous 8-stage, 100% organic cold purification process before it is cleared for export &mdash; no UV, no ozone, no chemicals.</p>
            <ol>
              <li><strong>Ethical High-Altitude Extraction</strong> &mdash; Raw Gold Grade Shilajit is ethically and sustainably hand-harvested by experienced local mountain experts from the pristine Himalayan ranges of Gilgit Baltistan at over 17,000 feet above sea level.</li>
              <li><strong>Hand Sorting &amp; Crushing</strong> &mdash; Every rock is inspected by hand so only pure, high-concentration Gold Grade pieces are selected, then gently hand-crushed into small pieces so they dissolve naturally without releasing excess grit.</li>
              <li><strong>Sun Exposure &amp; Organic Triphala Cleansing</strong> &mdash; Crushed rocks are spread under direct sunlight and coated in a paste of 100% Certified Organic Triphala, which works alongside solar energy to eliminate surface bacteria and bind heavy metals before extraction begins. The Triphala is a processing aid and is washed away; the final product contains only shilajit.</li>
              <li><strong>Cool Water Dissolution &amp; 24-Hour Settling</strong> &mdash; Never boiled or heat-cooked, the rocks slowly dissolve in cool, lab-tested RO water and rest undisturbed for a full 24 hours so heavy stones, sand and sediment settle naturally to the bottom.</li>
              <li><strong>Fine Bag Filtration</strong> &mdash; Only the clean upper liquid is drawn off and passed through ultra-fine, food-grade filter bags to capture every trace of herbal fiber and fine silt.</li>
              <li><strong>Natural Heavy-Metal Purification</strong> &mdash; The liquid flows through natural, organic-compliant filtration media that selectively locks onto heavy-metal ions via ion-exchange and molecular bonding, preserving essential trace minerals and fulvic acid &mdash; no synthetic chemicals.</li>
              <li><strong>Multi-Stage Membrane &amp; Ultra-Filtration</strong> &mdash; Progressively finer physical membranes (5 &micro;m &rarr; 1 &micro;m &rarr; 0.2 &micro;m &rarr; 0.1 &micro;m) cold-sterilize the solution without UV, ozone or solvents, blocking 99.99% of bacteria while keeping heat-sensitive nutrients intact.</li>
              <li><strong>Sunlight Dehydration in a Sealed Chamber</strong> &mdash; The sterile liquid is poured into shallow food-grade trays inside a sealed, ventilated glass chamber framed in food-grade stainless steel, where filtered airflow and direct sunlight slowly thicken it into potent Gold Grade resin over 40+ days.</li>
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
            <p>Organic Aprico Shilajit undergoes rigorous testing at PCSIR Lahore for heavy metals, microbiology and aflatoxins, and at Eurofins for fulvic acid and total humic extract, with heavy metals within safe limits. We also hold a Certificate of Incorporation and a certification from the Pakistan Council of Scientific &amp; Industrial Research Laboratories Complex in Lahore, confirming the absence of Aflatoxin B1, B2, G1, and G2. We provide certification for both national and international clients, ensuring trust and confidence in our product.</p>

            <h2>How to Take Shilajit Resin</h2>
            <p>Organic Aprico Shilajit can be included in your daily routine. Due to its high purity, only a minimal amount is needed. The label serving size is <strong>0.7 g</strong> (about a pea-sized portion). If you are new to shilajit, start with <strong>300&ndash;500 mg</strong> and build up to a full 0.7 g serving. Dissolve it in lukewarm water, milk, herbal tea, or coffee.</p>
            <ul>
              <li><strong>Start low:</strong> 300&ndash;500 mg once a day for the first week, then increase to the full 0.7 g serving.</li>
              <li><strong>Best time:</strong> morning on an empty stomach, or before exercise.</li>
              <li><strong>Use lukewarm liquid</strong> only &mdash; boiling water can degrade fulvic acid.</li>
              <li><strong>Store</strong> in a cool, dry place away from direct sunlight. Shelf life is 3 years from the packaging date.</li>
            </ul>
            <p>Full dosing, timing and timing-mistake details are in our <NuxtLink to="/blogs/blog/how-to-take-shilajit-resin-dosage-timing-and-common-mistakes">how to take shilajit guide</NuxtLink>.</p>

            <h2>Returns and exchanges</h2>
            <p>At Organic Aprico, client satisfaction is our top priority. Local family business since 1972; SECP registered in 2020, exporting shilajit directly since 2020. We have consistently met our clients' expectations. If you receive a jar with any issue, dissatisfaction, or a mistake on our part, contact us within <strong>3 days of delivery</strong> for an exchange or return — for national and international clients alike. See our <NuxtLink to="/policies/refund-policy">refund policy</NuxtLink> for the conditions.</p>

            <p><strong>Ingredients:</strong> Shilajit Resin</p>
          </div>

          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'lab' }" @click="activeTab = 'lab'">Lab Reports</button>
            <button class="tab-btn" :class="{ active: activeTab === 'howto' }" @click="activeTab = 'howto'">How to Use</button>
          </div>
          <div v-show="activeTab === 'lab'" class="tab-content">
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
                  <td>OA-26-0408</td>
                  <td>PCSIR, Lahore</td>
                  <td>Heavy metals (lead, arsenic, cadmium, mercury)</td>
                  <td>Non-detect</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>OA-26-0408</td>
                  <td>PCSIR, Lahore</td>
                  <td>Aflatoxin B1, B2, G1, G2</td>
                  <td>Negative</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>W25-AAAB-042</td>
                  <td>Eurofins</td>
                  <td>Total humic extract</td>
                  <td>73.3% total humic extract (71.8% fulvic acid)</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
                <tr>
                  <td>W25-AAAB-042</td>
                  <td>Eurofins</td>
                  <td>Heavy metals (lead, cadmium, arsenic, mercury)</td>
                  <td>Within safe limits</td>
                  <td><a href="/certifications">View result</a></td>
                </tr>
              </tbody>
            </table>
            <p class="price-note">Your jar carries its own batch code &mdash; send it to us on WhatsApp or email and we will send the matching lab report for that batch. All current results are published as text on our <NuxtLink to="/certifications">lab reports &amp; certifications page</NuxtLink>.</p>
            <div class="lab-grid">
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/pcsir-heavy-metals-microbiological.jpg', 'PCSIR heavy metals & microbiological report')">
                <img src="/images/lab-reports/pcsir-heavy-metals-microbiological.jpg" alt="PCSIR heavy metals & microbiological report" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/pcsir-aflatoxin.jpg', 'PCSIR aflatoxin test')">
                <img src="/images/lab-reports/pcsir-aflatoxin.jpg" alt="PCSIR aflatoxin test" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="lab-img-item clickable" @click="openLightbox('/images/lab-reports/eurofins-fulvic-acid.webp', 'Eurofins fulvic acid verification')">
                <img src="/images/lab-reports/eurofins-fulvic-acid.webp" alt="Eurofins fulvic acid verification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
            </div>
            <h3>Certifications</h3>
            <div class="cert-grid">
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/iso-9001.webp', 'ISO 9001 certification')">
                <img src="/images/certifications/iso-9001.webp" alt="ISO 9001 certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/iso-22000.webp', 'ISO 22000 certification')">
                <img src="/images/certifications/iso-22000.webp" alt="ISO 22000 certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/halal.webp', 'Halal certification')">
                <img src="/images/certifications/halal.webp" alt="Halal certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/gmp.webp', 'GMP certification')">
                <img src="/images/certifications/gmp.webp" alt="GMP certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/haccp.webp', 'HACCP certification')">
                <img src="/images/certifications/haccp.webp" alt="HACCP certification" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
              <div class="cert-img-item clickable" @click="openLightbox('/images/certifications/company-registration.webp', 'Company registration')">
                <img src="/images/certifications/company-registration.webp" alt="Company registration" loading="lazy" />
                <span class="zoom-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg></span>
              </div>
            </div>
          </div>
          <div v-show="activeTab === 'howto'" class="tab-content">
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
            <p>Store in a cool, dry place away from direct sunlight. The resin has a shelf life of <strong>3 years</strong> from the date of packaging. Keep the lid tightly closed after each use.</p>

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
                <img src="/images/products/shilajit-drops-hero.webp" alt="Shilajit Drops" loading="lazy" />
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
                <img src="/images/certifications/halal.webp" alt="Certifications" loading="lazy" />
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
import { trackViewItem } from '~/utils/analytics'

const { count: cartCount, add: addToCart, openDrawer: openCart } = useCart()
const toast = useToast()

const product = PRODUCTS.find(p => p.key === 'resin')!
// H1 leads with "Shilajit Resin" — the category this money page must own — while
// keeping the price head term. The <title> in useSeoMeta mirrors the intent but
// stays under 60 chars so it isn't truncated in the SERP.
const productTitle = 'Shilajit Resin Price in Pakistan 2026 — Pure Himalayan Resin from Rs 1,500'

const selectedSize = ref(product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('lab')
const activeImage = ref(0)
const openFaq = ref<number | null>(0)

onMounted(() => {
  trackViewItem('resin', selectedSize.value)
  // Preload every variant gallery so switching sizes is instant.
  const all = Object.values(variantGalleries).flatMap((g) => g.images)
  all.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

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

// Default gallery (used until variant-specific images are added).
const defaultGalleryImages = [
  '/images/products/shilajit-resin-gift-set-jar-scoop.webp',
  '/images/products/shilajit-resin-jar-30g-gold-lid.webp',
  '/images/products/shilajit-resin-supplement-facts-panel.webp',
  '/images/products/shilajit-resin-box-back-claims.webp',
  '/images/products/shilajit-resin-jar-supplement-facts.webp',
]

const defaultGalleryAlts = [
  'Organic Aprico Shilajit Resin gift set with jar and scoop in presentation box',
  'Pure Himalayan Shilajit Resin 30 g jar with gold lid',
  'Shilajit Resin supplement facts panel, 700 mg serving size',
  'Shilajit Resin box back panel with product claims and ingredients',
  'Shilajit Resin jar supplement facts label, 0.7 g per serving',
]

// Per-variant galleries. Add an entry for each size (10g, 20g, 30g, 50g, 100g)
// with its own images/alts. Sizes without an entry fall back to the default above.
const variantGalleries: Record<string, { images: string[]; alts: string[] }> = {
  '10g': {
    images: [
      '/images/products/shilajit-resin-10g-gift-box-jar-scoop.webp',
      '/images/products/shilajit-resin-10g-jar-gold-lid.webp',
      '/images/products/shilajit-resin-10g-box-front.webp',
      '/images/products/shilajit-resin-10g-box-interior.webp',
      '/images/products/shilajit-resin-10g-supplement-facts.webp',
      '/images/products/shilajit-resin-10g-jar-side-label.webp',
    ],
    alts: [
      'Organic Aprico Shilajit Resin 10 g gift box with jar and scoop',
      'Pure Himalayan Shilajit Resin 10 g jar with gold lid',
      'Shilajit Resin 10 g box front panel',
      'Shilajit Resin 10 g box interior with brand story panels',
      'Shilajit Resin 10 g supplement facts label, 700 mg serving',
      'Shilajit Resin 10 g jar side label with sun-drying and origin',
    ],
  },
  '20g': { images: defaultGalleryImages, alts: defaultGalleryAlts },
  '30g': { images: defaultGalleryImages, alts: defaultGalleryAlts },
  '50g': { images: defaultGalleryImages, alts: defaultGalleryAlts },
  '100g': { images: defaultGalleryImages, alts: defaultGalleryAlts },
}

const galleryImages = computed(() => variantGalleries[selectedSize.value]?.images ?? defaultGalleryImages)
const galleryAlts = computed(() => variantGalleries[selectedSize.value]?.alts ?? defaultGalleryAlts)

watch(selectedSize, () => { activeImage.value = 0 })

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
    a: 'Each jar carries a batch code, and the matching third-party lab report is available on request — 71.8% fulvic acid and 73.3% total humic extract verified by Eurofins, with heavy metals tested at PCSIR Lahore. Read the current results on our lab reports and certifications page.',
  },
  {
    q: 'Is this original shilajit or an adulterated product?',
    a: 'It is purified, single-origin resin from Gilgit-Baltistan, not a blended or reconstituted powder. Three things let you check: the batch code on the jar, the 73.3% total humic extract (71.8% fulvic acid) result verified by Eurofins, and the PCSIR heavy-metals panel showing lead, arsenic, cadmium and mercury as non-detect. Ask for the report for your exact batch before or after ordering.',
  },
  {
    q: 'What is the difference between the 10 g and 100 g jars?',
    a: 'The resin is identical — same 73.3% total humic extract (71.8% fulvic acid), same 8-stage purification. Only the jar size and the per-gram rate change: Rs 150/g at 10 g, Rs 145/g at 20 g, Rs 133/g at 30 g, Rs 142/g at 50 g and Rs 129/g at 100 g. The 100 g jar is the cheapest per gram and gives about 142 servings at the 0.7 g label serving.',
  },
  {
    q: 'What is the 1 kg shilajit price in Pakistan?',
    a: 'Bulk resin starts at Rs 95,000 per kg — that is Rs 95/g, below the retail rate on every jar size above — with 5 kg at Rs 475,000 and 10 kg+ quoted per order. It ships with the batch lab reports and export documents. See the wholesale and private label page for MOQ and lead time.',
  },
  {
    q: 'How much shilajit should I take per day?',
    a: 'The label serving size is 0.7 g. If you are new to shilajit, start with 300–500 mg once a day for the first week, then move up to the full 0.7 g serving. Dissolve it in lukewarm water, milk or herbal tea.',
  },
  {
    q: 'Do you offer cash on delivery in Pakistan?',
    a: 'Yes. Cash on delivery is available in all major cities of Pakistan, with delivery in 3 to 5 working days by Postex. You can also pay in advance by bank transfer, or collect from our Lahore outlet if you prefer.',
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
  title: 'Pure Himalayan Shilajit Resin | 71.8% Fulvic Acid, Lab Tested',
  description: 'Gold-grade Himalayan shilajit resin with 71.8% fulvic acid and 73.3% total humic extract. 8-stage purified, PCSIR and Eurofins tested, COD across Pakistan. From Rs 1,500 (10 g).',
  ogTitle: 'Pure Himalayan Shilajit Resin — Lab Tested, COD Across Pakistan',
  ogDescription: 'Gold-grade Himalayan shilajit resin with 71.8% fulvic acid, 73.3% total humic extract, 8-stage purification and PCSIR/Eurofins testing. COD across Pakistan.',
  ogImage: '/images/products/shilajit-resin-jar-30g-gold-lid.webp',
  ogType: 'product',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildProductJsonLd(product, {
        url: '/products/shilajit',
        images: galleryImages.value,
        skuPrefix: 'OA-SHILAJIT-RESIN',
                name: 'Pure Himalayan Shilajit Resin',
        description: 'Gold-grade Himalayan shilajit resin with 73.3% total humic extract (71.8% fulvic acid). 8-stage purification, lab tested. From 17,000 feet in Gilgit-Baltistan.',
        category: 'Dietary Supplement > Herbal Supplement',
        additionalProperties: [
          { name: 'Fulvic acid', value: '71.8%' },
          { name: 'Total humic extract', value: '73.3%' },
          { name: 'Source altitude', value: 'Above 17,000 ft' },
          { name: 'Purification', value: '8-stage organic cold process' },
          { name: 'Trace minerals', value: '85+' },
          { name: 'Batch', value: 'PCSIR OA-26-0408; Eurofins W25-AAAB-042' },
          { name: 'Serving size', value: '0.7 g' },
        ],
        returnWindowDays: 3,
        shippingDetails: {
          shippingRate: 250,
          handlingTime: { minValue: 0, maxValue: 1 },
          transitTime: { minValue: 3, maxValue: 5 },
          shippingCountries: ['PK', 'GB', 'US', 'CA', 'AU'],
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
