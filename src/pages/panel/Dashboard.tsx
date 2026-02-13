import { LayoutDashboard, Users, Package, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '@/hooks/useDashboardData';

import SectorChart from '@/components/dashboard/SectorChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import VendorLeaderboard from '@/components/dashboard/VendorLeaderboard';
import TargetsProgress from '@/components/dashboard/TargetsProgress';

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n.toLocaleString('es-MX')}`;

export default function Dashboard() {
  const stats = useDashboardStats();

  const cards = [
    { label: 'Prospectos', value: stats.prospects, icon: Users, color: 'text-primary' },
    { label: 'Propuestas Activas', value: stats.activePackages, icon: Package, color: 'text-accent' },
    { label: 'Ventas Cerradas', value: stats.closedDeals, icon: TrendingUp, color: 'text-mundial-green' },
    { label: 'Ingresos Cerrados', value: fmt(stats.totalRevenue), icon: LayoutDashboard, color: 'text-mundial-gold' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Resumen del área comercial</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className={`h-5 w-5 ${color}`} />
            </CardHeader>
            <CardContent>
              {stats.loading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <p className="text-3xl font-bold text-foreground">{value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sector Chart */}
      <SectorChart />

      {/* Row: Targets + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TargetsProgress />
        <ActivityFeed />
      </div>

      {/* Vendor Leaderboard */}
      <VendorLeaderboard />
    </div>
  );
}
