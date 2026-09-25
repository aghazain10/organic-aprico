<template>
  <div v-if="page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <SitePageView :page="page" />
    <AppFooter />
  </div>
  <div v-else class="wrap page-not-found">
    <h1>Page not found</h1>
    <p class="muted">The page you are looking for does not exist.</p>
    <NuxtLink to="/" class="btn btn-gold">Back to home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { getSitePage } from '~/data/pages'

const route = useRoute()
const { count: cartCount, openDrawer: openCart } = useCart()

const page = getSitePage(route.path)

if (page) {
  useSeoMeta({
    title: `${page.title} | Organic Aprico`,
    description: page.description,
    ogTitle: page.title,
    ogDescription: page.description,
    ogType: 'website',
  })
} else {
  useSeoMeta({ title: 'Page not found | Organic Aprico' })
}
</script>

<style scoped>
.page-not-found {
  padding-top: 160px;
  padding-bottom: var(--section);
  text-align: center;
}
.page-not-found .btn {
  margin-top: 1rem;
}
</style>
