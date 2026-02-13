/**
 * @fileoverview Gráfico de pastel: prospectos por sector.
 */
import { useProspectsBySector } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  'hsl(145, 63%, 32%)', 'hsl(45, 93%, 47%)', 'hsl(220, 25%, 30%)',
  'hsl(0, 72%, 51%)', 'hsl(200, 70%, 50%)', 'hsl(280, 60%, 50%)',
  'hsl(30, 80%, 50%)', 'hsl(170, 50%, 40%)', 'hsl(320, 60%, 50%)',
  'hsl(60, 70%, 45%)', 'hsl(100, 50%, 40%)',
];

const SECTOR_LABELS: Record<string, string> = {
  banca: 'Banca', seguros: 'Seguros', hospitalidad: 'Hospitalidad',
  gastronomia: 'Gastronomía', tecnologia: 'Tecnología', retail: 'Retail',
  automotriz: 'Automotriz', salud: 'Salud', inmobiliario: 'Inmobiliario',
  entretenimiento: 'Entretenimiento', general: 'General',
};

export default function SectorChart() {
  const { data, isLoading } = useProspectsBySector();

  const chartData = Object.entries(data ?? {}).map(([key, value]) => ({
    name: SECTOR_LABELS[key] || key,
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Prospectos por Sector</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Sin datos aún</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
