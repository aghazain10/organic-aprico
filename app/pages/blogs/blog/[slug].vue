<template>
  <div v-if="post">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main class="blog-post">
      <article class="wrap">
        <div class="post-header">
          <NuxtLink to="/blogs/blog" class="back-link">← Back to Blog</NuxtLink>
          <time :datetime="post.dateISO">{{ post.date }}</time>
          <h1>{{ post.title }}</h1>
        </div>
        <div class="post-hero">
          <img :src="post.heroImage" :alt="post.heroAlt" />
        </div>
        <div class="post-content" v-html="post.content" />
        <div class="post-footer">
          <NuxtLink to="/blogs/blog" class="btn btn-outline">← Back to Blog</NuxtLink>
        </div>
      </article>
    </main>
    <AppFooter />
  </div>
  <div v-else class="wrap" style="padding-top:160px;text-align:center;">
    <h1>Post not found</h1>
    <p class="muted">The blog post you are looking for does not exist.</p>
    <NuxtLink to="/blogs/blog" class="btn btn-gold" style="margin-top:1rem;">Back to Blog</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { getBlogPost } from '~/data/blogs'

const route = useRoute()
const slug = route.params.slug as string
const post = getBlogPost(slug)

const { count: cartCount, openDrawer: openCart } = useCart()

if (post) {
  useSeoMeta({
    title: `${post.title} | Organic Aprico Blog`,
    description: post.excerpt,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogImage: post.heroImage,
    ogType: 'article',
    articlePublishedTime: post.dateISO,
    articleSection: 'Shilajit',
  })
}
</script>

<style scoped>
.blog-post {
  padding: calc(var(--nav-h) + 2rem) 0 var(--section);
}
.post-header {
  max-width: 800px;
  margin: 0 auto 2rem;
}
.back-link {
  display: inline-block;
  color: var(--gold);
  font-size: .9rem;
  margin-bottom: 1rem;
  transition: color .2s;
}
.back-link:hover { color: var(--gold-bright); }

.post-header time {
  display: block;
  font-size: .85rem;
  color: var(--stone);
  margin-bottom: .5rem;
}
.post-header h1 {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  line-height: 1.2;
}

.post-hero {
  max-width: 900px;
  margin: 0 auto 2.5rem;
  border-radius: 4px;
  overflow: hidden;
}
.post-hero img {
  width: 100%;
  height: auto;
  display: block;
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--stone);
}
.post-content :deep(h2) {
  color: var(--cream);
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: .75rem;
}
.post-content :deep(h3) {
  color: var(--cream);
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: .5rem;
}
.post-content :deep(p) {
  margin-bottom: 1rem;
}
.post-content :deep(img) {
  width: 100%;
  border-radius: 4px;
  margin: 1.5rem 0;
}
.post-content :deep(blockquote) {
  border-left: 3px solid var(--gold);
  padding: .75rem 1.25rem;
  margin: 1.5rem 0;
  background: rgba(201, 162, 74, .04);
  border-radius: 0 4px 4px 0;
  color: var(--cream);
  font-style: italic;
}
.post-content :deep(ul),
.post-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.post-content :deep(li) {
  margin-bottom: .4rem;
}
.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: .92rem;
}
.post-content :deep(th),
.post-content :deep(td) {
  padding: .6rem .75rem;
  border: 1px solid var(--line);
  text-align: left;
}
.post-content :deep(th) {
  background: var(--ink);
  color: var(--cream);
  font-weight: 600;
}
.post-content :deep(strong) {
  color: var(--cream);
}

.post-footer {
  max-width: 800px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid var(--line-soft);
}
</style>
