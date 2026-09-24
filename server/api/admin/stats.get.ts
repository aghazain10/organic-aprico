import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [totalOrders, pendingOrders, revenue, ordersThisWeek] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'pending' } }),
    prisma.order.aggregate({
      where: { status: { not: 'cancelled' } },
      _sum: { total: true },
    }),
    prisma.order.count({ where: { createdAt: { gte: weekAgo } } }),
  ])

  return {
    totalOrders,
    pendingOrders,
    totalRevenue: revenue._sum.total ?? 0,
    ordersThisWeek,
  }
})
