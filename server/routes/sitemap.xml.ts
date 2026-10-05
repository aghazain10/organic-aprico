import { BLOG_POSTS } from '../../app/data/blogs'
import { SITE_PAGES } from '../../app/data/pages'

const SITE_URL = 'https://organicaprico.com'

// lastmod = date the page content was last changed (git history)
const STATIC_LASTMOD: Record<string, string> = {
  '/': '2026-09-18',
  '/certifications': '2026-09-11',
  '/purification': '2026-09-11',
  '/blogs/blog': '2026-09-21',
  '/products/shilajit': '2026-10-05',
  '/products/shilajit-drops': '2026-10-05',
  '/products/pure-himalayan-shilajit-resin-wholesale': '2026-10-05',
}

// static info/policy pages all come from app/data/pages.ts
const PAGES_LASTMOD = '2026-09-25'

const STATIC_PATHS = [
  '/',
  '/certifications',
  '/purification',
  '/blogs/blog',
  '/products/shilajit',
  '/products/shilajit-drops',
  '/products/pure-himalayan-shilajit-resin-wholesale',
]

interface SitemapEntry {
  loc: string
  lastmod?: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler((event): string => {
  const entries: SitemapEntry[] = [
    ...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: STATIC_LASTMOD[path] })),
    ...SITE_PAGES.map((page) => ({ loc: `${SITE_URL}${page.path}`, lastmod: PAGES_LASTMOD })),
    ...BLOG_POSTS.map((post) => ({
      loc: `${SITE_URL}/blogs/blog/${post.slug}`,
      lastmod: post.dateISO,
    })),
  ]

  const xml = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>\n`
})
