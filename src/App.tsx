/**
 * @fileoverview Componente raíz: proveedores, router y rutas.
 * Incluye landing, comercios, panel admin y auth.
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import DescargarApp from "./pages/DescargarApp";
import Comercios from "./pages/Comercios";
import Auth from "./pages/Auth";
import PanelLayout from "./components/panel/PanelLayout";
import Dashboard from "./pages/panel/Dashboard";
import CatalogPage from "./pages/panel/CatalogPage";
import ProposalBuilderPage from "./pages/panel/ProposalBuilderPage";
import PitchTemplatesPage from "./pages/panel/PitchTemplatesPage";
import TargetsPage from "./pages/panel/TargetsPage";
import ResourceLibraryPage from "./pages/panel/ResourceLibraryPage";
import ProspectsPage from "./pages/panel/ProspectsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/comercios" element={<Comercios />} />
            <Route path="/descargarapp" element={<DescargarApp />} />
            <Route path="/terminos" element={<TerminosCondiciones />} />
            <Route path="/auth" element={<Auth />} />
            {/* Panel comercial - rutas protegidas */}
            <Route path="/panel" element={<PanelLayout><Dashboard /></PanelLayout>} />
            <Route path="/panel/catalogo" element={<PanelLayout><CatalogPage /></PanelLayout>} />
            <Route path="/panel/propuestas" element={<PanelLayout><ProposalBuilderPage /></PanelLayout>} />
            <Route path="/panel/plantillas" element={<PanelLayout><PitchTemplatesPage /></PanelLayout>} />
            <Route path="/panel/recursos" element={<PanelLayout><ResourceLibraryPage /></PanelLayout>} />
            <Route path="/panel/prospectos" element={<PanelLayout><ProspectsPage /></PanelLayout>} />
            <Route path="/panel/targets" element={<PanelLayout><TargetsPage /></PanelLayout>} />
            <Route path="/panel/presentaciones" element={<PanelLayout><div className="text-foreground">Próximamente: Presentaciones</div></PanelLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
