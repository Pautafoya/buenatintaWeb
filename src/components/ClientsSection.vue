<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CLIENTES, TESTIMONIOS } from '../data/contenido'

const rot = [-3, 2, -1.5]
const current = ref(0)
let timer

const next = () => { current.value = (current.value + 1) % TESTIMONIOS.length }
function go(i) {
  current.value = i
  restart()
}
function restart() {
  clearInterval(timer)
  timer = setInterval(next, 6000)
}
onMounted(restart)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="clientes" class="section clients">
    <div data-par data-speed="0.08" class="layer waves">
      <img src="assets/fondo-ondas-3.svg" alt="" class="cover">
    </div>
    <div class="container">
      <h2 data-reveal class="section-title">Marcas que ya<br>llevan tinta.</h2>
      <div class="chips">
        <div
          v-for="(name, i) in CLIENTES"
          :key="name"
          data-reveal
          :data-delay="i * 90"
          class="chip"
          :style="{ '--rot': rot[i % rot.length] + 'deg' }"
        >{{ name }}</div>
      </div>

      <div data-reveal class="quotes">
        <img src="assets/tentaculo-naranja.svg" alt="" class="quotes-tentacle">
        <figure v-for="(q, i) in TESTIMONIOS" :key="i" :class="{ active: current === i }" :aria-hidden="current !== i">
          <blockquote>“{{ q.text }}”</blockquote>
          <figcaption><strong>{{ q.who }}</strong> · {{ q.role }}</figcaption>
        </figure>
        <div class="dots">
          <button
            v-for="(q, i) in TESTIMONIOS"
            :key="i"
            :class="{ active: current === i }"
            :aria-label="`Testimonio ${i + 1}`"
            @click="go(i)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.clients { background: var(--naranja); }
.waves { inset: -25% 0; }
.waves img { transform: scaleX(-1); }
.chips { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 40px; }
.chip {
  background: #fff;
  color: var(--naranja);
  border-radius: 999px;
  padding: 14px 26px;
  font-family: var(--display);
  font-size: clamp(20px, 2vw, 28px);
  transform: rotate(var(--rot));
  transition: transform .35s var(--spring);
}
.chip:hover { transform: rotate(0deg) scale(1.06); }

.quotes {
  margin-top: clamp(48px, 6vw, 80px);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  background: #fff;
  color: var(--tinta);
  border-radius: 40px;
  padding: clamp(28px, 4vw, 60px);
  position: relative;
  overflow: hidden;
}
.quotes-tentacle {
  position: absolute;
  right: -20px;
  top: -20px;
  width: clamp(110px, 14vw, 190px);
  opacity: .25;
  pointer-events: none;
  transform: scaleX(-1);
}
figure {
  grid-area: 1 / 1;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .6s, transform .6s var(--ease);
  pointer-events: none;
}
figure.active { opacity: 1; transform: none; pointer-events: auto; }
blockquote {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(26px, 3.2vw, 46px);
  line-height: 1.12;
  max-width: 900px;
  text-wrap: pretty;
}
figcaption { margin-top: 26px; font-size: 15px; }
figcaption strong { color: var(--naranja); }
.dots { display: flex; gap: 10px; margin-top: 30px; position: relative; }
.dots button {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: color-mix(in srgb, var(--naranja) 25%, transparent);
  cursor: pointer;
  transition: all .4s;
}
.dots button.active { width: 34px; background: var(--naranja); }
</style>
