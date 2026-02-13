import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import cel from "@/assets/android.png";
import googleplay from "@/assets/googleplay.svg";
import appstore from "@/assets/appstore.svg";

const DownloadSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-6 overflow-hidden bg-gradient-to-b from-[#050a12] via-[#0a1628] to-[#050a12]">
      {/* Stadium lights effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />
      
      {/* Pitch pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white" />
        <div className="absolute top-1/2 left-0 w-32 h-64 border-2 border-white -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-32 h-64 border-2 border-white -translate-y-1/2" />
      </div>

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-semibold shadow-lg hidden sm:flex"
              onClick={() => navigate("/")}
            >
              Inicio
            </Button>
            
            <Button 
              className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-bold shadow-lg hidden sm:flex"
              onClick={() => navigate("/comercios")}
            >
              Tengo un Negocio
            </Button>
          </div>
        </nav>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-22 perspective-1000">
          {/* Phone - Large */}
          <img src={cel} className="w-72 h-auto lg:w-90 object-contain lg:-mt-12" />

          {/* Store buttons - Stacked */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Vive México App!
            </h2>
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
