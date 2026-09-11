import { PRODUCTS, formatPrice } from '~/data/products'
import type { Product, ProductVariant } from '~/data/products'

export interface CartItem {
  product: string
  size: string
  qty: number
}

const STORAGE_KEY = 'oa-cart'

function getVariant(productKey: string, sizeId: string): ProductVariant | undefined {
  const product = PRODUCTS.find((p) => p.key === productKey)
  return product?.sizes.find((s) => s.id === sizeId)
}

function loadCart(): CartItem[] {
  if (import.meta.server) return []
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((item: CartItem) => {
      const product = PRODUCTS.find((p) => p.key === item.product)
      return product && product.sizes.some((s) => s.id === item.size)
    })
  } catch {
    return []
  }
}

export function useCart() {
  const items = useState<CartItem[]>('cart', () => loadCart())
  const open = useState('cart-open', () => false)

  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))

  const total = computed(() =>
    items.value.reduce((sum, i) => {
      const variant = getVariant(i.product, i.size)
      return sum + (variant?.price ?? 0) * i.qty
    }, 0)
  )

  function persist() {
    if (import.meta.server) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function add(productKey: string, sizeId: string, qty: number) {
    const existing = items.value.find(
      (i) => i.product === productKey && i.size === sizeId
    )
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ product: productKey, size: sizeId, qty })
    }
    persist()
  }

  function updateQty(index: number, delta: number) {
    items.value[index].qty += delta
    if (items.value[index].qty <= 0) items.value.splice(index, 1)
    persist()
  }

  function remove(index: number) {
    items.value.splice(index, 1)
    persist()
  }

  function clear() {
    items.value = []
    persist()
  }

  function openDrawer() {
    open.value = true
  }

  function closeDrawer() {
    open.value = false
  }

  function getItemName(productKey: string): string {
    return PRODUCTS.find((p) => p.key === productKey)?.name ?? productKey
  }

  function getVariantLabel(productKey: string, sizeId: string): string {
    return getVariant(productKey, sizeId)?.label ?? sizeId
  }

  function getVariantPrice(productKey: string, sizeId: string): number {
    return getVariant(productKey, sizeId)?.price ?? 0
  }

  return {
    items,
    open,
    count,
    total,
    add,
    updateQty,
    remove,
    clear,
    openDrawer,
    closeDrawer,
    getItemName,
    getVariantLabel,
    getVariantPrice,
    formatPrice,
  }
}
