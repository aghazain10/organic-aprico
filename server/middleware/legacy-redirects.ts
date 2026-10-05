import { SITE_PAGES } from '../../app/data/pages'
import { BLOG_POSTS } from '../../app/data/blogs'

const LIVE_PAGES = new Set([
  '/',
  '/certifications',
  '/purification',
  '/blogs/blog',
  ...SITE_PAGES.map((page) => page.path),
  ...BLOG_POSTS.map((post) => `/blogs/blog/${post.slug}`),
])

const LIVE_PRODUCTS = new Set([
  '/products/shilajit',
  '/products/shilajit-drops',
  '/products/pure-himalayan-shilajit-resin-wholesale',
])

const SHILAJIT = '/products/shilajit'
const HOME = '/'
const BLOG_INDEX = '/blogs/blog'

/**
 * Exact legacy paths -> redirect target.
 * Covers removed saffron product, Shopify pages, WordPress era paths,
 * Shopify system paths and deleted blog posts.
 */
const EXACT_REDIRECTS: Record<string, string> = {
  // --- Saffron (removed category) — SEO plan §2 ---
  '/products/pure-zafran': HOME,
  '/products/zafran': HOME,
  '/products/saffron': HOME,
  '/products/kesar': HOME,
  '/products/pure-kashmiri-zafran': HOME,

  // --- Dead old-store products (from the 404 report; any other removed
  // product is caught by the /products catch-all below) ---
  '/products/dried-apricot-khubani': SHILAJIT,
  '/products/almond-american': SHILAJIT,
  '/products/organic-beri-honey': SHILAJIT,
  '/products/zarshak-shireen': SHILAJIT,
  '/products/zarshik': SHILAJIT,

  // --- Shopify pages still indexed — SEO plan §4.1 ---
  '/pages/faq': HOME,
  '/pages/lab-reports': '/certifications',
  '/pages/our-locations': '/pages/about-us',
  '/pages/who-is-behind-organic-aprico': '/pages/about-us',
  '/pages/our-mission': '/pages/about-us',
  '/pages/our-goals': '/pages/about-us',
  '/pages/our-vision': '/pages/about-us',
  '/pages/contact-us': HOME,
  '/pages/certifications': '/certifications',
  '/pages/data-sharing-opt-out': '/policies/privacy-policy',
  '/pages/delivery-information': '/policies/shipping-policy',
  '/pages/shipping-policy': '/policies/shipping-policy',
  '/pages/refund-policy': '/policies/refund-policy',
  '/pages/return-policy': '/policies/refund-policy',
  '/pages/privacy-policy': '/policies/privacy-policy',
  '/pages/terms-of-service': '/policies/terms-of-service',
  '/pages/terms': '/policies/terms-of-service',
  '/pages/our-story': '/pages/about-us',
  '/pages/about': '/pages/about-us',

  // --- Shopify system paths — SEO plan §4.1 ---
  '/cart': HOME,
  '/search': HOME,
  '/wpm': HOME,
  '/v1/produce': HOME,
  '/recent-viewed-products': HOME,
  '/customer_authentication/redirect': HOME,

  // --- Deleted blog posts (removed as duplicates/out of scope) ---
  '/blogs/blog/is-your-shilajit-safe-the-truth-about-heavy-metals-and-lab-testing':
    '/blogs/blog/is-your-shilajit-safe-the-truth-about-heavy-metals-lab-testing-and-authentic-source-to-buy-shilajit',
  '/blogs/blog/shilajit-for-women-5-key-benefits-of-shilajit':
    '/blogs/blog/shilajit-for-women-beauty-hormonal-balance-and-wellness-benefits',
  '/blogs/blog/himalayan-shilajit-vs-shilajit-fulvic-aprico': BLOG_INDEX,
  '/blogs/blog/top-5-dry-fruits-to-boost-your-immunity-for-summer': HOME,
  '/blogs/blog/best-home-remedy-to-improve-weak-eyesight': HOME,
  '/blogs/blog/dried-apricot-benefits-for-skin-how-to-use-apricots-for-skin': HOME,
  '/blogs/blog/apricot-kernel-oil-benefits-of-apricot-kernel-oil-how-to-use': HOME,

  // --- Truncated/broken junk slugs from the crawl report ---
  '/blogs/blog/ultimate-guide-': BLOG_INDEX,
  '/blogs/blog/is-': BLOG_INDEX,
}

function is(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`)
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const stripped = pathname.replace(/\/+$/, '')
    return stripped === '' ? '/' : stripped
  }
  return pathname
}

function isLive(path: string): boolean {
  return LIVE_PRODUCTS.has(path) || LIVE_PAGES.has(path)
}

/** Returns the redirect target for a normalized path, or null when the path is valid. */
function resolve(path: string): string | null {
  if (isLive(path)) return null

  const exact = EXACT_REDIRECTS[path]
  if (exact) return exact

  // Removed products / collections from the old Shopify store
  if (is(path, '/products')) return SHILAJIT
  if (is(path, '/collections')) return SHILAJIT

  // WordPress / WooCommerce era
  if (is(path, '/product')) return SHILAJIT
  if (is(path, '/product-category')) return HOME
  if (is(path, '/shop')) return HOME
  if (is(path, '/tag') || is(path, '/product-tag')) return BLOG_INDEX
  if (path.startsWith('/wp-')) return HOME
  if (is(path, '/home') || path.startsWith('/home-')) return HOME
  if (is(path, '/service')) return HOME
  if (is(path, '/affiliate-dashboard')) return HOME

  // Shopify system / junk paths
  if (is(path, '/b') || is(path, '/wpm') || is(path, '/cdn')) return HOME
  if (is(path, '/search')) return HOME
  if (is(path, '/customer_authentication')) return HOME
  if (is(path, '/recent-viewed-products')) return HOME

  // Legacy Shopify pages and policies that no longer exist
  if (is(path, '/pages')) return HOME
  if (is(path, '/policies')) return HOME

  // Old Shopify blog channel
  if (is(path, '/blogs/news')) return BLOG_INDEX

  return null
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname

  const normalized = normalizePath(pathname)
  const target =
    resolve(normalized) ??
    (normalized !== pathname && isLive(normalized) ? normalized : null)
  if (!target) return

  const search = url.search
  const permanent = search.length > 1 || (event.method !== 'GET' && event.method !== 'HEAD')
  // 308 keeps both the query string and the request method intact
  await sendRedirect(event, `${target}${permanent ? search : ''}`, permanent ? 308 : 301)
})
