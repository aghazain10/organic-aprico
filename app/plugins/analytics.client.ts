import { trackEvent } from '~/utils/analytics'

export default defineNuxtPlugin(() => {
  if (import.meta.server || typeof document === 'undefined') return

  // Admin contact links are used by staff to reach customers — they are not
  // customer intent and would pollute the funnel.
  if (window.location.pathname.startsWith('/admin')) return

  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const anchor = target.closest('a[href]') as HTMLAnchorElement | null
    if (!anchor) return

    const href = anchor.getAttribute('href') || ''
    const label = anchor.textContent?.trim().replace(/\s+/g, ' ').slice(0, 140) || href
    const pagePath = window.location.pathname

    let url: URL | null = null
    try {
      url = new URL(href, window.location.href)
    } catch {
      url = null
    }

    const host = url?.hostname.toLowerCase() || ''
    const pathname = url?.pathname.toLowerCase() || ''
    const decoded = (() => {
      try {
        return decodeURIComponent(href.replace(/\+/g, ' ')).toLowerCase()
      } catch {
        return href.toLowerCase()
      }
    })()

    const intent = (() => {
      if (decoded.includes('wholesale quote') || decoded.includes('request a quote')) return 'wholesale_quote'
      if (decoded.includes('wholesale sample') || decoded.includes('request a sample')) return 'wholesale_sample'
      if (decoded.includes('i placed order') || decoded.includes('placed order')) return 'order_confirmation'
      if (decoded.includes('lab report') || decoded.includes('certifications')) return 'lab_report'
      if (decoded.includes('lahore') || decoded.includes('visit')) return 'store_visit'
      return 'general'
    })()

    const isWhatsapp = host === 'wa.me' || host.endsWith('.wa.me') || host === 'whatsapp.com' || host.endsWith('.whatsapp.com') || pathname === '/send' && host.includes('wa.me') || href.startsWith('whatsapp://')

    if (isWhatsapp) {
      const base = {
        page_path: pagePath,
        link_text: label,
        intent,
        method: 'whatsapp',
      }
      trackEvent('whatsapp_click', base)
      if (intent === 'wholesale_quote' || intent === 'wholesale_sample') {
        trackEvent('generate_lead', {
          ...base,
          lead_type: intent,
          lead_source: 'whatsapp',
        })
      }
      return
    }

    if (href.startsWith('tel:')) {
      trackEvent('phone_click', { page_path: pagePath, link_text: label, intent, method: 'phone' })
      return
    }

    if (href.startsWith('mailto:')) {
      trackEvent('email_click', { page_path: pagePath, link_text: label, intent, method: 'email' })
      return
    }

    if (url && host && url.origin !== window.location.origin) {
      trackEvent('outbound_click', {
        page_path: pagePath,
        link_text: label,
        link_domain: host,
        link_url: url.href.slice(0, 280),
      })
    }
  }, { passive: true })
})
