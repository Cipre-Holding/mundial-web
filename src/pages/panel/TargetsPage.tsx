import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Utensils,
  Hotel,
  ShoppingBag,
  Car,
  Stethoscope,
  Landmark,
  Plane,
  Smartphone,
  Beer,
  Shirt,
  Fuel,
  CreditCard,
  Shield,
  Dumbbell,
  GraduationCap,
  Gem,
  Store,
  TrendingUp,
} from "lucide-react";

interface TargetCategory {
  tier: "premium" | "alto" | "medio" | "emergente";
  icon: React.ElementType;
  name: string;
  description: string;
  examples: string[];
  avgTicket: string;
  potential: string;
}

const tiers = {
  premium: { label: "Tier Premium", color: "bg-amber-500/15 text-amber-600 border-amber-500/30", bar: "bg-amber-500" },
  alto: { label: "Tier Alto", color: "bg-primary/15 text-primary border-primary/30", bar: "bg-primary" },
  medio: { label: "Tier Medio", color: "bg-blue-500/15 text-blue-600 border-blue-500/30", bar: "bg-blue-500" },
  emergente: { label: "Tier Emergente", color: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/30", bar: "bg-muted-foreground" },
};

const categories: TargetCategory[] = [
  // PREMIUM
  {
    tier: "premium",
    icon: Landmark,
    name: "Bancos y Servicios Financieros",
    description: "Casas de cambio, bancos con productos turísticos, fintechs de pagos internacionales",
    examples: ["BBVA", "Citibanamex", "Santander", "Mercado Pago", "Clip"],
    avgTicket: "$150,000+",
    potential: "Muy alto — turistas necesitan cambio de divisas y pagos",
  },
  {
    tier: "premium",
    icon: Smartphone,
    name: "Telecomunicaciones",
    description: "Operadores móviles, eSIM, planes de datos para turistas, WiFi portátil",
    examples: ["Telcel", "AT&T México", "Airalo", "Holafly"],
    avgTicket: "$120,000+",
    potential: "Muy alto — conectividad es necesidad #1 del turista",
  },
  {
    tier: "premium",
    icon: Hotel,
    name: "Hotelería y Hospedaje",
    description: "Cadenas hoteleras, Airbnb managers, hostales premium, resorts",
    examples: ["Marriott", "Hilton", "City Express", "Fiesta Americana"],
    avgTicket: "$100,000+",
    potential: "Muy alto — alojamiento garantizado durante el evento",
  },
  {
    tier: "premium",
    icon: Shield,
    name: "Seguros de Viaje",
    description: "Seguros médicos, de equipaje y asistencia al viajero",
    examples: ["GNP", "AXA", "Assist Card", "World Nomads"],
    avgTicket: "$100,000+",
    potential: "Muy alto — obligatorio/recomendado para turistas internacionales",
  },
  // ALTO
  {
    tier: "alto",
    icon: Utensils,
    name: "Restaurantes y Gastronomía",
    description: "Cadenas, restaurantes premium, dark kitchens, apps de delivery en zonas sede",
    examples: ["Grupo Hunan", "Sonora Grill", "Porfirio's", "Fisher's"],
    avgTicket: "$75,000+",
    potential: "Alto — gastronomía es top 3 gasto turístico",
  },
  {
    tier: "alto",
    icon: Car,
    name: "Transporte y Movilidad",
    description: "Renta de autos, transporte ejecutivo, apps de ride, traslados aeropuerto",
    examples: ["Uber", "DiDi", "Hertz", "Europcar", "ADO"],
    avgTicket: "$80,000+",
    potential: "Alto — movilidad entre sedes y dentro de ciudades",
  },
  {
    tier: "alto",
    icon: Plane,
    name: "Aerolíneas y Agencias de Viaje",
    description: "Vuelos domésticos entre sedes, paquetes turísticos, tours",
    examples: ["Volaris", "VivaAerobus", "Aeroméxico", "Despegar"],
    avgTicket: "$90,000+",
    potential: "Alto — vuelos entre las 3 ciudades sede",
  },
  {
    tier: "alto",
    icon: Beer,
    name: "Bebidas y Cervecerías",
    description: "Cervecerías artesanales, distribuidoras de bebidas, bares deportivos",
    examples: ["Grupo Modelo", "Cervecería de Colima", "Heineken México"],
    avgTicket: "$70,000+",
    potential: "Alto — consumo de bebidas en eventos deportivos es masivo",
  },
  // MEDIO
  {
    tier: "medio",
    icon: ShoppingBag,
    name: "Retail y Centros Comerciales",
    description: "Plazas comerciales, tiendas departamentales, souvenirs, duty-free",
    examples: ["Liverpool", "Palacio de Hierro", "ARTZ Pedregal"],
    avgTicket: "$50,000+",
    potential: "Medio-alto — shopping es actividad común del turista",
  },
  {
    tier: "medio",
    icon: Stethoscope,
    name: "Salud y Farmacias",
    description: "Farmacias con servicio 24h, clínicas para turistas, telemedicina",
    examples: ["Farmacias del Ahorro", "San Pablo", "Doctoralia"],
    avgTicket: "$40,000+",
    potential: "Medio — servicios de emergencia y bienestar",
  },
  {
    tier: "medio",
    icon: Dumbbell,
    name: "Entretenimiento y Ocio",
    description: "Parques temáticos, tours culturales, experiencias nocturnas, spas",
    examples: ["Six Flags", "Xcaret", "Lucha Libre AAA", "Cinépolis"],
    avgTicket: "$45,000+",
    potential: "Medio — turistas buscan experiencias más allá del fútbol",
  },
  {
    tier: "medio",
    icon: Shirt,
    name: "Moda y Deportes",
    description: "Tiendas de ropa deportiva, merchandising, artículos del Mundial",
    examples: ["Martí", "Innvictus", "Nike Store", "Adidas"],
    avgTicket: "$45,000+",
    potential: "Medio — merchandising y souvenirs deportivos",
  },
  // EMERGENTE
  {
    tier: "emergente",
    icon: Fuel,
    name: "Gasolineras y Conveniencia",
    description: "Estaciones de servicio con tiendas de conveniencia en rutas turísticas",
    examples: ["OXXO", "7-Eleven", "Circle K"],
    avgTicket: "$25,000+",
    potential: "Volumen — alta frecuencia, ticket bajo pero masivo",
  },
  {
    tier: "emergente",
    icon: Store,
    name: "Comercio Local y PyMEs",
    description: "Negocios locales en zonas turísticas: cafeterías, artesanías, mercados",
    examples: ["Cafeterías independientes", "Mercados artesanales", "Tiendas de barrio"],
    avgTicket: "$15,000+",
    potential: "Volumen — muchos negocios, ticket accesible (Plan Participante)",
  },
  {
    tier: "emergente",
    icon: GraduationCap,
    name: "Educación y Cultura",
    description: "Museos, centros culturales, escuelas de idiomas, experiencias educativas",
    examples: ["Museo Nacional", "MUAC", "Frida Kahlo Museum"],
    avgTicket: "$20,000+",
    potential: "Nicho — turismo cultural es segmento creciente",
  },
  {
    tier: "emergente",
    icon: Gem,
    name: "Lujo y Servicios Premium",
    description: "Joyerías, relojeros, servicios VIP, concierge privado",
    examples: ["Tiffany & Co", "Tane", "Cartier"],
    avgTicket: "$30,000+",
    potential: "Nicho — bajo volumen pero ticket muy alto",
  },
];

export default function TargetsPage() {
  const tierOrder: Array<"premium" | "alto" | "medio" | "emergente"> = ["premium", "alto", "medio", "emergente"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Targets Comerciales</h1>
        <p className="text-muted-foreground mt-1">
          Empresas objetivo segmentadas por impacto económico y relevancia para el turista
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tierOrder.map((tier) => {
          const count = categories.filter((c) => c.tier === tier).length;
          const config = tiers[tier];
          return (
            <div key={tier} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <div className={`w-3 h-3 rounded-full ${config.bar}`} />
              <div>
                <p className="text-sm font-semibold text-foreground">{config.label}</p>
                <p className="text-xs text-muted-foreground">{count} sectores</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories by Tier */}
      {tierOrder.map((tier) => {
        const config = tiers[tier];
        const tierCategories = categories.filter((c) => c.tier === tier);

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${config.bar}`} />
              <h2 className="text-xl font-bold text-foreground">{config.label}</h2>
              <Badge className={config.color}>{tierCategories.length} sectores</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tierCategories.map((cat) => (
                <Card key={cat.name} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        tier === "premium" ? "bg-amber-500/10 text-amber-600" :
                        tier === "alto" ? "bg-primary/10 text-primary" :
                        tier === "medio" ? "bg-blue-500/10 text-blue-600" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.examples.map((ex) => (
                        <Badge key={ex} variant="outline" className="text-xs font-normal">
                          {ex}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Ticket promedio</p>
                        <p className="text-sm font-bold text-foreground">{cat.avgTicket} <span className="text-xs font-normal text-muted-foreground">MXN</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Potencial</p>
                        <p className="text-sm font-medium text-foreground">{cat.potential}</p>
                      </div>
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
