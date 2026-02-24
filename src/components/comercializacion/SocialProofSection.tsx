import { Star, Quote } from "lucide-react";
import bgQuote from "@/assets/bg-quote.webp";
import { Badge } from "@/components/ui/badge";

const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      business: "Restaurante La Hacienda",
      city: "Ciudad de México",
      quote: "Estar en esta plataforma nos dio visibilidad que no hubiéramos logrado solos. Esperamos un gran Mundial.",
      rating: 5,
    },
    {
      name: "María González",
      business: "Bar El Mariachi",
      city: "Guadalajara",
      quote: "La inversión vale cada peso. El equipo nos ayudó a optimizar nuestro perfil para atraer turistas.",
      rating: 5,
    },
    {
      name: "Roberto Sánchez",
      business: "Tienda Artesanías México",
      city: "Monterrey",
      quote: "Como pequeño negocio, esta plataforma nos da la oportunidad de competir con los grandes.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: "Negocios Registrados" },
    { value: "3", label: "Ciudades Sede" },
    { value: "50K+", label: "Usuarios Pre-registrados" },
    { value: "4.9/5", label: "Satisfacción de Negocios" },
  ];

  const partners = [
    "FETUR",
    "CANACO",
    "CANIRAC",
    "Secretaría de Turismo",
    "Secretaría de Economía",
    "Cámara de Comercio",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${bgQuote})` }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Green/Mexican tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-8 pb-16">
        {/* Stats with glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.12] transition-all duration-300 hover:scale-105 hover:border-amber-500/30">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-amber-400 mb-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <Badge className="bg-amber-500/20 text-white border-amber-500/30 mb-4">
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-foreground mb-4">
            Lo que dicen nuestros afiliados
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group animate-fade-in relative bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.12] transition-all duration-300 hover:scale-105 hover:border-amber-500/30"
            >
              <Quote className="h-10 w-10 text-primary mb-4 " />
              <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-white">{testimonial.business}</p>
                <p className="text-xs text-white">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Con el respaldo de
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-xl font-semibold text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
