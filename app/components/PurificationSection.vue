<template>
  <section class="section section-tint" id="purification">
    <div class="wrap purify-grid">
      <div class="purify-side">
        <h2>Eight stages from rock to jar</h2>
        <p>Every batch passes eight stages before export. No chemicals at any point.</p>
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
  { title: 'Extraction', desc: 'Hand-harvested above 17,000 feet in Gilgit Baltistan.' },
  { title: 'Triphala soaking', desc: 'Soaked 3 to 7 days in RO water with Triphala to draw out heavy metals.' },
  { title: 'Primary filtration', desc: 'Repeated filtering with glacier water removes sand and sediment.' },
  { title: 'Purification', desc: 'Ion exchange, UV and ozonation remove metals, bacteria and fungus.' },
  { title: 'Quality verification', desc: 'Mid-process testing against internal standards.' },
  { title: 'Sun dehydration', desc: '40+ days in stainless steel under direct sun.' },
  { title: 'Independent lab testing', desc: 'Micro Quality Lab, California confirms 73% fulvic acid and zero toxins.' },
  { title: 'Batch coding and export clearance', desc: 'A unique batch number on every pack for full traceability.' },
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
