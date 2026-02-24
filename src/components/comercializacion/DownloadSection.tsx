import { useNavigate } from "react-router-dom";
import MobileNavSheet from "@/components/MobileNavSheet";
import cel from "@/assets/android.png";
import googleplay from "@/assets/googleplay.svg";
import appstore from "@/assets/appstore.svg";

const DownloadSection = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Inicio", onClick: () => navigate("/") },
    { label: "Tengo un Negocio", onClick: () => navigate("/comercios") },
  ];

  return (
    <section className="relative py-6 overflow-hidden bg-[#155831]">
      {/* Stadium lights effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <nav className="flex items-center justify-between mb-6 md:mb-20">
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
          <MobileNavSheet items={navItems} />
        </nav>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-8 mb-22 perspective-1000">
          {/* Phone - Large */}
          <img src={cel} className="w-72 h-auto lg:w-90 object-contain lg:-mt-12" />

          {/* Store buttons - Stacked */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Vive México App!
            </h2>

            <h1 className="text-center text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl font-black text-white mb-6 leading-[1.1] animate-fade-in tracking-tight drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
              El fútbol te mueve, la app que te guía{" "}
              <span className="relative inline-block">
                <span className="text-gradient-gold">Partidos, mapas y recompensas</span>
                <span className="absolute -inset-1 shimmer rounded-lg opacity-50" />
              </span>
            </h1>

            <img src={googleplay} className="w-48 lg:w-56 object-contain" />
            <img src={appstore} className="w-48 lg:w-56 object-contain" />
          </div>
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

export default DownloadSection;
