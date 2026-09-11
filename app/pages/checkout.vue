<template>
  <div>
    <SvgGradients />
    <div class="checkout-wrap wrap">
      <NuxtLink to="/" class="checkout-back">&larr; Back to shop</NuxtLink>

      <div v-if="orderPlaced" class="checkout-success">
        <h1>Order placed</h1>
        <p class="success-id">Order ID: <strong>{{ orderId }}</strong></p>

        <div v-if="form.paymentMethod === 'bank_transfer'" class="bank-details">
          <h2>Bank transfer details</h2>
          <p>Transfer the exact amount to the account below and share the payment screenshot on WhatsApp.</p>
          <table class="bank-table">
            <tr><td>Bank</td><td>{{ bankInfo.bankName }}</td></tr>
            <tr><td>Account Title</td><td>{{ bankInfo.accountTitle }}</td></tr>
            <tr><td>Account Number</td><td>{{ bankInfo.accountNumber }}</td></tr>
            <tr><td>IBAN</td><td>{{ bankInfo.iban }}</td></tr>
            <tr><td>SWIFT Code</td><td>{{ bankInfo.swiftCode }}</td></tr>
            <tr><td>Branch</td><td>{{ bankInfo.branch }}</td></tr>
          </table>
          <p class="muted small">{{ bankInfo.note }}</p>
          <a
            class="btn btn-gold btn-block"
            :href="whatsappLink"
            target="_blank"
            rel="noopener"
          >
            Send payment screenshot on WhatsApp
          </a>
        </div>

        <div v-else class="cod-note">
          <h2>Cash on delivery</h2>
          <p>Pay when your order arrives. Please keep the exact amount ready.</p>
          <p class="muted small">Delivery in 10 to 12 business days. You will receive tracking info via email and WhatsApp.</p>
        </div>

        <NuxtLink to="/" class="btn btn-ghost btn-block" style="margin-top: 1rem">
          Continue shopping
        </NuxtLink>
      </div>

      <form v-else class="checkout-form" @submit.prevent="placeOrder">
        <h1>Checkout</h1>

        <div v-if="!items.length" class="checkout-empty">
          <p>Your cart is empty.</p>
          <NuxtLink to="/" class="btn btn-gold">Go back to shop</NuxtLink>
        </div>

        <template v-else>
          <div class="checkout-grid">
            <div class="checkout-fields">
              <h2>Contact information</h2>

              <div class="field">
                <label for="name">Full name</label>
                <input id="name" v-model="form.name" type="text" required placeholder="John Doe">
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" required placeholder="john@example.com">
              </div>
              <div class="field">
                <label for="phone">Phone number</label>
                <input id="phone" v-model="form.phone" type="tel" required placeholder="+92 300 1234567">
              </div>

              <h2>Shipping address</h2>

              <div class="field">
                <label for="address">Street address</label>
                <input id="address" v-model="form.address" type="text" required placeholder="House #123, Street 4">
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="city">City</label>
                  <input id="city" v-model="form.city" type="text" required placeholder="Lahore">
                </div>
                <div class="field">
                  <label for="postal">Postal code</label>
                  <input id="postal" v-model="form.postalCode" type="text" placeholder="54000">
                </div>
              </div>
              <div class="field">
                <label for="country">Country</label>
                <input id="country" v-model="form.country" type="text" required placeholder="Pakistan">
              </div>

              <h2>Payment method</h2>

              <div class="payment-options">
                <label class="payment-option" :class="{ active: form.paymentMethod === 'cod' }">
                  <input v-model="form.paymentMethod" type="radio" name="payment" value="cod">
                  <span class="payment-label">
                    <strong>Cash on delivery</strong>
                    <span>Pay when your order arrives</span>
                  </span>
                </label>
                <label class="payment-option" :class="{ active: form.paymentMethod === 'bank_transfer' }">
                  <input v-model="form.paymentMethod" type="radio" name="payment" value="bank_transfer">
                  <span class="payment-label">
                    <strong>Bank transfer</strong>
                    <span>Transfer to our bank account</span>
                  </span>
                </label>
              </div>

              <div class="field">
                <label for="notes">Order notes (optional)</label>
                <textarea id="notes" v-model="form.notes" rows="3" placeholder="Any special instructions?" />
              </div>
            </div>

            <div class="checkout-summary">
              <h2>Order summary</h2>
              <div class="summary-items">
                <div v-for="item in items" :key="item.product + item.size" class="summary-item">
                  <div>
                    <span class="summary-name">{{ getItemName(item.product) }}</span>
                    <span class="summary-variant">{{ getVariantLabel(item.product, item.size) }} &times; {{ item.qty }}</span>
                  </div>
                  <span class="summary-price">{{ formatPrice(getVariantPrice(item.product, item.size) * item.qty) }}</span>
                </div>
              </div>
              <div class="summary-row summary-subtotal">
                <span>Subtotal</span>
                <strong>{{ formatPrice(total) }}</strong>
              </div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <strong>{{ formatPrice(total) }}</strong>
              </div>
              <p class="muted small">Shipping will be confirmed after order. Money-back guarantee applies.</p>
              <button
                type="submit"
                class="btn btn-gold btn-block"
                :disabled="loading"
              >
                {{ loading ? 'Placing order...' : 'Place order' }}
              </button>
              <p v-if="error" class="checkout-error">{{ error }}</p>
            </div>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items, total, clear, getItemName, getVariantLabel, getVariantPrice, formatPrice } = useCart()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  postalCode: '',
  paymentMethod: 'cod' as 'cod' | 'bank_transfer',
  notes: '',
})

const loading = ref(false)
const error = ref('')
const orderPlaced = ref(false)
const orderId = ref('')

const { data: bankInfo } = await useFetch('/api/checkout/bank-details')

const whatsappMessage = computed(() => {
  if (!orderPlaced.value) return ''
  const lines = items.value.map((i) =>
    `- ${getItemName(i.product)} ${getVariantLabel(i.product, i.size)} x ${i.qty} = ${formatPrice(getVariantPrice(i.product, i.size) * i.qty)}`
  )
  return `Hi Organic Aprico, I placed order ${orderId.value}:\n${lines.join('\n')}\nTotal: ${formatPrice(total.value)}\nPayment: ${form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer (screenshot attached)'}`
})

const whatsappLink = computed(() => {
  return `https://wa.me/923311116915?text=${encodeURIComponent(whatsappMessage.value)}`
})

async function placeOrder() {
  loading.value = true
  error.value = ''

  try {
    const result = await $fetch<{ success: boolean; orderId: string }>('/api/orders', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        country: form.country,
        postalCode: form.postalCode || undefined,
        paymentMethod: form.paymentMethod,
        notes: form.notes || undefined,
        items: items.value.map((i) => ({
          product: i.product,
          size: i.size,
          qty: i.qty,
          price: getVariantPrice(i.product, i.size),
        })),
        total: total.value,
      },
    })

    orderId.value = result.orderId
    orderPlaced.value = true
    clear()
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Checkout | Organic Aprico',
  robots: 'noindex, nofollow',
})
</script>
