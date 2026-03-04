import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Palabras clave que excluyen categorías y beneficios del catálogo.
 * No mostramos: push notifications, geofencing, contenido editorial ni data/analytics.
 */
const EXCLUDED_KEYWORDS = [
  'push', 'notificación', 'notification', 'geofenc',
  'contenido', 'content', 'analytics', 'métrica', 'data y', 'data and',
];

function shouldExclude(name: string | null | undefined): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();
  return EXCLUDED_KEYWORDS.some(kw => lower.includes(kw));
}

/** Categoría de beneficios del catálogo comercial. */
export interface BenefitCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}

/** Beneficio individual del catálogo (precio, nombre, unidad). */
export interface Benefit {
  id: string;
  category_id: string;
  name: string;
  description: string;
  unit_price: number;
  unit_label: string;
  is_active: boolean;
  sort_order: number;
}

/** Beneficio con su categoría asociada. */
export interface BenefitWithCategory extends Benefit {
  category: BenefitCategory;
}

/**
 * Obtiene las categorías de beneficios desde Supabase.
 *
 * @returns Query con categorías ordenadas por sort_order
 */
/**
 * Obtiene las categorías de beneficios desde Supabase, excluyendo las que no vendemos:
 * push notifications, geofencing, contenido, data/analytics.
 *
 * @returns Query con categorías ordenadas por sort_order (filtradas)
 */
export function useBenefitCategories() {
  return useQuery({
    queryKey: ['benefit-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('benefit_categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      const filtered = (data ?? []).filter(
        (c: BenefitCategory) => !shouldExclude(c.name) && !shouldExclude(c.description)
      );
      return filtered as BenefitCategory[];
    },
  });
}

/**
 * Obtiene los beneficios activos con sus categorías desde Supabase.
 * Excluye beneficios y categorías no vendidos: push, geofencing, contenido, data/analytics.
 *
 * @returns Query con beneficios activos, ordenados e incluyendo categoría (filtrados)
 */
export function useBenefits() {
  return useQuery({
    queryKey: ['benefits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('benefits')
        .select('*, benefit_categories(*)')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      const mapped = (data ?? []).map((b: any) => ({
        ...b,
        unit_price: Number(b.unit_price),
        category: b.benefit_categories,
      })) as BenefitWithCategory[];
      const filtered = mapped.filter((b) => {
        const catExcluded = b.category && (shouldExclude(b.category.name) || shouldExclude(b.category.description));
        const benefitExcluded = shouldExclude(b.name) || shouldExclude(b.description);
        return !catExcluded && !benefitExcluded;
      });
      return filtered;
    },
  });
}
