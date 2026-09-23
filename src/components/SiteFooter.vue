<script setup>
import { ref } from 'vue'
import { NAV, CONTACTO, REDES } from '../data/contenido'
import PrivacyModal from './PrivacyModal.vue'

const links = NAV.filter(l => l.id !== 'clientes').map(l => (l.id === 'faq' ? { ...l, label: 'Preguntas frecuentes' } : l))
const privOpen = ref(false)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="cols">
      <div class="brand">
        <img src="assets/logo-sticker.svg" alt="La Buena Tinta" class="sticker">
        <p>Identidad visual: render, impresión e instalación.</p>
      </div>
      <div class="col">
        <div class="eyebrow">Navegación</div>
        <div class="col-links">
          <a v-for="l in links" :key="l.id" :href="'#' + l.id">{{ l.label }}</a>
        </div>
      </div>
      <div class="col">
        <div class="eyebrow">Contacto</div>
        <div class="col-links">
          <a :href="'mailto:' + CONTACTO.email">{{ CONTACTO.email }}</a>
          <a :href="CONTACTO.telefonoLink">{{ CONTACTO.telefono }}</a>
          <a :href="CONTACTO.mapa" target="_blank" rel="noopener">{{ CONTACTO.direccion[0] }}<br>{{ CONTACTO.direccion[1] }}</a>
        </div>
      </div>
      <div class="col">
        <div class="eyebrow">Síguenos</div>
        <div class="social">
          <a :href="REDES.instagram" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" /></svg>
          </a>
          <a :href="REDES.facebook" aria-label="Facebook" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" /></svg>
          </a>
          <a :href="REDES.tiktok" aria-label="TikTok" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z" /></svg>
          </a>
          <a :href="REDES.linkedin" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="#fff"><path d="M6.9 8.9H3.6V20h3.3V8.9zM5.3 3.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.6c0-3-1.6-4.9-4.2-4.9-1.3 0-2.3.7-2.8 1.5V8.9h-3.2V20h3.3v-5.8c0-1.5.6-2.5 1.9-2.5 1.3 0 1.8 1 1.8 2.5V20h3.3v-6.4z" /></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>© {{ year }} La Buena Tinta · Taller creativo</span>
      <a href="#aviso-privacidad" @click.prevent="privOpen = true">Aviso de privacidad</a>
    </div>
    <PrivacyModal v-model="privOpen" />
  </footer>
</template>

<style scoped>
.footer { position: relative; background: #fff; color: var(--tinta); padding: clamp(56px, 7vw, 88px) var(--gutter) 28px; }
.cols {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: clamp(32px, 4vw, 56px);
  align-items: start;
}
.brand { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
.sticker { width: clamp(150px, 14vw, 190px); display: block; transition: transform .5s var(--spring); }
.sticker:hover { transform: rotate(-8deg) scale(1.06); }
.brand p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--gris); max-width: 240px; }
.col { display: flex; flex-direction: column; gap: 14px; }
.col-links { display: flex; flex-direction: column; gap: 8px; }
.col-links a { font-size: 15px; color: var(--tinta); line-height: 1.5; }
.col-links a:hover { color: var(--naranja); }
.social { display: flex; flex-wrap: wrap; gap: 10px; }
.social a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--naranja);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform .35s var(--spring);
}
.social a:hover { transform: scale(1.12) rotate(-8deg); }
.bottom {
  max-width: 1280px;
  margin: clamp(40px, 5vw, 64px) auto 0;
  padding-top: 22px;
  padding-right: 84px;
  border-top: 1px solid color-mix(in srgb, var(--naranja) 25%, transparent);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;
  font-size: 13px;
  color: var(--gris);
}
.bottom a { color: var(--gris); text-decoration: underline; text-underline-offset: 3px; }
.bottom a:hover { color: var(--naranja); }
</style>
