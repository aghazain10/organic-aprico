<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main>
      <section class="purify-hero">
        <div class="wrap">
          <NuxtLink to="/#purification" class="back-link">&larr; Back to home</NuxtLink>
          <h1>Eight stages from rock to jar</h1>
          <p class="lede">Every batch of Organic Aprico shilajit passes through eight rigorous stages before it is cleared for export. No shortcuts, no chemicals, no exceptions.</p>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <ol class="purify-steps">
            <li v-for="(step, i) in steps" :key="i" class="purify-step">
              <div class="step-image">
                <div class="step-image-inner" v-html="step.svg" />
              </div>
              <div class="step-content">
                <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <h2>{{ step.title }}</h2>
                <p class="step-desc">{{ step.description }}</p>
                <p v-if="step.detail" class="step-detail">{{ step.detail }}</p>
                <div v-if="step.facts.length" class="step-facts">
                  <div v-for="fact in step.facts" :key="fact.label" class="step-fact">
                    <span class="fact-label">{{ fact.label }}</span>
                    <span class="fact-value">{{ fact.value }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="section section-tint">
        <div class="wrap purify-cta">
          <h2>Ready to try it?</h2>
          <p>Pure Himalayan shilajit, purified the right way.</p>
          <div class="purify-cta-actions">
            <NuxtLink to="/#products" class="btn btn-gold">Shop shilajit</NuxtLink>
            <NuxtLink to="/certifications" class="btn btn-ghost">See certifications</NuxtLink>
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
const { count: cartCount, openDrawer: openCart } = useCart()

const steps = [
  {
    title: 'Extraction',
    description: 'Hand-harvested above 17,000 feet in Gilgit Baltistan.',
    detail: 'Our extraction team ascends to altitudes above 17,000 feet in the Karakoram range near Skardu. The raw shilajit is carefully hand-harvested from rock crevices during the warm months when the resin naturally seeps from the mountain.',
    facts: [
      { label: 'Altitude', value: '17,000+ ft' },
      { label: 'Season', value: 'June to September' },
      { label: 'Method', value: 'Hand-harvested' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><path d="M0 280 L60 200 L120 230 L180 140 L240 180 L300 100 L360 150 L400 120 V280Z" fill="#17140e"/><path d="M0 280 L60 200 L120 230 L180 140 L240 180 L300 100 L360 150 L400 120" stroke="#C9A24A" stroke-width="1.5" fill="none"/><circle cx="300" cy="100" r="4" fill="#E9CD84"/><text x="310" y="96" font-family="Manrope" font-size="11" fill="#E9CD84">17,000 ft</text><rect x="180" y="145" width="24" height="16" rx="3" fill="#C9A24A" opacity=".6"/><line x1="192" y1="161" x2="192" y2="172" stroke="#C9A24A" stroke-width="1.5"/></svg>`,
  },
  {
    title: 'Triphala soaking',
    description: 'Soaked 3 to 7 days in RO water with Triphala to draw out heavy metals.',
    detail: 'Raw shilajit is dissolved in reverse-osmosis purified water and mixed with Triphala, a traditional Ayurvedic formulation. This soak lasts 3 to 7 days, allowing the Triphala to bind with heavy metals and impurities, drawing them out of the resin naturally.',
    facts: [
      { label: 'Duration', value: '3–7 days' },
      { label: 'Medium', value: 'RO water + Triphala' },
      { label: 'Purpose', value: 'Heavy metal extraction' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="120" y="60" width="160" height="180" rx="8" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><rect x="120" y="140" width="160" height="100" fill="#2a1a0d" opacity=".8"/><path d="M140 160 Q160 150 180 160 Q200 170 220 160 Q240 150 260 160" stroke="#C9A24A" stroke-width="1" opacity=".5" fill="none"/><circle cx="170" cy="180" r="3" fill="#E9CD84" opacity=".4"/><circle cx="210" cy="175" r="2" fill="#E9CD84" opacity=".3"/><circle cx="230" cy="190" r="2.5" fill="#E9CD84" opacity=".35"/><text x="200" y="50" text-anchor="middle" font-family="Manrope" font-size="11" fill="#9A9080">3–7 days</text></svg>`,
  },
  {
    title: 'Primary filtration',
    description: 'Repeated filtering with glacier water removes sand and sediment.',
    detail: 'After the soak, the solution is passed through multiple filtration stages using clean glacier water from the Karakoram. Each pass removes progressively finer particles — sand, grit, and undissolved plant material — until the liquid runs clear.',
    facts: [
      { label: 'Water source', value: 'Glacier water' },
      { label: 'Passes', value: 'Multiple' },
      { label: 'Removes', value: 'Sand, sediment, plant matter' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><path d="M160 40 L240 40 L260 100 L140 100Z" fill="#17140e" stroke="#C9A24A" stroke-width="1"/><line x1="180" y1="100" x2="180" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><line x1="200" y1="100" x2="200" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><line x1="220" y1="100" x2="220" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><ellipse cx="200" cy="210" rx="60" ry="8" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><path d="M180 110 Q200 120 220 110" stroke="#C9A24A" stroke-width="1" opacity=".5" fill="none"/><circle cx="195" cy="140" r="2" fill="#9A9080" opacity=".5"/><circle cx="205" cy="160" r="1.5" fill="#9A9080" opacity=".4"/></svg>`,
  },
  {
    title: 'Purification',
    description: 'Ion exchange, UV and ozonation remove metals, bacteria and fungus.',
    detail: 'The filtered solution undergoes three advanced purification processes: ion exchange targets remaining dissolved metals, UV exposure neutralizes bacteria and fungal spores, and ozonation provides an additional layer of microbial elimination — all without heat or chemicals.',
    facts: [
      { label: 'Methods', value: 'Ion exchange, UV, Ozone' },
      { label: 'Removes', value: 'Metals, bacteria, fungus' },
      { label: 'Chemicals used', value: 'None' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><circle cx="200" cy="140" r="60" fill="none" stroke="#C9A24A" stroke-width="1" opacity=".3"/><circle cx="200" cy="140" r="40" fill="none" stroke="#C9A24A" stroke-width="1" opacity=".5"/><circle cx="200" cy="140" r="20" fill="#E9CD84" opacity=".15"/><text x="200" y="144" text-anchor="middle" font-family="Manrope" font-size="10" fill="#E9CD84">UV</text><line x1="140" y1="140" x2="120" y2="140" stroke="#C9A24A" stroke-width="1"/><line x1="260" y1="140" x2="280" y2="140" stroke="#C9A24A" stroke-width="1"/><line x1="200" y1="80" x2="200" y2="60" stroke="#C9A24A" stroke-width="1"/><line x1="200" y1="200" x2="200" y2="220" stroke="#C9A24A" stroke-width="1"/><text x="120" y="155" font-family="Manrope" font-size="9" fill="#9A9080" text-anchor="end">Ion</text><text x="280" y="155" font-family="Manrope" font-size="9" fill="#9A9080">Ozone</text></svg>`,
  },
  {
    title: 'Quality verification',
    description: 'Mid-process testing against internal standards.',
    detail: 'At this midpoint, samples from the batch are tested against our strict internal quality standards. We check pH levels, colour consistency, dissolved solids, and run preliminary microbial counts. Any batch that falls short is rejected and the process starts over.',
    facts: [
      { label: 'Tests', value: 'pH, colour, microbial count' },
      { label: 'Standard', value: 'Internal (stricter than export)' },
      { label: 'Action', value: 'Reject and restart if failed' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="140" y="80" width="120" height="160" rx="6" fill="#17140e" stroke="#C9A24A" stroke-width="1"/><rect x="160" y="100" width="80" height="40" rx="3" fill="#1c1409" stroke="#C9A24A" stroke-width=".5"/><line x1="170" y1="115" x2="230" y2="115" stroke="#C9A24A" stroke-width=".5" opacity=".4"/><line x1="170" y1="125" x2="210" y2="125" stroke="#E9CD84" stroke-width=".5" opacity=".6"/><circle cx="200" cy="190" r="20" fill="none" stroke="#E9CD84" stroke-width="1"/><path d="M192 190 L198 196 L210 184" stroke="#E9CD84" stroke-width="1.5" fill="none"/><text x="200" y="230" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">PASS</text></svg>`,
  },
  {
    title: 'Sun dehydration',
    description: '40+ days in stainless steel under direct sun.',
    detail: 'The purified liquid is spread in thin layers across large stainless steel trays and placed under the direct Skardu sun. Over 40 or more days, slow evaporation concentrates the shilajit back into a thick, pure resin — without any artificial heat that could degrade the fulvic acid.',
    facts: [
      { label: 'Duration', value: '40+ days' },
      { label: 'Method', value: 'Direct sunlight' },
      { label: 'Temperature', value: 'Natural ambient' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><circle cx="200" cy="60" r="30" fill="#E9CD84" opacity=".15"/><circle cx="200" cy="60" r="20" fill="#E9CD84" opacity=".25"/><line x1="200" y1="20" x2="200" y2="10" stroke="#E9CD84" stroke-width="1"/><line x1="200" y1="100" x2="200" y2="110" stroke="#E9CD84" stroke-width="1"/><line x1="160" y1="60" x2="150" y2="60" stroke="#E9CD84" stroke-width="1"/><line x1="240" y1="60" x2="250" y2="60" stroke="#E9CD84" stroke-width="1"/><line x1="172" y1="32" x2="165" y2="25" stroke="#E9CD84" stroke-width="1"/><line x1="228" y1="32" x2="235" y2="25" stroke="#E9CD84" stroke-width="1"/><line x1="172" y1="88" x2="165" y2="95" stroke="#E9CD84" stroke-width="1"/><line x1="228" y1="88" x2="235" y2="95" stroke="#E9CD84" stroke-width="1"/><rect x="100" y="150" width="200" height="8" rx="2" fill="#3a3a3a"/><rect x="110" y="158" width="180" height="60" rx="4" fill="#1c1409" stroke="#C9A24A" stroke-width=".5"/><rect x="120" y="168" width="160" height="40" fill="#2a1a0d" opacity=".6"/><text x="200" y="240" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">40+ days</text></svg>`,
  },
  {
    title: 'Independent lab testing',
    description: 'Micro Quality Lab, California confirms 73% fulvic acid and zero toxins.',
    detail: 'Samples from every batch are sent to Micro Quality Lab in California and PCSIR Laboratories in Lahore. Tests cover fulvic acid content, heavy metals (lead, mercury, arsenic, cadmium), aflatoxins, total plate count, yeast and mould. Only batches that pass all tests are cleared.',
    facts: [
      { label: 'Fulvic acid', value: '73%' },
      { label: 'Labs', value: 'Micro Quality Lab, PCSIR, Eurofins' },
      { label: 'Tests', value: 'Heavy metals, toxins, microbes' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="150" y="70" width="100" height="140" rx="8" fill="#17140e" stroke="#C9A24A" stroke-width="1"/><rect x="170" y="90" width="60" height="30" rx="3" fill="#1c1409" stroke="#C9A24A" stroke-width=".5"/><line x1="180" y1="105" x2="220" y2="105" stroke="#C9A24A" stroke-width=".5" opacity=".5"/><circle cx="200" cy="165" r="15" fill="none" stroke="#E9CD84" stroke-width="1"/><path d="M194 165 L198 169 L208 159" stroke="#E9CD84" stroke-width="1.5" fill="none"/><text x="200" y="230" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">73% fulvic acid</text></svg>`,
  },
  {
    title: 'Batch coding and export clearance',
    description: 'A unique batch number on every pack for full traceability.',
    detail: 'Each jar and pouch receives a unique batch code that links to its full production history — extraction date, purification logs, lab reports, and expiry. This code is your guarantee of authenticity and allows us to trace any product back to the exact mountain it came from.',
    facts: [
      { label: 'Traceability', value: 'Full — extraction to export' },
      { label: 'Label includes', value: 'Batch code, date, lab report QR' },
      { label: 'Expiry', value: '24 months from packaging' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="130" y="80" width="140" height="120" rx="6" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><rect x="150" y="100" width="100" height="12" rx="2" fill="#0a0805" opacity=".8"/><rect x="150" y="100" width="100" height="1" fill="#C9A24A" opacity=".6"/><text x="200" y="110" text-anchor="middle" font-family="monospace" font-size="8" fill="#E9CD84">OAPR-2026-0847</text><rect x="170" y="130" width="60" height="60" rx="2" fill="#0a0805" stroke="#C9A24A" stroke-width=".5"/><rect x="178" y="138" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="186" y="138" width="4" height="4" fill="#C9A24A" opacity=".5"/><rect x="194" y="138" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="178" y="146" width="4" height="4" fill="#C9A24A" opacity=".4"/><rect x="186" y="146" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="194" y="146" width="4" height="4" fill="#C9A24A" opacity=".5"/><rect x="202" y="146" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="178" y="154" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="186" y="154" width="4" height="4" fill="#C9A24A" opacity=".5"/><rect x="194" y="154" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="202" y="154" width="4" height="4" fill="#C9A24A" opacity=".4"/><rect x="178" y="162" width="4" height="4" fill="#C9A24A" opacity=".5"/><rect x="186" y="162" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="194" y="162" width="4" height="4" fill="#C9A24A" opacity=".4"/><rect x="202" y="162" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="210" y="162" width="4" height="4" fill="#C9A24A" opacity=".5"/><rect x="178" y="170" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="186" y="170" width="4" height="4" fill="#C9A24A" opacity=".4"/><rect x="194" y="170" width="4" height="4" fill="#C9A24A" opacity=".3"/><rect x="202" y="170" width="4" height="4" fill="#C9A24A" opacity=".5"/><text x="200" y="220" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">Full traceability</text></svg>`,
  },
]

useSeoMeta({
  title: 'Purification Process | Organic Aprico',
  description: 'See how Organic Aprico purifies Himalayan shilajit through eight rigorous stages — from extraction at 17,000 feet to independent lab testing in California.',
  ogTitle: 'Our 8-Stage Purification Process',
  ogDescription: 'From rock to jar — eight stages of purification without chemicals. 73% fulvic acid, lab verified.',
})
</script>

<style scoped>
.purify-hero {
  padding: clamp(100px, 14vw, 140px) 0 clamp(32px, 5vw, 60px);
}
.back-link {
  display: inline-block;
  color: var(--stone);
  font-size: .95rem;
  margin-bottom: 2rem;
}
.back-link:hover { color: var(--gold-bright); }
.purify-hero h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.06;
  max-width: 14ch;
  margin-bottom: 1.2rem;
}
.lede { color: var(--stone); font-size: 1.1rem; max-width: 54ch; }

.purify-steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
}
.purify-step {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  padding-bottom: clamp(3rem, 6vw, 5rem);
  border-bottom: 1px solid var(--line-soft);
}
.purify-step:last-child { border-bottom: 0; padding-bottom: 0; }
.purify-step:nth-child(even) { direction: rtl; }
.purify-step:nth-child(even) > * { direction: ltr; }

.step-image {
  aspect-ratio: 4/3;
  background: linear-gradient(180deg, rgba(23,20,14,.8), rgba(7,6,4,0));
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  padding: 2rem;
}
.step-image-inner { width: 100%; }
.step-image-inner :deep(svg) { width: 100%; height: auto; }

.step-content { display: flex; flex-direction: column; gap: 1rem; }
.step-num {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 3rem;
  line-height: 1;
  color: var(--gold);
  opacity: .25;
}
.step-content h2 {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin-top: -.5rem;
}
.step-desc { color: var(--stone); font-size: 1.05rem; }
.step-detail { color: var(--cream); font-size: .98rem; line-height: 1.65; max-width: 52ch; }

.step-facts {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-top: .5rem;
}
.step-fact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: .8rem 1rem;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(201,162,74,.06), rgba(201,162,74,0));
  min-width: 100px;
}
.fact-label { font-size: .78rem; color: var(--stone); margin-bottom: .15rem; }
.fact-value { font-weight: 600; color: var(--gold-bright); font-size: .95rem; }

.purify-cta {
  text-align: center;
}
.purify-cta h2 { margin-bottom: .8rem; }
.purify-cta p { color: var(--stone); margin-bottom: 1.5rem; font-size: 1.05rem; }
.purify-cta-actions { display: flex; gap: .85rem; justify-content: center; flex-wrap: wrap; }

@media (max-width: 820px) {
  .purify-step { grid-template-columns: 1fr; }
  .purify-step:nth-child(even) { direction: ltr; }
}
</style>
