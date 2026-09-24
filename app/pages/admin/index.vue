<template>
  <div>
    <div class="admin-page-head">
      <div>
        <h1>Dashboard</h1>
        <p class="muted small">Store overview at a glance.</p>
      </div>
      <NuxtLink to="/admin/orders" class="btn btn-ghost">View all orders</NuxtLink>
    </div>

    <div v-if="stats" class="admin-stats">
      <AdminStatCard label="Total orders" :value="String(stats.totalOrders)" />
      <AdminStatCard label="Pending" :value="String(stats.pendingOrders)" hint="Needs attention" />
      <AdminStatCard label="Revenue" :value="formatPrice(stats.totalRevenue)" hint="Excl. cancelled" />
      <AdminStatCard label="This week" :value="String(stats.ordersThisWeek)" hint="Last 7 days" />
    </div>

    <section class="admin-card">
      <div class="admin-card-head">
        <h2>Recent orders</h2>
        <NuxtLink to="/admin/orders" class="text-link">See all</NuxtLink>
      </div>
      <AdminOrdersTable :orders="recentOrders" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder } from '#shared/utils/order'
import { formatPrice } from '~/data/products'

definePageMeta({ layout: 'admin' })

interface Stats {
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  ordersThisWeek: number
}

const { data: stats } = await useFetch<Stats>('/api/admin/stats', { server: false })
const { data: recent } = await useFetch<{ orders: AdminOrder[] }>('/api/admin/orders', {
  server: false,
  query: { page: 1 },
})

const recentOrders = computed(() => recent.value?.orders ?? [])

useSeoMeta({
  title: 'Admin Dashboard | Organic Aprico',
  robots: 'noindex, nofollow',
})
</script>
