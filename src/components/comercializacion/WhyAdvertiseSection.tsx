import { Target, TrendingUp, Clock, Eye, DollarSign, Users, MapPin, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


interface HeroSectionComerciosProps {
  onRegisterClick?: () => void;
}

const WhyAdvertiseSection = ({ onRegisterClick }: HeroSectionComerciosProps) => {
  const stats = [
    {
      value: "5M+",
      label: "Turistas Esperados",
      description: "Visitantes internacionales en México",
      icon: Users,
    },
    {
      value: "$2,500",
      label: "USD Gasto Promedio",
      description: "Por visitante durante el evento",
      icon: DollarSign,
    },
    {
      value: "80%",
      label: "Búsquedas Móviles",
      description: "Turistas usan apps para servicios",
      icon: Smartphone,
    },
    {
      value: "10x",
      label: "ROI Esperado",
      description: "vs publicidad tradicional",
      icon: TrendingUp,
    },
  ];

  const valueProps = [
    {
      icon: Target,
      title: "Audiencia Premium",
      description: "Turistas con alto poder adquisitivo buscando experiencias auténticas y dispuestos a gastar en servicios de calidad.",
      highlight: "Alto poder adquisitivo",
    },
    {
      icon: Clock,
      title: "Momento Perfecto",
      description: "El Mundial en México sucede cada 30+ años. Una ventana de oportunidad única durante Junio-Julio 2026.",
      highlight: "Evento irrepetible",
    },
    {
      icon: Eye,
      title: "Visibilidad Garantizada",
      description: "Tu negocio aparece cuando los turistas buscan activamente servicios cercanos con geolocalización en tiempo real.",
      highlight: "Geolocalización activa",
    },
  ];

  const scrollToPlans = () => {
    document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#0a0806] via-[#1a1408] to-[#0a0806]">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
            <MapPin className="w-3 h-3 mr-1" />
            Oportunidad Única
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            ¿Por qué anunciarte en la{" "}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              App del Mundial?
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Una oportunidad histórica para posicionar tu negocio frente a millones de turistas internacionales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.12] transition-all duration-300 hover:scale-105 hover:border-amber-500/30">
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-amber-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.10] transition-all duration-300 hover:border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                    <prop.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-xs font-medium text-amber-400/80 bg-amber-500/10 px-2 py-1 rounded-full">
                    {prop.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {prop.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in " style={{ animationDelay: "700ms" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
              onClick={scrollToPlans}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-500/90 hover:to-yellow-600/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
            >
              Ver Planes de Afiliación
            </Button>
            <Button
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-500/90 hover:to-yellow-600/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              onClick={onRegisterClick}
            >
              Registra tu Negocio
            </Button>
          </div>          
          <p className="text-amber-400/80 text-sm mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Cupos limitados por categoría
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAdvertiseSection;
