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

export interface ShippingDuration {
  minValue: number
  maxValue: number
  /** Defaults to DAY. */
  unitCode?: string
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
  /** Schema.org category path, e.g. 'Dietary Supplement > Herbal Supplement'. */
  category?: string
  /** Extra name/value pairs published as schema.org additionalProperty. */
  additionalProperties?: { name: string, value: string | number }[]
  /** Returns window in days. Emits hasMerchantReturnPolicy on the offer. */
  returnWindowDays?: number
  /** Shipping details for the offer. Omit values that are not verified. */
  shippingDetails?: {
    /** Shipping cost in PKR. Omit when the rate varies by order. */
    shippingRate?: number
    handlingTime?: ShippingDuration
    transitTime?: ShippingDuration
    shippingDestination?: { '@type': 'PostalAddress', addressCountry: string }
  }
  /** @id of the seller Organization node, e.g. 'https://organicaprico.com/#organization'. */
  sellerId?: string
}

function quantitativeValue(duration: ShippingDuration) {
  return {
    '@type': 'QuantitativeValue',
    minValue: duration.minValue,
    maxValue: duration.maxValue,
    unitCode: duration.unitCode ?? 'DAY',
  }
}

export function buildProductJsonLd(product: Product, options: ProductSchemaOptions) {
  const prices = product.sizes.map((size) => size.price)
  const priceValidUntil = endOfQuarterISO()
  const name = options.name ?? product.name
  const seller: Record<string, unknown> = options.sellerId
    ? { seller: { '@id': options.sellerId } }
    : {}

  const offers: Record<string, unknown> = {
    '@type': 'AggregateOffer',
    url: absoluteUrl(options.url),
    priceCurrency: 'PKR',
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: product.sizes.length,
    priceValidUntil,
    ...seller,
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
      ...seller,
      ...(options.returnWindowDays
        ? {
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: 'PK',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: options.returnWindowDays,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/ReturnShippingFees',
            },
          }
        : {}),
    })),
  }

  if (options.shippingDetails) {
    const { shippingDetails } = options
    offers.shippingDetails = {
      '@type': 'OfferShippingDetails',
      ...(typeof shippingDetails.shippingRate === 'number'
        ? {
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: shippingDetails.shippingRate,
              currency: 'PKR',
            },
          }
        : {}),
      ...(shippingDetails.shippingDestination
        ? { shippingDestination: shippingDetails.shippingDestination }
        : {}),
      ...(shippingDetails.handlingTime
        ? { handlingTime: quantitativeValue(shippingDetails.handlingTime) }
        : {}),
      ...(shippingDetails.transitTime
        ? { transitTime: quantitativeValue(shippingDetails.transitTime) }
        : {}),
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: options.description ?? product.description,
    image: options.images.map(absoluteUrl),
    brand: { '@type': 'Brand', name: 'Organic Aprico' },
    ...(options.category ? { category: options.category } : {}),
    ...(options.additionalProperties?.length
      ? {
          additionalProperty: options.additionalProperties.map((prop) => ({
            '@type': 'PropertyValue',
            name: prop.name,
            value: prop.value,
          })),
        }
      : {}),
    itemCondition: 'https://schema.org/NewCondition',
    offers,
  }
}

export interface FaqItem {
  q: string
  a: string | string[]
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(faq.a) ? faq.a.join(' ') : faq.a,
      },
    })),
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
