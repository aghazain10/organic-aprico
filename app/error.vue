<template>
  <div class="error-page">
    <SvgGradients />
    <AppNav :count="cartCount" @open-cart="openCart" />

    <main class="error-main">
      <div class="wrap error-inner">
        <p class="error-code">{{ statusCode }}</p>
        <h1>{{ heading }}</h1>
        <p class="error-lead">
          {{ lead }}
        </p>

        <div class="error-actions">
          <a href="/" class="btn btn-gold" @click.prevent="go('/')">Back to home</a>
          <a href="/blogs/blog" class="btn btn-ghost" @click.prevent="go('/blogs/blog')">Read the blog</a>
        </div>

        <div class="error-products">
          <h2>Our shilajit</h2>
          <div class="error-grid">
            <a
              v-for="item in products"
              :key="item.path"
              :href="item.path"
              class="related-card"
              @click.prevent="go(item.path)"
            >
              <div class="related-card-img">
                <img :src="item.image" :alt="item.title" loading="lazy" />
              </div>
              <div class="related-card-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.copy }}</p>
                <span class="related-card-price">{{ item.price }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
    <CartDrawer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const { count: cartCount, openDrawer: openCart } = useCart()

const statusCode = computed(() => props.error?.statusCode ?? 500)
const isNotFound = computed(() => statusCode.value === 404)

const heading = computed(() =>
  isNotFound.value ? 'This page has gone missing' : 'Something went wrong'
)

const lead = computed(() => {
  if (isNotFound.value) {
    return 'The page you are looking for does not exist or has moved. Our shilajit range is right here — or head back to the homepage.'
  }
  return 'We hit an unexpected error. Please try again in a moment, or jump straight to our shilajit range.'
})

const products = [
  {
    path: '/products/shilajit',
    title: 'Shilajit Resin',
    copy: 'Gold-grade Himalayan resin, 73% fulvic acid, lab tested. From Rs 1,500.',
    price: 'From Rs 1,500',
    image: '/images/products/shilajit-resin-jar-spoon.jpg',
  },
  {
    path: '/products/shilajit-drops',
    title: 'Shilajit Drops',
    copy: 'Liquid shilajit dissolved in glacier water. 9 drops twice a day.',
    price: 'From Rs 2,000',
    image: '/images/products/shilajit-drops-hero.png',
  },
  {
    path: '/products/pure-himalayan-shilajit-resin-wholesale',
    title: 'Wholesale Resin',
    copy: 'Bulk shilajit for resellers, brands and retailers. Private label available.',
    price: 'From Rs 95,000/kg',
    image: '/images/products/wholesale-hero.jpg',
  },
]

function go(path: string) {
  clearError({ redirect: path })
}

useSeoMeta({
  title: computed(() =>
    isNotFound.value ? 'Page not found | Organic Aprico' : 'Error | Organic Aprico'
  ),
  robots: 'noindex, nofollow',
})
</script>

<style scoped>
.error-main {
  min-height: 100vh;
  padding: clamp(120px, 18vh, 200px) 0 var(--section);
}
.error-code {
  font-family: var(--serif);
  font-size: clamp(4rem, 14vw, 9rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--gold);
  opacity: .9;
}
.error-inner h1 {
  margin-top: .5rem;
  font-size: clamp(1.9rem, 4vw, 3rem);
}
.error-lead {
  margin-top: 1rem;
  max-width: 44rem;
  color: var(--stone);
}
.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .9rem;
  margin-top: 2rem;
}
.error-products {
  margin-top: clamp(3rem, 8vw, 5rem);
}
.error-products h2 {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  margin-bottom: 1.5rem;
}
.error-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.error-grid .related-card {
  display: block;
  background: var(--ink);
  border: 1px solid var(--line-soft);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color .25s var(--ease), transform .25s var(--ease);
}
.error-grid .related-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}
.error-grid .related-card-img {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--ink-2);
}
.error-grid .related-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 900px) {
  .error-grid { grid-template-columns: 1fr; }
}
</style>
