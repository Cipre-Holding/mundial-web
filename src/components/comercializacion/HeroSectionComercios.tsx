import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import MobileNavSheet from "@/components/MobileNavSheet";
import stadiumHero from "@/assets/stadium-hero.jpg";

interface HeroSectionComerciosProps {
  onRegisterClick?: () => void;
}

const HeroSectionComercios = ({ onRegisterClick }: HeroSectionComerciosProps) => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Inicio", onClick: () => navigate("/") },
    ...(onRegisterClick
      ? [{ label: "Registra tu Negocio", onClick: onRegisterClick }]
      : []),
    { label: "Descarga la App", onClick: () => navigate("/descargarapp") },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${stadiumHero})` }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Green/Mexican tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/10" />
      </div>
      
      {/* Stadium lights effect overlay */}
      <div className="absolute inset-0 stadium-lights opacity-50" />
      
      {/* Animated particles - Mexican flag colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              backgroundColor: i % 3 === 0 
                ? 'hsl(145 63% 42%)' 
                : i % 3 === 1 
                  ? 'hsl(0 72% 51%)' 
                  : 'hsl(0, 0%, 100%)',
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <nav className="flex items-center justify-between mb-12 md:mb-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-orange rounded-2xl flex items-center justify-center shadow-lg pulse-glow">
                <span className="text-3xl">⚽</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-customcolors-redprimary tracking-tight">
                Vive México
              </span>
              <span className="text-xs text-accent text-customcolors-orangeprimary font-semibold tracking-widest uppercase">
                Negocios México
              </span>
            </div>
          </div>
          <MobileNavSheet items={navItems} />
        </nav>

        {/* Main content */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with shimmer effect */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="text-white text-sm font-medium">
              🇲🇽 Plataforma Oficial de Negocios
            </span>
          </div>

          <h1 className="anton-regular text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-[1.1] animate-fade-in tracking-tight drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
            Conecta tu negocio con{" "}
            <span className="relative inline-block">
              <span className="text-gradient-orange">millones</span>
              <span className="absolute -inset-1 shimmer rounded-lg opacity-50" />
            </span>
            <br className="hidden md:block" />
            <span className="text-gradient-orange">de turistas</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
            La plataforma definitiva para que <span className="text-gradient-orange text-accent font-semibold">restaurantes</span>, 
            <span className="text-accent text-gradient-orange font-semibold"> entretenimiento</span> y <span className="text-accent text-gradient-orange font-semibold">comercios</span> lleguen 
            a los visitantes del Mundial en México.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-orange hover:opacity-90 text-accent-foreground text-lg px-10 py-7 font-bold shadow-xl pulse-glow rounded-2xl"
              onClick={() => navigate("/")}
            >
              Sobre la Aplicación
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-orange hover:opacity-90 text-accent-foreground text-lg px-10 py-7 font-bold shadow-xl pulse-glow rounded-2xl"
              onClick={onRegisterClick}
            >
              Afilia tu negocio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Countdown */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CountdownTimer />
          </div>
        </div>

        {/* Stats with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          {[
            { icon: Users, value: "5M+", label: "Turistas Esperados", delay: "stagger-1" },
            { icon: TrendingUp, value: "$2,500", label: "USD Gasto Promedio", delay: "stagger-2" },
            { icon: Globe, value: "3", label: "Ciudades Sede", delay: "stagger-3" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`glass rounded-3xl p-8 text-center hover-3d group cursor-default ${stat.delay}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smooth gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/50 to-black/80 pointer-events-none" />
    </section>
  );
};

export default HeroSectionComercios;
