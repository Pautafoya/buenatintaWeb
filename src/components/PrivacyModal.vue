<script setup>
import { CONTACTO } from '../data/contenido'
import { useKeydown } from '../composables/useEscape'

const open = defineModel({ type: Boolean, default: false })
useKeydown(e => { if (open.value && e.key === 'Escape') open.value = false })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="overlay" @click="open = false">
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="aviso-titulo" @click.stop>
          <button class="close-btn close" aria-label="Cerrar" @click="open = false">×</button>
          <h3 id="aviso-titulo">Aviso de privacidad</h3>
          <!-- Pendiente: sustituir por el aviso de privacidad legal vigente de la empresa. -->
          <div class="text">
            <p>La Buena Tinta, con domicilio en {{ CONTACTO.direccion.join(', ') }}, es responsable del uso y protección de sus datos personales.</p>
            <p><strong>Datos que recabamos:</strong> nombre, correo electrónico, teléfono y la información que nos comparta sobre su proyecto a través del formulario de contacto.</p>
            <p><strong>Finalidad:</strong> responder a su solicitud, elaborar cotizaciones y darle seguimiento a los servicios contratados.</p>
            <p><strong>Derechos ARCO:</strong> puede solicitar el acceso, rectificación, cancelación u oposición al tratamiento de sus datos escribiendo a {{ CONTACTO.email }}.</p>
            <p class="note">Texto de referencia. Sustituir por el aviso de privacidad legal vigente de la empresa.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(44, 46, 53, .6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 48px);
}
.dialog {
  background: #fff;
  color: var(--tinta);
  border-radius: 32px;
  max-width: 720px;
  width: 100%;
  max-height: 84vh;
  overflow: auto;
  padding: clamp(24px, 4vw, 48px);
  position: relative;
}
.close { position: absolute; right: 18px; top: 18px; background: var(--naranja); color: #fff; }
h3 { font-family: var(--display); font-size: clamp(30px, 3.4vw, 44px); margin: 0 50px 0 0; color: var(--naranja); }
.text { display: flex; flex-direction: column; gap: 14px; margin-top: 22px; font-size: 15px; line-height: 1.7; }
.text p { margin: 0; }
.note { font-size: 13px; color: var(--gris); }

.modal-enter-active, .modal-leave-active { transition: opacity .25s var(--ease); }
.modal-enter-active .dialog, .modal-leave-active .dialog { transition: transform .3s var(--ease); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .dialog, .modal-leave-to .dialog { transform: translateY(16px) scale(.98); }
</style>
