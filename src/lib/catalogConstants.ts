/**
 * @fileoverview Constantes del catálogo comercial: multiplicador de precios
 * y descripciones comerciales detalladas por beneficio.
 */

/** Multiplicador aplicado a todos los precios del catálogo (+35%). */
export const PRICE_MULTIPLIER = 1.35;

/**
 * Calcula el precio de venta (base * 1.35).
 */
export function getDisplayPrice(basePrice: number): number {
  return Math.round(basePrice * PRICE_MULTIPLIER);
}

/**
 * Detalle comercial por beneficio. Las claves son patrones para coincidir
 * con el nombre del beneficio (case-insensitive).
 */
export interface BenefitCommercialDetail {
  ofertaComercial: string;
  valorCliente: string;
}

const BENEFIT_COMMERCIAL_MAP: Array<{ pattern: RegExp | string; detail: BenefitCommercialDetail }> = [
  {
    pattern: /banner\s*principal|banner\s*main|home\s*banner/i,
    detail: {
      ofertaComercial:
        'Posición premium en la pantalla principal (Home). El banner ocupa un slot fijo sobre el contenido principal, visible para todos los usuarios al abrir la aplicación.',
      valorCliente:
        'Máxima visibilidad; es el primer contacto visual para prácticamente el 100% de los usuarios activos.',
    },
  },
  {
    pattern: /listado\s*destacado|destacado\s*en\s*directorio/i,
    detail: {
      ofertaComercial:
        'Aparición prioritaria en búsquedas y directorio. Los beneficios incluyen un distintivo visual (badge de "Destacado").',
      valorCliente:
        'Mayor probabilidad de conversión y canje; clara diferenciación frente a la competencia.',
    },
  },
  {
    pattern: /perfil\s*de\s*marca|perfil\s*marca|landing\s*page/i,
    detail: {
      ofertaComercial:
        'Landing page nativa para la marca dentro de la app, incluyendo galería de fotos, menú interactivo/PDF y ofertas vigentes.',
      valorCliente:
        'Espacio inmersivo para storytelling, digitalización de menú y concentración de su propuesta de valor.',
    },
  },
];

/**
 * Obtiene el detalle comercial para un beneficio por nombre.
 */
export function getBenefitCommercialDetail(benefitName: string): BenefitCommercialDetail | null {
  const name = benefitName.trim();
  for (const { pattern, detail } of BENEFIT_COMMERCIAL_MAP) {
    if (typeof pattern === 'string') {
      if (name.toLowerCase().includes(pattern.toLowerCase())) return detail;
    } else {
      if (pattern.test(name)) return detail;
    }
  }
  return null;
}

/** Aspectos comerciales (SLA, exclusividad, KPIs). */
export const ASPECTOS_COMERCIALES = {
  titulo: 'Aspectos Comerciales',
  items: [
    {
      titulo: 'Tiempos de Activación',
      texto:
        'Banners y destacados estarán en vivo máximo 48 hrs hábiles tras confirmación de pago y recepción de assets. Perfiles de Marca en máximo 5 días hábiles.',
    },
    {
      titulo: 'Exclusividad',
      texto:
        'Posibilidad de ofrecer exclusividad por categoría (ej. un solo banco o cerveza en el Banner Principal a la vez) con un markup en el precio.',
    },
    {
      titulo: 'Métricas de Retorno (KPIs)',
      texto:
        'Entregaremos a las marcas reportes de Impresiones, Clics (CTR) y Tasas de Canje para demostrar el ROI.',
    },
  ],
};

/** Aspectos legales. */
export const ASPECTOS_LEGALES = {
  titulo: 'Aspectos Legales',
  items: [
    {
      titulo: 'Privacidad',
      texto:
        'Los beneficios comerciales no comparten datos personales directos (PII) con los patrocinadores. Solo se entregarán métricas agregadas y anonimizadas.',
    },
    {
      titulo: 'Responsabilidad de Contenido',
      texto:
        'El contrato de patrocinio debe estipular que el cliente es 100% responsable de tener los derechos de las imágenes enviadas y de cumplir con la normativa mexicana de publicidad.',
    },
    {
      titulo: 'Regulación Local (COFEPRIS)',
      texto:
        'Si el perfil o banner promociona alcohol o apuestas deportivas, es obligatorio incluir las leyendas legales correspondientes ("El abuso en el consumo...", etc.) directamente en los artes gráficos proporcionados.',
    },
  ],
};
