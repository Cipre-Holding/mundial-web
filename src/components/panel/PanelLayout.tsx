/**
 * @fileoverview Layout principal del panel comercial con sidebar de navegación.
 * Protege rutas: redirige a /auth si no hay usuario autenticado.
 */
import { ReactNode } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import logoMalu from '@/assets/logo-malu.png';
import logoCipre from '@/assets/logo-cipre.png';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  Package,
  Target,
  FileText,
  LogOut,
  Loader2,
  Trophy,
  BookOpen,
  Calculator,
  ScrollText,
  FolderOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
export default function PanelLayout({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
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

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
