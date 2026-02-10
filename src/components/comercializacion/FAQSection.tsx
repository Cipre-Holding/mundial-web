import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqs = [
    {
      question: "¿Cuánto tiempo estará activo mi perfil?",
      answer:
        "Tu perfil estará activo desde el momento de la aprobación hasta 1 mes después de que finalice el Mundial 2026. Esto incluye todo el período de afluencia turística antes, durante y después del evento.",
    },
    {
      question: "¿Qué documentos necesito para registrarme?",
      answer:
        "Necesitas tu Constancia de Situación Fiscal actualizada (máximo 3 meses de antigüedad), logo en alta resolución y al menos 3 fotos de tu establecimiento. La licencia de funcionamiento es opcional pero recomendada.",
    },
    {
      question: "¿Puedo cambiar de plan después de registrarme?",
      answer:
        "Sí, puedes hacer upgrade a un plan superior en cualquier momento pagando únicamente la diferencia. No hay downgrades disponibles una vez seleccionado un plan.",
    },
    {
      question: "¿Cómo funciona el pago?",
      answer:
        "Es un pago único por toda la temporada. Aceptamos tarjetas de crédito/débito y transferencia bancaria. Emitimos factura fiscal automáticamente.",
    },
    {
      question: "¿Cuánto tiempo tarda la aprobación de mi solicitud?",
      answer:
        "El proceso de verificación toma entre 24 y 72 horas hábiles. Te notificaremos por email una vez que tu perfil esté activo o si necesitamos información adicional.",
    },
    {
      question: "¿Puedo publicar ofertas y promociones?",
      answer:
        "Sí, los planes Destacado y Élite incluyen la posibilidad de publicar ofertas, cupones y promociones especiales para atraer más clientes durante el Mundial.",
    },
    {
      question: "¿Qué pasa si no estoy satisfecho?",
      answer:
        "Ofrecemos garantía de satisfacción de 30 días. Si no estás contento con el servicio en los primeros 30 días, te devolvemos el 80% de tu pago.",
    },
    {
      question: "¿Tienen soporte técnico?",
      answer:
        "Todos los planes incluyen soporte por email. El plan Élite incluye además un gerente de cuenta dedicado y soporte prioritario por WhatsApp.",
    },
  ];

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Header siempre visible */}
          <div className="text-center mb-8">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Aquí respondemos las preguntas más comunes de nuestros afiliados
            </p>

            {/* Botón para expandir/colapsar */}
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-primary/30 hover:bg-primary/10 transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4" />
                {isOpen ? "Ocultar preguntas" : "Ver preguntas frecuentes"}
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Contenido colapsable */}
          <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                ¿No encontraste tu respuesta?
              </p>
              <a
                href="mailto:soporte@mundial2026mx.com"
                className="text-primary font-medium hover:underline"
              >
                Contáctanos →
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default FAQSection;
