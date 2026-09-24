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
                <span>5.0 (Wholesale partners)</span>
                <a href="#review-form" class="add-review-link">Add a Review</a>
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
          <div class="product-description tab-content">
            <p><strong>Pure Himalayan Shilajit Wholesale Organic Aprico</strong><br />The World's Most Trusted Source for Bulk &amp; Wholesale Shilajit Resin</p>
            <p>If you are looking to source pure, authentic Himalayan Shilajit at wholesale prices, Organic Aprico offers a reliable and direct supply. We provide high-potency, lab-tested Shilajit resin sourced from the Himalayan mountains of Gilgit Baltistan and deliver it to customers across the world, especially in the UK, USA, Europe, and the Middle East.</p>
            <p>Organic Aprico is not a middleman and not a reseller. We are the true source where you find authentic Shilajit. From the mountains to your hands, we bring you pure and original Shilajit. Through Organic Aprico, we share the power of nature's black gold with the world.</p>
            <p>As the only native extractor, producer, and exporter of Himalayan Shilajit in Pakistan, every gram of resin we supply comes directly from our own extraction operations. The Shilajit is purified in our own facility, tested by international laboratories, and shipped with complete documentation to ensure quality, purity, and authenticity for our global partners.</p>

            <h2>Why Retailers and Distributors Choose Organic Aprico?</h2>

            <h3>Gold Grade: 73% High Fulvic Acid</h3>
            <p>Our Shilajit is Gold Grade because it consistently delivers 73% fulvic acid, independently lab tested with every single batch. The high fulvic acid content is responsible for enhancing Shilajit's health benefits and improving its bioavailability in the body.</p>
            <p>Gold Grade Shilajit refers to high-potency Shilajit extracted from high-altitude gold-grade rocks in the Himalayan region. Each batch is carefully processed and tested to ensure purity, strength, and authenticity, allowing every customer to experience genuine and reliable results.</p>

            <h3>84+ Natural Minerals</h3>
            <p>Our Shilajit is extracted from high altitudes above 17,000 feet in the Himalayas. It contains a naturally rich profile of more than 84 essential trace minerals that the human body needs for daily functioning.</p>
            <p>Modern diets often lack sufficient minerals due to soil depletion and processed foods. Consuming Himalayan Shilajit can help restore these vital minerals and support overall health.</p>

            <h3>Free from Heavy Metals, Toxins, and Microbes</h3>
            <p>Every batch of Shilajit from Organic Aprico is independently tested and verified to be free from germs, heavy metals, aflatoxins, harmful microorganisms, and chemical residues. This is not just a claim; laboratory reports are available for every client to review.</p>

            <h3>RO Water Purification Throughout</h3>
            <p>At every stage of our purification process, we use Reverse Osmosis purified water to maintain the highest level of purity. This ensures that no external contaminants enter the Shilajit during processing.</p>

            <h3>Third-Party Lab Tested</h3>
            <p>Every batch of Shilajit undergoes strict laboratory testing to ensure purity, safety, and quality. The resin is tested at the Pakistan Council of Scientific and Industrial Research (PCSIR) as well as trusted international laboratories such as Eurofins and Micro Quality Lab in California, USA.</p>

            <h3>Transparency and Traceability</h3>
            <p>Each batch of Shilajit is assigned a unique batch number to ensure authenticity and complete traceability. This batch number is clearly imprinted on every jar, allowing customers to track the origin and quality of the product.</p>
            <p>Every Organic Aprico Shilajit product has a printed Batch Number and QR Code directly on the packaging Box so you can verify exactly what is inside before you consume it. Simply scan the QR Code on your packaging to instantly access the full lab report, purification details, and verification certificate linked to your specific batch.</p>

            <h3>Pakistan's Exclusive Ultra Filtration and Purification Plant</h3>
            <p>Organic Aprico operates Pakistan's only dedicated Shilajit ultra-filtration and purification plant, giving us complete control over quality, consistency, and supply. Our Shilajit undergoes an advanced 8-step ultra-filtration, sun-drying, and purification process. The resin is purified without the use of chemicals, relying instead on modern techniques such as UV treatment and ozonation to remove impurities while protecting its natural composition.</p>
            <p>After purification, the Shilajit is naturally sun dried for more than 40 days. This slow and careful process helps preserve its effectiveness, purity, and natural potency.</p>

            <h3>Consistent and Reliable Global Supply</h3>
            <p>Because we manage every stage from the mountains to the market, we are able to maintain a consistent and reliable year round supply of premium Shilajit resin. This direct control over sourcing, purification, and production ensures stability in both quality and availability.</p>

            <h2>Ready to Partner With Us?</h2>
            <p>Whether you are a UK retailer, US distributor, European wellness brand, Middle Eastern importer, or global reseller, Organic Aprico is your trusted source for the best Shilajit in the world at wholesale prices.</p>
            <p>Contact our wholesale and export team today for samples, pricing, lab reports, and partnership inquiries.<br /><strong>CALL OR WHATSAPP: +92 331 11116915</strong><br />info@organicaprico.com</p>
          </div>

          <div class="tabs-nav">
            <button class="tab-btn" :class="{ active: activeTab === 'pricing' }" @click="activeTab = 'pricing'">Wholesale Pricing</button>
            <button class="tab-btn" :class="{ active: activeTab === 'quality' }" @click="activeTab = 'quality'">Quality &amp; Certifications</button>
            <button class="tab-btn" :class="{ active: activeTab === 'faq' }" @click="activeTab = 'faq'">FAQ</button>
          </div>

          <div v-if="activeTab === 'pricing'" class="tab-content">
            <h2>Wholesale Shilajit Pricing 2026</h2>
            <table class="wholesale-table">
              <thead><tr><th>Quantity</th><th>PKR</th><th>USD</th></tr></thead>
              <tbody>
                <tr><td>1 kg</td><td class="highlight">95,000 PKR</td><td>$305</td></tr>
                <tr><td>10 kg</td><td>On Request</td><td>On Request</td></tr>
                <tr><td>100 kg</td><td>On Request</td><td>On Request</td></tr>
              </tbody>
            </table>
            <p>Contact our dedicated wholesale team for tailored quotes in USD, GBP, or EUR.</p>

            <div style="margin-top: 2rem;">
              <img src="/images/products/wholesale-pricing.png" alt="Wholesale pricing overview" style="max-width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>
          </div>

          <div v-if="activeTab === 'quality'" class="tab-content">
            <h2>Quality &amp; Certifications</h2>

            <h3>Eurofins Lab Analysis Summary</h3>
            <table class="wholesale-table">
              <thead><tr><th>Category</th><th>Component</th><th>Result</th><th>Unit</th></tr></thead>
              <tbody>
                <tr><td>Heavy Metal</td><td>Lead (Pb)</td><td class="highlight">0.260</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Cadmium (Cd)</td><td class="highlight">0.009</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Arsenic (As)</td><td class="highlight">0.132</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Mercury (Hg)</td><td class="highlight">&lt;0.005</td><td>mg/kg</td></tr>
                <tr><td>Composition</td><td>Dry Matter</td><td class="highlight">89.1</td><td>%</td></tr>
                <tr><td>Composition</td><td>Fulvic Acid</td><td class="highlight">71.8</td><td>% DM</td></tr>
                <tr><td>Composition</td><td>Humic Acid</td><td class="highlight">1.5</td><td>% DM</td></tr>
                <tr><td>Composition</td><td>Total Humic Extract</td><td class="highlight">73.3</td><td>% DM</td></tr>
              </tbody>
            </table>
            <p class="caption">Brand: Organic Aprico, Laboratory: Eurofins Food Testing UK Ltd, BATCH NO: OA-0307-25, Analysis Date: September 2025</p>

            <h3>PCSIR Microbiological Test Report Summary</h3>
            <table class="wholesale-table">
              <thead><tr><th>Category</th><th>Parameter</th><th>Result</th><th>Unit</th></tr></thead>
              <tbody>
                <tr><td>Microbiology</td><td>Total Plate Count</td><td class="highlight">&lt;10</td><td>cfu/g</td></tr>
                <tr><td>Microbiology</td><td>Total Coliforms</td><td class="highlight">Not Detected</td><td>MPN/g</td></tr>
                <tr><td>Microbiology</td><td>Fecal Coliforms</td><td class="highlight">Not Detected</td><td>MPN/g</td></tr>
                <tr><td>Microbiology</td><td>E. coli</td><td class="highlight">Not Detected</td><td>MPN/g</td></tr>
                <tr><td>Microbiology</td><td>Salmonella spp.</td><td class="highlight">Absent</td><td>per 25 g</td></tr>
                <tr><td>Microbiology</td><td>Staphylococcus aureus</td><td class="highlight">Not Detected</td><td>cfu/g</td></tr>
                <tr><td>Microbiology</td><td>Yeast &amp; Mold Count</td><td class="highlight">&lt;10</td><td>cfu/g</td></tr>
              </tbody>
            </table>

            <h3>PCSIR Heavy Metal Analysis Summary</h3>
            <table class="wholesale-table">
              <thead><tr><th>Category</th><th>Component</th><th>Result</th><th>Unit</th></tr></thead>
              <tbody>
                <tr><td>Heavy Metal</td><td>Lead (Pb)</td><td class="highlight">Not Detected</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Cadmium (Cd)</td><td class="highlight">Not Detected</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Arsenic (As)</td><td class="highlight">Not Detected</td><td>mg/kg</td></tr>
                <tr><td>Heavy Metal</td><td>Mercury (Hg)</td><td class="highlight">Not Detected</td><td>mg/kg</td></tr>
              </tbody>
            </table>

            <div class="cert-grid" style="margin: 1.5rem 0;">
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

            <h3>Lab Reports</h3>
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

            <h2>Our Purification Process: The How and Why Behind Every Step</h2>

            <h3>Step 1: Extraction Above 18000 Feet</h3>
            <p><strong>How:</strong> Raw Shilajit is carefully hand-harvested from the Himalayan mountains of Gilgit Baltistan at altitudes above 18000 feet.</p>
            <p><strong>Why:</strong> Altitude plays a critical role in Shilajit quality. At extreme heights, the natural geological pressure and mineral-rich environment help form resin with higher fulvic acid and mineral content. These remote areas are also free from industrial pollution and agricultural chemicals.</p>

            <h3>Step 2: Initial Natural Cleaning</h3>
            <p><strong>How:</strong> After collection, the raw Shilajit is carefully cleaned to remove visible stones, sand, and surface debris before further processing.</p>
            <p><strong>Why:</strong> This step ensures that large impurities are removed at the earliest stage.</p>

            <h3>Step 3: Filtration Using RO Water and Glacier Water</h3>
            <p><strong>How:</strong> The raw resin is slowly filtered using a combination of Reverse Osmosis purified water and natural glacier water through repeated filtration cycles.</p>
            <p><strong>Why:</strong> RO water prevents external contaminants from entering the process, while glacier water supports the natural mineral balance of the resin.</p>

            <h3>Step 4: Triphala Soaking for Natural Heavy Metal Removal</h3>
            <p><strong>How:</strong> The filtered Shilajit is soaked in RO-purified water mixed with Triphala for several days before the next stage of purification.</p>
            <p><strong>Why:</strong> Triphala is a traditional Ayurvedic blend of three powerful herbs known for its natural detoxifying ability. It helps bind and draw out heavy metals such as lead, arsenic, and mercury from the resin without the use of chemicals.</p>

            <h3>Step 5: Ultra Filtration and Deep Purification</h3>
            <p><strong>How:</strong> The resin is processed through our advanced ultra-filtration and purification system to remove microscopic particles and remaining impurities.</p>
            <p><strong>Why:</strong> This step refines the resin to a higher level of purity by separating unwanted particles that cannot be removed through simple filtration.</p>

            <h3>Step 6: UV Treatment and Ozonation</h3>
            <p><strong>How:</strong> The purified Shilajit undergoes ultraviolet light treatment followed by controlled ozonation at our purification facility.</p>
            <p><strong>Why:</strong> UV treatment destroys harmful microbes such as bacteria and fungi without the use of chemicals or heat. Ozonation then helps neutralize remaining contaminants and trace impurities at a molecular level.</p>

            <h3>Step 7: Natural Sun Drying for 40 Days</h3>
            <p><strong>How:</strong> The purified resin is placed in stainless steel containers and naturally dried under sunlight for more than 40 days.</p>
            <p><strong>Why:</strong> Natural sun drying allows the resin to slowly reach its ideal moisture level while preserving its full mineral profile. Artificial heating can damage fulvic acid and reduce potency.</p>

            <h3>Step 8: Independent Lab Testing and Batch Certification</h3>
            <p><strong>How:</strong> Each finished batch is sent to trusted laboratories for independent testing and is assigned a unique batch number printed on every jar.</p>
            <p><strong>Why:</strong> Third-party testing verifies that the Shilajit is free from heavy metals, microbes, and harmful impurities. The batch number ensures complete traceability.</p>

            <h3>Purification Process Visual</h3>
            <div style="margin-top: 1.5rem;">
              <img src="/images/products/wholesale-purification.png" alt="Shilajit purification process" style="width: 100%; border: 1px solid var(--line);" loading="lazy" />
            </div>

            <h2>Global Recognition and Certifications</h2>
            <p>Organic Aprico proudly holds internationally recognized certifications, including HACCP, GMP, ISO 9001, ISO 22000, and Halal certification. These certifications reflect our strong commitment to quality, safety, hygiene, and world-class production standards.</p>
            <p>With a legacy that traces back to 1972, Organic Aprico has built a reputation of trust and reliability in the natural wellness industry. Today, the brand serves more than 1 million satisfied customers and supplies premium Shilajit to over 20 international brands across the world.</p>
            <p><strong>ORGANIC APRICO IS THE BEST SHILAJIT BRAND IN THE WORLD.</strong></p>
            <p>For complete transparency, full lab reports, certification documents, and company registration papers are provided to all wholesale and export clients.</p>
          </div>

          <div v-if="activeTab === 'faq'" class="tab-content">
            <h2>Wholesale Shilajit FAQ</h2>

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

      <section class="reviews-section" id="reviews">
        <div class="wrap">
          <div class="reviews-header">
            <h2>Customer Reviews</h2>
            <div class="reviews-summary">
              <div class="reviews-avg">
                <span class="avg-score">5.0</span>
                <div class="avg-stars">
                  <svg v-for="n in 5" :key="n" class="star filled" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span class="avg-count">Based on 50+ reviews</span>
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

const product = PRODUCTS.find(p => p.key === 'wholesale')!
const productTitle = 'Pure Himalayan Shilajit Resin Wholesale | Organic Aprico'

const selectedSize = ref(product.sizes[0].id)
const qty = ref(1)
const justAdded = ref(false)
const activeTab = ref('pricing')
const activeImage = ref(0)
const openFaq = ref<number | null>(null)

function prevImage() {
  activeImage.value = (activeImage.value - 1 + galleryImages.length) % galleryImages.length
}
function nextImage() {
  activeImage.value = (activeImage.value + 1) % galleryImages.length
}

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

const galleryImages = [
  '/images/products/wholesale-hero.jpg',
  '/images/products/wholesale-packing-1.jpg',
  '/images/products/wholesale-packing-2.jpg',
]

const reviews = [
  { name: 'James Walker', rating: 5, date: '2 weeks ago', text: 'We have been sourcing wholesale shilajit from Organic Aprico for our UK store for over a year. Consistent quality, excellent documentation, and reliable shipping. Our customers love the product.' },
  { name: 'Saud Al-Rashid', rating: 5, date: '1 month ago', text: 'Ordered 10kg for our distribution business in Dubai. Product quality exceeded expectations. Full lab reports provided with every shipment. Will definitely order again.' },
  { name: 'David Chen', rating: 5, date: '1 month ago', text: 'As a supplement brand owner in the US, finding a reliable shilajit supplier was challenging until we found Organic Aprico. Their private label service is excellent and the product tests perfectly every time.' },
  { name: 'Ahmed Al-Farsi', rating: 4, date: '2 months ago', text: 'Very professional operation. We ordered 5kg for our wellness center in Bahrain. The batch traceability system with QR codes is a great touch. Shipping took slightly longer than expected but product was perfect.' },
  { name: 'Sarah Johnson', rating: 5, date: '3 months ago', text: 'We tested samples from 5 different suppliers before choosing Organic Aprico. Their fulvic acid content was consistently the highest at 73%. Lab reports from Eurofins and PCSIR gave us complete confidence.' },
  { name: 'Muhammad Farooq', rating: 5, date: '3 months ago', text: 'Hum Pakistan mein retail kar rahe hain Organic Aprico ka shilajit. Customers bohat khush hain quality se. Wholesale price bhi reasonable hai aur delivery time consistent hai.' },
  { name: 'Michael Brown', rating: 5, date: '4 months ago', text: 'We have been retailing Organic Aprico shilajit in Australia for 18 months. Zero complaints, excellent margins, and their customer support team is always responsive. Highly recommend for wholesale buyers.' },
  { name: 'Fatima Zahra', rating: 4, date: '5 months ago', text: 'We ordered private label packaging for our European market. The quality of both the product and packaging was excellent. Minor delay in production but communication was clear throughout.' },
  { name: 'Robert Taylor', rating: 5, date: '5 months ago', text: 'Outstanding wholesale supplier. The documentation package (CoA, export certificates, lab reports) makes customs clearance seamless. We have placed 8 orders so far and every one has been perfect.' },
  { name: 'Omar Hassan', rating: 5, date: '6 months ago', text: 'Best wholesale shilajit in the market. We compared with Indian and Nepalese suppliers and Organic Aprico is far superior in quality and consistency. Their 8-step purification process is real, not just marketing.' },
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

const faqs = [
  { q: 'What is Shilajit, and why is it so popular?', a: 'Shilajit is a natural resin that forms over centuries in the rocks of the Himalayan mountains. It is created from the slow decomposition of plants and organic matter under intense geological pressure. Rich in fulvic acid, humic acid, and over 84 essential minerals, Shilajit is one of the most nutrient-dense natural substances on Earth.' },
  { q: 'Why is Himalayan Shilajit better than other sources?', a: 'Shilajit from the Himalayas, especially Gilgit Baltistan in Pakistan, is unique. The high altitude, pure environment, and centuries of natural freezing and melting create Shilajit with higher fulvic acid and a richer mineral profile than Shilajit from other regions.' },
  { q: 'What is Fulvic Acid and why does it matter?', a: 'Fulvic acid is the key active compound in authentic Shilajit that makes it so effective. It helps transport minerals and nutrients directly into your cells, making them easier for your body to absorb. Organic Aprico Shilajit contains 73% fulvic acid, known as Gold Grade.' },
  { q: 'What is the difference between raw Shilajit and purified Shilajit?', a: 'Raw Shilajit is collected directly from the mountains and contains impurities such as heavy metals, dirt, bacteria, and fungi, making it unsafe to consume. Purified Shilajit is carefully processed to remove all contaminants while preserving its natural beneficial compounds.' },
  { q: 'Why should I source Shilajit wholesale from Organic Aprico?', a: 'We are the producer and the authentic source of purified Shilajit, not a reseller. We extract Shilajit directly from the Himalayan mountains, purify it in our own dedicated facility, and export it straight to global clients. This ensures better pricing, consistent quality, full traceability, and complete documentation without any middlemen.' },
  { q: 'Can I request a sample before placing a wholesale order?', a: 'Yes, we encourage all new wholesale and export partners to request a sample before placing a full order. You can contact our wholesale team to arrange the sample, which comes with full lab reports and certification documents.' },
  { q: 'Does Organic Aprico offer private label and custom packaging?', a: 'Yes, Organic Aprico provides full private label solutions, allowing you to sell our premium Shilajit under your own brand. We offer a wide range of export-quality packaging.' },
  { q: 'What is the minimum order quantity for wholesale?', a: 'Our wholesale pricing starts from 1 kilogram. For larger orders, from 1 kilogram up to 1000 kilograms, or for custom quantities, please contact our export team.' },
  { q: 'Do you ship wholesale Shilajit to the UK?', a: 'Yes. Organic Aprico ships Shilajit directly to the UK from our facility in Pakistan. After order confirmation, delivery to the UK usually takes 10 to 14 working days.' },
  { q: 'Do you ship to the USA and other countries?', a: 'Yes. We ship to the USA, Europe, the Middle East, Australia, Canada, and many other countries worldwide.' },
  { q: 'Who handles customs and export documentation?', a: 'Organic Aprico manages the entire export documentation process. We prepare all required documents, including customs declarations, export certificates, health certificates, lab reports, and international certifications.' },
  { q: 'What payment methods do you accept for wholesale orders?', a: 'We accept direct bank transfer, Payoneer, Wise, and Western Union for wholesale orders. Full payment is required in advance once the order is confirmed.' },
  { q: 'How do I verify the purity of the Shilajit I receive?', a: 'Every batch comes with nationally and internationally tested reports, including analysis from PCSIR and independent third-party laboratories such as Micro Quality Lab in California and Eurofins.' },
  { q: 'Why do you use RO water throughout your purification process?', a: 'Reverse Osmosis water is highly purified and free from dissolved minerals, chemicals, and contaminants found in ordinary water. Using RO water ensures that no impurities from the water affect the quality of the resin.' },
  { q: 'Why does Organic Aprico use Triphala in the purification process?', a: 'Triphala is a traditional Ayurvedic blend known for its natural ability to bind and remove heavy metals. Using Triphala during the soaking stage helps draw out contaminants without the use of synthetic chemicals.' },
  { q: 'Is your Shilajit safe for long-term daily use?', a: 'Yes. Organic Aprico Shilajit is independently tested and verified to be free from heavy metals, aflatoxins, bacteria, fungus, and other contaminants. It is produced under internationally recognized standards, including ISO 9001, ISO 22000, GMP, Halal, and HACCP.' },
  { q: 'Has your Shilajit been tested for aflatoxins?', a: 'Yes. Every batch is tested for aflatoxins as part of our standard laboratory analysis, and the results confirm zero aflatoxin presence.' },
  { q: 'What certifications does Organic Aprico hold?', a: 'ISO 9001, ISO 22000, GMP, Halal, and HACCP certifications.' },
  { q: 'Is Shilajit a good product to sell as a retailer?', a: 'Yes, Shilajit in 2026 is a good product for retailers. The demand for natural health supplements is growing around the world, and lab-tested Shilajit is becoming very popular in markets such as the UK, USA, and the Middle East.' },
  { q: 'Can I sell Organic Aprico Shilajit under my own brand?', a: 'Yes. You can sell our premium Himalayan Shilajit under your own brand. Organic Aprico takes care of the extraction, purification, testing, and packaging.' },
  { q: 'What marketing support do you provide to wholesale clients?', a: 'We provide all wholesale clients with full lab reports, certification documents, product information, and details of our purification process.' },
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
