<template>
  <div class="admin-order-list">
    <div v-if="loading && !orders.length" class="admin-list-state">Loading orders…</div>
    <div v-else-if="!orders.length" class="admin-list-state">No orders found.</div>
    <template v-else>
      <NuxtLink
        v-for="order in orders"
        :key="order.id"
        :to="`/admin/orders/${order.id}`"
        class="admin-order-row"
      >
        <span class="admin-avatar admin-avatar-sm" aria-hidden="true">{{ initials(order.name) }}</span>
        <span class="admin-order-row-body">
          <span class="admin-order-row-name">{{ order.name }}</span>
          <span class="admin-order-row-meta">
            #{{ order.id }} · {{ formatDate(order.createdAt) }} · {{ order.city }}
          </span>
        </span>
        <span class="admin-order-row-side">
          <span class="admin-order-row-total">{{ formatPrice(order.total) }}</span>
          <AdminStatusBadge :status="order.status" />
        </span>
        <AdminIcon name="chevron-right" :size="18" class="admin-order-row-chevron" />
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder } from '#shared/utils/order'
import { formatPrice } from '~/data/products'

defineProps<{
  orders: AdminOrder[]
  loading?: boolean
}>()

function formatDate(value: string | Date): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}
</script>
