<script setup>
import { ref, computed } from 'vue'
import { SERVICIOS } from '../data/contenido'
import { agregarServicio, irA } from '../composables/cotizacion'

const open = ref(0)
// Con todo cerrado se sigue mostrando la última foto elegida.
const lastShown = ref(0)
const shown = computed(() => (open.value >= 0 ? open.value : lastShown.value))

function toggle(i) {
  if (open.value >= 0) lastShown.value = open.value
  open.value = open.value === i ? -1 : i
}
function hover(i) {
  // En escritorio, pasar el cursor abre el servicio.
  if (open.value !== i && matchMedia('(min-width: 900px)').matches) open.value = i
}
function cotizar(name) {
  agregarServicio(name)
  irA('contacto')
}
</script>

<template>
  <section id="servicios" class="section services">
    <div data-par data-speed="-0.06" class="layer waves">
      <img src="assets/fondo-ondas-3.svg" alt="" class="cover">
    </div>
    <div class="container grid">
      <div>
        <h2 data-reveal class="title">Nuestros<br>servicios:</h2>
        <div data-reveal data-delay="120" class="photos">
          <div
            v-for="(sv, i) in SERVICIOS"
            :key="sv.name"
            data-blob
            class="photo"
            :class="{ shown: shown === i, odd: i % 2 }"
          >
            <img :src="sv.img" :alt="sv.name" loading="lazy" class="cover">
          </div>
        </div>
      </div>

      <div class="list">
        <div v-for="(sv, i) in SERVICIOS" :key="sv.name" data-reveal :data-delay="i * 70" class="item" :class="{ open: open === i }">
          <button class="row" :aria-expanded="open === i" @click="toggle(i)" @mouseenter="hover(i)">
            <span class="dot"></span>
            <span class="name">{{ sv.name }}</span>
            <span class="plus" aria-hidden="true">+</span>
          </button>
          <div class="collapse">
            <div>
              <div class="body">
                <p>{{ sv.desc }}</p>
                <button class="ask" @click="cotizar(sv.name)">Cotizar este servicio →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services { background: var(--naranja); }
.waves { left: 0; right: 0; bottom: -10%; height: 70%; opacity: .9; }
.waves img { object-position: 0 100%; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(52px, 7.6vw, 120px);
  line-height: .88;
  margin: 0;
  text-transform: uppercase;
}
.photos { margin-top: clamp(28px, 4vw, 48px); position: relative; width: min(100%, 460px); aspect-ratio: 5 / 4; }
.photo {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 58% 42% 63% 37%/45% 55% 45% 55%;
  opacity: 0;
  transform: scale(.85) rotate(-8deg);
  transition: opacity .5s, transform .7s var(--spring);
  box-shadow: 0 30px 60px -30px rgba(90, 20, 0, .7);
}
.photo.odd { transform: scale(.85) rotate(8deg); }
.photo.shown { opacity: 1; transform: none; }

.list { display: flex; flex-direction: column; }
.item { border-bottom: 1px solid rgba(255, 255, 255, .35); }
.row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: clamp(16px, 1.8vw, 22px) 0;
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  text-align: left;
}
.dot {
  flex: none;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .55);
  transition: width .45s var(--spring), background .3s;
}
.name {
  flex: 1;
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 500;
  line-height: 1.2;
  transition: transform .35s var(--spring);
}
.row:hover .name { transform: translateX(8px); }
.plus { flex: none; font-size: 22px; transition: transform .45s var(--spring); }
.open .dot { width: 40px; background: #fff; }
.open .name { font-weight: 600; }
.open .plus { transform: rotate(135deg); }

.collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s var(--ease); }
.collapse > div { overflow: hidden; }
.open .collapse { grid-template-rows: 1fr; }
.body { padding: 0 0 24px 58px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
.body p { margin: 0; font-size: 16px; line-height: 1.7; font-weight: 500; text-wrap: pretty; }
.ask {
  background: #fff;
  color: var(--naranja-medio);
  border: 0;
  box-shadow: 0 10px 24px -12px var(--shadow-naranja);
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform .3s var(--spring);
}
.ask:hover { transform: rotate(-2deg) scale(1.05); }
</style>
