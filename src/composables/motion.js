import { SHAPES } from '../data/contenido'

// Animaciones de toda la página, declaradas con atributos data-* en los componentes:
//   data-prog            barra de progreso de scroll
//   data-par + data-speed  parallax respecto a su sección (y al puntero)
//   data-logo / data-word / data-fade   entrada del hero
//   data-sway / data-drift / data-blob  movimiento continuo (tentáculos, ondas, formas)
//   data-marquee         cinta que se desplaza
//   data-reveal (+ data-delay)          aparece al entrar en pantalla
// Intensidad: 'expresiva' | 'sutil' | 'ninguna'.
const INTENSIDAD = 'expresiva'

export function setupMotion(root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const m = reduce ? 'ninguna' : INTENSIDAD
  const anims = []
  let raf = null
  let mx = 0
  let my = 0

  const parallax = () => {
    const vh = innerHeight
    root.querySelectorAll('[data-par]').forEach(el => {
      const r = el.parentElement.getBoundingClientRect()
      if (r.bottom < -100 || r.top > vh + 100) return
      const s = +el.dataset.speed
      el.style.transform = `translate3d(${mx * s * 120}px, ${-r.top * s + my * s * 90}px, 0)`
    })
  }

  const prog = root.querySelector('[data-prog]')
  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = null
      const h = document.documentElement.scrollHeight - innerHeight
      if (prog) prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
      if (m === 'expresiva') parallax()
    })
  }
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  let io
  let onPtr
  if (m !== 'ninguna') {
    const k = m === 'expresiva' ? 1 : 0.6
    const ease = 'cubic-bezier(.2,.8,.2,1)'
    const A = (el, kf, o) => { const a = el.animate(kf, o); anims.push(a); return a }
    const all = sel => root.querySelectorAll(sel)

    const logo = root.querySelector('[data-logo]')
    if (logo) {
      const f = 'brightness(0) invert(1)'
      A(logo, [
        { opacity: 0, transform: 'scale(.6) rotate(-8deg)', filter: `${f} blur(12px)` },
        { opacity: 1, transform: 'scale(1.04) rotate(1deg)', filter: `${f} blur(0)`, offset: .7 },
        { opacity: 1, transform: 'none', filter: `${f} blur(0)` }
      ], { duration: 1300 * k, delay: 100, easing: ease, fill: 'both' })
    }
    all('[data-word]').forEach((el, i) => A(el, [{ transform: 'translateY(110%) rotate(6deg)' }, { transform: 'none' }], { duration: 1000 * k, delay: 700 + i * 80 * k, easing: ease, fill: 'both' }))
    all('[data-fade]').forEach((el, i) => A(el, [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 800 * k, delay: 500 + i * 600 * k, easing: ease, fill: 'both' }))
    all('[data-sway]').forEach((el, i) => A(el, [{ transform: 'rotate(-3deg)' }, { transform: 'rotate(4deg)' }], { duration: 5200 + i * 700, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }))
    all('[data-drift]').forEach(el => A(el, [{ transform: 'scale(1.05) translate(0,0)' }, { transform: 'scale(1.12) translate(-2%,1.5%)' }], { duration: 14000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }))
    all('[data-blob]').forEach((el, i) => {
      const a = SHAPES[i % 4], b = SHAPES[(i + 1) % 4], c = SHAPES[(i + 2) % 4]
      A(el, [{ borderRadius: a }, { borderRadius: b }, { borderRadius: c }, { borderRadius: a }], { duration: 9000 + (i % 3) * 1800, iterations: Infinity, easing: 'ease-in-out' })
    })
    all('[data-marquee]').forEach(el => A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 38000, iterations: Infinity }))

    const dist = 50 * k
    io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.__reveal?.play()
      io.unobserve(e.target)
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    all('[data-reveal]').forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < innerHeight && r.bottom > 0) return // ya visible: no se anima
      const a = A(el, [{ opacity: 0, translate: `0 ${dist}px` }, { opacity: 1, translate: '0 0' }], { duration: 900 * k, delay: +(el.dataset.delay || 0), easing: ease, fill: 'both' })
      a.pause()
      el.__reveal = a
      io.observe(el)
    })

    if (m === 'expresiva' && matchMedia('(pointer: fine)').matches) {
      onPtr = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; onScroll() }
      addEventListener('pointermove', onPtr, { passive: true })
    }
  }

  return () => {
    removeEventListener('scroll', onScroll)
    if (onPtr) removeEventListener('pointermove', onPtr)
    if (raf) cancelAnimationFrame(raf)
    io?.disconnect()
    anims.forEach(a => a.cancel())
  }
}
