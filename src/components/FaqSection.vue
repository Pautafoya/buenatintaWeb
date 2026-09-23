<script setup>
import { ref } from 'vue'
import { FAQS } from '../data/contenido'

const open = ref(0)
const toggle = i => { open.value = open.value === i ? -1 : i }
</script>

<template>
  <section id="faq" class="section faq">
    <div class="container grid">
      <div class="side">
        <h2 data-reveal class="title">Preguntas frecuentes</h2>
        <p data-reveal>¿No encuentras tu respuesta? <a href="#contacto">Escríbenos</a>.</p>
      </div>
      <div class="list">
        <div v-for="(f, i) in FAQS" :key="f.q" data-reveal class="item" :class="{ open: open === i }">
          <button :aria-expanded="open === i" @click="toggle(i)">
            <span>{{ f.q }}</span>
            <span class="icon" aria-hidden="true">+</span>
          </button>
          <div class="collapse">
            <div><p>{{ f.a }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq { background: var(--crema); color: var(--tinta); overflow: visible; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
}
.side { position: sticky; top: 120px; }
.title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(46px, 5.8vw, 90px);
  line-height: .9;
  margin: 0;
  color: var(--naranja);
}
.side p { margin: 22px 0 0; font-size: 16px; line-height: 1.6; max-width: 380px; }
.side a { font-weight: 600; color: var(--naranja); }
.side a:hover { color: var(--naranja-osc); }

.list { display: flex; flex-direction: column; gap: 12px; }
.item { background: #fff; color: var(--tinta); border-radius: 28px; transition: background .3s, color .3s; }
.item.open { background: var(--naranja); color: #fff; }
.item button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  color: inherit;
  font-size: clamp(16px, 1.3vw, 19px);
  font-weight: 600;
}
.icon {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--naranja);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: transform .45s var(--spring);
}
.open .icon { background: #fff; color: var(--naranja); transform: rotate(45deg); }
.collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s var(--ease); }
.collapse > div { overflow: hidden; }
.open .collapse { grid-template-rows: 1fr; }
.collapse p { margin: 0; padding: 0 24px 24px; font-size: 16px; line-height: 1.7; font-weight: 500; max-width: 620px; }
</style>
