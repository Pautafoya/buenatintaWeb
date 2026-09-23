<script setup>
import { CONTACTO } from '../data/contenido'
</script>

<template>
  <a :href="CONTACTO.whatsapp" class="wa" aria-label="Escríbenos por WhatsApp" target="_blank" rel="noopener">
    <svg viewBox="0 0 32 32" width="32" height="32" fill="#fff"><path d="M16.04 3C8.86 3 3.03 8.83 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.17 29 16S23.2 3 16.04 3zm0 23.8c-1.95 0-3.86-.52-5.53-1.51l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.76 10.76 0 0 1 5.25 16c0-5.95 4.84-10.8 10.8-10.8 5.94 0 10.77 4.85 10.77 10.8 0 5.95-4.83 10.8-10.78 10.8zm5.92-8.08c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.52-.16-.73.16-.22.32-.84 1.06-1.03 1.28-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.7 0 1.59 1.16 3.13 1.32 3.35.16.22 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.78.25 1.48.21 2.04.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38z" /></svg>
  </a>
</template>

<style scoped>
.wa {
  position: fixed;
  right: clamp(14px, 2.4vw, 28px);
  bottom: clamp(14px, 2.4vw, 28px);
  z-index: 55;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, .45);
  transition: transform .35s var(--spring);
  animation: pop-in .6s var(--spring) 1.8s backwards;
}
.wa:hover { transform: scale(1.1); }
@keyframes pop-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
</style>
