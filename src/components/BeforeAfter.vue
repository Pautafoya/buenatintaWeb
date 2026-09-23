<script setup>
import { ref } from 'vue'

defineProps({ before: String, after: String })

const split = ref(50)
const box = ref(null)
let dragging = false

function set(e) {
  const r = box.value.getBoundingClientRect()
  split.value = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))
}
function down(e) {
  dragging = true
  e.currentTarget.setPointerCapture?.(e.pointerId)
  set(e)
}
function move(e) { if (dragging) set(e) }
function up() { dragging = false }
function key(e) {
  if (e.key === 'ArrowLeft') split.value = Math.max(0, split.value - 5)
  if (e.key === 'ArrowRight') split.value = Math.min(100, split.value + 5)
}
</script>

<template>
  <div
    ref="box"
    class="ba"
    role="slider"
    tabindex="0"
    aria-label="Comparar antes y después"
    :aria-valuenow="Math.round(split)"
    aria-valuemin="0"
    aria-valuemax="100"
    @pointerdown="down"
    @pointermove="move"
    @pointerup="up"
    @pointercancel="up"
    @keydown="key"
  >
    <img :src="before" alt="Antes" draggable="false">
    <img :src="after" alt="Después" draggable="false" :style="{ clipPath: `inset(0 0 0 ${split}%)` }">
    <div class="divider" :style="{ left: split + '%' }">
      <div class="handle">↔</div>
    </div>
    <span class="label before">ANTES</span>
    <span class="label after">DESPUÉS</span>
  </div>
</template>

<style scoped>
.ba {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  aspect-ratio: 3 / 4;
  border-radius: 26px;
  overflow: hidden;
  cursor: ew-resize;
  touch-action: none;
  user-select: none;
}
.ba:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  margin-left: -1.5px;
  background: #fff;
  pointer-events: none;
}
.handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  border-radius: 50%;
  background: #fff;
  color: var(--naranja);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .3);
}
.label {
  position: absolute;
  top: 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .1em;
  padding: 6px 12px;
  border-radius: 999px;
  pointer-events: none;
}
.before { left: 14px; background: #fff; color: var(--tinta); }
.after { right: 14px; background: var(--tinta); color: #fff; }
</style>
