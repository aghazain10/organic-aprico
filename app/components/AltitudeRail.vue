<template>
  <aside class="altitude" aria-hidden="true">
    <span class="alt-top">17,000 ft</span>
    <div class="alt-track">
      <span class="alt-marker" :style="{ top: markerPos + '%' }" />
    </div>
    <span class="alt-bottom">712 ft</span>
    <span class="alt-read" style="writing-mode:vertical-rl;rotate:180deg">{{ altText }}</span>
  </aside>
</template>

<script setup lang="ts">
const TOP_FT = 17000
const BOTTOM_FT = 712

const markerPos = ref(0)
const altText = ref(`${TOP_FT.toLocaleString('en-US')} ft above sea level`)

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  markerPos.value = t * 100
  const ft = Math.round(TOP_FT - (TOP_FT - BOTTOM_FT) * t)
  altText.value = `${ft.toLocaleString('en-US')} ft above sea level`
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>
