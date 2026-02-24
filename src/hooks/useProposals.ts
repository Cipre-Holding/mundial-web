/**
 * @fileoverview Hooks para CRUD de propuestas comerciales y sus items.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

/** Tipos de plantilla disponibles para propuestas (empresas, gobierno, restaurantes, etc.). */
export const TEMPLATE_TYPES = [
  { value: 'empresas', label: 'Empresas', icon: 'Building2' },
  { value: 'gobierno', label: 'Gobierno', icon: 'Landmark' },
  { value: 'restaurantes', label: 'Restaurantes', icon: 'UtensilsCrossed' },
  { value: 'hoteleria', label: 'Hotelería', icon: 'Hotel' },
  { value: 'bancos', label: 'Bancos', icon: 'Banknote' },
  { value: 'seguros', label: 'Seguros', icon: 'ShieldPlus' },
] as const;

export type TemplateType = typeof TEMPLATE_TYPES[number]['value'];

/** Propuesta comercial con cliente, total y estado. */
export interface Proposal {
  id: string;
  user_id: string;
  name: string;
  client_name: string;
  notes: string;
  total_price: number;
  status: string;
  template_type: TemplateType;
  created_at: string;
  updated_at: string;
}

/** Línea de propuesta: beneficio + cantidad + subtotal. */
export interface ProposalItem {
  id: string;
  proposal_id: string;
  benefit_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

/** Lista de propuestas del usuario autenticado, ordenadas por fecha. */
export function useProposals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['proposals', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []).map((p: any) => ({
        ...p,
        total_price: Number(p.total_price),
      })) as Proposal[];
    },
    enabled: !!user,
  });
}

/** Items (beneficios) de una propuesta específica. */
export function useProposalItems(proposalId: string | null) {
  return useQuery({
    queryKey: ['proposal-items', proposalId],
    queryFn: async () => {
      if (!proposalId) return [];
      const { data, error } = await supabase
        .from('proposal_items')
        .select('*')
        .eq('proposal_id', proposalId);
      if (error) throw error;
      return (data ?? []).map((i: any) => ({
        ...i,
        unit_price: Number(i.unit_price),
        subtotal: Number(i.subtotal),
      })) as ProposalItem[];
    },
    enabled: !!proposalId,
  });
}

/** Mutación para crear una nueva propuesta. */
export function useCreateProposal() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data: { name: string; client_name: string; template_type?: string }) => {
      const { data: proposal, error } = await supabase
        .from('proposals')
        .insert({ ...data, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return proposal;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['proposals'] }),
  });
}

/** Mutación para actualizar una propuesta existente. */
export function useUpdateProposal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name?: string; client_name?: string; notes?: string; total_price?: number; status?: string; template_type?: string }) => {
      const { error } = await supabase
        .from('proposals')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['proposals'] }),
  });
}

/** Mutación para eliminar una propuesta. */
export function useDeleteProposal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['proposals'] }),
  });
}

/** Mutación para guardar/reemplazar los items de una propuesta y actualizar el total. */
export function useSaveProposalItems() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ proposalId, items }: {
      proposalId: string;
      items: { benefit_id: string; quantity: number; unit_price: number; subtotal: number }[];
    }) => {
      // Delete existing items
      await supabase.from('proposal_items').delete().eq('proposal_id', proposalId);
      // Insert new items
      if (items.length > 0) {
        const { error } = await supabase
          .from('proposal_items')
          .insert(items.map(i => ({ ...i, proposal_id: proposalId })));
        if (error) throw error;
      }
      // Update total
      const total = items.reduce((sum, i) => sum + i.subtotal, 0);
      await supabase.from('proposals').update({ total_price: total }).eq('id', proposalId);
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['proposal-items', vars.proposalId] });
      qc.invalidateQueries({ queryKey: ['proposals'] });
    },
  });
}
