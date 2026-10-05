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
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Organic Aprico',
            alternateName: 'Organic Aprico Skardu',
            url: 'https://organicaprico.com',
            logo: 'https://organicaprico.com/images/logo.png',
            description: 'Licensed extractor and exporter of gold-grade Himalayan shilajit from Skardu, Gilgit Baltistan.',
            sameAs: [
              'https://www.instagram.com/organicaprico',
              'https://www.facebook.com/organicaprico',
              'https://www.youtube.com/channel/UCcrK0S34MpmCCT5ls-tnO_g',
              'https://www.tiktok.com/@organicaprico',
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: '+92-331-1116915',
                email: 'organicapricoskardu@gmail.com',
                areaServed: ['PK', 'GB', 'US', 'EU'],
                availableLanguage: ['en', 'ur'],
              },
            ],
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'LASU House of Production',
                addressLocality: 'Skardu',
                addressRegion: 'Gilgit Baltistan',
                postalCode: '16400',
                addressCountry: 'PK',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: 'Lahore Organic Village, Main Blvd, D.H.A Phase 1',
                addressLocality: 'Lahore',
                addressRegion: 'Punjab',
                postalCode: '54000',
                addressCountry: 'PK',
              },
            ],
          }),
        },
      ],
    },
  },

  routeRules: {
    '/': { prerender: true },
    // /collections/** is handled by server/middleware/legacy-redirects.ts
    // (301 plain, 308 when a query string has to be preserved)
    '/checkout': { ssr: false, robots: 'noindex, nofollow', headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/admin/**': { ssr: false, robots: 'noindex, nofollow', headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/admin': { ssr: false, robots: 'noindex, nofollow', headers: { 'x-robots-tag': 'noindex, nofollow' } },
  },

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: true,
  },
})
