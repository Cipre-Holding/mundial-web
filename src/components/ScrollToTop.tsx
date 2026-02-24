/**
 * Componente que hace scroll al inicio de la página al cambiar de ruta.
 * Útil para SPA para que el usuario no quede scrolleado al navegar.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
