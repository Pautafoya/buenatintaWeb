// Todo el texto editable del sitio vive aquí.

export const CONTACTO = {
  email: 'pamela@labuenatinta.com',
  telefono: '55 2575 4314',
  telefonoLink: 'tel:+525525754314',
  whatsapp: 'https://wa.me/525525754314',
  direccion: ['Circuito Ingenieros 39, Loc. C-4', 'Cd. Satélite, 53100, Edo. de México'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Circuito+Ingenieros+39+Loc+C-4+Ciudad+Sat%C3%A9lite+53100'
}

// Pendiente: enlaces reales de redes sociales.
export const REDES = {
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  tiktok: 'https://tiktok.com/',
  linkedin: 'https://linkedin.com/'
}

export const NAV = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Clientes', id: 'clientes' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contacto', id: 'contacto' }
]

// Formas orgánicas que se alternan en fotos y manchas de color.
export const SHAPES = [
  '58% 42% 63% 37%/45% 55% 45% 55%',
  '42% 58% 37% 63%/55% 45% 55% 45%',
  '63% 37% 48% 52%/38% 58% 42% 62%',
  '47% 53% 60% 40%/60% 40% 60% 40%'
]

export const SERVICIOS = [
  { name: 'Aplicación de Identidad Visual', desc: 'Trasladamos tu marca a papelería, material promocional, señalética y packaging, con coherencia y reconocimiento en cada soporte.', img: 'assets/img/papeleria.jpg' },
  { name: 'Diseño de Logotipo & Branding Templates', desc: 'Logotipos con carácter y plantillas listas para redes, presentaciones y piezas digitales, siempre alineadas a tu identidad.', img: 'assets/img/clinica-letrero.jpg' },
  { name: 'Branding Corporativo', desc: 'La personalidad completa de tu marca: paleta, tipografía, tono y un sistema visual coherente en cada punto de contacto.', img: 'assets/img/cornea.jpg' },
  { name: 'Branding Digital', desc: 'Tu identidad adaptada a web, redes sociales y medios digitales para que se reconozca en cualquier pantalla.', img: 'assets/img/render-1.jpg' },
  { name: 'Manual de Identidad', desc: 'Documentamos las reglas de uso de tu marca —logotipo, colores, tipografías y aplicaciones— para que siempre se vea igual.', img: 'assets/img/museo-3.jpg' },
  { name: 'Instalación de Identidad Visual', desc: 'Vinilos, murales y gráficos en espacios físicos: oficinas, locales y vehículos convertidos en una extensión de tu marca.', img: 'assets/img/museo-2.jpg' }
]

export const MARQUESINA = ['Branding', 'Logotipos', 'Manual de identidad', 'Vinilos', 'Murales', 'Señalética', 'Rotulación vehicular']

export const PASOS = [
  { n: '01', title: 'Render', text: 'Visualizamos tu marca en el espacio real antes de producir, para que decidas con certeza.', img: 'assets/img/render-2.jpg' },
  { n: '02', title: 'Impresión', text: 'Producimos en gran formato con materiales pensados para durar dentro y fuera.', img: 'assets/img/museo-4.jpg' },
  { n: '03', title: 'Instalación', text: 'Nuestro equipo instala vinilos, murales y rotulación con acabado profesional.', img: 'assets/img/remolque-instalacion.jpg' }
]

export const GALERIA = [
  { src: 'assets/img/museo-4.jpg', title: 'Museo de béisbol', tag: 'Murales' },
  { src: 'assets/img/clinica-letrero.jpg', title: 'Clínica de la Vista', tag: 'Letrero iluminado' },
  { src: 'assets/img/museo-2.jpg', title: 'Museo de béisbol', tag: 'Muro expositivo' },
  { src: 'assets/img/cornea.jpg', title: 'Congreso Córnea', tag: 'Vinil en cristal' },
  { src: 'assets/img/museo-3.jpg', title: 'Museo de béisbol', tag: 'Salón de la fama' },
  { src: 'assets/img/clinica-andamio.jpg', title: 'Instalación en altura', tag: 'Fachada' },
  { src: 'assets/img/museo-5.jpg', title: 'Museo de béisbol', tag: 'Gráfica de muro' },
  { src: 'assets/img/papeleria.jpg', title: 'Papelería corporativa', tag: 'Aplicación de marca' },
  { src: 'assets/img/museo-1.jpg', title: 'Museo de béisbol', tag: 'Recorrido' }
]

export const CLIENTES = ['Clínica de la Vista', 'Congreso Córnea', 'Museo de béisbol']

// Pendiente: testimonios reales.
export const TESTIMONIOS = [
  { text: 'Testimonio del cliente: qué problema tenía, cómo fue trabajar con La Buena Tinta y qué resultado obtuvo.', who: 'Nombre del cliente', role: 'Cargo, Empresa' },
  { text: 'Segundo testimonio: una frase corta y concreta sobre la calidad de la instalación o el acompañamiento.', who: 'Nombre del cliente', role: 'Cargo, Empresa' },
  { text: 'Tercer testimonio: el impacto de la nueva identidad en su negocio o en sus clientes.', who: 'Nombre del cliente', role: 'Cargo, Empresa' }
]

export const FAQS = [
  { q: '¿Trabajan solo con marcas nuevas?', a: 'No. Creamos identidades desde cero, pero también renovamos marcas existentes y aplicamos identidades ya definidas en nuevos soportes.' },
  { q: '¿Se encargan de la impresión y la instalación?', a: 'Sí. Hacemos render, impresión e instalación con nuestro propio equipo, así cuidamos la calidad de principio a fin.' },
  { q: '¿Qué superficies pueden rotular?', a: 'Muros, cristales, fachadas, vehículos y remolques, oficinas, locales comerciales, señalética y exhibiciones.' },
  { q: '¿Puedo ver cómo quedará antes de producir?', a: 'Siempre. Te presentamos un render de la aplicación en tu espacio o vehículo para aprobarlo antes de imprimir.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende del alcance. En la primera propuesta te compartimos un calendario claro con cada entrega.' },
  { q: '¿Cómo pido un presupuesto?', a: 'Llena el formulario de contacto o escríbenos por WhatsApp. Te respondemos con una propuesta a la medida.' }
]
