<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <NuxtLink to="/admin" class="admin-brand" aria-label="Organic Aprico admin dashboard">
        <span class="admin-brand-mark" aria-hidden="true">OA</span>
        <span class="admin-brand-copy">
          Organic Aprico
          <small>Admin</small>
        </span>
      </NuxtLink>

      <nav class="admin-side-nav" aria-label="Admin">
        <NuxtLink to="/admin" class="admin-nav-item" exact-active-class="active">
          <AdminIcon name="dashboard" :size="19" />
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/orders" class="admin-nav-item" active-class="active">
          <AdminIcon name="orders" :size="19" />
          Orders
        </NuxtLink>
        <a href="/" target="_blank" rel="noopener" class="admin-nav-item">
          <AdminIcon name="store" :size="19" />
          View store
        </a>
      </nav>

      <div class="admin-sidebar-foot">
        <button type="button" class="admin-nav-item" @click="logout">
          <AdminIcon name="logout" :size="19" />
          Log out
        </button>
      </div>
    </aside>

    <div class="admin-frame">
      <header class="admin-topbar">
        <div class="admin-topbar-copy">
          <span>Organic Aprico</span>
          <strong>{{ pageTitle }}</strong>
        </div>
        <button type="button" class="admin-icon-btn" aria-label="Log out" @click="logout">
          <AdminIcon name="logout" :size="20" />
        </button>
      </header>

      <main class="admin-main">
        <slot />
      </main>
    </div>

    <nav class="admin-tabbar" aria-label="Admin">
      <NuxtLink to="/admin" class="admin-tab" exact-active-class="active">
        <AdminIcon name="dashboard" :size="21" />
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink to="/admin/orders" class="admin-tab" active-class="active">
        <AdminIcon name="orders" :size="21" />
        <span>Orders</span>
      </NuxtLink>
      <a href="/" target="_blank" rel="noopener" class="admin-tab">
        <AdminIcon name="store" :size="21" />
        <span>Store</span>
      </a>
    </nav>

    <AppToast />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path === '/admin/orders') return 'Orders'
  if (route.path.startsWith('/admin/orders/')) return `Order #${route.params.id}`
  return 'Admin'
})

async function logout() {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
  } finally {
    router.push('/admin/login')
  }
}
</script>
