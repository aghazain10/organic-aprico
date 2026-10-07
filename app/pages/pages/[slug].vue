<template>
  <div v-if="page">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <SitePageView :page="page" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { getSitePage } from '~/data/pages'

const route = useRoute()
const { count: cartCount, openDrawer: openCart } = useCart()

const page = getSitePage(route.path)

// An unknown slug must return a real 404 status, not a 200 with "not found" copy
// (soft 404s get indexed and waste crawl budget).
if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: `${page.title} | Organic Aprico`,
  description: page.description,
  ogTitle: page.title,
  ogDescription: page.description,
  ogType: 'website',
})
</script>
