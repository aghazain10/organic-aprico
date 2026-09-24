<template>
  <div v-if="order">
    <div class="admin-page-head">
      <div>
        <NuxtLink to="/admin/orders" class="admin-back">&larr; Orders</NuxtLink>
        <h1>Order <span class="admin-order-id">{{ order.id }}</span></h1>
        <p class="muted small">Placed {{ formatDate(order.createdAt) }}</p>
      </div>
      <div class="admin-status-control">
        <AdminStatusBadge :status="order.status" />
        <select
          v-model="newStatus"
          class="admin-status-select"
          aria-label="Change order status"
          :disabled="updating"
        >
          <option v-for="s in ORDER_STATUSES" :key="s" :value="s">
            {{ ORDER_STATUS_LABELS[s] }}
          </option>
        </select>
        <button
          type="button"
          class="btn btn-gold"
          :disabled="updating || newStatus === order.status"
          @click="saveStatus"
        >
          {{ updating ? 'Saving…' : 'Update status' }}
        </button>
      </div>
    </div>

    <div class="admin-detail-grid">
      <section class="admin-card">
        <div class="admin-card-head"><h2>Customer</h2></div>
        <dl class="admin-dl">
          <div><dt>Name</dt><dd>{{ order.name }}</dd></div>
          <div><dt>Email</dt><dd><a :href="`mailto:${order.email}`">{{ order.email }}</a></dd></div>
          <div><dt>Phone</dt><dd><a :href="`tel:${order.phone}`">{{ order.phone }}</a></dd></div>
          <div><dt>Payment</dt><dd>{{ order.paymentMethod === 'bank_transfer' ? 'Bank transfer' : 'Cash on delivery' }}</dd></div>
        </dl>
      </section>

      <section class="admin-card">
        <div class="admin-card-head"><h2>Shipping</h2></div>
        <dl class="admin-dl">
          <div><dt>Address</dt><dd>{{ order.address }}</dd></div>
          <div><dt>City</dt><dd>{{ order.city }}</dd></div>
          <div><dt>Country</dt><dd>{{ order.country }}</dd></div>
          <div v-if="order.postalCode"><dt>Postal code</dt><dd>{{ order.postalCode }}</dd></div>
          <div v-if="order.notes"><dt>Notes</dt><dd>{{ order.notes }}</dd></div>
        </dl>
      </section>
    </div>

    <section class="admin-card">
      <div class="admin-card-head"><h2>Items</h2></div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th class="num">Qty</th>
              <th class="num">Unit price</th>
              <th class="num">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in orderItems" :key="i">
              <td>{{ productName(item.product) }}</td>
              <td>{{ item.size }}</td>
              <td class="num">{{ item.qty }}</td>
              <td class="num">{{ formatPrice(item.price) }}</td>
              <td class="num">{{ formatPrice(item.price * item.qty) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Total</td>
              <td class="num admin-total">{{ formatPrice(order.total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </div>

  <div v-else-if="error" class="admin-card admin-empty">
    <p>{{ error.data?.statusMessage || 'Order not found.' }}</p>
    <NuxtLink to="/admin/orders" class="btn btn-ghost">Back to orders</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder, OrderItem } from '#shared/utils/order'
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from '#shared/utils/order'
import { PRODUCTS, formatPrice } from '~/data/products'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = String(route.params.id)
const toast = useToast()

const { data: order, error, refresh } = await useFetch<AdminOrder>(`/api/admin/orders/${id}`, {
  server: false,
})

const newStatus = ref('')
watchEffect(() => {
  if (order.value) newStatus.value = order.value.status
})

const updating = ref(false)

const orderItems = computed<OrderItem[]>(() => {
  const items = order.value?.items
  return Array.isArray(items) ? (items as OrderItem[]) : []
})

function productName(key: string): string {
  return PRODUCTS.find((p) => p.key === key)?.name || key
}

function formatDate(value: string | Date): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function saveStatus() {
  if (!order.value || newStatus.value === order.value.status) return
  updating.value = true
  try {
    await $fetch<AdminOrder>(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      body: { status: newStatus.value },
    })
    toast.show('Order status updated')
    await refresh()
  } catch (e: any) {
    toast.show(e?.data?.statusMessage || 'Failed to update status')
    if (order.value) newStatus.value = order.value.status
  } finally {
    updating.value = false
  }
}

useSeoMeta({
  title: computed(() => `Order ${id} | Organic Aprico Admin`),
  robots: 'noindex, nofollow',
})
</script>
