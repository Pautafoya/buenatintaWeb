import { onMounted, onBeforeUnmount } from 'vue'

// Escucha teclas a nivel de ventana mientras el componente está montado.
export function useKeydown(handler) {
  onMounted(() => addEventListener('keydown', handler))
  onBeforeUnmount(() => removeEventListener('keydown', handler))
}
