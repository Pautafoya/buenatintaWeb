<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { NAV, CONTACTO } from '../data/contenido'
import { useKeydown } from '../composables/useEscape'

const menuOpen = ref(false)
const desktopLinks = NAV.filter(l => l.id !== 'contacto')

// Si la ventana se agranda con el menú abierto, se cierra.
let mq
const onBreakpoint = e => { if (e.matches) menuOpen.value = false }
onMounted(() => {
  mq = matchMedia('(min-width: 900px)')
  mq.addEventListener('change', onBreakpoint)
})
onBeforeUnmount(() => mq?.removeEventListener('change', onBreakpoint))

watch(menuOpen, open => { document.documentElement.style.overflow = open ? 'hidden' : '' })
useKeydown(e => { if (e.key === 'Escape') menuOpen.value = false })
</script>

<template>
  <header class="header">
    <nav class="nav" aria-label="Principal">
      <a href="#inicio" class="brand"><img src="assets/logo-horizontal.svg" alt="La Buena Tinta"></a>
      <div class="links">
        <a v-for="l in desktopLinks" :key="l.id" :href="'#' + l.id">{{ l.label }}</a>
        <a href="#contacto" class="cta">Pide presupuesto</a>
      </div>
      <button class="burger" aria-label="Menú" :aria-expanded="menuOpen" @click="menuOpen = true">
        <span></span><span></span>
      </button>
    </nav>
  </header>

  <Transition name="menu">
    <div v-if="menuOpen" class="menu" role="dialog" aria-modal="true" aria-label="Menú">
      <img src="assets/tentaculo-blanco.svg" alt="" class="menu-tentacle">
      <div class="menu-top">
        <img src="assets/logo-emblema.svg" alt="" class="menu-emblem">
        <button class="close-btn menu-close" aria-label="Cerrar" @click="menuOpen = false">×</button>
      </div>
      <div class="menu-links">
        <a v-for="l in NAV" :key="l.id" :href="'#' + l.id" @click="menuOpen = false">{{ l.label }}</a>
      </div>
      <div class="menu-mail">{{ CONTACTO.email }}</div>
    </div>
  </Transition>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 14px clamp(16px, 4vw, 48px);
}
.nav {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: rgba(255, 255, 255, .92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 999px;
  padding: 10px 12px 10px 22px;
  box-shadow: 0 10px 30px -18px rgba(120, 30, 0, .5);
}
.brand { display: flex; align-items: center; }
.brand img { height: 26px; display: block; }
.links {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 30px);
  font-size: 14px;
  font-weight: 500;
}
.links a { color: var(--tinta); }
.links a:hover { color: var(--naranja); }
.links .cta {
  background: var(--naranja);
  color: #fff;
  padding: 11px 20px;
  border-radius: 999px;
  font-weight: 600;
  transition: transform .25s var(--spring), background .2s;
}
.links .cta:hover { background: var(--tinta); color: #fff; transform: rotate(-3deg) scale(1.05); }
.burger {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: var(--naranja);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}
.burger span { width: 18px; height: 2px; background: #fff; border-radius: 2px; }
@media (max-width: 899.98px) {
  .links { display: none; }
  .burger { display: flex; }
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: var(--naranja);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px clamp(20px, 6vw, 48px);
  overflow: hidden;
}
.menu-tentacle {
  position: absolute;
  right: -40px;
  bottom: -30px;
  width: 60%;
  max-width: 300px;
  opacity: .35;
  transform: scaleX(-1) rotate(180deg);
  pointer-events: none;
}
.menu-top { display: flex; justify-content: space-between; align-items: center; position: relative; }
.menu-emblem { height: 44px; filter: brightness(0) invert(1); }
.menu-close { background: #fff; color: var(--naranja); }
.menu-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 48px;
  font-family: var(--display);
  font-size: clamp(44px, 12vw, 72px);
  line-height: 1.05;
  position: relative;
}
.menu-links a { color: #fff; }
.menu-mail { margin-top: auto; font-size: 14px; position: relative; }

.menu-enter-active, .menu-leave-active { transition: opacity .3s var(--ease), transform .3s var(--ease); }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
