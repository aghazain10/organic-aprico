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
        <div v-for="lab in labs" :key="lab.name">
          <strong>{{ lab.name }}</strong>
          <span>{{ lab.location }}</span>
        </div>
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

const labs = [
  { name: 'Micro Quality Lab', location: 'California, USA' },
  { name: 'PCSIR Laboratories Complex', location: 'Lahore, Pakistan' },
  { name: 'Eurofins', location: 'International verification' },
  { name: 'Government licensed', location: 'Extraction and export' },
]

const active = ref<Seal | null>(null)

function openSeal(seal: Seal) {
  active.value = seal
  if (import.meta.client) document.body.classList.add('no-scroll')
}

function closeSeal() {
  active.value = null
  if (import.meta.client) document.body.classList.remove('no-scroll')
}

if (import.meta.client) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && active.value) closeSeal()
  }
  onMounted(() => document.addEventListener('keydown', onKey))
  onUnmounted(() => {
    document.removeEventListener('keydown', onKey)
    document.body.classList.remove('no-scroll')
  })
}
</script>
