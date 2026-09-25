export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/products.css', '~/assets/css/admin.css'],

  googleFonts: {
    families: {
      Manrope: [400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    preconnect: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Organic Aprico | Pure Himalayan Shilajit from Skardu',
      meta: [
        { name: 'description', content: 'Licensed extractor of gold-grade Himalayan shilajit from Skardu, Gilgit Baltistan. 73% fulvic acid, 8-stage purification, lab tested in California and Lahore.' },
        { property: 'og:site_name', content: 'Organic Aprico' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Organic Aprico | Pure Himalayan Shilajit' },
        { property: 'og:description', content: 'Gold-grade Himalayan shilajit from 17,000 feet. 73% fulvic acid, 8-stage purification, lab tested.' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/checkout': { ssr: false, robots: 'noindex, nofollow' },
    '/admin/**': { ssr: false, robots: 'noindex, nofollow' },
    '/admin': { ssr: false, robots: 'noindex, nofollow' },
  },

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: true,
  },
})
