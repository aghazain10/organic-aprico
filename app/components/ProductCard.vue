<template>
  <article class="product">
    <div class="product-art">
      <img
        v-if="product.key === 'resin'"
        src="/images/products/shilajit-resin-product.png"
        alt="Organic Aprico pure Himalayan shilajit resin jar"
        width="612"
        height="408"
      />
      <img
        v-else-if="product.key === 'drops'"
        src="/images/products/shilajit-drops-product.png"
        alt="Organic Aprico pure Himalayan shilajit drops bottle"
        width="456"
        height="547"
      />
      <svg v-else viewBox="0 0 300 400" aria-hidden="true">
        <ellipse cx="150" cy="330" rx="104" ry="26" fill="url(#g-steel)"/>
        <rect x="46" y="90" width="208" height="240" fill="url(#g-steel)"/>
        <ellipse cx="150" cy="90" rx="104" ry="26" fill="#6b6b6b"/>
        <ellipse cx="150" cy="90" rx="96" ry="22" fill="#2a2a2a"/>
        <ellipse cx="150" cy="88" rx="96" ry="22" fill="url(#g-resin)"/>
        <path d="M70 92c20-10 60-14 80-14s60 4 80 14" stroke="#C9A24A" stroke-width="1" fill="none" opacity=".5"/>
        <rect x="46" y="120" width="208" height="3" fill="#1a1a1a" opacity=".6"/>
        <rect x="46" y="296" width="208" height="3" fill="#1a1a1a" opacity=".6"/>
        <rect x="46" y="176" width="208" height="70" fill="#0a0805" opacity=".92"/>
        <rect x="46" y="176" width="208" height="1" fill="#C9A24A"/>
        <rect x="46" y="245" width="208" height="1" fill="#C9A24A"/>
        <text x="150" y="205" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="600" font-size="16" fill="#E9CD84">Organic Aprico</text>
        <text x="150" y="226" text-anchor="middle" font-family="Manrope, sans-serif" font-size="9.5" fill="#C9A24A">Raw Shilajit Resin, export grade</text>
      </svg>
    </div>
    <div class="product-body">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="sizes" role="radiogroup" aria-label="Choose size">
        <button
          v-for="size in product.sizes"
          :key="size.id"
          type="button"
          class="size"
          role="radio"
          :aria-checked="selectedSize === size.id"
          :tabindex="selectedSize === size.id ? 0 : -1"
          @click="selectedSize = size.id"
          @keydown="onKeydown($event, size.id)"
        >
          {{ size.label }}
        </button>
      </div>
      <div class="buy-row">
        <div class="price">
          <span class="price-now">{{ formatPrice(currentSize.price) }}</span>
          <span v-if="currentSize.was" class="price-was">{{ formatPrice(currentSize.was) }}</span>
        </div>
        <div class="qty" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" @click="qty = Math.max(1, qty - 1)">&minus;</button>
          <output>{{ qty }}</output>
          <button type="button" aria-label="Increase quantity" @click="qty++">+</button>
        </div>
      </div>
      <button type="button" class="btn btn-gold add-btn" @click="onAdd">
        {{ justAdded ? 'Added' : 'Add to cart' }}
      </button>
      <NuxtLink v-if="detailUrl" :to="detailUrl" class="text-link product-detail-link">View details →</NuxtLink>
      <a
        v-if="product.key === 'wholesale'"
        class="text-link"
        href="https://wa.me/923311116915?text=Hi%20Organic%20Aprico%2C%20I%20would%20like%20a%20wholesale%20quote%20for%20shilajit%20resin."
        target="_blank"
        rel="noopener"
      >
        Need 10 kg or more? Ask for a quote
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { type Product, formatPrice } from '~/data/products'

const props = defineProps<{ product: Product; detailUrl?: string }>()
const emit = defineEmits<{ add: [product: string, size: string, qty: number] }>()

const selectedSize = ref(props.product.defaultSize)
const qty = ref(1)
const justAdded = ref(false)

const currentSize = computed(() =>
  props.product.sizes.find((s) => s.id === selectedSize.value)!
)

function onKeydown(e: KeyboardEvent, sizeId: string) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const sizes = props.product.sizes
  const idx = sizes.findIndex((s) => s.id === sizeId)
  const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + sizes.length) % sizes.length
  selectedSize.value = sizes[next].id
}

function onAdd() {
  emit('add', props.product.key, selectedSize.value, qty.value)
  justAdded.value = true
  qty.value = 1
  setTimeout(() => { justAdded.value = false }, 1400)
}
</script>
