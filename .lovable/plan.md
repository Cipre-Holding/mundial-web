

## Plan: Seccion Promocional "Internet del Bienestar"

### Objetivo
Crear un banner/seccion promocional que destaque la alianza con "Internet del Bienestar", ofreciendo 3 dias de internet gratis con cada descarga de la app.

---

### Ubicacion
Despues de `BenefitsSection` (Todo lo que necesitas para destacar) y antes de `PricingSection`

---

### Color Institucional Identificado
Basado en el sitio web de Bienestar (yosoybienestar.com):
- **Color primario**: Guinda/Vino intenso (#9c1c4a o #8B1538)
- **Color secundario**: Blanco
- **Estilo**: Moderno, institucional mexicano

---

### Estructura del Componente

**Archivo nuevo:** `src/components/comercializacion/BienestarSection.tsx`

#### Diseno Visual
```
+------------------------------------------------------------------+
|  [Fondo gradiente guinda con efecto glassmorphism]               |
|                                                                   |
|  [Logo/Icono Wifi]        PROMOCION ESPECIAL                     |
|                                                                   |
|       Conectate con Internet del Bienestar                        |
|                                                                   |
|  +----------------------------------------------------------+    |
|  |  [Icono]  3 Dias de Internet GRATIS                      |    |
|  |           con cada descarga de la App                     |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  Navega, explora y conectate durante el Mundial                  |
|  con cobertura en todo Mexico                                    |
|                                                                   |
|  [Descargar App]        [Conocer Bienestar ->]                   |
|                                                                   |
|  En alianza con yosoybienestar.com                               |
+------------------------------------------------------------------+
```

#### Elementos
1. **Header con Badge**: "Promocion Especial" o "Alianza Estrategica"
2. **Titulo Principal**: "Conectate con Internet del Bienestar"
3. **Destacado Central**: Card con "3 Dias de Internet GRATIS"
4. **Descripcion**: Beneficios de la conectividad durante el Mundial
5. **Botones CTA**: 
   - Primario: "Descargar App" (scroll a seccion de descarga o link)
   - Secundario: "Conocer Bienestar" (link externo a yosoybienestar.com)
6. **Footer**: Mencion de la alianza

---

### Estilos Visuales

#### Paleta de Colores (basada en Bienestar)
- **Fondo principal**: `from-[#8B1538] via-[#9c1c4a] to-[#8B1538]`
- **Acentos**: Blanco y tonos rosados claros
- **Efectos blur**: `bg-white/10` para glassmorphism

#### Caracteristicas
- Fondo con gradiente guinda distintivo
- Efectos de blur decorativos
- Card central con glassmorphism
- Iconos de Lucide React (Wifi, Gift, Download)
- Bordes sutiles blancos semitransparentes
- Animaciones hover en botones

---

### Modificaciones Requeridas

#### 1. Crear nuevo componente
**Archivo:** `src/components/comercializacion/BienestarSection.tsx`
- Importar iconos de Lucide (Wifi, Gift, Smartphone, ExternalLink)
- Estructura responsive con contenedor central
- Cards con glassmorphism en colores guinda
- Botones con estilos contrastantes (blanco sobre guinda)

#### 2. Actualizar Index.tsx
Agregar importacion y colocar despues de BenefitsSection:
```tsx
import BienestarSection from "@/components/comercializacion/BienestarSection";

// En el return:
<BenefitsSection />
<BienestarSection />  // NUEVA SECCION
<PricingSection onSelectPlan={handleSelectPlan} />
```

---

### Contenido de Texto Propuesto

- **Badge**: "Promocion Especial"
- **Titulo**: "Conectate con Internet del Bienestar"
- **Subtitulo**: "Tu conexion durante el Mundial"
- **Destacado**: "3 Dias de Internet GRATIS con cada descarga"
- **Descripcion**: "Navega, explora y mantente conectado durante todo el evento. Cobertura en las principales ciudades sede del Mundial."
- **CTA Primario**: "Descargar la App"
- **CTA Secundario**: "Conocer mas sobre Bienestar"
- **Footer**: "En alianza con Internet del Bienestar - yosoybienestar.com"

---

### Detalles Tecnicos

- Componente funcional React con TypeScript
- Iconos de `lucide-react`: Wifi, Gift, Smartphone, ExternalLink
- Link externo a yosoybienestar.com con `target="_blank"` y `rel="noopener noreferrer"`
- Clases de Tailwind para responsive design
- Animaciones consistentes con el resto del sitio

