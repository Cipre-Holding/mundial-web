import { Gift, Smartphone, ExternalLink, Zap, Globe, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import bienestarLogo from "@/assets/bienestar-logo.svg";

const BienestarSection = () => {

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#050a12] from-15% via-[#0a1628] via-55% to-[#050a12] to-100%">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Layout: Card + Right sidebar */}
          <div className="flex flex-col xl:flex-row items-center xl:items-center gap-10">

            {/* Premium Floating Card */}
            <div className="relative flex-1 group">
              {/* Card */}
              <div
                className="relative h-full bg-gradient-to-br from-[#8B1538] via-[#9c1c4a] to-[#7a1230] backdrop-blur-2xl border border-white/20 rounded-[2rem] p-10 md:p-12 overflow-hidden"
              >
                {/* Highlight edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                {/* Animated shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                  {/* Premium 3D Logo Container */}
                  <div className="relative group">
                    {/* Main logo card with 3D effect */}
                    <div
                      className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                    >
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 via-transparent to-transparent" />
                      <img
                        src={bienestarLogo}
                        alt="Internet del Bienestar"
                        className="h-16 md:h-24 w-auto relative z-10"
                      />
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                      7 Días de Internet del Bienestar GRATIS
                    </h3>
                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                      Navega, explora y mantente conectado durante todo el evento.
                      Cobertura en las principales ciudades sede del Mundial.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex items-start gap-4">
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-2 max-w-4xl mx-auto">
                    {[
                      { icon: Fingerprint, title: "Fácil Activación", desc: "Descarga la app y activa tu internet" },
                      { icon: Zap, title: "Alta Velocidad", desc: "Navegación rápida en  mapas y apps" },
                      { icon: Globe, title: "Cobertura Nacional", desc: "En ciudades sede del Mundial" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:bg-white/15"
                        >
                          {/* Top highlight */}
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10 transition-all duration-500">
                            <feature.icon className="w-7 h-7 text-white" />
                          </div>
                          <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                          <p className="text-white/50 text-sm font-light">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4 justify-center">
                  <Button
                      asChild
                      variant="ghost"
                      className="text-white border-2 border-white/30 hover:bg-white/10 hover:text-white hover:border-white/50 px-8 py-7 text-lg rounded-2xl transition-all duration-300 backdrop-blur-sm text-center"
                    >
                      <a
                        href="https://yosoybienestar.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Conocer más sobre Bienestar
                        <ExternalLink className="w-4 h-4 ml-3" />
                      </a>
                    </Button>

                    <p className="text-white/40 text-sm font-light tracking-wide text-center">
                      En alianza con{" "}
                      <a
                        href="https://yosoybienestar.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white underline underline-offset-4 transition-colors font-normal"
                      >
                        Internet del Bienestar - yosoybienestar.com
                      </a>
                    </p>
                </div>

              </div>
            </div>

            

          </div>
        </div>
      </div>
    </section>
  );
};

export default BienestarSection;
