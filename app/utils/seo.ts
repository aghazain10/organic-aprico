import type { Product } from '~/data/products'

export const SITE_URL = 'https://organicaprico.com'

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Last day of the quarter the given date falls in (YYYY-MM-DD, local time). */
export function endOfQuarterISO(from: Date = new Date()): string {
  const quarterEndMonth = Math.floor(from.getMonth() / 3) * 3 + 3
  const end = new Date(from.getFullYear(), quarterEndMonth, 0)
  const month = String(end.getMonth() + 1).padStart(2, '0')
  const day = String(end.getDate()).padStart(2, '0')
  return `${end.getFullYear()}-${month}-${day}`
}

export interface ProductSchemaOptions {
  /** Absolute or root-relative canonical URL of the product page. */
  url: string
  images: string[]
  /** Prefix for per-variant SKUs, e.g. OA-SHILAJIT-RESIN -> OA-SHILAJIT-RESIN-10G */
  skuPrefix: string
  /** Defaults to product.name */
  name?: string
  /** Defaults to product.description */
  description?: string
}

export function buildProductJsonLd(product: Product, options: ProductSchemaOptions) {
  const prices = product.sizes.map((size) => size.price)
  const priceValidUntil = endOfQuarterISO()
  const name = options.name ?? product.name

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: options.description ?? product.description,
    image: options.images.map(absoluteUrl),
    brand: { '@type': 'Brand', name: 'Organic Aprico' },
    itemCondition: 'https://schema.org/NewCondition',
    offers: {
      '@type': 'AggregateOffer',
      url: absoluteUrl(options.url),
      priceCurrency: 'PKR',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.sizes.length,
      priceValidUntil,
      offers: product.sizes.map((size) => ({
        '@type': 'Offer',
        name: `${name} — ${size.label}`,
        sku: `${options.skuPrefix}-${size.id.toUpperCase()}`,
        url: absoluteUrl(options.url),
        price: size.price,
        priceCurrency: 'PKR',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        priceValidUntil,
      })),
    },
  }
}

export interface BreadcrumbItem {
  name: string
  /** Root-relative path; omit for the current (last) item. */
  path?: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  }
}
