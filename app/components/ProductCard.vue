<template>
  <article class="product">
    <div class="product-art">
      <svg v-if="product.key === 'resin'" viewBox="0 0 300 400" aria-hidden="true">
        <rect x="88" y="34" width="124" height="46" rx="9" fill="url(#g-gold-h)"/>
        <rect x="100" y="80" width="100" height="26" fill="url(#g-glass)"/>
        <path d="M72 108h156a22 22 0 0 1 22 22v206a22 22 0 0 1-22 22H72a22 22 0 0 1-22-22V130a22 22 0 0 1 22-22z" fill="url(#g-resin)"/>
        <path d="M72 108h156a22 22 0 0 1 22 22v206a22 22 0 0 1-22 22H72a22 22 0 0 1-22-22V130a22 22 0 0 1 22-22z" fill="url(#g-glass)"/>
        <path d="M66 140c0-14 6-22 18-22h12v220H84c-12 0-18-8-18-22z" fill="#fff" opacity=".07"/>
        <rect x="50" y="210" width="200" height="72" fill="#0a0805" opacity=".9"/>
        <rect x="50" y="210" width="200" height="1" fill="#C9A24A" opacity=".8"/>
        <rect x="50" y="281" width="200" height="1" fill="#C9A24A" opacity=".8"/>
        <text x="150" y="240" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="600" font-size="17" fill="#E9CD84">Organic Aprico</text>
        <text x="150" y="262" text-anchor="middle" font-family="Manrope, sans-serif" font-size="9.5" fill="#C9A24A">Pure Himalayan Shilajit</text>
      </svg>
      <svg v-else-if="product.key === 'drops'" viewBox="0 0 300 400" aria-hidden="true">
        <rect x="128" y="22" width="44" height="34" rx="16" fill="#0d0b08" stroke="#3a3224" stroke-width="1"/>
        <rect x="112" y="54" width="76" height="46" rx="6" fill="url(#g-gold-h)"/>
        <rect x="130" y="100" width="40" height="18" fill="url(#g-glass)"/>
        <path d="M96 118h108a18 18 0 0 1 18 18v212a18 18 0 0 1-18 18H96a18 18 0 0 1-18-18V136a18 18 0 0 1 18-18z" fill="url(#g-liquid)"/>
        <path d="M96 118h108a18 18 0 0 1 18 18v212a18 18 0 0 1-18 18H96a18 18 0 0 1-18-18V136a18 18 0 0 1 18-18z" fill="url(#g-glass)"/>
        <line x1="150" y1="100" x2="150" y2="320" stroke="#3a3224" stroke-width="3"/>
        <path d="M150 320c-6 8-6 14 0 20 6-6 6-12 0-20z" fill="#E9CD84" opacity=".9"/>
        <path d="M90 150c0-12 5-18 14-18h8v190h-8c-9 0-14-6-14-18z" fill="#fff" opacity=".07"/>
        <rect x="78" y="212" width="144" height="64" fill="#0a0805" opacity=".9"/>
        <rect x="78" y="212" width="144" height="1" fill="#C9A24A" opacity=".8"/>
        <rect x="78" y="275" width="144" height="1" fill="#C9A24A" opacity=".8"/>
        <text x="150" y="240" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="600" font-size="15" fill="#E9CD84">Organic Aprico</text>
        <text x="150" y="260" text-anchor="middle" font-family="Manrope, sans-serif" font-size="9" fill="#C9A24A">Shilajit Drops</text>
      </svg>
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
