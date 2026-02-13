/**
 * @fileoverview Progreso de metas del mes (ingresos, ventas, prospectos).
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardStats } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Target } from 'lucide-react';

export default function TargetsProgress() {
  const { user } = useAuth();
  const stats = useDashboardStats();
  const now = new Date();

  const { data: target, isLoading } = useQuery({
    queryKey: ['sales-target', user?.id, now.getMonth() + 1, now.getFullYear()],
    queryFn: async () => {
      const { data } = await supabase
        .from('sales_targets')
        .select('*')
        .eq('user_id', user!.id)
        .eq('month', now.getMonth() + 1)
        .eq('year', now.getFullYear())
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const metrics = [
    { label: 'Ingresos', current: stats.totalRevenue, target: target?.target_amount ?? 0, fmt: (n: number) => `$${n.toLocaleString('es-MX')}` },
    { label: 'Ventas Cerradas', current: stats.closedDeals, target: target?.target_deals ?? 0, fmt: (n: number) => String(n) },
    { label: 'Prospectos', current: stats.prospects, target: target?.target_prospects ?? 0, fmt: (n: number) => String(n) },
  ];

  if (isLoading || stats.loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Metas del Mes</CardTitle></CardHeader>
        <CardContent><Skeleton className="h-32 w-full" /></CardContent>
      </Card>
    );
  }

  if (!target) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Metas del Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            No tienes metas configuradas para este mes. Pide a tu admin que las configure.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Metas del Mes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map(m => {
          const pct = m.target > 0 ? Math.min(Math.round((m.current / m.target) * 100), 100) : 0;
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-medium text-foreground">{m.fmt(m.current)} / {m.fmt(m.target)}</span>
              </div>
              <Progress value={pct} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">{pct}%</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
