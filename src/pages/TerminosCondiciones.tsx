import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">⚽</span>
              </div>
              <span className="text-xl font-bold">Vive México</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Términos y Condiciones
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          <p className="text-sm text-muted-foreground/70">
            Última actualización: Enero 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar la plataforma Vive México, usted acepta estar sujeto a estos 
              Términos y Condiciones, así como a todas las leyes y regulaciones aplicables. Si no 
              está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestros servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Descripción del Servicio</h2>
            <p>
              Vive México es una plataforma digital que conecta negocios mexicanos con turistas 
              que visitarán México durante la Copa Mundial FIFA 2026. Nuestros servicios incluyen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Listado de negocios en nuestra aplicación móvil y plataforma web</li>
              <li>Traducción automática de información comercial</li>
              <li>Sistema de geolocalización para turistas</li>
              <li>Herramientas de promoción y visibilidad</li>
              <li>Asistencia mediante inteligencia artificial (Goyo)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Planes de Afiliación</h2>
            <p>
              Ofrecemos diferentes planes de afiliación con distintos niveles de beneficios y precios. 
              Los detalles específicos de cada plan se encuentran disponibles en nuestra página principal.
            </p>
            <p>
              Los pagos son procesados de manera segura a través de proveedores de pago certificados. 
              Una vez realizado el pago, el negocio será dado de alta en la plataforma en un plazo 
              máximo de 48 horas hábiles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Obligaciones del Usuario</h2>
            <p>Al utilizar nuestros servicios, usted se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y actualizada sobre su negocio</li>
              <li>Mantener vigentes los permisos y licencias necesarios para operar</li>
              <li>No utilizar la plataforma para actividades ilegales o fraudulentas</li>
              <li>Respetar los derechos de propiedad intelectual de terceros</li>
              <li>Mantener actualizados sus datos de contacto</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de la plataforma, incluyendo pero no limitado a textos, gráficos, 
              logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de 
              datos, es propiedad de Vive México o de sus proveedores de contenido y está 
              protegido por las leyes mexicanas e internacionales de propiedad intelectual.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Limitación de Responsabilidad</h2>
            <p>
              Vive México no será responsable por daños indirectos, incidentales, especiales, 
              consecuentes o punitivos, incluyendo pérdida de beneficios, datos, uso, fondo de 
              comercio u otras pérdidas intangibles, resultantes de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>El uso o la imposibilidad de usar el servicio</li>
              <li>Cualquier conducta o contenido de terceros en el servicio</li>
              <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Política de Cancelación y Reembolsos</h2>
            <p>
              Las solicitudes de cancelación deben realizarse con al menos 30 días de anticipación 
              al inicio del evento (11 de junio de 2026). Los reembolsos se procesarán según las 
              siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancelación antes de 60 días del evento: reembolso del 80%</li>
              <li>Cancelación entre 30-60 días del evento: reembolso del 50%</li>
              <li>Cancelación con menos de 30 días: sin reembolso</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Modificaciones a los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las 
              modificaciones entrarán en vigor inmediatamente después de su publicación en la 
              plataforma. Es responsabilidad del usuario revisar periódicamente estos términos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Ley Aplicable y Jurisdicción</h2>
            <p>
              Estos términos se regirán e interpretarán de conformidad con las leyes de los 
              Estados Unidos Mexicanos. Cualquier controversia derivada de estos términos será 
              sometida a los tribunales competentes de la Ciudad de México, renunciando las 
              partes a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Contacto</h2>
            <p>
              Para cualquier pregunta sobre estos Términos y Condiciones, puede contactarnos en:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> legal@mundial2026mx.com</li>
              <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
              <li><strong>Dirección:</strong> Ciudad de México, México</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-background/50">
            © 2026 Vive México. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TerminosCondiciones;
