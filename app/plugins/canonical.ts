const SITE_URL = 'https://organicaprico.com'

export default defineNuxtPlugin(() => {
  const route = useRoute()

  useHead(() => ({
    link: [{ rel: 'canonical', href: `${SITE_URL}${route.path}` }],
    meta: [{ property: 'og:url', content: `${SITE_URL}${route.path}` }],
  }))
})
