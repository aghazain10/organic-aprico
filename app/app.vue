<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { open } = useCart()

watch(open, (isOpen) => {
  if (import.meta.server) return
  document.body.classList.toggle('no-scroll', isOpen)
})

onMounted(() => {
  requestAnimationFrame(() => {
    document.body.classList.add('ready')
  })
  setTimeout(() => {
    document.body.classList.add('ready')
  }, 1200)
})
</script>
