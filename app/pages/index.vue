<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main id="top">
      <HeroSection />
      <AboutSection />
      <ProductsSection @add-to-cart="onAddToCart" />
      <BenefitsSection />
      <PurificationSection />
      <ComparisonTable />
      <CertificationsSection />
      <FaqSection />
      <BlogPreview />
    </main>
    <AppFooter />
    <AltitudeRail />
    <CartDrawer />
    <StickyAddToCart @add="onAddToCart" />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS } from '~/data/products'
import { trackViewItemList } from '~/utils/analytics'

const { count: cartCount, add: addToCart, openDrawer: openCart, getItemName, getVariantLabel, getVariantPrice, formatPrice } = useCart()
const toast = useToast()

onMounted(() => {
  trackViewItemList('homepage_products', PRODUCTS.map(p => ({ product: p.key, size: p.defaultSize, qty: 1 })))
})

function onAddToCart(product: string, size: string, qty: number) {
  addToCart(product, size, qty)
  const name = getItemName(product)
  const label = getVariantLabel(product, size)
  toast.show(`Added ${qty} x ${name} ${label} to cart`)
}

useSeoMeta({
  title: 'Organic Aprico | Pure Himalayan Shilajit from Skardu',
  description: 'Licensed extractor of gold-grade Himalayan shilajit from Skardu, Gilgit Baltistan. 73% fulvic acid + humic acid, 8-stage purification, lab tested by PCSIR and Eurofins. Resin, drops and wholesale.',
  ogTitle: 'Organic Aprico | Pure Himalayan Shilajit',
  ogDescription: 'Gold-grade Himalayan shilajit from 17,000 feet. 73% fulvic acid + humic acid, 8-stage purification, lab tested. Resin, drops and wholesale.',
  ogSiteName: 'Organic Aprico',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>
