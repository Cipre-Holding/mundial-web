import { 
  MapPin, 
  Image, 
  Link, 
  Star, 
  BadgeCheck, 
  Video, 
  Bell, 
  BarChart3, 
  Crown, 
  Calendar, 
  Mail, 
  HeadphonesIcon,
  Megaphone,
  QrCode,
  Trophy
} from "lucide-react";

const BenefitsSection = () => {
  const allBenefits = [
    {
      icon: Image,
      title: "Perfil con Fotos",
      description: "Logo, fotos de tu negocio y descripción completa",
      plans: ["basic", "featured", "elite"],
    },
    {
      icon: MapPin,
      title: "Mapa Interactivo",
      description: "Aparece en el mapa para que los turistas te encuentren",
      plans: ["basic", "featured", "elite"],
    },
    {
      icon: Link,
      title: "Redes Sociales",
      description: "Enlaces directos a tus redes y sitio web",
      plans: ["basic", "featured", "elite"],
    },
    {
      icon: Star,
      title: "Posicionamiento Prioritario",
      description: "Aparece primero en las búsquedas de tu categoría",
      plans: ["featured", "elite"],
    },
    {
      icon: BadgeCheck,
      title: "Badge Verificado",
      description: "Insignia exclusiva 'Verificado Mundial 2026'",
      plans: ["featured", "elite"],
    },
    {
      icon: Video,
      title: "Video Promocional",
      description: "Sube un video para mostrar tu negocio",
      plans: ["featured", "elite"],
    },
    {
      icon: Bell,
      title: "Notificaciones Push",
      description: "Envía ofertas a usuarios cercanos",
      plans: ["featured", "elite"],
    },
    {
      icon: Megaphone,
      title: "Banner en Homepage",
      description: "Publicidad destacada en la página principal",
      plans: ["elite"],
    },
    {
      icon: BarChart3,
      title: "Analytics en Tiempo Real",
      description: "Dashboard con métricas de visitas y engagement",
      plans: ["elite"],
    },
    {
      icon: Crown,
      title: "Top Picks del Día",
      description: "Destacado en la sección de recomendaciones",
      plans: ["elite"],
    },
    {
      icon: Calendar,
      title: "Sistema de Reservaciones",
      description: "Los usuarios pueden reservar directamente",
      plans: ["elite"],
    },
    {
      icon: Mail,
      title: "Newsletters",
      description: "Mención en emails a usuarios registrados",
      plans: ["elite"],
    },
    {
      icon: HeadphonesIcon,
      title: "Gerente de Cuenta",
      description: "Soporte dedicado y personalizado",
      plans: ["elite"],
    },
    {
      icon: QrCode,
      title: "QR Code Exclusivo",
      description: "Código QR personalizado para tu establecimiento",
      plans: ["elite"],
    },
  ];

  const planColors = {
    basic: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/30",
    },
    featured: {
      bg: "bg-accent/10",
      text: "text-amber-600",
      border: "border-accent/30",
    },
    elite: {
      bg: "bg-foreground/10",
      text: "text-foreground",
      border: "border-foreground/30",
    },
  };

  return (
    <section id="beneficios" className="py-16 bg-pattern-stadium relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
            <Trophy className="h-4 w-4" />
            Beneficios Exclusivos
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
            Todo lo que necesitas para{" "}
            <span className="text-primary">destacar</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nuestra plataforma ofrece herramientas diseñadas específicamente para 
            maximizar tu visibilidad durante el Mundial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isEliteOnly = benefit.plans.length === 1 && benefit.plans[0] === "elite";

            return (
              <div
                key={index}
                className={`group relative bg-card rounded-2xl p-6 border-2 border-border hover:border-primary/40 transition-all duration-300 hover-3d hover:shadow-xl ${
                  isEliteOnly ? 'ring-1 ring-accent/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Elite badge */}
                {isEliteOnly && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      ÉLITE
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isEliteOnly 
                    ? 'bg-gradient-elite text-primary-foreground group-hover:scale-110' 
                    : 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110'
                }`}>
                  <Icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {benefit.plans.includes("basic") && (
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${planColors.basic.bg} ${planColors.basic.text} ${planColors.basic.border}`}>
                      Participante
                    </span>
                  )}
                  {benefit.plans.includes("featured") && (
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${planColors.featured.bg} ${planColors.featured.text} ${planColors.featured.border}`}>
                      Destacado
                    </span>
                  )}
                  {benefit.plans.includes("elite") && (
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${planColors.elite.bg} ${planColors.elite.text} ${planColors.elite.border}`}>
                      Élite
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
