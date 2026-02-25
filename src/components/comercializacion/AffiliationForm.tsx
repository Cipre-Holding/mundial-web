import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, MapPin, CreditCard, Check, Upload, ArrowLeft, ArrowRight } from "lucide-react";

interface AffiliationFormProps {
  selectedPlan: string;
  onBack: () => void;
}

const AffiliationForm = ({ selectedPlan, onBack }: AffiliationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Business Info
    businessName: "",
    legalName: "",
    rfc: "",
    category: "",
    subcategory: "",
    description: "",
    // Step 2 - Documentation
    fiscalDoc: null as File | null,
    licenseDoc: null as File | null,
    photos: [] as File[],
    logo: null as File | null,
    // Step 3 - Location
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    // Step 4 - Confirmation
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const steps = [
    { number: 1, title: "Información del Negocio", icon: Building2 },
    { number: 2, title: "Documentación", icon: FileText },
    { number: 3, title: "Ubicación y Contacto", icon: MapPin },
    { number: 4, title: "Confirmación y Pago", icon: CreditCard },
  ];

  const planNames: Record<string, string> = {
    participante: "Plan Participante - $4,000 MXN",
    destacado: "Plan Destacado - $75,000 MXN",
    elite: "Plan Élite Mundial - $150,000 MXN",
  };

  const categories = [
    { value: "restaurante", label: "Restaurante y Gastronomía" },
    { value: "entretenimiento", label: "Entretenimiento y Ocio" },
    { value: "retail", label: "Retail y Comercio" },
  ];

  const subcategories: Record<string, { value: string; label: string }[]> = {
    restaurante: [
      { value: "mexicana", label: "Comida Mexicana" },
      { value: "internacional", label: "Cocina Internacional" },
      { value: "bar", label: "Bar / Cantina" },
      { value: "cafeteria", label: "Cafetería" },
      { value: "fastfood", label: "Comida Rápida" },
    ],
    entretenimiento: [
      { value: "club", label: "Club / Discoteca" },
      { value: "cine", label: "Cine / Teatro" },
      { value: "museo", label: "Museo / Galería" },
      { value: "parque", label: "Parque / Atracción" },
      { value: "deportes", label: "Deportes / Gym" },
    ],
    retail: [
      { value: "ropa", label: "Ropa y Moda" },
      { value: "souvenirs", label: "Souvenirs" },
      { value: "electronica", label: "Electrónica" },
      { value: "artesanias", label: "Artesanías" },
      { value: "otros", label: "Otros" },
    ],
  };

  const cities = [
    { value: "cdmx", label: "Ciudad de México" },
    { value: "guadalajara", label: "Guadalajara" },
    { value: "monterrey", label: "Monterrey" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (!files) return;
    if (field === "photos") {
      setFormData((prev) => ({ ...prev, photos: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: files[0] }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("¡Solicitud enviada! Pronto nos pondremos en contacto contigo.");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nombre Comercial *</Label>
                <Input
                  id="businessName"
                  placeholder="Ej: Restaurante El Mexicano"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalName">Razón Social *</Label>
                <Input
                  id="legalName"
                  placeholder="Ej: El Mexicano S.A. de C.V."
                  value={formData.legalName}
                  onChange={(e) => handleInputChange("legalName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rfc">RFC *</Label>
              <Input
                id="rfc"
                placeholder="Ej: EMX123456ABC"
                value={formData.rfc}
                onChange={(e) => handleInputChange("rfc", e.target.value.toUpperCase())}
                maxLength={13}
              />
              <p className="text-xs text-muted-foreground">
                El RFC es necesario para la facturación
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    handleInputChange("category", value);
                    handleInputChange("subcategory", "");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategoría *</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(value) => handleInputChange("subcategory", value)}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category &&
                      subcategories[formData.category]?.map((sub) => (
                        <SelectItem key={sub.value} value={sub.value}>
                          {sub.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Negocio *</Label>
              <Textarea
                id="description"
                placeholder="Describe tu negocio, qué ofreces, qué te hace especial..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Máximo 500 caracteres. Esta descripción aparecerá en tu perfil.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Los documentos serán revisados por nuestro equipo para validar tu negocio. 
                Formatos aceptados: PDF, JPG, PNG. Máximo 5MB por archivo.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalDoc">Constancia de Situación Fiscal *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra tu archivo aquí o haz clic para seleccionar
                </p>
                <Input
                  id="fiscalDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange("fiscalDoc", e.target.files)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("fiscalDoc")?.click()}
                >
                  Seleccionar Archivo
                </Button>
                {formData.fiscalDoc && (
                  <p className="text-sm text-primary mt-2">
                    ✓ {formData.fiscalDoc.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseDoc">Licencia de Funcionamiento (Opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra tu archivo aquí o haz clic para seleccionar
                </p>
                <Input
                  id="licenseDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange("licenseDoc", e.target.files)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("licenseDoc")?.click()}
                >
                  Seleccionar Archivo
                </Button>
                {formData.licenseDoc && (
                  <p className="text-sm text-primary mt-2">
                    ✓ {formData.licenseDoc.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo del Negocio *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="logo"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileChange("logo", e.target.files)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("logo")?.click()}
                  >
                    Subir Logo
                  </Button>
                  {formData.logo && (
                    <p className="text-sm text-primary mt-2">
                      ✓ {formData.logo.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos">Fotos del Establecimiento * (mín. 3)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="photos"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange("photos", e.target.files)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("photos")?.click()}
                  >
                    Subir Fotos
                  </Button>
                  {formData.photos.length > 0 && (
                    <p className="text-sm text-primary mt-2">
                      ✓ {formData.photos.length} fotos seleccionadas
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección Completa *</Label>
              <Textarea
                id="address"
                placeholder="Calle, número, colonia..."
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad Sede *</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange("city", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal *</Label>
                <Input
                  id="postalCode"
                  placeholder="Ej: 06600"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  maxLength={5}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono de Contacto *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ej: 55 1234 5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Empresarial *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@tunegocio.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web (Opcional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.tunegocio.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram (Opcional)</Label>
                <Input
                  id="instagram"
                  placeholder="@tunegocio"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook (Opcional)</Label>
                <Input
                  id="facebook"
                  placeholder="facebook.com/tunegocio"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Resumen de tu Solicitud</CardTitle>
                <CardDescription>Revisa la información antes de continuar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Negocio:</span>
                    <p className="font-medium">{formData.businessName || "No especificado"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RFC:</span>
                    <p className="font-medium">{formData.rfc || "No especificado"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Categoría:</span>
                    <p className="font-medium capitalize">{formData.category || "No especificada"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ciudad:</span>
                    <p className="font-medium">
                      {cities.find((c) => c.value === formData.city)?.label || "No especificada"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{formData.email || "No especificado"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span>
                    <p className="font-medium">{formData.phone || "No especificado"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-orange border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-accent-foreground/80">Plan Seleccionado</p>
                    <p className="text-xl font-bold text-accent-foreground">
                      {planNames[selectedPlan]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-accent-foreground/80">Pago Único</p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {selectedPlan === "participante" && "$4,000"}
                      {selectedPlan === "destacado" && "$75,000"}
                      {selectedPlan === "elite" && "$150,000"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <a href="#" className="text-primary underline">
                    Términos y Condiciones
                  </a>{" "}
                  del servicio y las políticas de cancelación.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked as boolean)}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed cursor-pointer">
                  Acepto el{" "}
                  <a href="#" className="text-primary underline">
                    Aviso de Privacidad
                  </a>{" "}
                  y autorizo el tratamiento de mis datos.
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="formulario" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" className="mb-8" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Regresar
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Formulario de Afiliación
          </h2>
          <p className="text-muted-foreground">
            Completa el formulario para registrar tu negocio en la plataforma
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`text-xs mt-2 hidden md:block ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-24 h-1 mx-2 rounded ${
                      isCompleted ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form content */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              Paso {currentStep} de {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep}>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms || !formData.acceptPrivacy}
                >
                  Proceder al Pago
                  <CreditCard className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AffiliationForm;
