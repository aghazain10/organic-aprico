<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main>
      <section class="cert-hero">
        <div class="wrap">
          <NuxtLink to="/" class="back-link">&larr; Back to home</NuxtLink>
          <h1>Certifications &amp; Lab Reports</h1>
          <p class="lede">Every batch is tested by independent labs and certified to international standards. Full transparency, no exceptions.</p>
          <div class="hero-actions">
            <a
              href="/images/gmp-haccp-halal-certificates.pdf"
              class="btn btn-gold"
              target="_blank"
              rel="noopener"
            >
              Download Certificates (PDF)
            </a>
            <a
              href="/images/lab-reports.pdf"
              class="btn btn-ghost"
              target="_blank"
              rel="noopener"
            >
              Download Lab Reports (PDF)
            </a>
          </div>
        </div>
      </section>

      <!-- Company Registration -->
      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <h2>Company Registration</h2>
            <p>Licensed and registered for extraction and export of Himalayan shilajit.</p>
          </div>
          <div class="cert-hero-image clickable" @click="openLightbox('/images/certifications/company-registration.jpg', 'Organic Aprico company registration certificates')">
            <img
              src="/images/certifications/company-registration.jpg"
              alt="Organic Aprico company registration certificates from Pakistan and UK"
              loading="lazy"
              width="900"
              height="600"
            >
            <span class="zoom-hint" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            </span>
          </div>
        </div>
      </section>

      <!-- Certifications -->
      <section class="section section-tint">
        <div class="wrap">
          <div class="section-head">
            <h2>International Certifications</h2>
            <p>GMP, HACCP and Halal certified — meeting the highest standards of manufacturing, food safety and religious compliance.</p>
          </div>
          <div class="cert-grid">
            <div v-for="cert in certifications" :key="cert.name" class="cert-card">
              <div class="cert-image clickable" @click="openLightbox(cert.image, cert.alt)">
                <img
                  :src="cert.image"
                  :alt="cert.alt"
                  loading="lazy"
                  width="600"
                  height="420"
                >
                <span class="zoom-hint" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                </span>
              </div>
              <div class="cert-info">
                <h3>{{ cert.name }}</h3>
                <p>{{ cert.description }}</p>
                <ul class="cert-details">
                  <li v-for="detail in cert.details" :key="detail">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lab Reports -->
      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <h2>Independent Lab Reports</h2>
            <p>Tested by Micro Quality Lab (California), PCSIR (Lahore) and Eurofins (International). Every result is independently verified.</p>
          </div>
          <div class="lab-grid">
            <div v-for="report in labReports" :key="report.name" class="lab-card">
              <div class="lab-image clickable" @click="openLightbox(report.image, report.alt)">
                <img
                  :src="report.image"
                  :alt="report.alt"
                  loading="lazy"
                  width="600"
                  height="420"
                >
                <span class="zoom-hint" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                </span>
              </div>
              <div class="lab-info">
                <span class="lab-badge">{{ report.lab }}</span>
                <h3>{{ report.name }}</h3>
                <p>{{ report.description }}</p>
                <div class="lab-result">
                  <span class="result-label">Result</span>
                  <span class="result-value">{{ report.result }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Summary -->
      <section class="section section-tint">
        <div class="wrap cert-summary">
          <div class="summary-head">
            <h2>What this means for you</h2>
            <p>Every jar of Organic Aprico shilajit comes with proof.</p>
          </div>
          <div class="summary-grid">
            <div v-for="item in summary" :key="item.title" class="summary-card">
              <span class="summary-icon" v-html="item.icon" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section">
        <div class="wrap cert-cta">
          <h2>Convinced by the proof?</h2>
          <p>Lab tested. Certified. Guaranteed.</p>
          <div class="cert-cta-actions">
            <NuxtLink to="/#products" class="btn btn-gold">Shop shilajit</NuxtLink>
            <NuxtLink to="/purification" class="btn btn-ghost">See our purification process</NuxtLink>
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
          <img :src="lightbox.src" :alt="lightbox.alt">
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { count: cartCount, openDrawer: openCart } = useCart()

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

const certifications = [
  {
    name: 'GMP Certification',
    image: '/images/certifications/gmp.jpg',
    alt: 'GMP certificate of Organic Aprico',
    description: 'Good Manufacturing Practice certification ensures every stage of production — from raw material handling to final packaging — meets strict quality and safety standards.',
    details: [
      'ISO-based manufacturing standards',
      'Documented quality control procedures',
      'Regular internal and external audits',
      'Full traceability of every batch',
    ],
  },
  {
    name: 'HACCP Certification',
    image: '/images/certifications/haccp.jpg',
    alt: 'HACCP certificate of Organic Aprico',
    description: 'Hazard Analysis and Critical Control Points certification identifies and controls potential food safety hazards at every stage of the production process.',
    details: [
      'Systematic hazard analysis',
      'Critical control points monitored',
      'Preventive measures for biological, chemical and physical hazards',
      'Validated by independent auditors',
    ],
  },
  {
    name: 'Halal Certification',
    image: '/images/certifications/halal.jpg',
    alt: 'Halal certificate of Organic Aprico',
    description: 'Halal certified by a recognized authority, confirming the product complies with Islamic dietary laws and is permissible for consumption.',
    details: [
      'No alcohol or prohibited substances used',
      'Clean processing environment',
      'Approved by certified Halal body',
      'Valid and up to date',
    ],
  },
]

const labReports = [
  {
    name: 'Fulvic Acid Content',
    lab: 'Eurofins',
    image: '/images/lab-reports/eurofins-fulvic-acid.jpg',
    alt: 'Eurofins lab report showing 73% fulvic acid',
    description: 'Independent verification of fulvic acid concentration — the primary active compound in shilajit that drives its health benefits.',
    result: '73% fulvic acid',
  },
  {
    name: 'Fulvic Acid — California',
    lab: 'Micro Quality Lab',
    image: '/images/lab-reports/micro-quality-fulvic-acid.jpg',
    alt: 'Micro Quality Labs California report showing 73% fulvic acid',
    description: 'Second independent confirmation from a US-based laboratory, ensuring the fulvic acid content is consistent across tests.',
    result: '73% fulvic acid',
  },
  {
    name: 'Heavy Metals Test',
    lab: 'PCSIR Lahore',
    image: '/images/lab-reports/pcsir-heavy-metals.jpg',
    alt: 'PCSIR lab report showing no heavy metals detected',
    description: 'Tests for lead, mercury, arsenic and cadmium. Our shilajit is free from dangerous heavy metals — a common problem with unprocessed alternatives.',
    result: 'Not detected',
  },
  {
    name: 'Microbiological Test',
    lab: 'PCSIR Lahore',
    image: '/images/lab-reports/pcsir-microbiological.jpg',
    alt: 'PCSIR lab report showing microbiological test passed',
    description: 'Tests for total plate count, yeast, mould and pathogenic bacteria. Confirms our product is clean and safe for consumption.',
    result: 'Within safe limits',
  },
  {
    name: 'Aflatoxin Test',
    lab: 'PCSIR Lahore',
    image: '/images/lab-reports/pcsir-aflatoxin.jpg',
    alt: 'PCSIR lab report showing aflatoxin test passed',
    description: 'Aflatoxins are toxic compounds produced by certain moulds. Our sun-dried process and strict quality controls ensure zero aflatoxin contamination.',
    result: 'Not detected',
  },
]

const summary = [
  {
    title: 'Every batch tested',
    desc: 'No batch leaves our facility without passing all lab tests.',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9CD84" stroke-width="1.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
  },
  {
    title: 'Multiple labs',
    desc: 'Results verified by labs in California, Lahore and internationally.',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9CD84" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  },
  {
    title: 'Full transparency',
    desc: 'Download any certificate or lab report — nothing hidden.',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9CD84" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  },
  {
    title: 'Certified standards',
    desc: 'ISO, GMP, HACCP and Halal — internationally recognized.',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9CD84" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  },
]

useSeoMeta({
  title: 'Certifications & Lab Reports | Organic Aprico',
  description: 'View GMP, HACCP and Halal certifications plus independent lab reports from Micro Quality Lab California, PCSIR Lahore and Eurofins. 73% fulvic acid verified.',
  ogTitle: 'Certifications & Lab Reports — Organic Aprico',
  ogDescription: 'GMP, HACCP, Halal certified. Lab tested by Micro Quality Lab, PCSIR and Eurofins. 73% fulvic acid, zero heavy metals.',
})
</script>

<style scoped>
.cert-hero {
  padding: clamp(100px, 14vw, 140px) 0 clamp(32px, 5vw, 60px);
}
.back-link {
  display: inline-block;
  color: var(--stone);
  font-size: .95rem;
  margin-bottom: 2rem;
}
.back-link:hover { color: var(--gold-bright); }
.cert-hero h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.06;
  max-width: 16ch;
  margin-bottom: 1.2rem;
}
.lede { color: var(--stone); font-size: 1.1rem; max-width: 54ch; margin-bottom: 2rem; }
.hero-actions { display: flex; gap: .85rem; flex-wrap: wrap; }

.cert-hero-image {
  border: 1px solid var(--line);
  overflow: hidden;
  max-width: 900px;
}
.cert-hero-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.cert-grid {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
}
.cert-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 3rem);
  border: 1px solid var(--line);
  overflow: hidden;
  align-items: start;
}
.cert-card:nth-child(even) { direction: rtl; }
.cert-card:nth-child(even) > * { direction: ltr; }

.cert-image {
  background: #0a0805;
  display: grid;
  place-items: center;
}
.cert-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.cert-info {
  padding: 2rem 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cert-card:nth-child(even) .cert-info { padding: 2rem 0 2rem 2rem; }

.cert-info h3 {
  font-size: 1.5rem;
}
.cert-info p { color: var(--stone); font-size: .98rem; line-height: 1.6; }

.cert-details {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .4rem;
}
.cert-details li {
  padding-left: 1.2rem;
  position: relative;
  color: var(--cream);
  font-size: .95rem;
}
.cert-details li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .6em;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
}

.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
}
.lab-card {
  border: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(23,20,14,.6), rgba(7,6,4,0) 60%);
}
.lab-image {
  background: #0a0805;
  border-bottom: 1px solid var(--line-soft);
}
.lab-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  aspect-ratio: 4/3;
}
.lab-info {
  padding: 1.4rem 1.5rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: .6rem;
  flex: 1;
}
.lab-badge {
  display: inline-block;
  padding: .2rem .6rem;
  border: 1px solid var(--line);
  color: var(--gold);
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .03em;
  text-transform: uppercase;
  width: fit-content;
}
.lab-info h3 { font-size: 1.2rem; }
.lab-info p { color: var(--stone); font-size: .92rem; line-height: 1.55; flex: 1; }

.lab-result {
  margin-top: .5rem;
  display: flex;
  align-items: center;
  gap: .8rem;
  padding: .7rem 1rem;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(201,162,74,.06), rgba(201,162,74,0));
}
.result-label { color: var(--stone); font-size: .85rem; }
.result-value {
  font-weight: 600;
  color: var(--gold-bright);
  font-size: 1rem;
}

.cert-summary {
  text-align: center;
}
.summary-head h2 { margin-bottom: .8rem; }
.summary-head p { color: var(--stone); margin-bottom: 2.5rem; font-size: 1.05rem; }
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  text-align: center;
}
.summary-card {
  padding: 2rem 1.5rem;
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .8rem;
  background: linear-gradient(180deg, rgba(201,162,74,.04), rgba(201,162,74,0));
}
.summary-icon { display: flex; }
.summary-card h3 { font-size: 1.1rem; }
.summary-card p { color: var(--stone); font-size: .92rem; line-height: 1.5; }

.cert-cta {
  text-align: center;
}
.cert-cta h2 { margin-bottom: .8rem; }
.cert-cta p { color: var(--stone); margin-bottom: 1.5rem; font-size: 1.05rem; }
.cert-cta-actions { display: flex; gap: .85rem; justify-content: center; flex-wrap: wrap; }

/* Clickable images + zoom hint */
.clickable {
  cursor: pointer;
  position: relative;
}
.zoom-hint {
  position: absolute;
  bottom: .75rem;
  right: .75rem;
  width: 2.2rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  background: rgba(7, 6, 4, .75);
  border: 1px solid rgba(201, 162, 74, .3);
  color: var(--gold-bright);
  opacity: 0;
  transition: opacity .25s var(--ease);
  pointer-events: none;
}
.clickable:hover .zoom-hint { opacity: 1; }
.clickable:hover img { filter: brightness(1.05); }
.clickable img { transition: filter .3s var(--ease); }

/* Lightbox */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, .92);
  display: grid;
  place-items: center;
  padding: 2rem;
  animation: lbFadeIn .25s var(--ease);
}
@keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  display: grid;
  place-items: center;
  color: var(--stone);
  border: 1px solid var(--line);
  background: rgba(7, 6, 4, .6);
  transition: color .2s, border-color .2s;
  z-index: 101;
}
.lightbox-close:hover { color: var(--cream); border-color: var(--gold); }
.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
}
.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  display: block;
}

@media (max-width: 820px) {
  .cert-card { grid-template-columns: 1fr; }
  .cert-card:nth-child(even) { direction: ltr; }
  .cert-info { padding: 1.5rem !important; }
  .summary-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .summary-grid { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; }
}
</style>
