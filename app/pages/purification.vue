<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main>
      <section class="purify-hero">
        <div class="wrap">
          <NuxtLink to="/#purification" class="back-link">&larr; Back to home</NuxtLink>
          <h1>Eight stages from rock to jar</h1>
          <p class="lede">Our pure Himalayan Shilajit resin is ethically harvested above 17,000 feet in Gilgit-Baltistan and purified inside an ISO 22000, HACCP and GMP-certified facility using an 8-stage, 100% organic cold process &mdash; no UV, no ozone, no chemicals.</p>
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

      <section class="faq-section" id="purification-faqs">
        <div class="wrap">
          <h2>Frequently Asked Questions About Our Shilajit Purification</h2>
          <div class="faq-list">
            <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ open: openFaq === i }">
              <button class="faq-q" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? null : i">
                <span>{{ faq.q }}</span>
                <svg class="faq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="faq-a"><p>{{ faq.a }}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-tint">
        <div class="wrap purify-cta">
          <h2>Ready to try it?</h2>
          <p>Pure Himalayan shilajit, purified the right way.</p>
          <div class="purify-cta-actions">
            <NuxtLink to="/products" class="btn btn-gold">Shop shilajit</NuxtLink>
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
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from '~/utils/seo'

const { count: cartCount, openDrawer: openCart } = useCart()

const steps = [
  {
    title: 'Ethical high-altitude extraction',
    description: 'Ethically hand-harvested above 17,000 feet in Gilgit-Baltistan by local mountain experts.',
    detail: 'Our journey begins above 17,000 feet in the untouched Himalayan mountains of Gilgit-Baltistan. Harvested ethically and sustainably by experienced local mountain experts, we collect only rare, authentic Gold Grade rocks naturally rich in dense Shilajit resin and completely free from modern pollution.',
    facts: [
      { label: 'Altitude', value: '17,000+ ft' },
      { label: 'Harvest', value: 'Ethical & sustainable' },
      { label: 'Grade', value: 'Gold Grade rocks' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><path d="M0 280 L60 200 L120 230 L180 140 L240 180 L300 100 L360 150 L400 120 V280Z" fill="#17140e"/><path d="M0 280 L60 200 L120 230 L180 140 L240 180 L300 100 L360 150 L400 120" stroke="#C9A24A" stroke-width="1.5" fill="none"/><circle cx="300" cy="100" r="4" fill="#E9CD84"/><text x="310" y="96" font-family="Manrope" font-size="11" fill="#E9CD84">17,000 ft</text><rect x="180" y="145" width="24" height="16" rx="3" fill="#C9A24A" opacity=".6"/><line x1="192" y1="161" x2="192" y2="172" stroke="#C9A24A" stroke-width="1.5"/></svg>`,
  },
  {
    title: 'Hand sorting & crushing',
    description: 'Only pure Gold Grade rocks are selected by hand and gently crushed.',
    detail: 'Every rock is carefully inspected by hand so only pure, high-concentration Gold Grade pieces make the cut. We gently hand-crush these selected rocks into small pieces, allowing them to dissolve naturally without releasing excess grit.',
    facts: [
      { label: 'Selection', value: 'By hand' },
      { label: 'Crush', value: 'Gentle' },
      { label: 'Goal', value: 'No excess grit' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="90" y="150" width="50" height="40" rx="6" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><rect x="160" y="140" width="60" height="50" rx="6" fill="#2a1a0d" stroke="#E9CD84" stroke-width="1.5"/><rect x="240" y="155" width="45" height="35" rx="6" fill="#1c1409" stroke="#C9A24A" stroke-width="1" opacity=".5"/><path d="M175 165 L185 175 L205 155" stroke="#E9CD84" stroke-width="2" fill="none"/><text x="200" y="230" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">Gold Grade only</text></svg>`,
  },
  {
    title: 'Sun exposure & organic Triphala cleansing',
    description: 'Crushed rocks coated in Certified Organic Triphala paste under direct sunlight.',
    detail: 'Following classical Ayurvedic tradition, we spread the crushed rocks under direct sunlight and coat them in a paste made from 100% Certified Organic Triphala. This natural herbal blend works alongside solar energy to eliminate surface bacteria and bind heavy metals before extraction even begins.',
    facts: [
      { label: 'Herb', value: 'Organic Triphala' },
      { label: 'Energy', value: 'Direct sunlight' },
      { label: 'Action', value: 'Binds heavy metals' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><circle cx="200" cy="70" r="26" fill="#E9CD84" opacity=".2"/><circle cx="200" cy="70" r="16" fill="#E9CD84" opacity=".3"/><line x1="200" y1="30" x2="200" y2="20" stroke="#E9CD84" stroke-width="1"/><line x1="160" y1="70" x2="150" y2="70" stroke="#E9CD84" stroke-width="1"/><line x1="240" y1="70" x2="250" y2="70" stroke="#E9CD84" stroke-width="1"/><rect x="120" y="160" width="160" height="40" rx="6" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><path d="M130 160 Q160 145 200 160 Q240 145 270 160" stroke="#E9CD84" stroke-width="1.5" fill="none" opacity=".6"/><text x="200" y="230" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">Organic Triphala paste</text></svg>`,
  },
  {
    title: 'Cool water dissolution & 24-hour settling',
    description: 'Dissolved in cool lab-tested RO water and settled for 24 hours. Never boiled.',
    detail: 'We never boil or heat-cook our Shilajit, as high temperatures destroy delicate bioactives. Instead, we slowly dissolve the rocks in cool, lab-tested RO water and let the mixture rest undisturbed for a full 24 hours, allowing heavy stones, sand, and sediment to settle naturally to the bottom.',
    facts: [
      { label: 'Water', value: 'Cool lab-tested RO' },
      { label: 'Rest', value: '24 hours' },
      { label: 'Heat', value: 'None' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><rect x="120" y="60" width="160" height="180" rx="8" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><rect x="120" y="140" width="160" height="100" fill="#2a1a0d" opacity=".8"/><path d="M140 160 Q160 150 180 160 Q200 170 220 160 Q240 150 260 160" stroke="#C9A24A" stroke-width="1" opacity=".5" fill="none"/><circle cx="170" cy="180" r="3" fill="#E9CD84" opacity=".4"/><circle cx="210" cy="175" r="2" fill="#E9CD84" opacity=".3"/><circle cx="230" cy="190" r="2.5" fill="#E9CD84" opacity=".35"/><text x="200" y="50" text-anchor="middle" font-family="Manrope" font-size="11" fill="#9A9080">24 hours</text></svg>`,
  },
  {
    title: 'Fine bag filtration',
    description: 'The clean upper liquid passes through ultra-fine food-grade filter bags.',
    detail: 'Once settled, we carefully draw off only the clean upper liquid and pass it through ultra-fine, food-grade filter bags to capture every trace of herbal fiber and fine silt.',
    facts: [
      { label: 'Filter', value: 'Food-grade bags' },
      { label: 'Removes', value: 'Herbal fiber & silt' },
      { label: 'Draw-off', value: 'Clean upper liquid' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><path d="M160 40 L240 40 L260 100 L140 100Z" fill="#17140e" stroke="#C9A24A" stroke-width="1"/><line x1="180" y1="100" x2="180" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><line x1="200" y1="100" x2="200" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><line x1="220" y1="100" x2="220" y2="200" stroke="#3a3224" stroke-width="1" stroke-dasharray="4 3"/><ellipse cx="200" cy="210" rx="60" ry="8" fill="#1c1409" stroke="#C9A24A" stroke-width="1"/><path d="M180 110 Q200 120 220 110" stroke="#C9A24A" stroke-width="1" opacity=".5" fill="none"/><circle cx="195" cy="140" r="2" fill="#9A9080" opacity=".5"/><circle cx="205" cy="160" r="1.5" fill="#9A9080" opacity=".4"/></svg>`,
  },
  {
    title: 'Natural heavy-metal purification',
    description: 'Natural ion-exchange and bonding lock heavy metals — no synthetic chemicals.',
    detail: 'The liquid flows through a vessel containing natural, organic-compliant filtration media. Through natural ion-exchange and molecular bonding, this media selectively locks onto unwanted heavy metal ions — allowing the purified Shilajit, along with its essential trace minerals and high fulvic acid content, to pass through untouched without synthetic chemicals.',
    facts: [
      { label: 'Media', value: 'Organic-compliant' },
      { label: 'Method', value: 'Ion-exchange & bonding' },
      { label: 'Chemicals', value: 'None' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><circle cx="200" cy="140" r="60" fill="none" stroke="#C9A24A" stroke-width="1" opacity=".3"/><circle cx="200" cy="140" r="40" fill="none" stroke="#C9A24A" stroke-width="1" opacity=".5"/><circle cx="200" cy="140" r="20" fill="#E9CD84" opacity=".15"/><text x="200" y="144" text-anchor="middle" font-family="Manrope" font-size="10" fill="#E9CD84">Ion</text><line x1="140" y1="140" x2="120" y2="140" stroke="#C9A24A" stroke-width="1"/><line x1="260" y1="140" x2="280" y2="140" stroke="#C9A24A" stroke-width="1"/><line x1="200" y1="80" x2="200" y2="60" stroke="#C9A24A" stroke-width="1"/><line x1="200" y1="200" x2="200" y2="220" stroke="#C9A24A" stroke-width="1"/><text x="120" y="155" font-family="Manrope" font-size="9" fill="#9A9080" text-anchor="end">Media</text><text x="280" y="155" font-family="Manrope" font-size="9" fill="#9A9080">Bond</text></svg>`,
  },
  {
    title: 'Multi-stage membrane & ultra-filtration',
    description: '5 → 1 → 0.2 → 0.1 micron cold membranes. No UV, ozone or solvents.',
    detail: 'To guarantee absolute microbiological safety without UV radiation, ozone, or chemical solvents, we pass the solution through progressively finer physical membranes — stepping down from 5 microns to 1 micron, and finishing at a microscopic 0.2 to 0.1-micron ultra-filtration barrier. This cold sterilization blocks 99.99% of bacteria and micro-impurities while keeping every heat-sensitive nutrient intact.',
    facts: [
      { label: 'Sequence', value: '5→1→0.2→0.1 µm' },
      { label: 'Blocks', value: '99.99% bacteria' },
      { label: 'UV / Ozone', value: 'None' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><line x1="100" y1="70" x2="300" y2="70" stroke="#C9A24A" stroke-width="1.5"/><line x1="100" y1="120" x2="300" y2="120" stroke="#C9A24A" stroke-width="1.5" opacity=".8"/><line x1="100" y1="170" x2="300" y2="170" stroke="#C9A24A" stroke-width="1.5" opacity=".6"/><line x1="100" y1="220" x2="300" y2="220" stroke="#E9CD84" stroke-width="2"/><text x="310" y="74" font-family="Manrope" font-size="9" fill="#9A9080">5 µm</text><text x="310" y="124" font-family="Manrope" font-size="9" fill="#9A9080">1 µm</text><text x="310" y="174" font-family="Manrope" font-size="9" fill="#9A9080">0.2 µm</text><text x="310" y="224" font-family="Manrope" font-size="9" fill="#E9CD84">0.1 µm</text><circle cx="150" cy="45" r="3" fill="#9A9080" opacity=".6"/><circle cx="200" cy="95" r="2" fill="#9A9080" opacity=".4"/><path d="M200 30 L200 240" stroke="#3a3224" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/></svg>`,
  },
  {
    title: 'Sunlight dehydration in a sealed chamber',
    description: '40+ days in a sealed glass & food-grade stainless steel chamber under direct sun.',
    detail: 'Finally, we pour the sterile purified liquid into shallow food-grade trays inside a sealed, ventilated glass chamber framed in food-grade stainless steel. Filtered airflow gently carries away evaporating moisture while keeping dust, insects, and airborne contaminants locked out — letting pure, natural sunlight slowly thicken the extract into glossy, potent, raw Gold Grade Shilajit resin.',
    facts: [
      { label: 'Duration', value: '40+ days' },
      { label: 'Chamber', value: 'Sealed glass & steel' },
      { label: 'Airflow', value: 'Filtered' },
    ],
    svg: `<svg viewBox="0 0 400 280" fill="none"><circle cx="200" cy="60" r="30" fill="#E9CD84" opacity=".15"/><circle cx="200" cy="60" r="20" fill="#E9CD84" opacity=".25"/><line x1="200" y1="20" x2="200" y2="10" stroke="#E9CD84" stroke-width="1"/><line x1="200" y1="100" x2="200" y2="110" stroke="#E9CD84" stroke-width="1"/><line x1="160" y1="60" x2="150" y2="60" stroke="#E9CD84" stroke-width="1"/><line x1="240" y1="60" x2="250" y2="60" stroke="#E9CD84" stroke-width="1"/><line x1="172" y1="32" x2="165" y2="25" stroke="#E9CD84" stroke-width="1"/><line x1="228" y1="32" x2="235" y2="25" stroke="#E9CD84" stroke-width="1"/><line x1="172" y1="88" x2="165" y2="95" stroke="#E9CD84" stroke-width="1"/><line x1="228" y1="88" x2="235" y2="95" stroke="#E9CD84" stroke-width="1"/><rect x="100" y="150" width="200" height="8" rx="2" fill="#3a3a3a"/><rect x="110" y="158" width="180" height="60" rx="4" fill="#1c1409" stroke="#C9A24A" stroke-width=".5"/><rect x="120" y="168" width="160" height="40" fill="#2a1a0d" opacity=".6"/><text x="200" y="240" text-anchor="middle" font-family="Manrope" font-size="10" fill="#9A9080">40+ days</text></svg>`,
  },
]

const faqs = [
  {
    q: 'How do you remove heavy metals from Shilajit without using chemicals?',
    a: 'We remove heavy metals through a two-step 100% organic approach: first by coating sun-exposed raw Gold Grade rocks with Certified Organic Triphala paste to naturally bind metals, and second by passing the dissolved liquid through natural, organic-compliant filtration media that captures heavy metal ions via selective ion-exchange and molecular bonding while preserving beneficial trace minerals and fulvic acid.',
  },
  {
    q: 'Why is sun-dried Shilajit better than fire-boiled or oven-dried Shilajit?',
    a: 'High-heat boiling or industrial oven drying degrades heat-sensitive compounds such as fulvic acid, humic substances, and dibenzo-alpha-pyrones. By dissolving our rocks in cool RO water and dehydrating the filtered extract slowly under direct natural sunlight inside a sealed glass and food-grade stainless steel chamber, we preserve full bioactive potency and authentic Himalayan mineral integrity.',
  },
  {
    q: 'Where is your Gold Grade Shilajit sourced and how is its safety verified?',
    a: 'Our raw Gold Grade rocks are ethically harvested above 17,000 feet in the Himalayan mountains of Gilgit-Baltistan by experienced local mountain experts. Every batch is processed inside an ISO 22000, HACCP, and GMP-certified facility using 0.1–0.2 micron cold ultra-filtration and is verified by independent third-party laboratory testing for heavy metals, microbiology, and fulvic acid potency.',
  },
]

const openFaq = ref<number | null>(0)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: '8-Stage Purification Process' },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildFaqJsonLd(faqs)),
    },
  ],
})

useSeoMeta({
  title: 'Purification Process | Organic Aprico',
  description: 'See how Organic Aprico purifies Himalayan shilajit through an 8-stage, 100% organic cold process — from ethical extraction at 17,000 feet to 0.1–0.2 micron cold ultra-filtration and sealed-chamber sun drying. No UV, ozone or chemicals.',
  ogTitle: 'Our 8-Stage 100% Organic Purification Process',
  ogDescription: 'From rock to jar — eight stages of 100% organic cold purification without UV, ozone or chemicals. 73% fulvic acid, lab verified.',
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

.faq-list { margin: 1.5rem 0; }
.faq-item {
  border: 1px solid var(--line);
  margin-bottom: .5rem;
}
.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--cream);
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  text-align: left;
}
.faq-q:hover { color: var(--gold-bright); }
.faq-q .faq-arrow {
  transition: transform .2s var(--ease);
  color: var(--stone);
}
.faq-item.open .faq-arrow { transform: rotate(180deg); }
.faq-a {
  padding: 0 1.2rem 1rem;
  color: var(--stone);
  font-size: .98rem;
  line-height: 1.65;
  display: none;
}
.faq-a p { margin-bottom: .6rem; }
.faq-a p:last-child { margin-bottom: 0; }
.faq-item.open .faq-a { display: block; }

@media (max-width: 820px) {
  .purify-step { grid-template-columns: 1fr; }
  .purify-step:nth-child(even) { direction: ltr; }
}
</style>