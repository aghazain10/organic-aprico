<template>
  <span class="status-badge" :class="`status-${normalized}`">
    <span class="status-dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { ORDER_STATUS_LABELS, ORDER_STATUSES, type OrderStatus } from '#shared/utils/order'

const props = defineProps<{ status: string }>()

const normalized = computed<OrderStatus>(() =>
  (ORDER_STATUSES as readonly string[]).includes(props.status)
    ? (props.status as OrderStatus)
    : 'pending',
)

const label = computed(() =>
  ORDER_STATUS_LABELS[normalized.value] || props.status,
)
</script>
