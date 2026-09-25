<template>
  <footer class="footer" id="contact">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <a href="/#top" class="brand">
          <img src="/images/logo.png" alt="" width="46" height="46" class="brand-logo">
          <span class="brand-copy">Organic Aprico</span>
        </a>
        <p>Proud of Skardu, Gilgit Baltistan. Pride of Pakistan.</p>
        <form class="newsletter" @submit.prevent="onSubscribe">
          <label for="email">Get 10% off your first order</label>
          <div class="newsletter-row">
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="Your email address"
              required
            >
            <button type="submit" class="btn btn-gold">Subscribe</button>
          </div>
          <p class="form-note" aria-live="polite">{{ note }}</p>
        </form>
      </div>
      <div class="footer-col">
        <h4>Visit us</h4>
        <address>
          <strong>Lahore Organic Village</strong><br>Main Blvd, DHA Phase 1, Lahore
        </address>
        <address>
          <strong>Lasu House of Production</strong><br>Skardu, Gilgit Baltistan
        </address>
      </div>
      <div class="footer-col">
        <h4>Talk to us</h4>
        <a href="tel:+923311116915">+92 331 111 6915</a>
        <a href="mailto:organicapricoskardu@gmail.com">organicapricoskardu@gmail.com</a>
        <a href="https://wa.me/923311116915" target="_blank" rel="noopener">WhatsApp</a>
        <h4>Follow</h4>
        <div class="socials">
          <a href="https://www.instagram.com/organicaprico/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/organicaprico/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.youtube.com/channel/UCcrK0S34MpmCCT5ls-tnO_g" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.tiktok.com/@organicaprico" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.linkedin.com/in/organicaprico" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.pinterest.com/organicapricoskardu/" target="_blank" rel="noopener noreferrer">Pinterest</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Useful links</h4>
        <NuxtLink to="/pages/about-us">About us</NuxtLink>
        <NuxtLink to="/pages/track-your-order">Track your order</NuxtLink>
        <NuxtLink to="/pages/payment-method">Payment methods</NuxtLink>
        <NuxtLink to="/pages/organic-guaranteed">Organic guaranteed</NuxtLink>
        <NuxtLink to="/pages/company-registration">Company registration</NuxtLink>
        <NuxtLink to="/policies/shipping-policy">Shipping policy</NuxtLink>
        <NuxtLink to="/policies/refund-policy">Refund policy</NuxtLink>
        <NuxtLink to="/policies/privacy-policy">Privacy policy</NuxtLink>
        <NuxtLink to="/policies/terms-of-service">Terms of service</NuxtLink>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; {{ year }} Organic Aprico. All rights reserved.</span>
      <span>We accept Visa, Mastercard, PayPal and Shop Pay.</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')
const note = ref('')
const year = new Date().getFullYear()

async function onSubscribe() {
  if (!email.value) return
  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value },
    })
    note.value = `Thanks. Your 10% code is on its way to ${email.value}.`
    email.value = ''
  } catch {
    note.value = 'Something went wrong. Please try again.'
  }
}
</script>
