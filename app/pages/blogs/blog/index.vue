<template>
  <div>
    <AppNav :count="cartCount" @open-cart="openCart" />
    <main class="blog-listing">
      <div class="wrap">
        <h1>Blog</h1>
        <p class="muted">Insights on Himalayan Shilajit, health, and wellness from Organic Aprico.</p>
        <div class="blog-grid">
          <NuxtLink
            v-for="post in posts"
            :key="post.slug"
            :to="`/blogs/blog/${post.slug}`"
            class="blog-card"
          >
            <div class="blog-card-img">
              <img :src="post.heroImage" :alt="post.heroAlt" loading="lazy" />
            </div>
            <div class="blog-card-body">
              <time :datetime="post.dateISO">{{ post.date }}</time>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt }}</p>
              <span class="read-more">Read more →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { BLOG_POSTS } from '~/data/blogs'

const posts = BLOG_POSTS
const { count: cartCount, openDrawer: openCart } = useCart()

useSeoMeta({
  title: 'Blog | Organic Aprico – Himalayan Shilajit Insights',
  description: 'Read the latest articles on Himalayan Shilajit benefits, purity testing, dosage guides, and wellness tips from Organic Aprico.',
  ogTitle: 'Blog | Organic Aprico',
  ogDescription: 'Insights on Himalayan Shilajit, health, and wellness from Organic Aprico.',
})
</script>

<style scoped>
.blog-listing {
  padding: calc(76px + 2rem) 0 var(--section);
}
.blog-listing h1 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  margin-bottom: .25rem;
}
.blog-listing > .wrap > .muted {
  margin-bottom: 2.5rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line-soft);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color .25s var(--ease), transform .25s var(--ease);
  color: var(--cream);
}
.blog-card:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.blog-card-img {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--ink);
}
.blog-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s var(--ease);
}
.blog-card:hover .blog-card-img img {
  transform: scale(1.04);
}

.blog-card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-card-body time {
  font-size: .82rem;
  color: var(--stone);
  margin-bottom: .4rem;
  display: block;
}
.blog-card-body h2 {
  font-size: 1.15rem;
  line-height: 1.35;
  margin-bottom: .5rem;
}
.blog-card-body p {
  color: var(--stone);
  font-size: .92rem;
  line-height: 1.6;
  flex: 1;
}
.read-more {
  margin-top: .75rem;
  color: var(--gold);
  font-size: .9rem;
  font-weight: 500;
}

@media (max-width: 600px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
