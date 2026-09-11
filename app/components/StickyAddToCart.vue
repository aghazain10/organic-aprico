<template>
  <div class="sticky-bar" :class="{ visible: show }">
    <div class="sticky-inner">
      <div class="sticky-info">
        <span class="sticky-name">Shilajit Resin</span>
        <span class="sticky-price">{{ formatPrice(currentSize.price) }}</span>
      </div>
      <div class="sticky-actions">
        <select v-model="selectedSize" class="sticky-select" aria-label="Choose size">
          <option v-for="size in resin.sizes" :key="size.id" :value="size.id">
            {{ size.label }}
          </option>
        </select>
        <button type="button" class="btn btn-gold sticky-btn" @click="onAdd">
          {{ justAdded ? 'Added' : 'Add to cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS, formatPrice } from '~/data/products'

const resin = PRODUCTS.find((p) => p.key === 'resin')!
const selectedSize = ref(resin.defaultSize)
const justAdded = ref(false)
const show = ref(false)

const emit = defineEmits<{ add: [product: string, size: string, qty: number] }>()

const currentSize = computed(() =>
  resin.sizes.find((s) => s.id === selectedSize.value)!
)

function onAdd() {
  emit('add', 'resin', selectedSize.value, 1)
  justAdded.value = true
  setTimeout(() => { justAdded.value = false }, 1400)
}

function onScroll() {
  show.value = window.scrollY > 600
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.sticky-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 45;
  background: rgba(7, 6, 4, .95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid var(--line);
  transform: translateY(100%);
  transition: transform .35s var(--ease);
}
.sticky-bar.visible {
  transform: none;
}

.sticky-inner {
  width: min(var(--wrap), 100% - 2 * var(--gutter));
  margin-inline: auto;
  padding: .75rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
}

.sticky-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sticky-name {
  font-family: var(--serif);
  font-weight: 600;
  font-size: .95rem;
  color: var(--cream);
  white-space: nowrap;
}
.sticky-price {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--gold-bright);
}

.sticky-actions {
  display: flex;
  align-items: center;
  gap: .5rem;
  flex-shrink: 0;
}
.sticky-select {
  padding: .55rem .6rem;
  font: inherit;
  font-size: .88rem;
  color: var(--cream);
  background: var(--black);
  border: 1px solid var(--line);
  border-radius: 2px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9080' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right .5rem center;
  padding-right: 1.8rem;
}
.sticky-select option { background: var(--ink); }
.sticky-btn {
  padding: .6rem 1rem;
  font-size: .9rem;
  white-space: nowrap;
}

@media (max-width: 820px) {
  .sticky-bar { display: block; }
}
</style>
