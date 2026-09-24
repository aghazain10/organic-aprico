export const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value)
}

export interface OrderItem {
  product: string
  size: string
  qty: number
  price: number
}

export interface AdminOrder {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  city: string
  country: string
  postalCode?: string | null
  paymentMethod: string
  status: string
  notes?: string | null
  items: OrderItem[] | unknown
  total: number
  createdAt: string
  updatedAt?: string
}

export const ADMIN_SESSION_COOKIE = 'oa_admin'
