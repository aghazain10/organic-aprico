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
        <div class="nav-dropdown">
          <NuxtLink to="/products/shilajit" class="nav-dropdown-trigger">
            Shop
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </NuxtLink>
          <div class="nav-dropdown-menu">
            <NuxtLink to="/products/shilajit">
              <strong>Shilajit Resin</strong>
              <span>Gold-grade resin from Rs 1,500</span>
            </NuxtLink>
            <NuxtLink to="/products/shilajit-drops">
              <strong>Shilajit Drops</strong>
              <span>Liquid drops, 30ml &amp; 60ml</span>
            </NuxtLink>
            <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">
              <strong>Wholesale &amp; Private Label</strong>
              <span>Bulk resin from Rs 95,000/kg</span>
            </NuxtLink>
            <NuxtLink to="/blogs/blog">
              <strong>Shilajit Guides</strong>
              <span>Buying, purity and price guides</span>
            </NuxtLink>
          </div>
        </div>
        <a href="/#about">Shilajit</a>
        <a href="/#benefits">What's inside</a>
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
        <NuxtLink to="/products/shilajit" @click="close">Shilajit Resin</NuxtLink>
        <NuxtLink to="/products/shilajit-drops" @click="close">Shilajit Drops</NuxtLink>
        <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale" @click="close">Wholesale &amp; Private Label</NuxtLink>
        <NuxtLink to="/blogs/blog" @click="close">Shilajit Guides</NuxtLink>
        <a href="/#about" @click="close">Shilajit</a>
        <a href="/#benefits" @click="close">What's inside</a>
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
/* Shop dropdown: links stay in the DOM on every page so products and the blog
   are crawlable from the whole site, not just the homepage. */
.nav-dropdown {
  position: relative;
}
.nav-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
}
.nav-dropdown-trigger:hover { color: var(--cream); }
.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + .9rem);
  left: -.9rem;
  min-width: 17rem;
  display: flex;
  flex-direction: column;
  padding: .5rem;
  background: rgba(9, 8, 5, .97);
  border: 1px solid var(--line);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .45);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity .2s var(--ease), transform .2s var(--ease), visibility .2s;
}
.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown:focus-within .nav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: none;
}
.nav-dropdown-menu a {
  display: flex;
  flex-direction: column;
  gap: .15rem;
  padding: .6rem .8rem;
}
.nav-dropdown-menu a:hover { background: rgba(201, 162, 74, .07); }
.nav-dropdown-menu strong {
  font-weight: 500;
  color: var(--cream);
}
.nav-dropdown-menu span {
  font-size: .82rem;
  color: var(--stone);
}

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
    max-height: 640px;
    overflow-y: auto;
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
