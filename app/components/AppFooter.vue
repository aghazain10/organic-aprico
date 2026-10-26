<template>
  <footer class="footer" id="contact">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <a href="/#top" class="brand">
          <img
          src="/images/logo-96.png"
          srcset="/images/logo-96.png 96w, /images/logo-192.png 192w"
          sizes="46px"
          alt=""
          width="46"
          height="46"
          class="brand-logo"
          loading="lazy"
        >
          <span class="brand-copy">Organic Aprico</span>
        </a>
        <p>Proud of Skardu, Gilgit Baltistan. Pride of Pakistan.</p>
      </div>
      <div class="footer-col">
        <h4>Shop shilajit</h4>
        <NuxtLink to="/products">All Products &amp; Prices</NuxtLink>
        <NuxtLink to="/products/shilajit">Shilajit Resin</NuxtLink>
        <NuxtLink to="/products/shilajit-drops">Shilajit Drops</NuxtLink>
        <NuxtLink to="/products/pure-himalayan-shilajit-resin-wholesale">Wholesale &amp; Private Label</NuxtLink>
        <h4>Learn</h4>
        <NuxtLink to="/blogs/blog">Blog</NuxtLink>
        <NuxtLink to="/certifications">Certifications &amp; Lab Reports</NuxtLink>
        <NuxtLink to="/purification">Purification Process</NuxtLink>
      </div>
      <div class="footer-col">
        <h4>Visit us</h4>
        <address>
          <strong>Organic Aprico</strong><br>
          Lahore Organic Village, D.H.A. Main Blvd, near Adil Hospital, DHA Phase 1, Lahore<br>
          <NuxtLink to="/locations/lahore">Shop open 11 AM&ndash;12 AM &rarr;</NuxtLink>
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
        <NuxtLink to="/contact">Contact page</NuxtLink>
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
        <NuxtLink to="/pages/organic-guaranteed">Purity guarantee</NuxtLink>
        <NuxtLink to="/pages/company-registration">Company registration</NuxtLink>
        <NuxtLink to="/policies/shipping-policy">Shipping policy</NuxtLink>
        <NuxtLink to="/policies/refund-policy">Refund policy</NuxtLink>
        <NuxtLink to="/policies/privacy-policy">Privacy policy</NuxtLink>
        <NuxtLink to="/policies/terms-of-service">Terms of service</NuxtLink>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; {{ year }} Organic Aprico. All rights reserved.</span>
      <span>Cash on delivery across Pakistan, or pay by bank transfer, JazzCash, EasyPaisa or card.</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
