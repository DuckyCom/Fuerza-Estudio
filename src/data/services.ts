// Servicios del estudio. La lista sale de lo que Fuerza ofrece; las descripciones
// son copy en la voz de la marca para revisar con el equipo antes de publicar.

export type Service = {
  slug: string;
  name: string;
  desc: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'branding',
    name: 'Branding e identidad de marca',
    desc: 'Construimos marcas desde cero o las repensamos: concepto, nombre, logo, color, tipografía y todo el sistema visual que las vuelve reconocibles.',
  },
  {
    slug: 'manuales-de-marca',
    name: 'Manuales de marca',
    desc: 'Ordenamos la identidad en un brandbook claro, para que cualquiera que toque la marca la use bien, en cualquier pieza.',
  },
  {
    slug: 'redes-sociales',
    name: 'Gestión de redes sociales',
    desc: 'Estrategia, calendario, diseño y comunidad. Redes con criterio propio, no por cumplir.',
  },
  {
    slug: 'contenido',
    name: 'Generación de contenido',
    desc: 'Ideas, piezas y producciones pensadas para cada plataforma y para el tono de cada marca.',
  },
  {
    slug: 'diseno-grafico',
    name: 'Diseño gráfico',
    desc: 'Packaging, piezas impresas, cartelería y todo lo que una marca necesita poner en el mundo.',
  },
  {
    slug: 'paid-media',
    name: 'Paid media',
    desc: 'Pauta en redes planificada y medida, para que el contenido llegue a quien tiene que llegar.',
  },
  {
    slug: 'campanas',
    name: 'Campañas de consumo masivo',
    desc: 'Campañas de temporada, lanzamientos y acciones que bajan el concepto a todos los puntos de contacto.',
  },
  {
    slug: 'eventos',
    name: 'Eventos',
    desc: 'Identidad, piezas y comunicación para eventos, antes, durante y después.',
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
