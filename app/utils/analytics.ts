import { PRODUCTS } from '~/data/products'
import type { CartItem } from '~/composables/useCart'

export type SimpleCartLine = Pick<CartItem, 'product' | 'size' | 'qty'>

export interface AnalyticsItem {
  item_id: string
  item_name: string
  item_variant: string
  item_category: string
  item_brand: string
  currency: 'PKR'
  price: number
  quantity: number
}

const CURRENCY = 'PKR' as const
const ITEM_CATEGORY = 'Shilajit'
const ITEM_BRAND = 'Organic Aprico'

function getItem(productKey: string, sizeId: string) {
  const product = PRODUCTS.find((p) => p.key === productKey)
  const size = product?.sizes.find((s) => s.id === sizeId)
  if (!product || !size) return null
  return { product, size }
}

export function toAnalyticsItems(lines: SimpleCartLine[]): AnalyticsItem[] {
  return lines.flatMap((line) => {
    const found = getItem(line.product, line.size)
    if (!found) return []
    const { product, size } = found
    return [
      {
        item_id: `${product.key}:${size.id}`,
        item_name: product.name,
        item_variant: size.label,
        item_category: ITEM_CATEGORY,
        item_brand: ITEM_BRAND,
        currency: CURRENCY,
        price: size.price,
        quantity: line.qty,
      },
    ]
  })
}

export function sumAnalyticsItems(items: AnalyticsItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function dataLayer(): Record<string, unknown>[] | null {
  if (import.meta.server || typeof window === 'undefined') return null
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  return w.dataLayer
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  const dl = dataLayer()
  if (!dl) return
  dl.push({ event, ...params })
}

function pushEcommerce(event: string, ecommerce: Record<string, unknown>) {
  const dl = dataLayer()
  if (!dl) return
  dl.push({ ecommerce: null })
  dl.push({ event, ecommerce })
}

export function trackViewItemList(itemListName: string, lines: SimpleCartLine[]) {
  const items = toAnalyticsItems(lines)
  if (!items.length) return
  pushEcommerce('view_item_list', { item_list_name: itemListName, items })
}

export function trackSelectItem(itemListName: string, productKey: string, sizeId: string) {
  const items = toAnalyticsItems([{ product: productKey, size: sizeId, qty: 1 }])
  if (!items.length) return
  pushEcommerce('select_item', { item_list_name: itemListName, items })
}

export function trackViewItem(productKey: string, sizeId: string) {
  const items = toAnalyticsItems([{ product: productKey, size: sizeId, qty: 1 }])
  if (!items.length) return
  pushEcommerce('view_item', { currency: CURRENCY, value: items[0].price, items })
}

export function trackAddToCart(productKey: string, sizeId: string, qty: number) {
  const items = toAnalyticsItems([{ product: productKey, size: sizeId, qty }])
  if (!items.length) return
  pushEcommerce('add_to_cart', { currency: CURRENCY, value: items[0].price * qty, items })
}

export function trackRemoveFromCart(productKey: string, sizeId: string, qty: number) {
  const items = toAnalyticsItems([{ product: productKey, size: sizeId, qty }])
  if (!items.length) return
  pushEcommerce('remove_from_cart', { currency: CURRENCY, value: items[0].price * qty, items })
}

export function trackViewCart(lines: SimpleCartLine[]) {
  const items = toAnalyticsItems(lines)
  if (!items.length) return
  pushEcommerce('view_cart', { currency: CURRENCY, value: sumAnalyticsItems(items), items })
}

export function trackBeginCheckout(lines: SimpleCartLine[], shipping: number, paymentMethod?: string) {
  const items = toAnalyticsItems(lines)
  if (!items.length) return
  pushEcommerce('begin_checkout', {
    currency: CURRENCY,
    value: sumAnalyticsItems(items) + shipping,
    shipping,
    ...(paymentMethod ? { payment_type: paymentMethod } : {}),
    items,
  })
}

export function trackPurchase(
  transactionId: string | number,
  lines: SimpleCartLine[],
  value: number,
  shipping: number,
  paymentMethod: 'cod' | 'bank_transfer',
) {
  const items = toAnalyticsItems(lines)
  if (!items.length) return
  pushEcommerce('purchase', {
    transaction_id: String(transactionId),
    currency: CURRENCY,
    value,
    shipping,
    tax: 0,
    payment_type: paymentMethod,
    items,
  })
}

export function trackFaqToggle(question: string, pagePath?: string) {
  trackEvent('faq_toggle', {
    faq_question: question.slice(0, 160),
    page_path: pagePath ?? window.location.pathname,
  })
}
