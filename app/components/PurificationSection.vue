<template>
  <section class="section section-tint" id="purification">
    <div class="wrap purify-grid">
      <div class="purify-side">
        <h2>Eight stages from rock to jar</h2>
        <p>Every batch passes eight stages of 100% organic cold purification before export. No UV, no ozone, no chemicals.</p>
        <div class="stage-indicator" aria-hidden="true">
          <span class="stage-current">{{ activeStage }}</span>
          <span class="stage-of">of 8</span>
        </div>
        <NuxtLink to="/purification" class="btn btn-ghost" style="margin-top: 1.5rem">See Detailed Purification</NuxtLink>
      </div>
      <ol class="stages" ref="stagesEl">
        <li
          v-for="(stage, i) in stages"
          :key="i"
          class="stage"
          :class="{ active: activeStage === i + 1 }"
          :ref="(el) => stageRefs[i] = el as HTMLElement"
        >
          <span class="stage-num">{{ i + 1 }}</span>
          <div>
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const stages = [
  { title: 'Ethical high-altitude extraction', desc: 'Hand-harvested above 17,000 feet in Gilgit-Baltistan by local mountain experts.' },
  { title: 'Hand sorting & crushing', desc: 'Only pure Gold Grade rocks are selected and gently hand-crushed.' },
  { title: 'Sun & organic Triphala cleansing', desc: 'Crushed rocks coated in Certified Organic Triphala paste under direct sunlight.' },
  { title: 'Cool water dissolution & settling', desc: 'Dissolved in cool lab-tested RO water and settled 24 hours. Never boiled.' },
  { title: 'Fine bag filtration', desc: 'The clean upper liquid is drawn off through food-grade filter bags.' },
  { title: 'Natural heavy-metal ion-exchange', desc: 'Organic-compliant media locks heavy metals while preserving minerals and fulvic acid.' },
  { title: 'Cold membrane ultra-filtration', desc: '5 → 1 → 0.2 → 0.1 micron membranes. No UV, ozone or chemicals.' },
  { title: 'Sealed-chamber sun dehydration', desc: '40+ days in a sealed glass & stainless steel chamber under direct sunlight.' },
]

const activeStage = ref(1)
const stageRefs = ref<(HTMLElement | null)[]>([])
const stagesEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const index = stageRefs.value.indexOf(entry.target as HTMLElement)
          if (index !== -1) activeStage.value = index + 1
        }
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  )

  stageRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>
