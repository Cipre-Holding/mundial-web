import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import stadiumPeople from "@/assets/bg-hero.png";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${stadiumPeople})` }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050a12]" />
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
                ? 'hsl(145, 85%, 20%)' 
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
              <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-lg pulse-glow">
                <span className="text-3xl">⚽</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Vive México
              </span>
              <span className="text-xs text-accent font-semibold tracking-widest uppercase">
                Negocios México
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-semibold shadow-lg hidden sm:flex"
              onClick={() => navigate("/Comercios")}
            >
              Tengo un negocio
            </Button>
            <Button 
              className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-bold shadow-lg hidden sm:flex"
              onClick={() => navigate("/DescargarApp")}
            >
              Descarga la App
            </Button>
          </div>
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-[1.1] animate-fade-in tracking-tight drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
            Todo de México en tu mano
            <span className="absolute -inset-1 shimmer rounded-lg opacity-50" />
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
            La guía definitiva para que <span className="text-accent font-semibold">turistas</span>, y <span className="text-accent font-semibold">comercios</span> conecten 
            y descubran lo mejor de México
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-gradient-gold hover:opacity-90 text-accent-foreground text-lg px-10 py-7 font-bold shadow-xl pulse-glow rounded-2xl"
              onClick={() => navigate("/comercios")}
            >
              Beneficios para tu negocio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>


          {/* Countdown */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#050a12] to-75% pointer-events-none" />
    </section>
  );
};

export default HeroSection;
