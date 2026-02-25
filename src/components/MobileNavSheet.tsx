/**
 * Componente reutilizable: menú de navegación con variante móvil (Sheet).
 * En móvil: icono hamburguesa que abre Sheet con los botones.
 * En escritorio: botones visibles en fila.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export interface NavItem {
  label: string;
  onClick: () => void;
}

interface MobileNavSheetProps {
  items: NavItem[];
  /** Clases adicionales para el contenedor de botones desktop */
  className?: string;
  /** Clases para cada botón */
  buttonClassName?: string;
}

const MobileNavSheet = ({
  items,
  className = "",
  buttonClassName = "bg-gradient-orange hover:opacity-90 text-accent-foreground font-semibold shadow-lg",
}: MobileNavSheetProps) => {
  const [open, setOpen] = useState(false);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };

  const navButtons = items.map(({ label, onClick }) => (
    <Button
      key={label}
      className={buttonClassName}
      onClick={() => handleItemClick(onClick)}
    >
      {label}
    </Button>
  ));

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Desktop: botones visibles desde sm */}
      <div className="hidden sm:flex flex-col sm:flex-row gap-4 justify-center">
        {navButtons}
      </div>

      {/* Mobile: hamburguesa + Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden bg-white/10 hover:bg-white/20 border-white/20 text-white"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-[#050a12] border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white">Menú</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-8">
            {items.map(({ label, onClick }) => (
              <Button
                key={label}
                className={`${buttonClassName} w-full justify-center py-6`}
                onClick={() => handleItemClick(onClick)}
              >
                {label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavSheet;
