<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { open, hydrate } = useCart()

watch(open, (isOpen) => {
  if (import.meta.server) return
  document.body.classList.toggle('no-scroll', isOpen)
})

onMounted(() => {
  hydrate()
})
</script>
