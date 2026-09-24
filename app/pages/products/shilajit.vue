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
              <div class="product-gallery-row">
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
                <div class="product-main-img">
                  <img :src="galleryImages[activeImage]" :alt="productTitle" />
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
              <div class="product-rating">
                <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>4.9 (200+ reviews)</span>
                <a href="#review-form" class="add-review-link">Add a Review</a>
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
          <div class="product-description tab-content">
            <p>Organic Aprico offers <strong>Pure shilajit</strong> from the Himalayan mountains of Gilgit-Baltistan, extracted at altitudes above <strong>17,000 feet</strong>. With a starting shilajit price of just <strong>1400 PKR</strong>, we provide original shilajit in Pakistan with lab testing from the USA and PCSIR Pakistan.</p>
            <p>Our Shilajit undergoes a four-step filtration process to ensure it is free from heavy metals and impurities while retaining <strong>73% fulvic acid</strong>, as verified by the lab tests given below.</p>
            <p>Since 1972, we've specialized in Gold-grade Himalayan shilajit, providing purely natural shilajit for improved health and vitality. Free from microbiological contaminants.</p>

            <h2>Pure Shilajit: Origin and Potency</h2>
            <p>Shilajit is a black, sticky substance found in the rocks of the Himalayan mountains, especially in Gilgit-Baltistan. This region produces the <strong>Best Shilajit in Pakistan</strong>, and Organic Aprico holds a government-issued license to extract Shilajit from this pristine area, which is widely demanded worldwide. It forms over centuries from the decomposition of plants in the Himalayan mountains. Research indicates that Shilajit extracted from 17,000 feet above sea level is the most potent gold-grade shilajit.</p>
            <p>Pure Shilajit contains over <strong>85 essential minerals</strong> and is rich in fulvic and humic acid, which boost strength, stamina, and vitality while aiding in tissue repair. You can read more about the origin and benefits of shilajit in our blog post.</p>
            <p>We ensure the purity of our original Shilajit through a meticulous four-step purification process and a <strong>40-day sun dehydration method</strong>, enhancing its potency. Celebrated for its energy-boosting, immunity-strengthening, and mind-enhancing properties, our Shilajit is available globally in grams and bulk Shilajit. With licenses for extraction and export, we guarantee smooth deliveries worldwide.</p>

            <h2>Shilajit Price in Pakistan 2026: A Market Overview</h2>
            <p>The price of original Shilajit in Pakistan varies based on its quality and level of purification. Many sellers lack the necessary production facilities, equipment, and expertise to purify Shilajit properly. Extracted from depths below 16,000 feet, their products often contain harmful sediments and heavy metals that pose serious risks to human health. Such unrefined Shilajit price in Pakistan is sold below 60,000 PKR in 2026, making it a dangerous choice for consumers.</p>
            <p>Organic Aprico offers premium gold-grade Aftabi Salajeet with a starting shilajit price per kg of <strong>80,000 PKR</strong>, ensuring superior quality and purity. With over 100000 satisfied customers worldwide, Organic Aprico sets a benchmark for excellence.</p>
            <p>Globally, Himalayan Shilajit is witnessing increased demand as a natural health supplement known for its mineral richness and benefits like enhanced energy, improved immunity, and better cognitive function. As consumers prioritize organic and pure products, the market for premium-quality Shilajit has expanded, supported by online platforms that make it readily available to a global audience. Choose wisely!</p>

            <h3>Latest Shilajit Price in Pakistan 2026:</h3>
            <ul>
              <li>Shilajit 10 Grams: 1400 PKR</li>
              <li>Shilajit Resin 20 Grams: 2700 PKR</li>
              <li>Shilajit 30 grams price in Pakistan: 4000 PKR</li>
              <li>Shilajit 50 grams: 6900 PKR</li>
              <li>Shilajit 100 Grams: 12900 PKR</li>
            </ul>

            <h2>How to get Himalayan Shilajit from Pakistan</h2>
            <p>Organic Aprico offers the best shilajit price in Pakistan, consisting of grade A quality, rich minerals, and high potency to ensure purity and affordability for your health needs. Dedicated to excellence, Organic Aprico provides Pure Himalayan shilajit backed by export and extraction license, company registration, and operational outlets in Skardu and Lahore. With an advanced ultra filtration and purification unit in Lahore Organic Village, we maintain strict quality and hygiene standards. You can conveniently buy shilajit by visiting our outlets. For international deliveries, certified shilajit analysis ensures authenticity, smooth customs clearance, and seamless worldwide shipping.</p>
            <p>Our commitment to delivering original shilajit has earned the trust of over <strong>100,000 satisfied clients</strong> who have improved their well-being by incorporating salajeet into their daily routines. From anywhere in the world, you can buy pure shilajit online at organicaprico.com or contact us at 03311116915. Purchase Shilajit Online effortlessly and take a step toward elevating your health journey with Organic Aprico.</p>

            <h2>Shilajit Benefits</h2>
            <ul>
              <li><strong>Anti-Ageing Properties</strong> — Pure Shilajit has anti-ageing properties. Shilajit is rich in fulvic acid. Pure shilajit is an antioxidant and anti-inflammatory compound that helps reduce cellular damage and ageing.</li>
              <li><strong>Promotes Testosterone Levels</strong> — Research has shown that Shilajit can increase testosterone levels in males by promoting the production of the hormone.</li>
              <li><strong>Controls Diabetes</strong> — Shilajit may improve glucose and lipid profiles, thus helping control blood sugar levels in diabetic patients.</li>
              <li><strong>Supports Fertility</strong> — Shilajit can increase sperm count and motility, supporting male fertility. It also promotes fertility in women and pregnancy by enhancing reproductive health, balancing hormones, and improving nutrient absorption.</li>
              <li><strong>Improves Metabolism</strong> — The fulvic acid in Shilajit enhances nutrient absorption, thereby improving overall metabolism.</li>
              <li><strong>Increases Muscle Mass</strong> — Shilajit supplementation can enhance muscle growth and recovery by improving physical performance and endurance.</li>
              <li><strong>Controls Hair Loss</strong> — Shilajit's nutrient-rich composition can strengthen hair and prevent hair loss by nourishing hair follicles.</li>
              <li><strong>Improves Hormones</strong> — Shilajit helps balance hormones by supporting endocrine function, which can stabilise mood and overall health.</li>
              <li><strong>Fights Cancer Cells</strong> — Studies suggest that Shilajit, due to its antioxidant properties, has the potential to inhibit the growth of cancer cells.</li>
              <li><strong>Promotes Heart Health</strong> — Shilajit can improve heart health by reducing lipid profiles and blood pressure and protecting the heart from damage.</li>
              <li><strong>Controls Cholesterol</strong> — Shilajit helps lower cholesterol levels, which can reduce the risk of heart disease.</li>
              <li><strong>Enhanced Strength</strong> — Regular use of Shilajit can enhance physical strength and endurance by improving mitochondrial function.</li>
              <li><strong>Detoxifies and Cleanses the Body</strong> — Salajeet acts as a detoxifier, helping to cleanse the body by removing toxins and heavy metals.</li>
              <li><strong>Improves Digestion</strong> — Salajeet can support digestive health by enhancing the gut microbiome and improving nutrient absorption.</li>
            </ul>

            <h2>Shilajit Benefits for Women</h2>
            <ul>
              <li><strong>Shilajit for Menstrual Pain Relief</strong> — Shilajit's anti-inflammatory properties may help reduce menstrual pain and discomfort.</li>
              <li><strong>Shilajit for Skin Health and Microperfusion</strong> — A recent clinical study examined how shilajit affects skin health and microcirculation in healthy women. The findings suggest that shilajit can improve skin health and promote better blood flow at the microvascular level.</li>
              <li><strong>Shilajit for Bone Health</strong> — Shilajit has the potential to support bone health in postmenopausal women. It helps reduce bone loss and the risk of fractures in ageing women.</li>
            </ul>

            <h2>Best Shilajit to Buy</h2>
            <p>Organic Aprico stands out in this market by offering top-tier, 100% Pure Himalayan Shilajit sourced directly from the Himalayan mountains of Gilgit Baltistan. Known for its commitment to quality, Organic Aprico ensures purity and authenticity by providing lab-tested Shilajit, and our original Shilajit price is moderate. With its focus on customer well-being and affordability, Organic Aprico Shilajit is the best choice for those seeking a trusted, effective Shilajit supplement to enhance their health naturally.</p>

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

            <h2>How to use Himalayan Shilajit</h2>
            <p>Organic Aprico Shilajit can be included in your daily routine. Due to its high purity, only a minimal amount is needed. Dissolve a pea-sized portion (approximately 700 mg) of Shilajit in lukewarm water, milk, herbal tea, or coffee to enjoy its numerous health benefits.</p>

            <h2>Money Back Guarantee</h2>
            <p>At Organic Aprico, client satisfaction is our top priority. Since 1972, we have consistently met our clients' expectations. However, in line with our commitment to quality, we provide the Best Shilajit in Pakistan and offer a money-back guarantee too. Whether you are a national or international client, if there is any issue, dissatisfaction, or mistake on our part, we will fully compensate you.</p>

            <p><strong>Ingredients:</strong> Shilajit Resin</p>
          </div>

          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'lab' }" @click="activeTab = 'lab'">Lab Reports</button>
            <button class="tab-btn" :class="{ active: activeTab === 'howto' }" @click="activeTab = 'howto'">How to Use</button>
          </div>
          <div v-if="activeTab === 'lab'" class="tab-content">
            <h2>Third-Party Lab Reports</h2>
            <p>Every batch of Organic Aprico shilajit is tested by independent laboratories. Below are the latest reports for our shilajit resin.</p>
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

      <section class="reviews-section" id="reviews">
        <div class="wrap">
          <div class="reviews-header">
            <h2>Customer Reviews</h2>
            <div class="reviews-summary">
              <div class="reviews-avg">
                <span class="avg-score">4.9</span>
                <div class="avg-stars">
                  <svg v-for="n in 5" :key="n" class="star filled" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="avg-count">Based on 200+ reviews</span>
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

const { count: cartCount, add: addToCart, openDrawer: openCart } = useCart()
const toast = useToast()

const product = PRODUCTS.find(p => p.key === 'resin')!
const productTitle = 'Pure Himalayan Shilajit Resin | Gold-Grade, Lab-Tested'

const selectedSize = ref(product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('lab')
const activeImage = ref(0)

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

const reviews = [
  { name: 'Ahmed Raza', rating: 5, date: '2 weeks ago', text: 'Absolutely genuine shilajit. I have been using it for 3 months now and the difference in my energy levels is remarkable. Highly recommend to anyone looking for real Himalayan shilajit.' },
  { name: 'Fatima Khan', rating: 5, date: '1 month ago', text: 'Bohat acha product hai. Main ne 30g jar liya hai aur results bilkul real hain. Subah khali pet leti hoon aur din bhar energy rehti hai. Packaging bhi bohat premium hai.' },
  { name: 'Usman Malik', rating: 4, date: '1 month ago', text: 'Good quality shilajit. Took about 2 weeks to notice results but now I feel more focused at work. The only reason for 4 stars is shipping took a bit longer than expected.' },
  { name: 'Ayesha Siddiqui', rating: 5, date: '2 months ago', text: 'Main ne pehle kai jagah se salajeet try kiya tha par Organic Aprico ka asal hai. Taste natural hai aur lab reports bhi diye hain. Ye company trustworthy hai.' },
  { name: 'Bilal Hussain', rating: 5, date: '2 months ago', text: 'Best shilajit in Pakistan, no doubt. I am a gym person and this has significantly improved my recovery time. The 50g jar lasts about 2 months.' },
  { name: 'Zainab Ali', rating: 4, date: '3 months ago', text: 'Started using this for my hair fall and overall wellness. After 6 weeks I noticed less hair fall and better skin. Will order again inshaAllah.' },
  { name: 'Hassan Javed', rating: 5, date: '3 months ago', text: 'Shilajit quality is outstanding. Dissolves easily in warm milk. My father has been using it for joint pain and he says it helps a lot. Will definitely buy again.' },
  { name: 'Maryam Noor', rating: 5, date: '4 months ago', text: 'I was skeptical at first but after reading the lab reports and seeing the batch code, I decided to try it. So glad I did! My stamina has improved noticeably.' },
  { name: 'Tariq Mehmood', rating: 5, date: '5 months ago', text: 'Saste aur asli dono milte hain is jagah. 10g se start kiya tha ab 50g order kar raha hoon. Customer service bhi bohat friendly hai WhatsApp pe.' },
  { name: 'Sana Iqbal', rating: 4, date: '6 months ago', text: 'Very pure and authentic product. Love that they provide full lab reports. The taste is strong but that is how real shilajit should taste. Recommended!' },
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
  ogImage: '/images/products/shilajit-resin-jar-spoon.jpg',
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
        image: '/images/products/shilajit-resin-jar-spoon.jpg',
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
