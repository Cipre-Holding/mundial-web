import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Landmark, UtensilsCrossed, Banknote, ShieldPlus, Hotel, Copy, Check, Edit3, Eye, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportTemplateToPDF } from '@/lib/pdfExport';

interface TemplateFields {
  clientName: string;
  city: string;
  sellerName: string;
  proposalDetails: string;
  deadline: string;
  restaurantName: string;
  cuisineType: string;
  bankName: string;
  institutionType: string;
  insurerName: string;
  coverageType: string;
  hotelName: string;
  hotelType: string;
}

const defaultFields: TemplateFields = {
  clientName: '[Nombre del Cliente]',
  city: '[Ciudad/Destino]',
  sellerName: '[Nombre del Vendedor]',
  proposalDetails: '(Se adjunta propuesta personalizada generada en el calculador)',
  deadline: '[X]',
  restaurantName: '[Nombre del Restaurante]',
  cuisineType: '[Tipo de Cocina]',
  bankName: '[Nombre del Banco]',
  institutionType: '[Tipo de Institución]',
  insurerName: '[Nombre de la Aseguradora]',
  coverageType: '[Tipo de Cobertura]',
  hotelName: '[Nombre del Hotel]',
  hotelType: '[Tipo de Propiedad]',
};

function renderEmpresasTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},

México recibirá más de 5 millones de visitantes internacionales durante el Mundial FIFA 2026 en sus tres ciudades sede: CDMX, Monterrey y Guadalajara. Esto representa la mayor concentración de turismo de alto poder adquisitivo en la historia del país.

Nuestra plataforma es el hub digital oficial de información para el visitante del Mundial en México. Centraliza en un solo lugar todo lo que el turista necesita: sedes, transporte, hospedaje, gastronomía, experiencias y servicios — convirtiéndose en su compañero digital durante toda su estancia.

¿POR QUÉ ES DIFERENTE?

• La más completa del mercado: No existe otra plataforma que integre información turística, logística y de entretenimiento en un solo punto para el Mundial en México.
• Estrategia de despliegue agresiva: Red de empresas asociadas, presencia en puntos de entrada (aeropuertos, centrales), y distribución digital masiva garantizan adopción desde el día uno.
• Audiencia cautiva y calificada: Visitantes internacionales con intención de gasto activa, geolocalizados en las ciudades sede.

¿QUÉ GANA SU MARCA?

1. Presencia contextual: Su marca aparece en el momento exacto en que el usuario busca lo que usted ofrece — no como anuncio, sino como solución.
2. Data de primera mano (first-party data): Acceso a datos de comportamiento, preferencias y geolocalización del visitante, sin depender de cookies de terceros.
3. Capacidad de retargeting post-evento: La base de usuarios generada durante el Mundial queda activa, permitiendo campañas de reconexión con una audiencia que ya interactuó con su marca.
4. Métricas reales de impacto: Reportes detallados de impresiones, interacciones y conversiones atribuibles directamente a su inversión.

INVERSIÓN
${f.proposalDetails}

La ventana de oportunidad es limitada. Las posiciones de máxima visibilidad se asignan por orden de compromiso.

Quedo a sus órdenes para agendar una presentación ejecutiva.

Atentamente,
${f.sellerName} — Equipo Comercial`;
}

function renderGobiernoTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},

El Mundial FIFA 2026 posicionará a México ante más de 5 mil millones de espectadores globales. Para ${f.city}, esto representa una oportunidad irrepetible de capturar una porción significativa de los más de 5 millones de visitantes internacionales que llegarán al país, con un gasto promedio estimado de $2,000 a $4,500 USD por persona.

Sin embargo, sin una estrategia digital de captación, la derrama económica se concentrará exclusivamente en las ciudades sede, dejando fuera a destinos con enorme potencial turístico.

LA OPORTUNIDAD

Nuestra plataforma es la más completa del mercado diseñada para el visitante del Mundial en México. Integra en un solo lugar: información de sedes, transporte, hospedaje, gastronomía, experiencias culturales y servicios esenciales.

Proponemos una alianza estratégica para posicionar a ${f.city} como destino complementario imperdible dentro de la experiencia del visitante.

BENEFICIOS PARA ${f.city.toUpperCase()}

• Visibilidad ante audiencia internacional — Su destino aparece como recomendación contextual a millones de visitantes con intención de viaje activa.
• Extensión de estadía — Al descubrir ${f.city} dentro de la app, el visitante extiende su itinerario — más noches, más consumo local.
• Derrama económica distribuida — Canalizar flujo turístico hacia comercios, restaurantes, hoteleros y operadores locales.
• Data turística en tiempo real — Acceso a patrones de búsqueda, interés y desplazamiento del visitante — insumo invaluable para política pública turística.
• Posicionamiento post-Mundial — La base de usuarios permanece activa, convirtiendo a ${f.city} en referencia para turismo recurrente.

¿QUÉ INCLUYE LA ALIANZA?

1. Sección dedicada del destino: Perfil completo con atractivos, gastronomía, hospedaje y experiencias únicas de ${f.city}.
2. Contenido editorial patrocinado: Artículos y guías como "48 horas en ${f.city}: lo que no te puedes perder" integrados en la navegación del usuario.
3. Geolocalización inteligente: Notificaciones y recomendaciones activadas por proximidad o interés temático del visitante.
4. Reportes de impacto turístico: Métricas de visualizaciones, interacciones y conversiones atribuibles al destino.
5. Integración con operadores locales: Conexión directa entre el visitante y los prestadores de servicios turísticos de la región.

IMPACTO SOCIAL Y ECONÓMICO

• Generación de empleo temporal y permanente en el sector servicios local.
• Fortalecimiento de la marca-destino ante un público global de alto poder adquisitivo.
• Democratización de la derrama: los beneficios del Mundial no se quedan solo en las sedes, sino que se extienden a toda la región.
• Legado digital: infraestructura de promoción turística que trasciende el evento.

MODELO DE PARTICIPACIÓN
${f.proposalDetails}

El calendario avanza. Las alianzas estratégicas para posicionamiento preferencial se cierran en los próximos ${f.deadline} meses.

Solicito una reunión con su equipo para presentar el proyecto ejecutivo completo.

Atentamente,
${f.sellerName} — Dirección de Alianzas Institucionales`;
}

function renderRestaurantesTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},
Propietario(a) de ${f.restaurantName}

Durante el Mundial FIFA 2026, más de 5 millones de visitantes internacionales llegarán a México. Según datos de la Secretaría de Turismo, el gasto en alimentos y bebidas representa entre el 25% y 35% del presupuesto total del turista — lo que convierte a la gastronomía en uno de los sectores con mayor potencial de captación durante el evento.

La pregunta no es si habrá demanda. La pregunta es: ¿cómo va a encontrar el turista su restaurante?

EL PROBLEMA

El visitante internacional no conoce su ciudad. No sabe qué buscar en Google. No tiene recomendaciones locales. Depende 100% de las plataformas digitales que tenga a la mano al momento de decidir dónde comer.

LA SOLUCIÓN

Nuestra plataforma es el hub digital más completo para el visitante del Mundial en México. Cuando un turista busque "dónde comer ${f.cuisineType} en ${f.city}", su restaurante aparecerá como recomendación destacada — no como anuncio, sino como la respuesta a lo que está buscando.

¿QUÉ OBTIENE ${f.restaurantName.toUpperCase()}?

1. Perfil destacado en la sección gastronómica — Fotos, menú, ubicación, horarios y enlace directo a reservaciones. El turista lo encuentra sin buscar en otro lado.

2. Visibilidad por geolocalización — Cuando el visitante esté cerca de su zona, recibirá una notificación: "${f.restaurantName}: ${f.cuisineType} auténtica a 5 minutos de ti". Presencia en el momento exacto de decisión.

3. Recomendaciones contextuales — Si el usuario busca "experiencias gastronómicas", "comida típica" o "restaurantes cerca del estadio", su establecimiento aparece orgánicamente en los resultados.

4. Contenido editorial — Inclusión en guías como "Los 10 mejores restaurantes de ${f.cuisineType} en ${f.city}" o "Dónde comer antes del partido". Contenido que el turista comparte y recomienda.

5. Reseñas y validación social — Sección de opiniones verificadas que genera confianza en el visitante que no conoce la zona.

6. Data post-evento — Acceso a métricas de cuántos turistas vieron su perfil, interactuaron y llegaron a su restaurante. Datos reales para medir el retorno de su inversión.

¿POR QUÉ AHORA?

• Las posiciones gastronómicas destacadas son limitadas por zona — solo un número reducido de restaurantes tendrán máxima visibilidad.
• La base de usuarios se construye antes del Mundial — quien esté primero, captura primero.
• El turista que lo descubre durante el Mundial puede convertirse en cliente recurrente o embajador de su marca en su país de origen.

INVERSIÓN
${f.proposalDetails}

No se trata de publicidad. Se trata de estar donde el turista va a buscar. Y nosotros somos ese lugar.

¿Agendamos 20 minutos para mostrarle cómo se vería ${f.restaurantName} dentro de la plataforma?

Atentamente,
${f.sellerName} — Equipo Comercial`;
}

function renderHoteleriaTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},
Director(a) General de ${f.hotelName}

Durante el Mundial FIFA 2026, México recibirá más de 5 millones de visitantes internacionales. Las ciudades sede — CDMX, Monterrey y Guadalajara — ya reportan pre-ventas de alojamiento superiores al 80% para las fechas de los partidos. La pregunta ya no es SI habrá demanda. La pregunta es: ¿cómo va a capitalizar ${f.hotelName} esta oportunidad histórica?

EL CONTEXTO PARA HOTELERÍA

• El gasto promedio del turista del Mundial en hospedaje se estima entre $150 y $400 USD por noche.
• El 73% de los viajeros internacionales elige su hotel desde una app o plataforma digital durante el viaje.
• Los hoteles que ofrecen experiencias temáticas durante eventos deportivos aumentan su RevPAR hasta un 45%.
• La estancia promedio se extiende 2-3 noches cuando el viajero descubre experiencias complementarias en la ciudad.

¿QUÉ OBTIENE ${f.hotelName.toUpperCase()}?

1. Perfil de marca premium — Página dedicada dentro de la app con galería fotográfica, amenidades mundialistas (bar deportivo, pantallas en lobby, fan zone), paquetes especiales y enlace directo a reservas. El turista lo descubre como experiencia, no como anuncio.

2. Banner de máxima visibilidad — "${f.hotelName}: Vive el Mundial desde nuestro lobby" — posición premium en la pantalla principal de la app, visible para miles de turistas buscando alojamiento activamente.

3. Push Notifications geolocalizadas — "¡México juega mañana! ${f.hotelName} tiene habitaciones con vista al fan festival y transmisión en pantalla gigante." Notificaciones que activan reservas de último momento cuando el turista llega a la ciudad.

4. Geofencing en puntos de entrada — Cuando el turista aterriza en el aeropuerto o llega a la zona de estadios, recibe: "Bienvenido a ${f.city}. ${f.hotelName} está a 15 minutos — check-in express y late checkout para aficionados."

5. Listado destacado en directorio — Aparición prioritaria cuando el visitante busca "hotel cerca del estadio", "alojamiento en ${f.city}" o "hotel con transmisión del mundial".

6. Video branded — "Vive la experiencia mundialista en ${f.hotelName}" — video profesional mostrando las amenidades del hotel adaptadas al evento: pantallas en cada piso, menú temático, decoración futbolera, spa post-partido.

7. Leads calificados — Base de datos de turistas internacionales que buscaron hospedaje en ${f.city} durante el Mundial. First-party data de altísimo valor para campañas post-evento y fidelización.

LA PROPUESTA DE VALOR DIFERENCIADA

No se trata solo de que el turista reserve una habitación. Se trata de posicionar a ${f.hotelName} como EL DESTINO de la experiencia mundialista:

• Transmisión de partidos en pantallas gigantes en lobby y áreas comunes
• Fan zones privadas para huéspedes
• Menú temático con gastronomía de los países participantes
• Concierge mundialista: transporte a estadios, tips de seguridad, itinerarios de partido
• Late checkout en días de partido

El hotel que comunique esto primero, captura primero. Y nosotros ponemos ese mensaje frente a 500,000+ turistas activos.

¿POR QUÉ AHORA?

• Las posiciones de visibilidad premium por zona son limitadas — máximo 3 hoteles por categoría (${f.hotelType}) por ciudad sede.
• La base de usuarios se está construyendo AHORA. Quien entre primero, tiene mayor exposición acumulada para cuando el evento arranque.
• El ROI es claro: una sola reserva de 3 noches ($450-$1,200 USD) paga una fracción de la inversión mensual.

INVERSIÓN
${f.proposalDetails}

¿Agendamos una presentación ejecutiva para mostrarle cómo se vería ${f.hotelName} dentro de la plataforma?

Atentamente,
${f.sellerName} — Equipo Comercial`;
}

function renderBancosTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},

Durante el Mundial FIFA 2026, México recibirá más de 5 millones de visitantes internacionales con un gasto estimado superior a $10,000 millones de USD en el país. Cada uno de esos visitantes necesitará resolver una pregunta crítica desde el momento en que aterriza:

¿Cómo manejo mi dinero aquí?

Tipo de cambio, cajeros sin comisión, pagos con tarjeta internacional, transferencias, seguros de viaje, protección contra fraude en el extranjero. El visitante del Mundial es, por definición, un usuario financiero activo en territorio desconocido.

EL CONTEXTO PARA ${f.institutionType.toUpperCase()}

• El 78% de los turistas internacionales utiliza su tarjeta de débito/crédito como método principal de pago en el extranjero.
• Las búsquedas de "ATM near me" y "currency exchange" se disparan hasta 400% durante eventos deportivos masivos.
• El fraude con tarjeta en el extranjero es la preocupación #1 del viajero financiero — quien encuentre una solución confiable, gana un cliente.

¿QUÉ OBTIENE ${f.bankName.toUpperCase()}?

1. Presencia en el momento de decisión financiera — Cuando el visitante busque "dónde cambiar dólares", "cajero sin comisión" o "banco cerca de mí", ${f.bankName} aparece como la respuesta — no como anuncio, sino como solución verificada dentro de la plataforma.

2. Sección financiera dedicada — Perfil completo: ubicación de sucursales y cajeros en ${f.city}, servicios para extranjeros, tipo de cambio en tiempo real, y enlace directo a su app móvil.

3. Notificaciones geolocalizadas — "Sucursal ${f.bankName} a 200m de ti — Retiro sin comisión para tarjetas internacionales." Presencia contextual en el momento y lugar exacto donde el visitante necesita servicios financieros.

4. Contenido educativo financiero — Guías patrocinadas: "Guía financiera para el visitante del Mundial: cómo manejar tu dinero en México", "Los 5 errores que cometen los turistas con el tipo de cambio". Contenido de valor que posiciona a ${f.bankName} como aliado financiero del visitante.

5. Captación de clientes internacionales — El visitante que abre una cuenta digital, contrata un seguro de viaje o descarga su app durante el Mundial es un lead calificado de altísimo valor — un cliente internacional con historial de viaje y capacidad de gasto comprobada.

6. First-party data financiera — Datos de comportamiento: qué servicios financieros busca el turista, en qué zonas, a qué hora, con qué frecuencia. Inteligencia de mercado que no existe en ningún otro canal.

¿POR QUÉ ESTA PLATAFORMA?

• Audiencia cautiva: El turista ya está dentro de la app buscando información — ${f.bankName} aparece en el flujo natural de uso, no como interrupción.
• Sin competencia directa: No existe otra plataforma que integre servicios financieros dentro de la experiencia turística del Mundial en México.
• Retargeting post-evento: La relación con el cliente no termina con el Mundial. ${f.bankName} puede seguir comunicándose con una base de usuarios internacionales que ya confió en su marca.

CASO DE NEGOCIO (PROYECCIÓN CONSERVADORA)

• Usuarios expuestos a la marca: +500,000 visitantes en ciudades sede
• Búsquedas financieras capturadas: +200,000 durante el evento
• Leads de descarga de app / apertura digital: +15,000
• Costo por lead vs. campaña digital tradicional: 60-70% menor

INVERSIÓN
${f.proposalDetails}

La ventana es limitada. Solo una institución financiera por categoría (${f.institutionType}) tendrá posición de máxima visibilidad en cada ciudad sede.

¿Agendamos una presentación ejecutiva con su equipo de marketing y banca digital?

Atentamente,
${f.sellerName} — Equipo Comercial`;
}

function renderSegurosTemplate(f: TemplateFields) {
  return `Estimado(a) ${f.clientName},

Más de 5 millones de visitantes internacionales llegarán a México durante el Mundial FIFA 2026. Cada uno de ellos enfrenta un riesgo que conoce pero que rara vez resuelve antes de viajar:

¿Qué pasa si me enfermo o me accidento en un país extranjero?

El 62% de los viajeros internacionales NO contrata un seguro de gastos médicos antes de su viaje. No porque no lo necesiten — sino porque no encuentran la opción correcta en el momento correcto. Ese momento es exactamente lo que nuestra plataforma captura.

LA REALIDAD DEL VISITANTE DEL MUNDIAL

• México no tiene cobertura médica universal para extranjeros — una consulta de urgencia puede costar entre $3,000 y $15,000 MXN; una hospitalización supera fácilmente los $100,000 MXN.
• Los eventos masivos multiplican los riesgos: deshidratación, golpes de calor, lesiones en aglomeraciones, intoxicaciones alimentarias, accidentes de tránsito.
• El turista que llega sin seguro y tiene una emergencia médica enfrenta un problema financiero grave — y busca soluciones desesperadamente desde su celular.

¿QUÉ OBTIENE ${f.insurerName.toUpperCase()}?

1. Presencia en el momento de máxima receptividad — Nuestra plataforma incluye una sección de "Salud y Seguridad" que el visitante consulta antes y durante su viaje. Cuando busque "seguro médico para turistas en México" o "hospital cerca de mí", ${f.insurerName} aparece como la solución verificada.

2. Contratación directa desde la app — Integración con su sistema de cotización para que el visitante pueda contratar ${f.coverageType} en menos de 3 minutos, directamente desde la plataforma. Sin intermediarios, sin fricciones.

3. Notificaciones preventivas geolocalizadas — "Vas al partido en el Estadio Azteca mañana. ¿Ya tienes cobertura médica? ${f.insurerName} te protege desde $X USD/día." Mensajes que convierten porque llegan en el contexto exacto de necesidad.

4. Contenido educativo patrocinado — Guías como "Lo que todo turista debe saber sobre salud en México", "5 emergencias médicas comunes en eventos masivos y cómo prevenirlas". Contenido que posiciona a ${f.insurerName} como experto y aliado, no como vendedor.

5. Red de hospitales y clínicas asociadas — Sección dentro de la app que muestra la red médica de ${f.insurerName} en las ciudades sede, con ubicación, especialidades y contacto directo. El asegurado sabe exactamente a dónde ir.

6. Base de datos de altísimo valor — Cada usuario que interactúa con la sección de salud es un lead calificado: viajero internacional, con capacidad de gasto, en situación de vulnerabilidad médica, dispuesto a pagar por tranquilidad. First-party data pura.

EL ARGUMENTO DIFERENCIADOR

A diferencia de una campaña digital tradicional donde ${f.insurerName} compite por atención contra miles de estímulos, aquí el usuario ESTÁ BUSCANDO activamente una solución de salud. No hay que convencerlo de que necesita un seguro — ya lo sabe. Solo hay que estar ahí cuando lo busca.

PROYECCIÓN DE IMPACTO

• Visitantes expuestos a la sección de Salud: +1,200,000 (el 24% de los usuarios consulta esta sección, según benchmarks de apps turísticas)
• Tasa de conversión estimada para microseguros de viaje: 3-5%
• Pólizas potenciales: +36,000 a +60,000 durante el evento
• Ticket promedio de seguro de viaje corto: $25-$80 USD

INVERSIÓN
${f.proposalDetails}

Solo una aseguradora por categoría (${f.coverageType}) tendrá posición preferencial en la plataforma. La exclusividad es el activo más valioso de esta alianza.

¿Agendamos una reunión con su equipo de productos y canales digitales?

Atentamente,
${f.sellerName} — Equipo Comercial`;
}

export default function PitchTemplatesPage() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template');
  const proposalParam = searchParams.get('proposal');

  const [activeTab, setActiveTab] = useState(templateParam || 'empresas');
  const [mode, setMode] = useState<'edit' | 'preview'>(proposalParam ? 'preview' : 'edit');
  const [copied, setCopied] = useState(false);

  const [empresasFields, setEmpresasFields] = useState<TemplateFields>({ ...defaultFields });
  const [gobiernoFields, setGobiernoFields] = useState<TemplateFields>({ ...defaultFields });
  const [restaurantesFields, setRestaurantesFields] = useState<TemplateFields>({ ...defaultFields });
  const [hoteleriaFields, setHoteleriaFields] = useState<TemplateFields>({ ...defaultFields });
  const [bancosFields, setBancosFields] = useState<TemplateFields>({ ...defaultFields });
  const [segurosFields, setSegurosFields] = useState<TemplateFields>({ ...defaultFields });

  // Auto-fill from proposal query params
  useEffect(() => {
    if (proposalParam && templateParam) {
      const clientName = searchParams.get('client') || '';
      const totalPrice = searchParams.get('total') || '';
      const proposalDetails = totalPrice
        ? `Inversión total: $${Number(totalPrice).toLocaleString('es-MX')} MXN (Se adjunta desglose de beneficios incluidos)`
        : '(Se adjunta propuesta personalizada generada en el calculador)';

      const tab = templateParam as keyof typeof setFieldsMap;
      if (setFieldsMap[tab]) {
        setFieldsMap[tab]((prev) => ({
          ...prev,
          clientName: clientName || prev.clientName,
          proposalDetails,
        }));
      }
    }
  }, [proposalParam, templateParam]);


  const fieldsMap = { empresas: empresasFields, gobierno: gobiernoFields, restaurantes: restaurantesFields, hoteleria: hoteleriaFields, bancos: bancosFields, seguros: segurosFields };
  const setFieldsMap = { empresas: setEmpresasFields, gobierno: setGobiernoFields, restaurantes: setRestaurantesFields, hoteleria: setHoteleriaFields, bancos: setBancosFields, seguros: setSegurosFields };
  const fields = fieldsMap[activeTab as keyof typeof fieldsMap];
  const setFields = setFieldsMap[activeTab as keyof typeof setFieldsMap];

  const renderMap: Record<string, (f: TemplateFields) => string> = {
    empresas: renderEmpresasTemplate,
    gobierno: renderGobiernoTemplate,
    restaurantes: renderRestaurantesTemplate,
    hoteleria: renderHoteleriaTemplate,
    bancos: renderBancosTemplate,
    seguros: renderSegurosTemplate,
  };
  const renderedText = renderMap[activeTab](fields);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(renderedText);
    setCopied(true);
    toast({ title: 'Copiado al portapapeles', description: 'Pega el texto en tu documento o email.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (key: keyof TemplateFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Plantillas Comerciales</h1>
        <p className="text-muted-foreground mt-1">
          Machotes editables para presentar la propuesta a empresas y gobierno/destinos.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-full max-w-3xl flex-wrap gap-1">
          <TabsTrigger value="empresas" className="gap-2">
            <Building2 className="h-4 w-4" />
            Empresas
          </TabsTrigger>
          <TabsTrigger value="gobierno" className="gap-2">
            <Landmark className="h-4 w-4" />
            Gobierno
          </TabsTrigger>
          <TabsTrigger value="restaurantes" className="gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Restaurantes
          </TabsTrigger>
          <TabsTrigger value="hoteleria" className="gap-2">
            <Hotel className="h-4 w-4" />
            Hotelería
          </TabsTrigger>
          <TabsTrigger value="bancos" className="gap-2">
            <Banknote className="h-4 w-4" />
            Bancos
          </TabsTrigger>
          <TabsTrigger value="seguros" className="gap-2">
            <ShieldPlus className="h-4 w-4" />
            Seguros
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fields panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Campos dinámicos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nombre del cliente</Label>
                  <Input
                    id="clientName"
                    value={fields.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    placeholder="Ej: Lic. Roberto García"
                  />
                </div>

                {activeTab === 'gobierno' && (
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad / Destino</Label>
                    <Input
                      id="city"
                      value={fields.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="Ej: Querétaro"
                    />
                  </div>
                )}

                {activeTab === 'restaurantes' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName">Nombre del restaurante</Label>
                      <Input
                        id="restaurantName"
                        value={fields.restaurantName}
                        onChange={(e) => updateField('restaurantName', e.target.value)}
                        placeholder="Ej: La Casa de Toño"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cuisineType">Tipo de cocina</Label>
                      <Input
                        id="cuisineType"
                        value={fields.cuisineType}
                        onChange={(e) => updateField('cuisineType', e.target.value)}
                        placeholder="Ej: cocina mexicana contemporánea"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        value={fields.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="Ej: CDMX"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'hoteleria' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="hotelName">Nombre del hotel</Label>
                      <Input
                        id="hotelName"
                        value={fields.hotelName}
                        onChange={(e) => updateField('hotelName', e.target.value)}
                        placeholder="Ej: Marriott Reforma"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotelType">Tipo de propiedad</Label>
                      <Input
                        id="hotelType"
                        value={fields.hotelType}
                        onChange={(e) => updateField('hotelType', e.target.value)}
                        placeholder="Ej: hotel boutique, resort, cadena"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad sede</Label>
                      <Input
                        id="city"
                        value={fields.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="Ej: Monterrey"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'bancos' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Nombre del banco</Label>
                      <Input
                        id="bankName"
                        value={fields.bankName}
                        onChange={(e) => updateField('bankName', e.target.value)}
                        placeholder="Ej: BBVA México"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institutionType">Tipo de institución</Label>
                      <Input
                        id="institutionType"
                        value={fields.institutionType}
                        onChange={(e) => updateField('institutionType', e.target.value)}
                        placeholder="Ej: banco comercial, fintech, casa de cambio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad sede</Label>
                      <Input
                        id="city"
                        value={fields.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="Ej: CDMX"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'seguros' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="insurerName">Nombre de la aseguradora</Label>
                      <Input
                        id="insurerName"
                        value={fields.insurerName}
                        onChange={(e) => updateField('insurerName', e.target.value)}
                        placeholder="Ej: GNP Seguros"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverageType">Tipo de cobertura</Label>
                      <Input
                        id="coverageType"
                        value={fields.coverageType}
                        onChange={(e) => updateField('coverageType', e.target.value)}
                        placeholder="Ej: gastos médicos mayores, seguro de viaje"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="sellerName">Nombre del vendedor</Label>
                  <Input
                    id="sellerName"
                    value={fields.sellerName}
                    onChange={(e) => updateField('sellerName', e.target.value)}
                    placeholder="Ej: Carlos Méndez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposalDetails">Detalle de propuesta / inversión</Label>
                  <Textarea
                    id="proposalDetails"
                    value={fields.proposalDetails}
                    onChange={(e) => updateField('proposalDetails', e.target.value)}
                    rows={3}
                    placeholder="Resumen de la propuesta o nota de referencia"
                  />
                </div>

                {activeTab === 'gobierno' && (
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Plazo (meses)</Label>
                    <Input
                      id="deadline"
                      value={fields.deadline}
                      onChange={(e) => updateField('deadline', e.target.value)}
                      placeholder="Ej: 3"
                    />
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFields({ ...defaultFields })}
                >
                  Restablecer campos
                </Button>
              </CardContent>
            </Card>

            {/* Preview panel */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  {{ empresas: 'Propuesta para Empresas', gobierno: 'Propuesta para Gobierno / Destinos', restaurantes: 'Propuesta para Restaurantes', hoteleria: 'Propuesta para Hotelería', bancos: 'Propuesta para Bancos', seguros: 'Propuesta para Seguros GMM' }[activeTab] as string}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-primary border-primary/30 hover:bg-primary/10"
                    onClick={() => {
                      const titles: Record<string, string> = { empresas: 'Empresas', gobierno: 'Gobierno-Destinos', restaurantes: 'Restaurantes', hoteleria: 'Hoteleria', bancos: 'Bancos', seguros: 'Seguros-GMM' };
                      exportTemplateToPDF(renderedText, titles[activeTab]);
                      toast({ title: 'PDF generado', description: 'El archivo se descargó automáticamente.' });
                    }}
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    Exportar PDF
                  </Button>
                  <Button
                    variant={mode === 'edit' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMode('edit')}
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant={mode === 'preview' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMode('preview')}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Vista previa
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mode === 'edit' ? (
                  <Textarea
                    className="min-h-[500px] font-mono text-sm leading-relaxed"
                    value={renderedText}
                    readOnly
                  />
                ) : (
                  <div className="prose prose-sm max-w-none bg-muted/30 rounded-lg p-6 min-h-[500px] whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {renderedText}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
