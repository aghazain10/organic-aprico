export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)

  if (!body?.password || !verifyPassword(body.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  setAdminSession(event)
  return { success: true }
})
