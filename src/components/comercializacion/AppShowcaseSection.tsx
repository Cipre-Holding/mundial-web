import { MapPin, Utensils, Hotel, Calendar, Trophy, Gift, Smartphone, Star, Search, ChevronRight, Wifi, Battery, Signal } from "lucide-react";

const AppShowcaseSection = () => {
  const features = [
    { icon: MapPin, title: "3 Ciudades Sede", description: "CDMX, Monterrey y Guadalajara" },
    { icon: Utensils, title: "Restaurantes", description: "Los mejores lugares para comer" },
    { icon: Hotel, title: "Hoteles", description: "Hospedaje verificado" },
    { icon: Calendar, title: "Calendario", description: "Todos los partidos" },
    { icon: Trophy, title: "Quiniela", description: "Compite y gana premios" },
    { icon: Gift, title: "Beneficios", description: "Ofertas exclusivas" },
  ];

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#050a12] from-15% via-[#0a1628] via-55% to-[#050a12] to-100%">
      <div className="container mx-auto px-2 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-green-500/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/30">
            <Smartphone className="w-4 h-4" />
            App Oficial del Mundial del 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Todo lo que necesitas para vivir México 2026
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Personaliza tu ruta, compite con amigos, obtén beneficios exclusivos cerca de ti y conecta con la cultura de todo México
          </p>
        </div>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 mb-20 perspective-1000">
          {/* Phone 1 - Ciudades */}
          <PhoneMockup 
            title="Ciudades Sede"
            subtitle="Explora las 3 sedes"
            delay={0}
            rotation={-12}
            offset={20}
          >
            <ScreenCiudades />
          </PhoneMockup>

          {/* Phone 2 - Home (Center, larger) */}
          <PhoneMockup 
            title="Inicio"
            subtitle="Tu centro de control"
            isCenter
            delay={0.15}
          >
            <ScreenHome />
          </PhoneMockup>

          {/* Phone 3 - Negocios */}
          <PhoneMockup 
            title="Directorio"
            subtitle="Miles de negocios"
            delay={0.3}
            rotation={12}
            offset={20}
          >
            <ScreenNegocios />
          </PhoneMockup>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-gradient-to-b from-primary/[0.08] to-primary/[0.02] backdrop-blur-xl border border-primary/10 rounded-2xl p-5 text-center hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-primary font-bold text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

// Screen Components
const ScreenCiudades = () => (
  <div className="h-full bg-gradient-to-b from-[#0c1829] to-[#070d17] p-3">
    <div className="text-center mb-3">
      <h3 className="text-white font-bold text-sm">Sedes México 2026</h3>
      <p className="text-gray-500 text-[10px]">Selecciona una ciudad</p>
    </div>
    <div className="space-y-2.5">
      {[
        { city: "Ciudad de México", stadium: "Estadio Azteca", img: "🏟️", matches: "8 partidos" },
        { city: "Monterrey", stadium: "Estadio BBVA", img: "🏟️", matches: "6 partidos" },
        { city: "Guadalajara", stadium: "Estadio Akron", img: "🏟️", matches: "6 partidos" },
      ].map((item, i) => (
        <div 
          key={item.city} 
          className="bg-gradient-to-r from-white/[0.08] to-white/[0.03] rounded-xl p-2.5 flex items-center gap-2.5 border border-white/5 hover:border-primary/30 transition-colors"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/30 to-green-700/30 flex items-center justify-center text-xl border border-green-500/20">
            {item.img}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-xs truncate">{item.city}</p>
            <p className="text-gray-500 text-[10px]">{item.stadium}</p>
            <p className="text-primary text-[9px] font-medium">{item.matches}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      ))}
    </div>
    <div className="mt-3 bg-gradient-to-r from-green-600/20 to-red-600/20 rounded-xl p-2.5 border border-white/10">
      <p className="text-[10px] text-gray-400 text-center">🇲🇽 México será sede de 20 partidos</p>
    </div>
  </div>
);

const ScreenHome = () => (
  <div className="h-full bg-gradient-to-b from-[#0c1829] to-[#070d17] p-3">
    {/* Countdown Card */}
    <div className="bg-gradient-to-br from-green-600/20 via-white/5 to-red-600/20 rounded-xl p-3 mb-3 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
            <span className="text-[8px]">⚽</span>
          </div>
          <span className="text-[10px] text-gray-300 font-medium">Partido Inaugural</span>
        </div>
        <div className="flex justify-between items-center">
          {[
            { n: "145", l: "días" }, 
            { n: "08", l: "hrs" }, 
            { n: "23", l: "min" },
            { n: "47", l: "seg" }
          ].map((t, i) => (
            <div key={t.l} className="text-center">
              <div className="bg-black/40 rounded-lg px-2 py-1 mb-0.5">
                <span className="text-lg font-bold text-white font-mono">{t.n}</span>
              </div>
              <span className="text-[8px] text-gray-500 uppercase">{t.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Categories */}
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {[
        { icon: "🍽️", name: "Comida", color: "from-orange-500/20 to-orange-600/10" },
        { icon: "🏨", name: "Hotel", color: "from-blue-500/20 to-blue-600/10" },
        { icon: "🍺", name: "Bares", color: "from-amber-500/20 to-amber-600/10" },
        { icon: "🎭", name: "Tours", color: "from-purple-500/20 to-purple-600/10" },
      ].map((cat) => (
        <div key={cat.name} className={`bg-gradient-to-b ${cat.color} rounded-xl p-2 text-center border border-white/5`}>
          <span className="text-base">{cat.icon}</span>
          <p className="text-[9px] text-gray-300 mt-0.5 font-medium">{cat.name}</p>
        </div>
      ))}
    </div>

    {/* Featured Section */}
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-white font-semibold">Destacados</span>
        <span className="text-[9px] text-primary font-medium">Ver todos →</span>
      </div>
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-2 flex items-center gap-2 border border-amber-500/20">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/40 to-amber-600/40 flex items-center justify-center">
          <Star className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[11px] font-semibold truncate">Contramar</p>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-amber-400">★ 4.9</span>
            <span className="text-gray-600 text-[9px]">•</span>
            <span className="text-gray-500 text-[9px]">Roma Norte</span>
          </div>
        </div>
        <div className="bg-primary/20 px-1.5 py-0.5 rounded text-[8px] text-primary font-bold">TOP</div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
        <Trophy className="w-4 h-4 text-primary mx-auto mb-0.5" />
        <span className="text-[9px] text-gray-400">Quiniela</span>
      </div>
      <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
        <Calendar className="w-4 h-4 text-green-400 mx-auto mb-0.5" />
        <span className="text-[9px] text-gray-400">Partidos</span>
      </div>
    </div>
  </div>
);

const ScreenNegocios = () => (
  <div className="h-full bg-gradient-to-b from-[#0c1829] to-[#070d17] p-3">
    {/* Search Bar */}
    <div className="bg-white/[0.08] rounded-xl px-3 py-2 mb-3 flex items-center gap-2 border border-white/10">
      <Search className="w-3.5 h-3.5 text-gray-500" />
      <span className="text-[10px] text-gray-500">Buscar en CDMX...</span>
    </div>

    {/* Filter Pills */}
    <div className="flex gap-1.5 mb-3 overflow-hidden">
      {["Todos", "Comida", "Bares", "Hoteles"].map((f, i) => (
        <div 
          key={f} 
          className={`px-2.5 py-1 rounded-full text-[9px] font-medium whitespace-nowrap ${
            i === 0 
              ? 'bg-primary text-white' 
              : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          {f}
        </div>
      ))}
    </div>
    
    {/* Business Cards */}
    <div className="space-y-2">
      {[
        { name: "La Casa de Toño", type: "Restaurante", rating: "4.8", price: "$$", color: "from-orange-500/20" },
        { name: "Bar Montejo", type: "Cantina", rating: "4.6", price: "$", color: "from-amber-500/20" },
        { name: "Tacos El Güero", type: "Antojitos", rating: "4.9", price: "$", color: "from-red-500/20" },
      ].map((biz, i) => (
        <div key={biz.name} className="bg-gradient-to-r from-white/[0.06] to-transparent rounded-xl p-2.5 flex items-center gap-2.5 border border-white/5">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${biz.color} to-white/5 flex items-center justify-center text-lg`}>
            {i === 0 ? "🍲" : i === 1 ? "🍺" : "🌮"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-semibold truncate">{biz.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-[9px]">★ {biz.rating}</span>
              <span className="text-gray-600 text-[9px]">•</span>
              <span className="text-gray-500 text-[9px]">{biz.type}</span>
              <span className="text-gray-600 text-[9px]">•</span>
              <span className="text-green-400 text-[9px]">{biz.price}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      ))}
    </div>

    {/* Stats */}
    <div className="mt-3 bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-2 border border-primary/20">
      <p className="text-[9px] text-gray-400 text-center">
        <span className="text-primary font-bold">2,847</span> negocios afiliados en CDMX
      </p>
    </div>
  </div>
);

// Phone Mockup Component
interface PhoneMockupProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isCenter?: boolean;
  delay?: number;
  rotation?: number;
  offset?: number;
}

const PhoneMockup = ({ children, title, subtitle, isCenter, delay = 0, rotation = 0, offset = 0 }: PhoneMockupProps) => {
  return (
    <div 
      className="group relative"
      style={{ 
        transform: `rotateY(${rotation}deg) translateY(${offset}px)`,
        animationDelay: `${delay}s`
      }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-8 rounded-full blur-3xl transition-opacity duration-500 ${
        isCenter 
          ? 'bg-gradient-to-b from-primary/30 to-green-500/20 opacity-60' 
          : 'bg-primary/10 opacity-0 group-hover:opacity-40'
      }`} />
      
      {/* Phone Frame - iPhone 15 Pro style */}
      <div 
        className={`
          relative rounded-[3rem] transition-all duration-500 group-hover:-translate-y-2
          ${isCenter 
            ? 'w-[240px] h-[490px] z-20' 
            : 'w-[210px] h-[430px] z-10'
          }
        `}
        style={{
          background: 'linear-gradient(145deg, #2a2a3e 0%, #1a1a2e 50%, #0f0f1a 100%)',
          boxShadow: isCenter
            ? '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 30px 60px -30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Titanium frame effect */}
        <div className="absolute inset-0 rounded-[3rem] border border-white/10" />
        <div className="absolute inset-[1px] rounded-[2.9rem] border border-white/5" />
        
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l" />
        <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l" />
        <div className="absolute -left-[2px] top-52 w-[3px] h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l" />
        <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r" />
        
        {/* Screen bezel */}
        <div className="absolute inset-[6px] rounded-[2.5rem] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
            <div className="w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-gray-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-11 flex items-end justify-between px-7 pb-1 z-20">
            <span className="text-[11px] text-white font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="w-3.5 h-3.5 text-white" />
              <Wifi className="w-3.5 h-3.5 text-white" />
              <Battery className="w-5 h-3 text-white" />
            </div>
          </div>
          
          {/* Screen Content */}
          <div className="pt-11 h-full">
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
        </div>
        
        {/* Glass reflection */}
        <div className="absolute inset-[6px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
      </div>
      
      {/* Label */}
      <div className="text-center mt-6">
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .group {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AppShowcaseSection;
