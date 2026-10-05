import { prisma } from '../utils/prisma'
import { shippingFor } from '#shared/utils/shipping'

interface OrderBody {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode?: string
  paymentMethod: 'cod' | 'bank_transfer'
  notes?: string
  items: Array<{ product: string; size: string; qty: number; price: number }>
}

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderBody>(event)

  if (!body.name || !body.email || !body.phone || !body.address || !body.city || !body.country) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  if (!body.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Cart is empty' })
  }

  if (!['cod', 'bank_transfer'].includes(body.paymentMethod)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payment method' })
  }

  const subtotal = body.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + shippingFor(body.country)

  const order = await prisma.order.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode || null,
      paymentMethod: body.paymentMethod,
      notes: body.notes || null,
      items: body.items,
      total,
    },
  })

  return { success: true, orderId: order.id }
})
