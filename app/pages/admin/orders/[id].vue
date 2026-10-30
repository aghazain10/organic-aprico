<template>
  <div v-if="order">
    <div class="admin-page-head">
      <div>
        <NuxtLink to="/admin/orders" class="admin-back">
          <AdminIcon name="arrow-left" :size="16" />
          Orders
        </NuxtLink>
        <h1>Order #{{ order.id }}</h1>
        <p class="admin-page-sub">
          {{ formatDate(order.createdAt) }} · {{ paymentLabel }} · {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}
        </p>
      </div>
      <AdminStatusBadge :status="order.status" />
    </div>

    <div class="admin-order-grid">
      <section class="admin-card admin-status-card">
        <div class="admin-card-head">
          <div>
            <h2>Update status</h2>
            <p class="admin-card-sub">Set the current status of this order.</p>
          </div>
        </div>
        <div class="admin-status-control">
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
            class="btn btn-primary"
            :disabled="updating || newStatus === order.status"
            @click="saveStatus"
          >
            {{ updating ? 'Saving…' : 'Update status' }}
          </button>
        </div>
      </section>

      <div class="admin-order-main">
        <section class="admin-card admin-items-card">
          <div class="admin-card-head">
            <h2>Items</h2>
            <span class="admin-count">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</span>
          </div>
          <ul class="order-items">
            <li v-for="(item, i) in orderItems" :key="i" class="order-item">
              <span class="order-item-thumb" aria-hidden="true">
                <AdminIcon name="package" :size="20" />
              </span>
              <div class="order-item-info">
                <span class="order-item-name">{{ productName(item.product) }}</span>
                <span class="order-item-meta">
                  {{ item.size }} · Qty {{ item.qty }} · {{ formatPrice(item.price) }} each
                </span>
              </div>
              <span class="order-item-total">{{ formatPrice(item.price * item.qty) }}</span>
            </li>
          </ul>
          <dl class="admin-totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{{ formatPrice(subtotal) }}</dd>
            </div>
            <div class="admin-totals-total">
              <dt>Total</dt>
              <dd>{{ formatPrice(order.total) }}</dd>
            </div>
          </dl>
        </section>

        <section class="admin-card admin-payment-card">
          <div class="admin-card-head">
            <h2>Payment</h2>
          </div>
          <dl class="admin-dl">
            <div>
              <dt>Method</dt>
              <dd>{{ paymentLabel }}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>{{ formatPrice(order.total) }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div class="admin-order-side">
        <section class="admin-card admin-customer-card">
          <div class="admin-card-head">
            <h2>Customer</h2>
          </div>
          <div class="admin-customer">
            <span class="admin-avatar" aria-hidden="true">{{ initials }}</span>
            <div class="admin-customer-copy">
              <strong>{{ order.name }}</strong>
              <span>{{ order.city }}, {{ order.country }}</span>
            </div>
          </div>
          <ul class="admin-contact">
            <li>
              <a :href="`mailto:${order.email}`">
                <AdminIcon name="mail" :size="17" />
                <span>{{ order.email }}</span>
              </a>
            </li>
            <li>
              <a :href="`tel:${order.phone}`">
                <AdminIcon name="phone" :size="17" />
                <span>{{ order.phone }}</span>
              </a>
            </li>
          </ul>
          <div class="admin-address">
            <span class="admin-label">Shipping address</span>
            <address>
              <template v-if="order.address">{{ order.address }}<br></template>
              {{ order.city }}<template v-if="order.postalCode">, {{ order.postalCode }}</template><br>
              {{ order.country }}
            </address>
          </div>
        </section>

        <section class="admin-card admin-meta-card">
          <div class="admin-card-head">
            <h2>Order details</h2>
          </div>
          <dl class="admin-dl">
            <div>
              <dt>Order number</dt>
              <dd>#{{ order.id }}</dd>
            </div>
            <div>
              <dt>Placed</dt>
              <dd>{{ formatDate(order.createdAt) }}</dd>
            </div>
            <div>
              <dt>Items</dt>
              <dd>{{ itemCount }}</dd>
            </div>
          </dl>
        </section>

        <section v-if="order.notes" class="admin-card admin-notes-card">
          <div class="admin-card-head">
            <h2>Notes</h2>
          </div>
          <p class="admin-note">{{ order.notes }}</p>
        </section>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="admin-card admin-empty">
    <p>{{ error.data?.statusMessage || 'Order not found.' }}</p>
    <NuxtLink to="/admin/orders" class="btn btn-ghost">Back to orders</NuxtLink>
  </div>

  <div v-else class="admin-card admin-empty">
    <p>Loading order…</p>
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

const itemCount = computed(() => orderItems.value.reduce((sum, item) => sum + item.qty, 0))

const subtotal = computed(() =>
  orderItems.value.reduce((sum, item) => sum + item.price * item.qty, 0),
)

const paymentLabel = computed(() =>
  order.value?.paymentMethod === 'bank_transfer' ? 'Bank transfer' : 'Cash on delivery',
)

const initials = computed(() => {
  const parts = order.value?.name.trim().split(/\s+/).filter(Boolean) ?? []
  if (!parts.length) return '?'
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
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
