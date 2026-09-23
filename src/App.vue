<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { setupMotion } from './composables/motion'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import MarqueeBand from './components/MarqueeBand.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ClientsSection from './components/ClientsSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

let cleanup
let timer
onMounted(() => {
  // Pequeña espera para que el layout (y las fuentes) se asienten antes de medir.
  timer = setTimeout(() => { cleanup = setupMotion(document.getElementById('app')) }, 60)
})
onBeforeUnmount(() => { clearTimeout(timer); cleanup?.() })
</script>

<template>
  <div class="page">
    <div data-prog class="progress"></div>
    <SiteHeader />
    <main>
      <HeroSection />
      <ServicesSection />
      <MarqueeBand />
      <AboutSection />
      <ProjectsSection />
      <ClientsSection />
      <FaqSection />
      <ContactSection />
    </main>
    <SiteFooter />
    <WhatsAppButton />
  </div>
</template>

<style scoped>
.page { position: relative; overflow-x: clip; }
.progress {
  position: fixed;
  left: 0;
  top: 0;
  height: 4px;
  width: 100%;
  background: var(--tinta);
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 60;
}
</style>
