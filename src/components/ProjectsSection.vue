<script setup>
import { ref } from 'vue'
import { GALERIA, SHAPES } from '../data/contenido'
import BeforeAfter from './BeforeAfter.vue'
import LightBox from './LightBox.vue'

const tabs = ['Render', 'Instalación', 'Antes / Después']
const tab = ref(0)
const lightbox = ref(-1)
</script>

<template>
  <section id="proyectos" class="section projects">
    <div data-blob class="layer blob"></div>
    <div class="container">
      <div class="head">
        <h2 data-reveal class="section-title">Render. Impresión.<br>Instalación.</h2>
        <p data-reveal data-delay="100">Así llevamos la marca de Clínica de la Vista del render a la calle.</p>
      </div>

      <div data-reveal class="case">
        <img src="assets/fondo-ondas-3.svg" alt="" class="layer cover case-bg">
        <div class="case-info">
          <div class="case-kicker">Caso destacado</div>
          <h3>Clínica de la Vista: una clínica sobre ruedas</h3>
          <p>Rotulamos por completo un remolque de consulta oftalmológica móvil: primero en render, después impresión e instalación del vinil en sitio.</p>
          <div class="tabs" role="tablist">
            <button
              v-for="(label, i) in tabs"
              :key="label"
              role="tab"
              :aria-selected="tab === i"
              :class="{ active: tab === i }"
              @click="tab = i"
            >{{ label }}</button>
          </div>
          <p v-if="tab === 2" class="hint">Arrastra el control para comparar.</p>
        </div>
        <div class="case-media">
          <Transition name="tab">
            <div v-if="tab === 0" key="render" class="renders">
              <img src="assets/img/render-1.jpg" alt="Render del remolque, lado derecho">
              <img src="assets/img/render-2.jpg" alt="Render del remolque, lado izquierdo">
            </div>
            <img v-else-if="tab === 1" key="inst" src="assets/img/remolque-instalacion.jpg" alt="Instalación del vinil en el remolque" class="install">
            <BeforeAfter v-else key="ba" before="assets/img/antes-1.jpg" after="assets/img/despues-2.jpg" />
          </Transition>
        </div>
      </div>

      <div class="gallery">
        <button
          v-for="(g, i) in GALERIA"
          :key="g.src"
          data-reveal
          :data-delay="(i % 3) * 110"
          class="card"
          :aria-label="`Ver ${g.title} · ${g.tag}`"
          @click="lightbox = i"
        >
          <div data-blob class="card-img" :style="{ borderRadius: SHAPES[i % 4] }">
            <img :src="g.src" :alt="`${g.title} · ${g.tag}`" loading="lazy" class="cover">
          </div>
          <div class="card-text">
            <span class="eyebrow">{{ g.tag }}</span>
            <span class="card-title">{{ g.title }}</span>
          </div>
        </button>
      </div>
    </div>

    <LightBox v-model="lightbox" :items="GALERIA" />
  </section>
</template>

<style scoped>
.projects { background: var(--crema); color: var(--tinta); padding-top: 0; }
.blob {
  width: clamp(300px, 40vw, 620px);
  aspect-ratio: 1 / 1;
  left: -14%;
  top: 18%;
  background: linear-gradient(135deg, var(--naranja-brillo), var(--naranja-claro) 55%, var(--naranja));
  border-radius: 42% 58% 37% 63%/55% 45% 55% 45%;
  opacity: .55;
}
.head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 20px; }
.head h2 { color: var(--naranja); }
.head p { margin: 0; max-width: 360px; font-size: 16px; line-height: 1.6; }

.case {
  margin-top: clamp(36px, 5vw, 56px);
  background: var(--naranja);
  color: #fff;
  border-radius: 40px;
  padding: clamp(18px, 2.6vw, 36px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: clamp(24px, 3vw, 44px);
  position: relative;
  overflow: hidden;
}
.case-bg { inset: 0; opacity: .7; }
.case-info { position: relative; display: flex; flex-direction: column; gap: 18px; padding: clamp(4px, 1vw, 14px); }
.case-kicker { font-size: 13px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; }
.case-info h3 { font-family: var(--display); font-size: clamp(32px, 3.6vw, 52px); line-height: .98; margin: 0; }
.case-info p { margin: 0; font-size: 16px; line-height: 1.7; font-weight: 500; text-wrap: pretty; }
.case-info .hint { font-size: 14px; }
.tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
.tabs button {
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  padding: 11px 18px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all .25s;
}
.tabs button.active { background: #fff; color: var(--naranja); }

.case-media { position: relative; min-height: 320px; display: grid; }
.renders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: #0d0d10;
  border-radius: 26px;
  padding: 12px;
  height: 100%;
  align-content: center;
}
.renders img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 16px; display: block; }
.install { width: 100%; height: 100%; min-height: 320px; object-fit: cover; border-radius: 26px; display: block; }

.tab-enter-active { transition: opacity .5s var(--ease), transform .5s var(--ease); }
.tab-enter-from { opacity: 0; transform: translateY(18px) scale(.98); }
.tab-leave-active { display: none; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: clamp(20px, 2.4vw, 36px);
  margin-top: clamp(56px, 7vw, 96px);
}
.card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: var(--tinta);
  cursor: zoom-in;
  text-align: left;
}
.card-img {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: 0 30px 50px -34px color-mix(in srgb, var(--naranja) 80%, transparent);
}
.card-img img { transition: transform .7s var(--ease); }
.card:hover .card-img img { transform: scale(1.08); }
.card-text { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
.card .eyebrow { letter-spacing: .16em; }
.card-title { font-family: var(--display); font-size: 24px; line-height: 1.1; }
</style>
