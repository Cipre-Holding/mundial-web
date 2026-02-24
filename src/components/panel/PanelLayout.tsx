/**
 * @fileoverview Layout principal del panel comercial con sidebar de navegación.
 * Protege rutas: redirige a /auth si no hay usuario autenticado.
 * En móvil: sidebar colapsable mediante Sheet.
 */
import { ReactNode, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import logoMalu from '@/assets/logo-malu.png';
import logoCipre from '@/assets/logo-cipre.png';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  LayoutDashboard,
  Users,
  Target,
  FileText,
  LogOut,
  Loader2,
  Trophy,
  BookOpen,
  Calculator,
  ScrollText,
  FolderOpen,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/panel', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/panel/catalogo', icon: BookOpen, label: 'Qué Vendemos' },
  { to: '/panel/propuestas', icon: Calculator, label: 'Propuestas' },
  { to: '/panel/plantillas', icon: ScrollText, label: 'Plantillas' },
  { to: '/panel/recursos', icon: FolderOpen, label: 'Recursos' },
  { to: '/panel/prospectos', icon: Users, label: 'Prospectos' },
  { to: '/panel/targets', icon: Target, label: 'Targets' },
  { to: '/panel/presentaciones', icon: FileText, label: 'Presentaciones' },
];

/**
 * Layout con sidebar para páginas del panel comercial.
 * Muestra navegación, email del usuario y botón de cerrar sesión.
 *
 * @param props.children - Contenido de la página (Dashboard, Prospectos, etc.)
 */
/** Contenido del sidebar (navegación + usuario) para reutilizar en desktop y móvil */
function SidebarContent({
  location,
  user,
  signOut,
  onNavClick,
}: {
  location: ReturnType<typeof useLocation>;
  user: { email?: string | null };
  signOut: () => void;
  onNavClick?: () => void;
}) {
  return (
    <>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <img src={logoMalu} alt="MALU" className="h-4 opacity-40" />
          <img src={logoCipre} alt="Cipre Holding" className="h-7 opacity-40" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </>
  );
}

export default function PanelLayout({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const sidebarHeader = (
    <div className="p-6 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">Panel Comercial</p>
          <p className="text-xs text-muted-foreground">Mundial 2026</p>
        </div>
      </div>
    </div>
  );

  const sidebarContent = (
    <SidebarContent
      location={location}
      user={user}
      signOut={signOut}
      onNavClick={isMobile ? () => setSheetOpen(false) : undefined}
    />
  );

  return (
    <div
      className={cn(
        "min-h-screen flex bg-muted/30",
        isMobile && "flex-col"
      )}
    >
      {/* Desktop: sidebar fijo */}
      {!isMobile && (
        <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
          {sidebarHeader}
          {sidebarContent}
        </aside>
      )}

      {/* Mobile: header con hamburguesa + Sheet */}
      {isMobile && (
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-6 pb-0">
                <SheetTitle className="sr-only">Menú del panel</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-[calc(100vh-4rem)]">
                {sidebarHeader}
                {sidebarContent}
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-semibold text-sm">Panel Comercial</span>
        </header>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
