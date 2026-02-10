import { Button } from "@/components/ui/button";
import { Check, X, Crown, Star, Zap, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const plans = [
    {
      id: "participante",
      name: "Participante",
      icon: Zap,
      price: "$4,000",
      description: "Ideal para negocios que buscan visibilidad básica",
      features: [
        { name: "Perfil con logo y 5 fotos", included: true },
        { name: "Descripción del negocio", included: true },
        { name: "Ubicación en mapa interactivo", included: true },
        { name: "Horarios y datos de contacto", included: true },
        { name: "Enlaces a redes sociales", included: true },
        { name: "Posicionamiento prioritario", included: false },
        { name: "Badge Verificado Mundial 2026", included: false },
        { name: "Video promocional", included: false },
        { name: "Notificaciones push", included: false },
        { name: "Analytics y métricas", included: false },
      ],
    },
    {
      id: "destacado",
      name: "Destacado",
      icon: Star,
      price: "$75,000",
      description: "Para negocios que quieren destacar sobre la competencia",
      popular: true,
      features: [
        { name: "Perfil con logo y fotos ilimitadas", included: true },
        { name: "Descripción del negocio", included: true },
        { name: "Ubicación en mapa interactivo", included: true },
        { name: "Horarios y datos de contacto", included: true },
        { name: "Enlaces a redes sociales", included: true },
        { name: "Posicionamiento prioritario", included: true },
        { name: "Badge Verificado Mundial 2026", included: true },
        { name: "Video promocional", included: true },
        { name: "1 notificación push semanal", included: true },
        { name: "Analytics y métricas", included: false },
      ],
    },
    {
      id: "elite",
      name: "Élite Mundial",
      icon: Crown,
      price: "$150,000",
      description: "La experiencia completa para máxima visibilidad",
      features: [
        { name: "Perfil con logo y fotos ilimitadas", included: true },
        { name: "Descripción del negocio", included: true },
        { name: "Ubicación en mapa interactivo", included: true },
        { name: "Horarios y datos de contacto", included: true },
        { name: "Enlaces a redes sociales", included: true },
        { name: "Posicionamiento prioritario", included: true },
        { name: "Badge Verificado Mundial 2026", included: true },
        { name: "Video promocional", included: true },
        { name: "Notificaciones push ilimitadas", included: true },
        { name: "Analytics y métricas en tiempo real", included: true },
        { name: "Banner en homepage", included: true },
        { name: "Sistema de reservaciones integrado", included: true },
      ],
    },
  ];

  return (
    <section id="planes" className="py-16 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Planes de Afiliación
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
            Elige el plan perfecto para{" "}
            <span className="text-gradient-gold">tu negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pago único por toda la temporada del Mundial de 2026. Sin mensualidades, sin sorpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            const isElite = plan.id === "elite";
            const isParticipante = plan.id === "participante";

            return (
              <div 
                key={plan.id} 
                className={`relative rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  isPopular 
                    ? 'lg:scale-105 z-10' 
                    : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card wrapper with gradient border for popular */}
                <div className={`relative rounded-3xl ${isPopular ? 'gradient-border p-[3px]' : ''}`}>
                  <div className={`relative rounded-3xl p-8 h-full ${
                    isElite 
                      ? 'bg-gradient-elite text-primary-foreground' 
                      : 'bg-card'
                  } ${
                    isPopular 
                      ? 'shadow-2xl shadow-accent/20' 
                      : 'border-2 border-border hover:border-primary/30'
                  }`}>
                    
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-gold text-accent-foreground text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          Más Popular
                        </span>
                      </div>
                    )}

                    {/* Elite crown decoration */}
                    {isElite && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="bg-accent rounded-full p-3 shadow-lg animate-pulse">
                          <Crown className="h-6 w-6 text-accent-foreground" />
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-8 pt-4">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 ${
                        isElite 
                          ? 'bg-accent/20 shadow-lg shadow-accent/20' 
                          : isPopular 
                            ? 'bg-gradient-gold shadow-lg' 
                            : 'bg-primary/10'
                      }`}>
                        <Icon className={`h-10 w-10 ${
                          isElite 
                            ? 'text-accent' 
                            : isPopular 
                              ? 'text-accent-foreground' 
                              : 'text-primary'
                        }`} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        isElite ? 'text-primary-foreground' : 'text-foreground'
                      }`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm ${
                        isElite ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className={`text-5xl font-black ${
                          isElite 
                            ? 'text-accent' 
                            : isPopular 
                              ? 'text-gradient-gold' 
                              : 'text-primary'
                        }`}>
                          {plan.price}
                        </span>
                        <span className={`text-lg ${
                          isElite ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          MXN
                        </span>
                      </div>
                      <span className={`text-sm ${
                        isElite ? 'text-primary-foreground/50' : 'text-muted-foreground'
                      }`}>
                        pago único
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              isElite 
                                ? 'bg-accent/20' 
                                : 'bg-primary/10'
                            }`}>
                              <Check className={`h-3 w-3 ${
                                isElite ? 'text-accent' : 'text-primary'
                              }`} />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-muted">
                              <X className={`h-3 w-3 ${
                                isElite ? 'text-primary-foreground/30' : 'text-muted-foreground/50'
                              }`} />
                            </div>
                          )}
                          <span className={`text-sm ${
                            feature.included 
                              ? (isElite ? 'text-primary-foreground' : 'text-foreground')
                              : (isElite ? 'text-primary-foreground/40' : 'text-muted-foreground')
                          }`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full py-7 text-lg font-bold rounded-2xl transition-all duration-300 ${
                        isElite 
                          ? 'bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40' 
                          : isPopular 
                            ? 'bg-gradient-gold hover:opacity-90 text-accent-foreground shadow-lg' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                      onClick={() => onSelectPlan(plan.id)}
                    >
                      {isParticipante ? "Seleccionar Plan" : "Contacta a nuestro agente"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          ✓ Todos los planes incluyen soporte técnico y acceso durante toda la temporada del Mundial del 2026
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
