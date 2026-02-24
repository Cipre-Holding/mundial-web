/**
 * @fileoverview Ranking de vendedores por ingresos cerrados.
 */
import { useVendorMetrics } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy } from 'lucide-react';

export default function VendorLeaderboard() {
  const { data, isLoading } = useVendorMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent" />
          Ranking por Vendedor
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : !data?.length ? (
          <p className="text-sm text-muted-foreground text-center py-6">Sin datos de vendedores aún</p>
        ) : (
          <div className="space-y-3">
            {data.map((v, i) => (
              <div key={v.userId} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                <span className={`text-sm font-bold w-6 text-center ${i === 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{v.name}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{v.prospects} prospectos</span>
                    <span>{v.proposals} propuestas</span>
                    <span>{v.closedDeals} cerradas</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${v.revenue.toLocaleString('es-MX')}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
