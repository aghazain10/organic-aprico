import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { ADMIN_SESSION_COOKIE } from '#shared/utils/order'

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: 'Admin session secret not configured' })
  }
  return secret
}

function sign(expiry: number): string {
  return createHmac('sha256', getSecret()).update(String(expiry)).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

function createSessionToken(): string {
  const expiry = Date.now() + SESSION_TTL_SECONDS * 1000
  return `${expiry}.${sign(expiry)}`
}

function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [expiryRaw, signature] = token.split('.')
  if (!expiryRaw || !signature) return false
  const expiry = Number(expiryRaw)
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false
  return safeEqual(signature, sign(expiry))
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return safeEqual(password, adminPassword)
}

export function isAdminAuthenticated(event: H3Event): boolean {
  return verifySessionToken(getCookie(event, ADMIN_SESSION_COOKIE))
}

export function requireAdmin(event: H3Event): void {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

export function setAdminSession(event: H3Event): void {
  setCookie(event, ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export function clearAdminSession(event: H3Event): void {
  deleteCookie(event, ADMIN_SESSION_COOKIE, { path: '/' })
}
