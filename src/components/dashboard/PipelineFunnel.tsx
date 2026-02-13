/**
 * @fileoverview Pipeline de ventas: barras de progreso por etapa.
 */
import { useProspectsByStatus } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PIPELINE_STAGES = [
  { key: 'identificado', label: 'Identificado', color: 'bg-muted-foreground/30' },
  { key: 'contactado', label: 'Contactado', color: 'bg-primary/40' },
  { key: 'presentacion', label: 'Presentación', color: 'bg-primary/60' },
  { key: 'negociacion', label: 'Negociación', color: 'bg-accent' },
  { key: 'propuesta_enviada', label: 'Propuesta Enviada', color: 'bg-primary/80' },
  { key: 'cerrado', label: 'Cerrado', color: 'bg-primary' },
  { key: 'perdido', label: 'Perdido', color: 'bg-destructive/60' },
];

export default function PipelineFunnel() {
  const { data, isLoading } = useProspectsByStatus();
  const total = Object.values(data ?? {}).reduce((s, v) => s + v, 0) || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pipeline de Ventas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-7 w-full" />)
        ) : (
          PIPELINE_STAGES.map(({ key, label, color }) => {
            const count = data?.[key] ?? 0;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }} />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
