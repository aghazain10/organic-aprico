<template>
  <section class="section" id="faq">
    <div class="wrap faq-wrap">
      <div class="section-label">Support</div>
      <h2>Frequently Asked Questions</h2>
      <p class="muted">Everything you need to know about our shilajit</p>
      <div class="faq-list">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button
            class="faq-q"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <svg
              class="faq-icon"
              :class="{ rotated: openIndex === i }"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div class="faq-a" :class="{ open: openIndex === i }">
            <div class="faq-a-inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const faqs = [
  {
    q: 'What is Shilajit?',
    a: 'Shilajit is a natural, tar-like resin that forms over centuries from the decomposition of plant matter in the Himalayan mountains. It is rich in fulvic acid, minerals, and other bioactive compounds, and has been used in traditional Ayurvedic medicine for thousands of years to support overall health and vitality.',
  },
  {
    q: 'What are the benefits of Organic Aprico Shilajit?',
    a: 'Organic Aprico Shilajit may help boost energy levels, support immune function, enhance cognitive performance, promote healthy aging, and aid in nutrient absorption due to its high fulvic acid content. It is also known for its potential to support testosterone levels, improve stamina, and contribute to overall wellness.',
  },
  {
    q: 'How should I take Shilajit?',
    a: 'We recommend dissolving a pea-sized amount (about 300–500 mg) of Organic Aprico Shilajit in warm water, milk, or tea once or twice daily. Start with a smaller dose to assess tolerance and gradually increase. It can be taken on an empty stomach for better absorption.',
  },
  {
    q: 'Is Organic Aprico Shilajit safe and pure?',
    a: 'Yes, our Shilajit is sourced from high-altitude Himalayan regions and undergoes rigorous third-party testing for purity, heavy metals, and contaminants. It is 100% organic, free from additives, and certified for quality. However, pregnant or nursing women, children, and those with medical conditions should consult a doctor before use.',
  },
  {
    q: 'Where does Organic Aprico source its Shilajit from?',
    a: 'Organic Aprico Shilajit is ethically sourced from pristine, high-elevation areas in the Himalayas. We work directly with sustainable harvesters to ensure the highest quality and purity while preserving the environment.',
  },
  {
    q: 'How long does it take to see results from Shilajit?',
    a: 'Results can vary based on individual health, dosage, and consistency. Many users report increased energy and vitality within 1–2 weeks, while other benefits like improved stamina or cognitive support may take 4–6 weeks of regular use.',
  },
  {
    q: 'Can Shilajit help with altitude sickness?',
    a: 'Traditionally, Shilajit has been used by Himalayan communities to combat altitude sickness due to its adaptogenic properties and ability to enhance oxygen utilization. While anecdotal evidence supports this, scientific studies are limited — consult a healthcare provider for personalised advice.',
  },
  {
    q: 'What is the shelf life of Organic Aprico Shilajit?',
    a: 'When stored in a cool, dry place away from direct sunlight, our Shilajit has a shelf life of up to 3 years. Keep the container tightly sealed to maintain its potency.',
  },
  {
    q: 'Is Organic Aprico Shilajit suitable for vegans?',
    a: 'Yes, our Shilajit is 100% plant-based, derived from natural decomposition of organic matter, and contains no animal products. It is vegan, gluten-free, and non-GMO.',
  },
  {
    q: "What if I'm not satisfied with the product?",
    a: 'Organic Aprico offers a 30-day money-back guarantee. If you are not completely satisfied, contact our customer support for a full refund — no questions asked.',
  },
]
</script>

<style scoped>
.section-label {
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: .78rem;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: .5rem;
}

.faq-wrap {
  max-width: 800px;
}
.faq-wrap h2 {
  margin-bottom: .25rem;
}
.faq-wrap > .muted {
  margin-bottom: 2.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid var(--line-soft);
}

.faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 0;
  font-family: var(--serif);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--cream);
  text-align: left;
  background: none;
  border: 0;
  cursor: pointer;
  transition: color .2s;
}
.faq-q:hover { color: var(--gold-bright); }

.faq-icon {
  flex-shrink: 0;
  color: var(--stone);
  transition: transform .3s var(--ease);
}
.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .35s var(--ease);
}
.faq-a.open {
  grid-template-rows: 1fr;
}
.faq-a-inner {
  overflow: hidden;
}
.faq-a-inner p {
  padding-bottom: 1.2rem;
  color: var(--stone);
  line-height: 1.7;
  font-size: .98rem;
}
</style>
