<template>
  <header class="nav" :class="{ scrolled }">
    <div class="wrap nav-inner">
      <a href="/#top" class="brand">
        <img src="/images/logo.png" alt="" width="46" height="46" class="brand-logo">
        <span class="brand-copy">
          Organic Aprico
          <span class="brand-sub">Skardu, Gilgit Baltistan</span>
        </span>
      </a>
      <nav class="nav-links" aria-label="Main">
        <a href="/#about">Shilajit</a>
        <a href="/#products">Products</a>
        <a href="/#benefits">Benefits</a>
        <a href="/#purification">Purification</a>
        <a href="/#difference">Why us</a>
      </nav>
      <div class="nav-actions">
        <button class="cart-btn" aria-label="Open cart" @click="emit('open-cart')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 7h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7z"/>
            <path d="M9 7V5.5a3 3 0 0 1 6 0V7"/>
          </svg>
          <span class="cart-label">Cart</span>
          <span class="cart-count">{{ count }}</span>
        </button>
        <button class="menu-btn" aria-label="Open menu" @click="menuOpen = !menuOpen">
          <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <nav class="mobile-nav" aria-label="Mobile">
        <a href="/#about" @click="close">Shilajit</a>
        <a href="/#products" @click="close">Products</a>
        <a href="/#benefits" @click="close">Benefits</a>
        <a href="/#purification" @click="close">Purification</a>
        <a href="/#difference" @click="close">Why us</a>
        <NuxtLink to="/purification" @click="close">Purification Process</NuxtLink>
        <NuxtLink to="/certifications" @click="close">Certifications</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ count: number }>()
const emit = defineEmits<{ 'open-cart': [] }>()

const scrolled = ref(false)
const menuOpen = ref(false)

function close() {
  menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(menuOpen, (open) => {
  if (import.meta.server) return
  document.body.classList.toggle('no-scroll', open)
})
</script>

<style scoped>
.nav-actions {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.menu-btn {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  color: var(--cream);
  transition: border-color .25s var(--ease);
}
.menu-btn:hover { border-color: var(--gold); }

.mobile-menu {
  display: none;
}

@media (max-width: 820px) {
  .nav-links { display: none; }
  .menu-btn { display: inline-flex; }
  .cart-label { display: none; }
  .cart-btn { padding: .55rem .7rem; }

  .mobile-menu {
    display: block;
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    background: rgba(7, 6, 4, .95);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
    max-height: 0;
    overflow: hidden;
    transition: max-height .35s var(--ease);
  }
  .mobile-menu.open {
    max-height: 400px;
  }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: .5rem 0;
  }
  .mobile-nav a {
    display: block;
    padding: .85rem var(--gutter);
    color: var(--stone);
    font-size: .98rem;
    transition: color .2s, background-color .2s;
  }
  .mobile-nav a:hover {
    color: var(--cream);
    background: rgba(201, 162, 74, .06);
  }
}
</style>
