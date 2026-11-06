// Datos generales del estudio. Lo que está vacío no se muestra en el sitio.
// Todo lo que figura acá sale del Behance de Fuerza o del brandbook 2024.

export const SITE = {
  name: 'Fuerza',
  fullName: 'Fuerza Estudio Creativo',
  // Dominio que aparece en las tarjetas personales del brandbook. CONFIRMAR antes de publicar.
  url: 'https://www.fuerzaestudio.com',
  claim: 'Crear o reventar.',
  tagline: 'Le damos fuerza a tu marca.',
  description:
    'Fuerza es un estudio creativo de Buenos Aires. Nos especializamos en identidad de marca, estrategia de redes sociales y generación de contenido.',
  city: 'Buenos Aires, Argentina',
  // Mail de contacto general. Vacío = no se muestra. PENDIENTE: el brandbook solo trae
  // mails personales de ejemplo en las tarjetas, no uno general del estudio.
  email: '',
  social: {
    instagram: { label: '@fuerza.ba', url: 'https://www.instagram.com/fuerza.ba' },
    behance: { label: 'behance.net/fuerza', url: 'https://www.behance.net/fuerza' },
  },
} as const;

// Formulario de contacto del pie → Google Forms (las respuestas caen en su hoja de cálculo).
// Para crearlo: scripts/crear-google-form.gs (ver README, «Formulario de contacto»).
// A mano:
// - `action`: la URL del form terminada en /formResponse
//   (https://docs.google.com/forms/d/e/<ID>/formResponse).
// - `entries`: el `entry.NNNN` de cada pregunta, en el mismo orden que el sitio.
// Mientras `action` esté vacío el formulario se ve pero no envía nada y lo avisa.
export const CONTACT_FORM = {
  action: '',
  entries: {
    nombre: '', // Nombre y apellido
    empresa: '', // Empresa o marca
    email: '', // Email
    telefono: '', // Código + teléfono (llega armado: «+54 11 2345 6789»)
    mensaje: '', // Contanos un poco más
  },
} as const;

export const PHONE_CODES = [
  { value: '+54', label: 'AR +54' },
  { value: '+598', label: 'UY +598' },
  { value: '+56', label: 'CL +56' },
  { value: '+595', label: 'PY +595' },
  { value: '+591', label: 'BO +591' },
  { value: '+55', label: 'BR +55' },
  { value: '+51', label: 'PE +51' },
  { value: '+57', label: 'CO +57' },
  { value: '+52', label: 'MX +52' },
  { value: '+34', label: 'ES +34' },
  { value: '+1', label: 'US +1' },
] as const;

export const NAV = [
  { href: '/proyectos/', label: 'Proyectos' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
] as const;
