<template>
  <div class="admin-table-wrap">
    <div v-if="loading && !orders.length" class="admin-table-loading">Loading orders…</div>
    <div v-else-if="!orders.length" class="admin-empty">
      <p>No orders found.</p>
    </div>
    <table v-else class="admin-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>City</th>
          <th>Payment</th>
          <th>Status</th>
          <th class="num">Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="admin-row"
          @click="goTo(order.id)"
        >
          <td class="admin-order-id-cell" :title="order.id">{{ shortId(order.id) }}</td>
          <td>
            <span class="cell-strong">{{ order.name }}</span>
            <span class="cell-sub">{{ order.email }}</span>
          </td>
          <td>{{ order.city }}</td>
          <td>{{ order.paymentMethod === 'bank_transfer' ? 'Bank' : 'COD' }}</td>
          <td><AdminStatusBadge :status="order.status" /></td>
          <td class="num">{{ formatPrice(order.total) }}</td>
          <td class="cell-date">{{ formatDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder } from '#shared/utils/order'
import { formatPrice } from '~/data/products'

const props = defineProps<{
  orders: AdminOrder[]
  loading?: boolean
}>()

const router = useRouter()

function shortId(id: string): string {
  return id.length > 10 ? `${id.slice(0, 10)}…` : id
}

function formatDate(value: string | Date): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
}

function goTo(id: string) {
  router.push(`/admin/orders/${id}`)
}
</script>
