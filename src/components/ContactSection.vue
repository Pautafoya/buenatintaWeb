<script setup>
import { reactive, ref, computed } from 'vue'
import { SERVICIOS, CONTACTO } from '../data/contenido'
import { cotizacion, toggleServicio } from '../composables/cotizacion'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'contacto.php'
const DEMO = import.meta.env.VITE_FORM_DEMO === 'true'

const form = reactive({ nombre: '', contacto: '', mensaje: '', sitio: '' })
const tried = ref(false)
const status = ref('idle') // idle | sending | sent | error

const errNombre = computed(() => tried.value && !form.nombre.trim())
const errContacto = computed(() => tried.value && !form.contacto.trim())
const firstName = computed(() => form.nombre.trim().split(' ')[0] || '')

async function submit() {
  if (!form.nombre.trim() || !form.contacto.trim()) {
    tried.value = true
    return
  }
  tried.value = false
  if (DEMO) {
    status.value = 'sent'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, servicios: cotizacion.servicios })
    })
    const data = await res.json().catch(() => ({}))
    status.value = res.ok && data.ok ? 'sent' : 'error'
  } catch {
    status.value = 'error'
  }
}

function reset() {
  Object.assign(form, { nombre: '', contacto: '', mensaje: '', sitio: '' })
  cotizacion.servicios.splice(0)
  status.value = 'idle'
}
</script>

<template>
  <section id="contacto" class="section contact">
    <div data-par data-speed="-0.05" class="layer waves">
      <img src="assets/fondo-ondas-3.svg" alt="" class="cover">
    </div>
    <div class="container grid">
      <div>
        <h2 data-reveal class="title">¿Hablamos de tu marca?</h2>
        <p data-reveal class="lead">Cuéntanos tu proyecto y te enviamos una propuesta a la medida.</p>
        <div data-reveal class="direct">
          <a :href="'mailto:' + CONTACTO.email">{{ CONTACTO.email }}</a>
          <a :href="CONTACTO.whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>

      <div data-reveal data-delay="120" class="card">
        <form v-if="status !== 'sent'" novalidate @submit.prevent="submit">
          <label>Nombre
            <input v-model="form.nombre" name="nombre" autocomplete="name" placeholder="Tu nombre" :class="{ error: errNombre }" :aria-invalid="errNombre">
          </label>
          <label>Email o teléfono
            <input v-model="form.contacto" name="contacto" autocomplete="email" placeholder="¿Cómo te contactamos?" :class="{ error: errContacto }" :aria-invalid="errContacto">
          </label>
          <div class="field">¿Qué necesitas?
            <div class="chips">
              <button
                v-for="sv in SERVICIOS"
                :key="sv.name"
                type="button"
                :aria-pressed="cotizacion.servicios.includes(sv.name)"
                :class="{ on: cotizacion.servicios.includes(sv.name) }"
                @click="toggleServicio(sv.name)"
              >{{ sv.name }}</button>
            </div>
          </div>
          <label>Mensaje
            <textarea v-model="form.mensaje" name="mensaje" rows="4" placeholder="Cuéntanos sobre tu proyecto"></textarea>
          </label>
          <!-- Campo trampa para bots: las personas no lo ven. -->
          <input v-model="form.sitio" name="sitio" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
          <p v-if="status === 'error'" class="send-error" role="alert">
            No pudimos enviar tu solicitud. Escríbenos a <a :href="'mailto:' + CONTACTO.email">{{ CONTACTO.email }}</a> o por <a :href="CONTACTO.whatsapp" target="_blank" rel="noopener">WhatsApp</a>.
          </p>
          <button type="submit" class="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Enviando…' : 'Enviar solicitud →' }}
          </button>
        </form>

        <div v-else class="done" role="status">
          <img src="assets/logo-emblema.svg" alt="" class="bounce">
          <h3>¡Recibido, {{ firstName }}!</h3>
          <p>Te responderemos muy pronto con los siguientes pasos.</p>
          <button class="again" @click="reset">Enviar otra solicitud</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { background: var(--naranja); }
.waves { inset: -22% 0 -12%; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: clamp(36px, 5vw, 80px);
  align-items: start;
}
.title {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(50px, 7.4vw, 116px);
  line-height: .9;
  margin: 0;
}
.lead { margin: 26px 0 0; font-size: 18px; line-height: 1.6; font-weight: 500; max-width: 460px; }
.direct { display: flex; flex-direction: column; gap: 12px; margin-top: 36px; align-items: flex-start; }
.direct a {
  color: #fff;
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 600;
  border-bottom: 2px solid #fff;
  padding-bottom: 2px;
}
.direct a:hover { color: var(--tinta); border-color: var(--tinta); }

.card {
  background: #fff;
  color: var(--tinta);
  border-radius: 36px;
  padding: clamp(24px, 3vw, 40px);
  box-shadow: 0 40px 80px -40px var(--shadow-naranja);
}
form { display: flex; flex-direction: column; gap: 18px; }
label, .field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--naranja-osc);
}
.field { gap: 10px; }
input, textarea {
  border: 2px solid color-mix(in srgb, var(--naranja) 20%, transparent);
  border-radius: 16px;
  padding: 14px 16px;
  font-size: 16px;
  outline: none;
  background: var(--crema);
  color: var(--tinta);
}
textarea { resize: vertical; }
input:focus, textarea:focus, input.error { border-color: var(--naranja); }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips button {
  border: 2px solid var(--naranja);
  background: #fff;
  color: var(--naranja-osc);
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
}
.chips button.on { background: var(--naranja); color: #fff; transform: scale(1.04); }
.send-error { margin: 0; font-size: 14px; line-height: 1.5; color: var(--naranja-osc); }
.send-error a { color: var(--naranja-osc); font-weight: 600; text-decoration: underline; }
.submit {
  background: var(--naranja);
  color: #fff;
  border: 0;
  padding: 18px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform .3s var(--spring), background .2s;
}
.submit:hover:not(:disabled) { background: var(--tinta); transform: translateY(-2px) rotate(-1deg); }
.submit:disabled { opacity: .7; cursor: progress; }

.done { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; padding: 40px 10px; }
.done h3 { font-family: var(--display); font-size: 40px; margin: 0; color: var(--naranja); }
.done p { margin: 0; font-size: 16px; line-height: 1.6; max-width: 340px; }
.bounce { width: 110px; animation: bounce-in .8s var(--spring); }
@keyframes bounce-in {
  0% { transform: scale(0) rotate(-60deg); }
  60% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0); }
}
.again {
  margin-top: 8px;
  background: none;
  border: 2px solid var(--naranja);
  color: var(--naranja);
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}
</style>
