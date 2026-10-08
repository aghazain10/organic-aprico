<template>
  <div v-if="post">
    <AppNav :count="cartCount" @open-cart="openCart" />
    <div class="blog-breadcrumb">
      <div class="wrap">
        <NuxtLink to="/blogs/blog">← Back to Blog</NuxtLink>
      </div>
    </div>
    <main class="blog-post">
      <article class="wrap">
        <div class="post-header">
          <time :datetime="post.dateISO">{{ post.date }}</time>
          <span v-if="post.updated" class="post-updated">
            · Last updated <time :datetime="post.updatedISO">{{ post.updated }}</time>
          </span>
          <h1>{{ post.title }}</h1>
          <p class="post-byline">By <strong>Nawaz Ali</strong>, Skardu, Gilgit-Baltistan</p>
          <p class="post-author-bio">
            Nawaz Ali is from Skardu, Gilgit-Baltistan. He has studied shilajit personally for more
            than ten years, and his family has been in the shilajit business since 1972.
            <NuxtLink to="/pages/about-us">More about Organic Aprico</NuxtLink>
          </p>
        </div>
        <div class="post-hero">
          <img :src="post.heroImage" :alt="post.heroAlt" />
        </div>
        <div class="post-content" v-html="post.content" />
        <aside class="post-cta">
          <h2>{{ cta.heading }}</h2>
          <p>{{ cta.copy }}</p>
          <NuxtLink :to="cta.path" class="btn btn-gold">{{ cta.label }}</NuxtLink>
        </aside>
        <div class="post-footer">
          <NuxtLink to="/blogs/blog" class="btn btn-outline">← Back to Blog</NuxtLink>
        </div>
      </article>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { getBlogPost } from '~/data/blogs'
import { buildBreadcrumbJsonLd, absoluteUrl, SITE_URL } from '~/utils/seo'

const AUTHOR = {
  '@type': 'Person',
  name: 'Nawaz Ali',
  url: absoluteUrl('/pages/about-us'),
  description:
    'Nawaz Ali is from Skardu, Gilgit-Baltistan. He has studied shilajit personally for more than ten years, and his family has been in the shilajit business since 1972.',
  knowsAbout: ['Shilajit', 'Himalayan shilajit purification'],
  worksFor: { '@id': `${SITE_URL}/#organization` },
}

const route = useRoute()
const slug = route.params.slug as string
const post = getBlogPost(slug)

const { count: cartCount, openDrawer: openCart } = useCart()

// §5.3 internal linking: every post funnels to exactly one money page
const WHOLESALE_SLUGS = new Set([
  'uk-wholesale-shilajit-importing-organic-himalayan-resin-from-pakistan',
  'wholesale-shilajit-in-the-usa-market-growth-benefits-amp-bulk-supplier-guide',
  'things-to-consider-before-buying-shilajit-for-your-business',
  'shilajit-resin-in-the-usa-trends-opportunities-and-challenges',
])
const isWholesale = slug.includes('wholesale') || WHOLESALE_SLUGS.has(slug)
const cta = isWholesale
  ? {
      heading: 'Source shilajit wholesale from the extractor',
      copy: 'Bulk Himalayan resin with 73% fulvic acid, full lab reports and private label — direct from our Skardu production facility. MOQ 1 kg from Rs 95,000/kg.',
      path: '/products/pure-himalayan-shilajit-resin-wholesale',
      label: 'See wholesale pricing',
    }
  : {
      heading: 'Buy lab-tested Himalayan shilajit',
      copy: 'Gold-grade resin from 17,000 ft in Skardu — 73% fulvic acid, 8-stage purification, COD across Pakistan and worldwide shipping. From Rs 1,500.',
      path: '/products/shilajit',
      label: 'Shop shilajit resin',
    }

// An unknown slug must return a real 404 status, not a 200 with "not found" copy
// (soft 404s get indexed and waste crawl budget).
if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: `${post.title} | Organic Aprico Blog`,
  description: post.excerpt || post.title,
  ogTitle: post.title,
  ogDescription: post.excerpt || post.title,
  ogImage: post.heroImage,
  ogType: 'article',
  articlePublishedTime: post.dateISO,
  articleModifiedTime: post.updatedISO ?? post.dateISO,
  articleSection: 'Shilajit',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blogs/blog' },
        { name: post.title },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.title,
        image: absoluteUrl(post.heroImage),
        datePublished: post.dateISO,
        dateModified: post.updatedISO ?? post.dateISO,
        mainEntityOfPage: absoluteUrl(`/blogs/blog/${post.slug}`),
        author: AUTHOR,
        publisher: {
          '@type': 'Organization',
          name: 'Organic Aprico',
          logo: { '@type': 'ImageObject', url: 'https://organicaprico.com/images/logo.png' },
        },
      }),
    },
  ],
})
</script>

<style scoped>
.blog-post {
  padding-top: 1rem;
  padding-bottom: var(--section);
}

.blog-breadcrumb {
  padding: .75rem 0;
  margin-top: 76px;
  border-bottom: 1px solid var(--line-soft);
}
.blog-breadcrumb a {
  color: var(--gold);
  font-size: .9rem;
  transition: color .2s;
}
.blog-breadcrumb a:hover { color: var(--gold-bright); }

.post-header {
  max-width: 800px;
  margin: 0 auto 2rem;
}

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
.post-updated {
  font-size: .85rem;
  color: var(--stone);
}
.post-byline {
  margin-top: .6rem;
  font-size: .9rem;
  color: var(--gold);
}
.post-author-bio {
  margin-top: .5rem;
  font-size: .88rem;
  line-height: 1.6;
  color: var(--stone);
}
.post-author-bio a {
  color: var(--gold);
}
.post-author-bio a:hover { color: var(--gold-bright); }

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

.post-cta {
  max-width: 800px;
  margin: 2.5rem auto 0;
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--gold);
  border-radius: 4px;
  background: rgba(201, 162, 74, .05);
}
.post-cta h2 {
  font-size: 1.35rem;
  margin-bottom: .5rem;
}
.post-cta p {
  color: var(--stone);
  margin-bottom: 1.1rem;
}
</style>
