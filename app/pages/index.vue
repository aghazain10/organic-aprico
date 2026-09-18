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
const { count: cartCount, add: addToCart, openDrawer: openCart, getItemName, getVariantLabel, getVariantPrice, formatPrice } = useCart()
const toast = useToast()

function onAddToCart(product: string, size: string, qty: number) {
  addToCart(product, size, qty)
  const name = getItemName(product)
  const label = getVariantLabel(product, size)
  toast.show(`Added ${qty} x ${name} ${label} to cart`)
}

useSeoMeta({
  title: 'Organic Aprico | Pure Himalayan Shilajit from Skardu',
  description: 'Licensed extractor of gold-grade Himalayan shilajit from Skardu, Gilgit Baltistan. 73% fulvic acid, 8-stage purification, lab tested in California and Lahore. Resin, drops and wholesale.',
  ogTitle: 'Organic Aprico | Pure Himalayan Shilajit',
  ogDescription: 'Gold-grade Himalayan shilajit from 17,000 feet. 73% fulvic acid, 8-stage purification, lab tested. Resin, drops and wholesale.',
  ogSiteName: 'Organic Aprico',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>
