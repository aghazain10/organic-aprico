<template>
  <div>
    <div class="admin-page-head">
      <div>
        <h1>Orders</h1>
        <p class="muted small">{{ total }} order{{ total === 1 ? '' : 's' }} total</p>
      </div>
    </div>

    <div class="admin-toolbar">
      <div class="admin-filters" role="tablist" aria-label="Filter by status">
        <button
          v-for="opt in statusOptions"
          :key="opt.value"
          type="button"
          class="admin-filter"
          :class="{ active: status === opt.value }"
          role="tab"
          :aria-selected="status === opt.value"
          @click="setStatus(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
      <input
        v-model="searchInput"
        type="search"
        class="admin-search"
        placeholder="Search name, email, phone or order ID"
        aria-label="Search orders"
      >
    </div>

    <section class="admin-card">
      <AdminOrdersTable :orders="orders" :loading="pending" />
      <AdminPagination
        v-if="pageCount > 1"
        :page="page"
        :page-count="pageCount"
        @change="setPage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder } from '#shared/utils/order'
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from '#shared/utils/order'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()

const statusOptions = [
  { value: '', label: 'All' },
  ...ORDER_STATUSES.map((s) => ({ value: s as string, label: ORDER_STATUS_LABELS[s] })),
]

const search = computed(() => (typeof route.query.search === 'string' ? route.query.search : ''))
const status = computed(() => (typeof route.query.status === 'string' ? route.query.status : ''))
const page = computed(() => Math.max(1, Number(route.query.page) || 1))

const searchInput = ref(search.value)
let searchTimer: ReturnType<typeof setTimeout> | null = null

watch(searchInput, (value) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => updateQuery({ search: value || undefined, page: undefined }), 350)
})

interface OrdersResponse {
  orders: AdminOrder[]
  total: number
  page: number
  pageCount: number
}

const { data, pending } = await useFetch<OrdersResponse>('/api/admin/orders', {
  server: false,
  query: computed(() => ({
    page: page.value,
    status: status.value || undefined,
    search: search.value || undefined,
  })),
})

const orders = computed(() => data.value?.orders ?? [])
const total = computed(() => data.value?.total ?? 0)
const pageCount = computed(() => data.value?.pageCount ?? 1)

function updateQuery(patch: Record<string, string | number | undefined>) {
  router.replace({ query: { ...route.query, ...patch } })
}

function setStatus(value: string) {
  updateQuery({ status: value || undefined, page: undefined })
}

function setPage(value: number) {
  updateQuery({ page: value > 1 ? value : undefined })
}

useSeoMeta({
  title: 'Orders | Organic Aprico Admin',
  robots: 'noindex, nofollow',
})
</script>
