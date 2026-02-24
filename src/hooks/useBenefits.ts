import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
export function useBenefitCategories() {
  return useQuery({
    queryKey: ['benefit-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('benefit_categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data as BenefitCategory[];
    },
  });
}

/**
 * Obtiene los beneficios activos con sus categorías desde Supabase.
 *
 * @returns Query con beneficios activos, ordenados e incluyendo categoría
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
      return (data ?? []).map((b: any) => ({
        ...b,
        unit_price: Number(b.unit_price),
        category: b.benefit_categories,
      })) as BenefitWithCategory[];
    },
  });
}
