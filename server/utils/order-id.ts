/**
 * Order ids are numeric (see prisma/schema.prisma). A route param always arrives
 * as a string, and Prisma throws on a non-numeric Int lookup, so anything that
 * is not a positive whole number is treated as a missing order instead.
 */
export function parseOrderId(raw: string | undefined | null): number {
  if (!raw) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  const id = Number(raw)
  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return id
}
