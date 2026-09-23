import { reactive } from 'vue'

// Servicios marcados en el formulario de contacto. Se comparte para que
// "Cotizar este servicio" (en Servicios) los deje preseleccionados.
export const cotizacion = reactive({ servicios: [] })

export function toggleServicio(name) {
  const i = cotizacion.servicios.indexOf(name)
  if (i >= 0) cotizacion.servicios.splice(i, 1)
  else cotizacion.servicios.push(name)
}

export function agregarServicio(name) {
  if (!cotizacion.servicios.includes(name)) cotizacion.servicios.push(name)
}

export function irA(id) {
  const el = document.getElementById(id)
  if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' })
}
