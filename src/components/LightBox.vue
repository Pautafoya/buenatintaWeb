<script setup>
import { computed } from 'vue'
import { useKeydown } from '../composables/useEscape'

const props = defineProps({ items: Array })
const index = defineModel({ type: Number, default: -1 })

const item = computed(() => props.items[index.value])
const step = d => { index.value = (index.value + d + props.items.length) % props.items.length }
const close = () => { index.value = -1 }

useKeydown(e => {
  if (index.value < 0) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="item" class="lightbox" role="dialog" aria-modal="true" :aria-label="item.title" @click="close">
        <Transition name="pop" mode="out-in" appear>
          <img :key="item.src" :src="item.src" :alt="item.title" @click.stop>
        </Transition>
        <div class="caption">{{ item.title }} · {{ item.tag }}</div>
        <button class="nav prev" aria-label="Anterior" @click.stop="step(-1)">←</button>
        <button class="nav next" aria-label="Siguiente" @click.stop="step(1)">→</button>
        <button class="close-btn close" aria-label="Cerrar" @click.stop="close">×</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: color-mix(in srgb, var(--naranja) 97%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 56px);
}
img {
  max-width: 100%;
  max-height: 82vh;
  border-radius: 24px;
  display: block;
  box-shadow: 0 30px 80px rgba(90, 20, 0, .45);
}
.caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.nav {
  position: absolute;
  top: 50%;
  margin-top: -26px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 0;
  background: #fff;
  color: var(--naranja);
  font-size: 22px;
  cursor: pointer;
}
.prev { left: clamp(8px, 2vw, 28px); }
.next { right: clamp(8px, 2vw, 28px); }
.close {
  position: absolute;
  right: clamp(8px, 2vw, 28px);
  top: clamp(8px, 2vw, 28px);
  width: 48px;
  height: 48px;
  background: var(--tinta);
  color: #fff;
}

.fade-enter-active, .fade-leave-active { transition: opacity .25s var(--ease); }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.pop-enter-active { transition: opacity .35s var(--ease), transform .35s var(--ease); }
.pop-enter-from { opacity: 0; transform: scale(.94); }
</style>
