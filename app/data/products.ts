export interface ProductVariant {
  id: string
  label: string
  price: number
  was: number | null
}

export interface Product {
  key: string
  name: string
  description: string
  defaultSize: string
  sizes: ProductVariant[]
}

export const PRODUCTS: Product[] = [
  {
    key: 'resin',
    name: 'Shilajit Resin',
    description: 'Gold-grade resin, sun-dried 40 days. 73% fulvic acid, lab verified.',
    defaultSize: '30g',
    sizes: [
      { id: '10g', label: '10 g', price: 1500, was: 1700 },
      { id: '20g', label: '20 g', price: 2900, was: 3100 },
      { id: '30g', label: '30 g', price: 4000, was: 4500 },
      { id: '50g', label: '50 g', price: 7100, was: 7300 },
      { id: '100g', label: '100 g', price: 12900, was: 14000 },
    ],
  },
  {
    key: 'drops',
    name: 'Shilajit Drops',
    description: 'Resin dissolved in glacier water. 9 drops twice a day in water, milk or coffee.',
    defaultSize: '60ml',
    sizes: [
      { id: '30ml', label: '30 ml', price: 2000, was: 2300 },
      { id: '60ml', label: '60 ml', price: 4000, was: 4600 },
    ],
  },
  {
    key: 'wholesale',
    name: 'Shilajit Wholesale',
    description: 'Bulk resin for resellers and brands. Lab reports and private label available.',
    defaultSize: '1kg',
    sizes: [
      { id: '1kg', label: '1 kg', price: 95000, was: null },
      { id: '5kg', label: '5 kg', price: 475000, was: null },
    ],
  },
]

export function formatPrice(n: number): string {
  return `Rs ${n.toLocaleString('en-PK')}`
}
