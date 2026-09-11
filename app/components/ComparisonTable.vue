<template>
  <section class="section section-tint" id="difference">
    <div class="wrap">
      <div class="section-head">
        <h2>How Organic Aprico is different</h2>
        <p>Most sellers buy raw resin and skip purification. We do not.</p>
      </div>
      <div class="compare-wrap">
        <table class="compare">
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col" class="us">Organic Aprico</th>
              <th scope="col">Typical market shilajit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td class="us" data-label="Organic Aprico">{{ row.us }}</td>
              <td data-label="Typical market shilajit">{{ row.them }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="trust-strip">
        <span>Handpicked, premium quality</span>
        <span>Made in Gilgit Baltistan</span>
        <span>Organic and pure</span>
        <span>No fillers or toxins</span>
        <span>Money back guaranteed</span>
        <span>Fast international shipping</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { label: 'Who sells it', us: 'Licensed extractor. No middleman.', them: 'Resellers, unknown source.' },
  { label: 'Altitude', us: 'Above 17,000 ft, Skardu.', them: 'Often below 16,000 ft.' },
  { label: 'Fulvic acid', us: '73%, lab verified.', them: 'Not disclosed.' },
  { label: 'Purification', us: '8 stages, 40 days sun-dried, no chemicals.', them: 'Boiling or none.' },
  { label: 'Testing', us: 'PCSIR, Eurofins, Micro Quality Lab. ISO, GMP, HACCP, Halal.', them: 'No reports.' },
  { label: 'Traceability', us: 'Batch number on every pack.', them: 'None.' },
  { label: 'Guarantee', us: 'Money back, worldwide.', them: 'Rarely.' },
  { label: 'Shipping', us: '10 to 12 days worldwide, customs papers included.', them: 'Customs holds.' },
]
</script>
