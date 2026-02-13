import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const FooterSection = () => {
  const navigate = useNavigate();
  
  const scrollToPlans = () => {
    navigate("/comercios");
    document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="-mt-10 pt-14 bg-gradient-to-b from-background from-0% to-foreground to-15% text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">⚽</span>
              </div>
              <span className="text-xl font-bold">Vive México</span>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              La plataforma líder para conectar negocios mexicanos con los millones 
              de turistas que visitarán México durante el Mundial.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <Button 
                className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-bold shadow-lg hidden sm:flex"
                onClick={() => navigate("/descargarapp")}
              >
                Descarga la App
              </Button>
              <Button 
                className="bg-gradient-gold hover:opacity-90 text-accent-foreground font-bold shadow-lg hidden sm:flex"
                onClick={() => navigate("/auth")}
              >
                Admin
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/comercios")}
                  className="text-background/70 hover:text-accent transition-colors text-left"
                >
                  Beneficios
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToPlans}
                  className="text-background/70 hover:text-accent transition-colors text-left"
                >
                  Planes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terminos")}
                  className="text-background/70 hover:text-accent transition-colors text-left"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terminos")}
                  className="text-background/70 hover:text-accent transition-colors text-left"
                >
                  Aviso de Privacidad
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@mundial2026mx.com" className="hover:text-accent transition-colors">
                  info@mundial2026mx.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="h-4 w-4" />
                <a href="tel:+525512345678" className="hover:text-accent transition-colors">
                  +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  Ciudad de México, Guadalajara y Monterrey
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-background/50">
              © 2026 Vive México. Todos los derechos reservados.
            </p>
            <p className="text-sm text-background/50">
              Hecho con ❤️ en México
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
