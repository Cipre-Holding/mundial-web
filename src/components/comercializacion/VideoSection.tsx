import { Gift, Smartphone, ExternalLink, Zap, Globe, Fingerprint, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import videoMundial from "@/assets/videoMundial.mp4";

const VideoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-19 overflow-hidden bg-color-white">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with logo */}
          <div className="flex flex-col items-center gap-8 mb-6">
            <Badge className="bg-white/10 backdrop-blur-md text-customcolors-redprimary border-white/20 hover:bg-white/20 px-5 py-2 text-sm font-medium flex items-center gap-2 shadow-lg shadow-black/10 transition-all duration-300">
              <Gift className="w-4 h-4" />
              Funcionalidades
            </Badge>
            
          </div>

          {/* Premium Floating Card */}
          <div className="relative max-w-3xl mx-auto mb-14 group">
            {/* Card */}
            <video src={videoMundial} controls className="w-full h-auto rounded-2xl shadow-xl" aria-label="Video promocional del Mundial del Bienestar"></video>
          </div>

          {/* Descarga app */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
            <Button
              className="bg-gradient-orange hover:opacity-90 text-accent-foreground font-bold shadow-lg"
              onClick={() => navigate("/descargarapp")}
            >
              Descarga la App
              <Smartphone className="w-5 h-5 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoSection;
