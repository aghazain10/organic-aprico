<template>
  <div class="stat-card">
    <div class="stat-card-top">
      <span class="stat-label">{{ label }}</span>
      <span v-if="icon" class="stat-icon">
        <AdminIcon :name="icon" :size="17" />
      </span>
    </div>
    <strong class="stat-value">{{ value }}</strong>
    <span v-if="hint" class="stat-hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  hint?: string
  icon?: string
}>()
</script>
