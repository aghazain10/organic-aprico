<template>
  <div class="cart-item">
    <span class="cart-item-name">{{ getItemName(item.product) }}</span>
    <span class="cart-item-price">{{ formatPrice(getVariantPrice(item.product, item.size) * item.qty) }}</span>
    <span class="cart-item-size">{{ getVariantLabel(item.product, item.size) }} at {{ formatPrice(getVariantPrice(item.product, item.size)) }} each</span>
    <div class="cart-item-controls">
      <div class="qty">
        <button type="button" aria-label="Decrease" @click="emit('updateQty', -1)">&minus;</button>
        <output>{{ item.qty }}</output>
        <button type="button" aria-label="Increase" @click="emit('updateQty', 1)">+</button>
      </div>
      <button type="button" class="remove" @click="emit('remove')">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/composables/useCart'

defineProps<{
  item: CartItem
  index: number
}>()

const emit = defineEmits<{
  'updateQty': [delta: number]
  'remove': []
}>()

const { getItemName, getVariantLabel, getVariantPrice, formatPrice } = useCart()
</script>
