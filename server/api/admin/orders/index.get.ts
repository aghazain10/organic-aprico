import type { Prisma } from '@prisma/client'
import { prisma } from '../../../utils/prisma'

const PAGE_SIZE = 15

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const status = typeof query.status === 'string' && query.status ? query.status : undefined
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  const where: Prisma.OrderWhereInput = {}
  if (status) where.status = status
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
      { id: { contains: search } },
    ]
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.order.count({ where }),
  ])

  return {
    orders,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  }
})
