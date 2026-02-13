/**
 * @fileoverview Hooks para CRUD de prospectos del pipeline de ventas.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

/** Prospecto comercial: empresa, contacto, sector, ciudad, estado en pipeline. */
export interface Prospect {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_role: string;
  sector: string;
  city: string;
  status: string;
  assigned_to: string | null;
  notes: string;
  proposal_id: string | null;
  last_contact_at: string | null;
  created_at: string;
  updated_at: string;
}

export const SECTORS = [
  { value: 'restaurantes', label: 'Restaurantes y Gastronomía' },
  { value: 'bancos', label: 'Bancos e Inst. Financieras' },
  { value: 'seguros', label: 'Seguros' },
  { value: 'hoteleria', label: 'Hotelería y Hospedaje' },
  { value: 'retail', label: 'Retail y Comercio' },
  { value: 'entretenimiento', label: 'Entretenimiento y Ocio' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'telecom', label: 'Telecomunicaciones' },
  { value: 'salud', label: 'Salud y Farmacia' },
  { value: 'gobierno', label: 'Gobierno y Turismo' },
  { value: 'general', label: 'Otro' },
];

export const PIPELINE_STAGES = [
  { value: 'identificado', label: 'Identificado', color: 'bg-zinc-500' },
  { value: 'contactado', label: 'Contactado', color: 'bg-blue-500' },
  { value: 'presentacion', label: 'Presentación', color: 'bg-purple-500' },
  { value: 'propuesta', label: 'Propuesta enviada', color: 'bg-amber-500' },
  { value: 'negociacion', label: 'Negociación', color: 'bg-orange-500' },
  { value: 'cerrado', label: 'Cerrado ✅', color: 'bg-green-500' },
  { value: 'perdido', label: 'Perdido ❌', color: 'bg-red-500' },
];

export const CITIES = [
  { value: 'CDMX', label: 'CDMX' },
  { value: 'Monterrey', label: 'Monterrey' },
  { value: 'Guadalajara', label: 'Guadalajara' },
  { value: 'Nacional', label: 'Nacional' },
  { value: 'Otro', label: 'Otro' },
];

/** Lista de prospectos ordenados por fecha de actualización. */
export function useProspects() {
  return useQuery({
    queryKey: ['prospects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Prospect[];
    },
  });
}

/** Mutación para crear un prospecto. Asigna al usuario actual si no se especifica. */
export function useCreateProspect() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: Partial<Prospect>) => {
      const { error } = await supabase
        .from('prospects')
        .insert({ ...data, assigned_to: data.assigned_to || user!.id } as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prospects'] }),
  });
}

/** Mutación para actualizar un prospecto. */
export function useUpdateProspect() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<Prospect>) => {
      const { error } = await supabase
        .from('prospects')
        .update(data as any)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prospects'] }),
  });
}

/** Mutación para eliminar un prospecto. */
export function useDeleteProspect() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prospects'] }),
  });
}
