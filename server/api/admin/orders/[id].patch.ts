import { prisma } from '../../../utils/prisma'
import { isOrderStatus } from '#shared/utils/order'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody<{ status?: string }>(event)

  if (!body?.status || !isOrderStatus(body.status)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid status' })
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status: body.status },
    })
    return order
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }
})
