<template>
  <section class="section" id="products">
    <div class="wrap">
      <div class="section-head">
        <h2>Our products</h2>
        <p>One source, three ways to take it.</p>
      </div>
      <div class="products">
        <ProductCard
          v-for="product in PRODUCTS"
          :key="product.key"
          :product="product"
          @add="onAdd"
          :detail-url="detailUrl(product.key)"
        />
      </div>
      <p class="fineprint">Prices in PKR. Money-back guarantee. Worldwide delivery in 10 to 12 business days.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PRODUCTS } from '~/data/products'

const emit = defineEmits<{ 'add-to-cart': [product: string, size: string, qty: number] }>()

function onAdd(product: string, size: string, qty: number) {
  emit('add-to-cart', product, size, qty)
}
</script>
