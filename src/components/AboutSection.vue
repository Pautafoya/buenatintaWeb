<script setup>
import { PASOS, SHAPES } from '../data/contenido'
</script>

<template>
  <section id="nosotros" class="section about">
    <div class="layer tentacle">
      <img data-sway src="assets/tentaculo-naranja.svg" alt="">
    </div>
    <div class="container">
      <h2 data-reveal class="section-title heading">
        ¿Por qué elegir <span class="inline-logo"><img src="assets/logo-horizontal.svg" alt="La Buena Tinta"></span>?
      </h2>
      <div class="intro">
        <p data-reveal class="lead">No solo diseñamos: creamos experiencias de marca que conectan y generan impacto.</p>
        <p data-reveal data-delay="120" class="text">Ofrecemos soluciones estratégicas y creativas que garantizan coherencia y diferenciación. Llevamos la identidad visual al siguiente nivel con la instalación de vinilos, murales y otros elementos gráficos en espacios físicos, para que tu marca se viva en cada detalle.</p>
      </div>
      <div class="steps">
        <div v-for="(s, i) in PASOS" :key="s.n" data-reveal :data-delay="i * 120" class="step">
          <div data-blob class="step-img" :style="{ borderRadius: SHAPES[i] }">
            <img :src="s.img" :alt="s.title" loading="lazy" class="cover">
          </div>
          <div class="step-head">
            <span class="step-n">{{ s.n }}</span>
            <span class="step-title">{{ s.title }}</span>
          </div>
          <p>{{ s.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--crema);
  color: var(--tinta);
  padding-top: clamp(110px, 13vw, 170px);
  margin-top: -30px;
}
.tentacle { right: -2%; top: 0; width: clamp(170px, 24vw, 340px); transform: scaleX(-1); }
.tentacle img { width: 100%; display: block; transform-origin: 0 0; }
.heading { color: var(--naranja); max-width: 900px; }
.inline-logo { display: inline-flex; align-items: center; vertical-align: middle; }
.inline-logo img { height: .72em; display: block; }
.intro {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: clamp(32px, 5vw, 80px);
  margin-top: clamp(36px, 5vw, 60px);
}
.lead { margin: 0; font-family: var(--display); font-size: clamp(26px, 2.8vw, 40px); line-height: 1.1; text-wrap: balance; }
.text { margin: 0; font-size: clamp(16px, 1.25vw, 18px); line-height: 1.75; text-wrap: pretty; }
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: clamp(18px, 2vw, 28px);
  margin-top: clamp(56px, 7vw, 96px);
}
.step { display: flex; flex-direction: column; gap: 18px; }
.step-img {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: 0 30px 50px -30px color-mix(in srgb, var(--naranja) 70%, transparent);
  transition: transform .5s var(--spring);
}
.step-img:hover { transform: scale(1.04) rotate(-3deg); }
.step-head { display: flex; align-items: baseline; gap: 14px; }
.step-n { font-family: var(--display); font-size: 22px; color: var(--naranja); }
.step-title { font-family: var(--display); font-size: clamp(32px, 3vw, 44px); }
.step p { margin: 0; font-size: 15px; line-height: 1.65; }
</style>
