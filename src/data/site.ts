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

export const NAV = [
  { href: '/proyectos/', label: 'Proyectos' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
] as const;
