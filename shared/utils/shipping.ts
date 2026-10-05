export const PAKISTAN_SHIPPING_FEE = 250

export function isPakistan(country: string): boolean {
  const c = country.trim().toLowerCase()
  return c === 'pakistan' || c === 'pk'
}

export function shippingFor(country: string): number {
  return isPakistan(country) ? PAKISTAN_SHIPPING_FEE : 0
}
