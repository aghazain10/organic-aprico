export const PAKISTAN_SHIPPING_FEE = 250

export function isPakistan(country: string): boolean {
  const c = country.trim().toLowerCase()
  return c === 'pakistan' || c === 'pk'
}

export function shippingFor(country: string): number {
  return isPakistan(country) ? PAKISTAN_SHIPPING_FEE : 0
}

export function deliveryEstimateFor(country: string): string {
  return isPakistan(country) ? '3 to 5 working days' : '10 to 14 days'
}
