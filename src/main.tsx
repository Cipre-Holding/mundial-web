/**
 * Punto de entrada de la aplicación.
 * Monta el árbol React en #root e importa estilos globales.
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
