import { ADMIN_SESSION_COOKIE } from '#shared/utils/order'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  if (import.meta.server) {
    const headers = useRequestHeaders(['cookie'])
    if (!headers.cookie?.includes(`${ADMIN_SESSION_COOKIE}=`)) {
      return navigateTo('/admin/login')
    }
    return
  }

  try {
    const { authenticated } = await $fetch<{ authenticated: boolean }>('/api/admin/me')
    if (!authenticated) return navigateTo('/admin/login')
  } catch {
    return navigateTo('/admin/login')
  }
})
