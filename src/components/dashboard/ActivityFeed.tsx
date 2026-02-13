/**
 * @fileoverview Feed de actividad reciente (prospectos + propuestas) para el dashboard.
 */
import { useRecentActivity } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ActivityFeed() {
  const { data, isLoading } = useRecentActivity();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : !data?.length ? (
          <p className="text-sm text-muted-foreground text-center py-6">Sin actividad reciente</p>
        ) : (
          <div className="space-y-3">
            {data.map(item => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`mt-0.5 p-1.5 rounded-md ${item.type === 'prospect' ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-accent-foreground'}`}>
                  {item.type === 'prospect' ? <Users className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: es })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
