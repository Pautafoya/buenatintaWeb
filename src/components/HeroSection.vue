<script setup>
const words = ['Convertimos', 'ideas', 'en', 'identidades', 'visuales', 'poderosas.']
</script>

<template>
  <section id="inicio" class="hero">
    <div data-par data-speed="0.25" class="layer waves">
      <img data-drift src="assets/fondo-ondas-3.svg" alt="" class="cover">
    </div>
    <div data-blob data-par data-speed="-0.12" class="layer blob blob-a"></div>
    <div data-blob data-par data-speed="0.18" class="layer blob blob-b"></div>
    <div class="layer tentacle">
      <img data-sway src="assets/tentaculo-blanco.svg" alt="">
    </div>

    <div class="content">
      <img data-logo src="assets/logo-horizontal.svg" alt="La Buena Tinta" class="logo">
      <div data-fade class="tagline">Taller creativo</div>
      <h1 class="title">
        <span v-for="w in words" :key="w" class="word-mask"><span data-word class="word">{{ w }}</span></span>
      </h1>
      <div data-fade class="actions">
        <a href="#contacto" class="btn-primary">Pide tu presupuesto <span aria-hidden="true">→</span></a>
        <a href="#proyectos" class="btn-outline">Ver proyectos</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(150px, 22vh, 220px) var(--gutter) clamp(80px, 10vh, 120px);
  background: var(--naranja);
}
.waves { inset: -6%; }
.blob { aspect-ratio: 1 / 1; }
.blob-a {
  width: clamp(260px, 34vw, 520px);
  right: -8%;
  bottom: -14%;
  background: linear-gradient(135deg, var(--naranja) 10%, var(--naranja-claro) 60%, var(--naranja-brillo) 100%);
  border-radius: 58% 42% 63% 37%/45% 55% 45% 55%;
  opacity: .9;
}
.blob-b {
  width: clamp(140px, 16vw, 240px);
  left: 12%;
  bottom: 8%;
  background: linear-gradient(200deg, var(--naranja-claro), var(--naranja));
  border-radius: 42% 58% 37% 63%/55% 45% 55% 45%;
  opacity: .85;
}
.tentacle { left: 0; top: 0; width: clamp(90px, 13vw, 220px); opacity: .55; }
.tentacle img { width: 100%; display: block; transform-origin: 0 0; }

.content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.logo { width: min(88%, 760px); display: block; filter: brightness(0) invert(1); }
.tagline {
  margin-top: 22px;
  font-size: clamp(13px, 1.2vw, 16px);
  font-weight: 600;
  letter-spacing: .32em;
  text-transform: uppercase;
}
.title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(34px, 4.8vw, 68px);
  line-height: 1;
  margin: clamp(36px, 5vw, 56px) 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: .24em;
  max-width: 980px;
}
.word-mask { display: inline-block; overflow: hidden; padding-bottom: .08em; }
.word { display: inline-block; }

.actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 40px; }
.btn-primary {
  background: #fff;
  color: var(--naranja);
  padding: 17px 30px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 14px 34px -14px var(--shadow-naranja);
  transition: transform .3s var(--spring), background .2s, color .2s;
}
.btn-primary:hover { background: var(--tinta); color: #fff; transform: translateY(-3px) rotate(-2deg); }
.btn-outline {
  color: #fff;
  padding: 17px 30px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #fff;
  transition: all .2s;
}
.btn-outline:hover { background: #fff; color: var(--naranja); }
</style>
