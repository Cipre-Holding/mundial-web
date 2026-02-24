/**
 * @fileoverview Hooks para datos del dashboard del panel comercial.
 * Consultas de prospectos por estado/sector, actividad reciente, métricas por vendedor y KPIs.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

/** Cuenta de prospectos agrupados por estado del pipeline. Solo si hay usuario autenticado. */
export function useProspectsByStatus() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard-prospects-by-status'],
    queryFn: async () => {
      const { data } = await supabase.from('prospects').select('status');
      const counts: Record<string, number> = {};
      (data ?? []).forEach(p => {
        counts[p.status] = (counts[p.status] || 0) + 1;
      });
      return counts;
    },
    enabled: !!user,
  });
}

export function useProspectsBySector() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard-prospects-by-sector'],
    queryFn: async () => {
      const { data } = await supabase.from('prospects').select('sector');
      const counts: Record<string, number> = {};
      (data ?? []).forEach(p => {
        counts[p.sector] = (counts[p.sector] || 0) + 1;
      });
      return counts;
    },
    enabled: !!user,
  });
}

export function useRecentActivity() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard-recent-activity'],
    queryFn: async () => {
      const [prospects, proposals] = await Promise.all([
        supabase.from('prospects').select('id, company_name, status, updated_at').order('updated_at', { ascending: false }).limit(5),
        supabase.from('proposals').select('id, name, client_name, status, total_price, updated_at').order('updated_at', { ascending: false }).limit(5),
      ]);

      const items = [
        ...(prospects.data ?? []).map(p => ({
          id: p.id,
          type: 'prospect' as const,
          title: p.company_name,
          detail: p.status,
          date: p.updated_at,
        })),
        ...(proposals.data ?? []).map(p => ({
          id: p.id,
          type: 'proposal' as const,
          title: p.name,
          detail: `${p.client_name || 'Sin cliente'} — $${Number(p.total_price).toLocaleString('es-MX')}`,
          date: p.updated_at,
        })),
      ];

      return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
    },
    enabled: !!user,
  });
}

export function useVendorMetrics() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard-vendor-metrics'],
    queryFn: async () => {
      const [prospects, proposals, profiles] = await Promise.all([
        supabase.from('prospects').select('assigned_to, status'),
        supabase.from('proposals').select('user_id, total_price, status'),
        supabase.from('profiles').select('user_id, full_name'),
      ]);

      const profileMap = new Map((profiles.data ?? []).map(p => [p.user_id, p.full_name]));
      const vendorIds = new Set<string>();

      (prospects.data ?? []).forEach(p => { if (p.assigned_to) vendorIds.add(p.assigned_to); });
      (proposals.data ?? []).forEach(p => { if (p.user_id) vendorIds.add(p.user_id); });

      return Array.from(vendorIds).map(uid => {
        const myProspects = (prospects.data ?? []).filter(p => p.assigned_to === uid);
        const myProposals = (proposals.data ?? []).filter(p => p.user_id === uid);
        const closed = myProposals.filter(p => p.status === 'cerrada');
        return {
          userId: uid,
          name: profileMap.get(uid) || 'Sin nombre',
          prospects: myProspects.length,
          proposals: myProposals.length,
          closedDeals: closed.length,
          revenue: closed.reduce((s, p) => s + Number(p.total_price), 0),
        };
      }).sort((a, b) => b.revenue - a.revenue);
    },
    enabled: !!user,
  });
}

export function useDashboardStats() {
  const { user } = useAuth();

  const prospects = useQuery({
    queryKey: ['dashboard-prospects-count'],
    queryFn: async () => {
      const { count } = await supabase.from('prospects').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
    enabled: !!user,
  });

  const proposals = useQuery({
    queryKey: ['dashboard-proposals-all'],
    queryFn: async () => {
      const { data } = await supabase.from('proposals').select('total_price, status');
      return data ?? [];
    },
    enabled: !!user,
  });

  const closedDeals = proposals.data?.filter(p => p.status === 'cerrada') ?? [];
  const totalRevenue = closedDeals.reduce((sum, p) => sum + Number(p.total_price), 0);
  const activePackages = proposals.data?.filter(p => p.status !== 'cerrada' && p.status !== 'cancelada')?.length ?? 0;

  return {
    loading: prospects.isLoading || proposals.isLoading,
    prospects: prospects.data ?? 0,
    activePackages,
    closedDeals: closedDeals.length,
    totalRevenue,
    totalProposals: proposals.data?.length ?? 0,
  };
}
