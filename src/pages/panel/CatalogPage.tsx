import { useBenefits, useBenefitCategories } from '@/hooks/useBenefits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Smartphone, MapPin, Star, Video, BarChart3, Package, Globe, Users, TrendingUp, Zap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, MapPin, Star, Video, BarChart3, Package,
};

const categoryColors: Record<number, string> = {
  0: 'from-primary/10 to-primary/5 border-primary/20',
  1: 'from-accent/10 to-accent/5 border-accent/20',
  2: 'from-mundial-red/10 to-mundial-red/5 border-mundial-red/20',
  3: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
  4: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
};

const categoryIconColors: Record<number, string> = {
  0: 'text-primary bg-primary/10',
  1: 'text-accent bg-accent/10',
  2: 'text-mundial-red bg-mundial-red/10',
  3: 'text-purple-500 bg-purple-500/10',
  4: 'text-blue-500 bg-blue-500/10',
};

export default function CatalogPage() {
  const { data: categories, isLoading: loadingCats } = useBenefitCategories();
  const { data: benefits, isLoading: loadingBenefits } = useBenefits();

  if (loadingCats || loadingBenefits) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Qué Vendemos</h1>
        <p className="text-muted-foreground mt-1">
          Catálogo completo de beneficios que puedes ofrecer a patrocinadores
        </p>
      </div>

      {/* App Context Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary/15 text-primary border-primary/30 font-medium">
              <Globe className="w-3 h-3 mr-1" />
              Contexto para el vendedor
            </Badge>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            ¿Qué es la App del Mundial 2026?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Es una <strong className="text-foreground">aplicación móvil oficial</strong> diseñada para los millones de turistas que visitarán México durante el Mundial FIFA 2026. La app conecta a los visitantes con negocios locales, servicios, experiencias y ofertas exclusivas usando <strong className="text-foreground">geolocalización en tiempo real</strong> en las ciudades sede.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">5M+ turistas</p>
                <p className="text-xs text-muted-foreground">Visitantes esperados en México</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">$2,500 USD</p>
                <p className="text-xs text-muted-foreground">Gasto promedio por turista</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="w-9 h-9 rounded-lg bg-mundial-red/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-mundial-red" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Evento único</p>
                <p className="text-xs text-muted-foreground">No se repite en 30+ años</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Lo que vendes:</strong> Presencia y visibilidad de negocios dentro de la app. Los patrocinadores aparecen cuando los turistas buscan servicios cercanos — restaurantes, hoteles, tiendas, entretenimiento. Es publicidad contextual en el momento exacto de decisión de compra.
            </p>
          </div>
        </CardContent>
      </Card>

      {categories?.map((cat, catIndex) => {
        const Icon = iconMap[cat.icon] || Package;
        const catBenefits = benefits?.filter(b => b.category_id === cat.id) || [];
        const colorIndex = catIndex % 5;

        return (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoryIconColors[colorIndex]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{cat.name}</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catBenefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className={`bg-gradient-to-br ${categoryColors[colorIndex]} border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {benefit.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          ${benefit.unit_price.toLocaleString('es-MX')}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">MXN</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        / {benefit.unit_label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
