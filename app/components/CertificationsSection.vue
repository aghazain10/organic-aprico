<template>
  <section class="section" id="certifications">
    <div class="wrap">
      <div class="section-head">
        <h2>Backed by tradition, certified by labs</h2>
        <p>Every batch is tested by independent labs for fulvic acid, heavy metals and aflatoxins.</p>
      </div>
      <ul class="seals">
        <li v-for="seal in seals" :key="seal.name" class="seal">
          <span class="seal-ring">
            <span class="seal-name">{{ seal.name }}</span>
          </span>
          <span class="seal-desc">{{ seal.desc }}</span>
        </li>
      </ul>
      <div class="labs">
        <div v-for="lab in labs" :key="lab.name">
          <strong>{{ lab.name }}</strong>
          <span>{{ lab.location }}</span>
        </div>
      </div>
      <div style="margin-top: clamp(2rem, 4vw, 3.5rem); text-align: center">
        <NuxtLink to="/certifications" class="btn btn-ghost">See Certifications</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const seals = [
  { name: 'ISO 9001', desc: 'Quality management' },
  { name: 'ISO 22000', desc: 'Food safety management' },
  { name: 'GMP', desc: 'Good manufacturing practice' },
  { name: 'HACCP', desc: 'Hazard analysis and control' },
  { name: 'Halal', desc: 'Halal certified' },
]

const labs = [
  { name: 'Micro Quality Lab', location: 'California, USA' },
  { name: 'PCSIR Laboratories Complex', location: 'Lahore, Pakistan' },
  { name: 'Eurofins', location: 'International verification' },
  { name: 'Government licensed', location: 'Extraction and export' },
]
</script>
