<template>
  <nav class="admin-pagination" aria-label="Pagination">
    <button
      type="button"
      class="admin-page-btn"
      :disabled="page <= 1"
      @click="emit('change', page - 1)"
    >
      &larr; Prev
    </button>
    <span class="admin-page-info">Page {{ page }} of {{ pageCount }}</span>
    <button
      type="button"
      class="admin-page-btn"
      :disabled="page >= pageCount"
      @click="emit('change', page + 1)"
    >
      Next &rarr;
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  page: number
  pageCount: number
}>()

const emit = defineEmits<{ change: [page: number] }>()
</script>
