<template>
  <div class="site-page-breadcrumb">
    <div class="wrap">
      <NuxtLink to="/">&larr; Back to home</NuxtLink>
    </div>
  </div>
  <main class="site-page">
    <article class="wrap">
      <header class="site-page-header">
        <h1>{{ page.title }}</h1>
      </header>
      <div class="site-page-content" v-html="page.content" />
    </article>
  </main>
</template>

<script setup lang="ts">
import type { SitePage } from '~/data/pages'

defineProps<{ page: SitePage }>()
</script>

<style scoped>
.site-page-breadcrumb {
  padding: 0.75rem 0;
  margin-top: 76px;
  border-bottom: 1px solid var(--line-soft);
}
.site-page-breadcrumb a {
  color: var(--gold);
  font-size: 0.9rem;
  transition: color 0.2s;
}
.site-page-breadcrumb a:hover {
  color: var(--gold-bright);
}

.site-page {
  padding-top: 2.5rem;
  padding-bottom: var(--section);
}

.site-page-header {
  max-width: 800px;
  margin: 0 auto 2rem;
}
.site-page-header h1 {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  line-height: 1.2;
}

.site-page-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.02rem;
  line-height: 1.8;
  color: var(--stone);
}
.site-page-content :deep(h2) {
  color: var(--cream);
  font-size: 1.4rem;
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
}
.site-page-content :deep(h3) {
  color: var(--cream);
  font-size: 1.15rem;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
}
.site-page-content :deep(h4) {
  color: var(--cream);
  font-size: 1.02rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.site-page-content :deep(p) {
  margin-bottom: 1rem;
}
.site-page-content :deep(ul),
.site-page-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.site-page-content :deep(li) {
  margin-bottom: 0.4rem;
}
.site-page-content :deep(a) {
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.site-page-content :deep(a:hover) {
  color: var(--gold-bright);
}
.site-page-content :deep(strong) {
  color: var(--cream);
}
.site-page-content :deep(blockquote) {
  border-left: 3px solid var(--gold);
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background: rgba(201, 162, 74, 0.04);
  border-radius: 0 4px 4px 0;
  color: var(--cream);
  font-style: italic;
}
.site-page-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.92rem;
}
.site-page-content :deep(th),
.site-page-content :deep(td) {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}
.site-page-content :deep(th) {
  background: var(--ink);
  color: var(--cream);
  font-weight: 600;
}
.site-page-content :deep(img) {
  max-width: 100%;
  border-radius: 4px;
  margin: 1.5rem 0;
}
</style>
