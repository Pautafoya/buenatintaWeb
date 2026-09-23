<script setup>
import { MARQUESINA } from '../data/contenido'

// La lista va duplicada para que el bucle (-50%) sea continuo.
const items = [...MARQUESINA, ...MARQUESINA]
</script>

<template>
  <div class="band" aria-hidden="true">
    <div data-marquee class="track">
      <span v-for="(m, i) in items" :key="i" class="item">{{ m }}<img src="assets/logo-emblema.svg" alt=""></span>
    </div>
  </div>
</template>

<style scoped>
.band {
  position: relative;
  z-index: 3;
  background: #fff;
  color: var(--naranja);
  transform: rotate(-2deg);
  margin: -24px -20px 0;
  box-shadow: 0 20px 40px -24px rgba(90, 20, 0, .5);
  padding: 18px 0;
  overflow: hidden;
}
.track {
  display: flex;
  width: max-content;
  gap: 40px;
  align-items: center;
  font-family: var(--display);
  font-size: clamp(28px, 3.4vw, 46px);
  white-space: nowrap;
}
.item { display: flex; align-items: center; gap: 40px; }
.item img { height: .9em; }
</style>
