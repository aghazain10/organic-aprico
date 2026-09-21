<template>
  <section class="section" id="blog">
    <div class="wrap">
      <div class="blog-head">
        <div>
          <h2>From our blog</h2>
          <p>Research, guides and everything about Himalayan shilajit.</p>
        </div>
        <div class="blog-nav">
          <button type="button" class="blog-arrow" :disabled="!canPrev" aria-label="Previous" @click="prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="blog-arrow" :disabled="!canNext" aria-label="Next" @click="next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="blog-track" ref="track">
        <article v-for="post in posts" :key="post.slug" class="blog-card">
          <NuxtLink :to="`/blogs/blog/${post.slug}`" class="blog-card-link">
            <div class="blog-thumb">
              <img
                :src="post.heroImage"
                :alt="post.heroAlt"
                loading="lazy"
                width="400"
                height="240"
              >
            </div>
            <div class="blog-card-body">
              <span class="blog-date">{{ post.date }}</span>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <span class="blog-read">Read more &rarr;</span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div class="blog-dots" aria-hidden="true">
        <span
          v-for="(_, i) in totalDots"
          :key="i"
          class="blog-dot"
          :class="{ active: i === current }"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getRecentPosts } from '~/data/blogs'

const posts = getRecentPosts(6)

const track = ref<HTMLElement | null>(null)
const current = ref(0)

function getPerView() {
  if (import.meta.server) return 3
  return window.innerWidth <= 820 ? 1 : 3
}

const totalDots = computed(() => {
  const perView = getPerView()
  return Math.max(1, posts.length - perView + 1)
})

const canPrev = computed(() => current.value > 0)
const canNext = computed(() => current.value < posts.length - getPerView())

function prev() {
  if (canPrev.value) current.value--
}

function next() {
  if (canNext.value) current.value++
}

watch(current, (val) => {
  if (!track.value) return
  const card = track.value.querySelector('.blog-card') as HTMLElement
  if (!card) return
  const gap = 24
  track.value.scrollTo({ left: val * (card.offsetWidth + gap), behavior: 'smooth' })
})

onMounted(() => {
  if (!track.value) return
  let startX = 0
  let scrolling = false

  track.value.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    scrolling = true
  }, { passive: true })

  track.value.addEventListener('touchend', (e) => {
    if (!scrolling) return
    scrolling = false
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }, { passive: true })
})
</script>

<style scoped>
.blog-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  gap: 1rem;
}
.blog-head h2 { margin-bottom: .6rem; }
.blog-head p { color: var(--stone); font-size: 1.05rem; }

.blog-nav {
  display: flex;
  gap: .5rem;
}
.blog-arrow {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  color: var(--stone);
  transition: border-color .2s var(--ease), color .2s var(--ease);
}
.blog-arrow:hover:not(:disabled) { border-color: var(--gold); color: var(--cream); }
.blog-arrow:disabled { opacity: .3; cursor: default; }

.blog-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.blog-track::-webkit-scrollbar { display: none; }

.blog-card {
  flex: 0 0 calc((100% - 3rem) / 3);
  scroll-snap-align: start;
  min-width: 0;
}
.blog-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--line);
  overflow: hidden;
  transition: border-color .25s var(--ease);
}
.blog-card-link:hover { border-color: var(--gold); }

.blog-thumb {
  aspect-ratio: 16/10;
  background: var(--ink-2);
  border-bottom: 1px solid var(--line-soft);
  overflow: hidden;
}
.blog-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.blog-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.blog-card-body {
  padding: 1.4rem 1.5rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  flex: 1;
}
.blog-date {
  font-size: .82rem;
  color: var(--gold);
  font-weight: 500;
}
.blog-card-body h3 {
  font-size: 1.2rem;
  line-height: 1.3;
}
.blog-card-body p {
  color: var(--stone);
  font-size: .92rem;
  line-height: 1.55;
  flex: 1;
}
.blog-read {
  color: var(--gold);
  font-size: .92rem;
  font-weight: 500;
  margin-top: .3rem;
}

.blog-dots {
  display: flex;
  justify-content: center;
  gap: .5rem;
  margin-top: 1.5rem;
}
.blog-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--line);
  transition: background-color .2s var(--ease);
}
.blog-dot.active { background: var(--gold); }

@media (max-width: 820px) {
  .blog-card {
    flex: 0 0 100%;
  }
  .blog-nav { display: none; }
}
</style>
