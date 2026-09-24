<template>
  <div class="admin-shell">
    <header class="admin-topbar">
      <div class="admin-topbar-inner">
        <NuxtLink to="/admin" class="admin-brand">
          Organic Aprico
          <span>Admin</span>
        </NuxtLink>
        <nav class="admin-nav">
          <NuxtLink to="/admin">Dashboard</NuxtLink>
          <NuxtLink to="/admin/orders">Orders</NuxtLink>
          <button type="button" class="admin-logout" @click="logout">Log out</button>
        </nav>
      </div>
    </header>
    <main class="admin-main">
      <slot />
    </main>
    <AppToast />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

async function logout() {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
  } finally {
    router.push('/admin/login')
  }
}
</script>
