import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event)

  if (!body?.email || !body.email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'Valid email required' })
  }

  try {
    await prisma.subscriber.create({
      data: { email: body.email },
    })
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return { success: true, message: 'Already subscribed' }
    }
    throw e
  }

  return { success: true }
})
