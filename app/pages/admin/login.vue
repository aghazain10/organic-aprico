<template>
  <div class="admin-login">
    <form class="admin-login-card" @submit.prevent="submit">
      <h1>Admin login</h1>
      <p class="muted small">Organic Aprico control panel</p>

      <div class="field">
        <label for="admin-password">Password</label>
        <input
          id="admin-password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          autofocus
        >
      </div>

      <p v-if="error" class="admin-login-error">{{ error }}</p>

      <button type="submit" class="btn btn-gold btn-block" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    const { authenticated } = await $fetch<{ authenticated: boolean }>('/api/admin/me')
    if (authenticated) await navigateTo('/admin')
  } catch {
    /* stay on login */
  }
})

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    await navigateTo('/admin')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Admin Login | Organic Aprico',
  robots: 'noindex, nofollow',
})
</script>
