<template>
  <section class="section" id="certifications">
    <div class="wrap">
      <div class="section-head">
        <h2>Backed by tradition, certified by labs</h2>
        <p>Every batch is tested by independent labs for fulvic acid, heavy metals and aflatoxins.</p>
      </div>
      <ul class="seals">
        <li v-for="seal in seals" :key="seal.name" class="seal">
          <button type="button" class="seal-btn" @click="openSeal(seal)">
            <span class="seal-ring">
              <span class="seal-name">{{ seal.name }}</span>
              <span class="seal-hint" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                View
              </span>
            </span>
            <span class="seal-desc">{{ seal.desc }}</span>
          </button>
        </li>
      </ul>
      <div class="labs">
        <button v-for="lab in labs" :key="lab.name" type="button" class="lab-btn" @click="openLab(lab)">
          <strong>{{ lab.name }}</strong>
          <span>{{ lab.location }}</span>
          <span class="lab-hint" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>
            View report
          </span>
        </button>
      </div>
      <div style="margin-top: clamp(2rem, 4vw, 3.5rem); text-align: center">
        <NuxtLink to="/certifications" class="btn btn-ghost">See Certifications</NuxtLink>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="active" class="lightbox-backdrop" @click="closeSeal">
        <button type="button" class="lightbox-close" aria-label="Close" @click="closeSeal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="lightbox-content cert-modal" role="dialog" aria-modal="true" :aria-label="active.name + ' certificate'" @click.stop>
          <img v-if="active.image" :src="active.image" :alt="active.name + ' certificate of Organic Aprico'">
          <div class="cert-modal-body">
            <span class="cert-modal-kicker">Certificate</span>
            <h3>{{ active.name }}</h3>
            <p>{{ active.long }}</p>
            <p v-if="!active.image" class="cert-modal-note">
              The scanned copy is not published yet — full documentation is available on the certifications page.
            </p>
            <div class="cert-modal-actions">
              <a
                v-if="active.image"
                href="/images/gmp-haccp-halal-certificates.pdf"
                class="btn btn-ghost"
                target="_blank"
                rel="noopener"
              >Download PDF</a>
              <NuxtLink to="/certifications" class="btn btn-ghost" @click="closeSeal">All certifications</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="activeLab" class="lightbox-backdrop" @click="closeLab">
        <button type="button" class="lightbox-close" aria-label="Close" @click="closeLab">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="lightbox-content cert-modal lab-modal" role="dialog" aria-modal="true" :aria-label="activeLab.name" @click.stop>
          <img
            v-if="activeLab.images.length"
            :src="activeLab.images[labImageIndex]"
            :alt="activeLab.name + ' lab report'"
          >
          <div v-if="activeLab.images.length > 1" class="lab-thumbs">
            <button
              v-for="(img, i) in activeLab.images"
              :key="img"
              type="button"
              :class="{ on: i === labImageIndex }"
              :aria-label="'Show report ' + (i + 1)"
              @click="labImageIndex = i"
            >
              <img :src="img" alt="">
            </button>
          </div>
          <div class="cert-modal-body">
            <span class="cert-modal-kicker">Laboratory report</span>
            <h3>{{ activeLab.name }}</h3>
            <span class="lab-modal-loc">{{ activeLab.location }}</span>
            <p>{{ activeLab.long }}</p>
            <div class="cert-modal-actions">
              <a
                href="/images/lab-reports.pdf"
                class="btn btn-ghost"
                target="_blank"
                rel="noopener"
              >Download lab reports (PDF)</a>
              <NuxtLink to="/certifications" class="btn btn-ghost" @click="closeLab">All lab reports</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
type Seal = { name: string; desc: string; long: string; image: string }

const seals: Seal[] = [
  {
    name: 'ISO 9001',
    desc: 'Quality management',
    long: 'ISO 9001 quality management certification covering consistent product quality, documented processes and continuous improvement across every batch we produce.',
    image: '',
  },
  {
    name: 'ISO 22000',
    desc: 'Food safety management',
    long: 'ISO 22000 food safety management certification covering hazard control from raw material sourcing through extraction, testing, packing and distribution.',
    image: '',
  },
  {
    name: 'GMP',
    desc: 'Good manufacturing practice',
    long: 'Good Manufacturing Practice certification ensures every stage of production — from raw material handling to final packaging — meets strict quality and safety standards.',
    image: '/images/certifications/gmp.jpg',
  },
  {
    name: 'HACCP',
    desc: 'Hazard analysis and control',
    long: 'Hazard Analysis and Critical Control Points certification identifies and controls potential food safety hazards at every stage of the production process.',
    image: '/images/certifications/haccp.jpg',
  },
  {
    name: 'Halal',
    desc: 'Halal certified',
    long: 'Halal certified by a recognized authority, confirming the product complies with Islamic dietary laws and is permissible for consumption.',
    image: '/images/certifications/halal.jpg',
  },
]

type Lab = { name: string; location: string; long: string; images: string[] }

const labs: Lab[] = [
  {
    name: 'Micro Quality Lab',
    location: 'California, USA',
    long: 'US-based independent laboratory that verifies the fulvic acid concentration of our shilajit. Their analysis confirmed a 73% fulvic acid content, the primary active compound behind shilajit\'s benefits.',
    images: ['/images/lab-reports/micro-quality-fulvic-acid.jpg'],
  },
  {
    name: 'PCSIR Laboratories Complex',
    location: 'Lahore, Pakistan',
    long: 'Government laboratories complex testing every batch for heavy metals, microbiological safety and aflatoxins. All results come back clean — no lead, mercury, arsenic, cadmium or microbial contamination detected.',
    images: [
      '/images/lab-reports/pcsir-heavy-metals.jpg',
      '/images/lab-reports/pcsir-microbiological.jpg',
      '/images/lab-reports/pcsir-aflatoxin.jpg',
    ],
  },
  {
    name: 'Eurofins',
    location: 'International verification',
    long: 'Globally recognised testing group providing third-party verification of our fulvic acid levels, giving international buyers an independent confirmation of product purity and potency.',
    images: ['/images/lab-reports/eurofins-fulvic-acid.jpg'],
  },
  {
    name: 'Government licensed',
    location: 'Extraction and export',
    long: 'Organic Aprico is licensed and registered for the extraction and export of Himalayan shilajit, with company registration documents available for full transparency.',
    images: ['/images/certifications/company-registration.jpg'],
  },
]

const active = ref<Seal | null>(null)
const activeLab = ref<Lab | null>(null)
const labImageIndex = ref(0)

function openSeal(seal: Seal) {
  active.value = seal
  if (import.meta.client) document.body.classList.add('no-scroll')
}

function closeSeal() {
  active.value = null
  if (import.meta.client) document.body.classList.remove('no-scroll')
}

function openLab(lab: Lab) {
  activeLab.value = lab
  labImageIndex.value = 0
  if (import.meta.client) document.body.classList.add('no-scroll')
}

function closeLab() {
  activeLab.value = null
  if (import.meta.client) document.body.classList.remove('no-scroll')
}

if (import.meta.client) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (active.value) closeSeal()
    else if (activeLab.value) closeLab()
  }
  onMounted(() => document.addEventListener('keydown', onKey))
  onUnmounted(() => {
    document.removeEventListener('keydown', onKey)
    document.body.classList.remove('no-scroll')
  })
}
</script>
