<template>
  <div
    class="drawer-backdrop"
    :class="{ show: open }"
    :hidden="!open"
    @click="close"
  />
  <aside
    class="drawer"
    :class="{ open }"
    aria-label="Shopping cart"
    :aria-hidden="!open"
  >
    <div class="drawer-head">
      <h2>Your cart</h2>
      <button type="button" class="icon-btn" aria-label="Close cart" @click="close">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>
    </div>
    <div class="drawer-items">
      <p v-if="!items.length" class="cart-empty">
        Your cart is empty. Choose a size above to add shilajit.
      </p>
      <CartItem
        v-for="(item, index) in items"
        :key="item.product + item.size"
        :item="item"
        :index="index"
        @update-qty="(d: number) => updateQty(index, d)"
        @remove="remove(index)"
      />
    </div>
    <div class="drawer-foot">
      <div class="drawer-total">
        <span>Subtotal</span>
        <strong>{{ formatPrice(total) }}</strong>
      </div>
      <p class="muted small">Shipping is calculated at checkout. Money-back guarantee applies.</p>
      <NuxtLink
        v-if="items.length"
        class="btn btn-gold btn-block"
        to="/checkout"
        @click="close"
      >
        Proceed to checkout
      </NuxtLink>
      <a
        v-else
        class="btn btn-gold btn-block"
        href="/#products"
      >
        Browse products
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { items, open, total, closeDrawer, formatPrice, updateQty, remove } = useCart()

function close() {
  closeDrawer()
}
</script>
