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
    <section className="relative py-6 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <nav className="flex items-center justify-between mb-6 md:mb-20">
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
              <span className="text-xs text-accent font-semibold tracking-widest uppercase">
                Negocios México
              </span>
            </div>
          </div>
          <MobileNavSheet items={navItems} />
        </nav>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-8 mb-22 perspective-1000">
          {/* Store buttons - Stacked */}
          <div className="font-bold flex flex-col gap-4 justify-center items-center lg:w-1/2">
            <h1 className="anton-regular text-center text-8xl md:text-9xl text-redprimary mb-6 text-customcolors-redprimary tracking-tight">
                Vive México App!
            </h1>

            <p className="text-center text-2xl md:text-3xl lg:text-3.5xl xl:text-4xl text-primary mb-6 leading-[1.1] animate-fade-in tracking-tight drop-shadow-2xl" style={{ animationDelay: "0.1s" }}>
              EL FÚTBOL TE MUEVE, PERO TU APP TE GUÍA{" "}
              <span className="relative inline-block">
                <span className="text-gradient-orange">Partidos, mapas, recompensas y más</span>
                <span className="absolute -inset-1 shimmer rounded-lg opacity-75" />
              </span>
            </p>

            <img src={googleplay} className="w-48 lg:w-56 object-contain" />
            <img src={appstore} className="w-48 lg:w-56 object-contain" />
          </div>

          {/* Phone - Large */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img src={cel} className="w-full max-w-sm lg:max-w-none h-auto object-contain lg:-mt-12" />
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
