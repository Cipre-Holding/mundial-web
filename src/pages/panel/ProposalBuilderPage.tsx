import { useState, useMemo } from 'react';
import { useBenefits, useBenefitCategories, BenefitWithCategory } from '@/hooks/useBenefits';
import {
  useProposals,
  useCreateProposal,
  useUpdateProposal,
  useDeleteProposal,
  useProposalItems,
  useSaveProposalItems,
  TEMPLATE_TYPES,
  TemplateType,
} from '@/hooks/useProposals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Loader2, Plus, Minus, Save, Trash2, FileText, Calculator,
  Smartphone, MapPin, Star, Video, BarChart3, Package, Check,
  Building2, Landmark, UtensilsCrossed, Banknote, ShieldPlus, FileDown, Hotel,
} from 'lucide-react';


const templateIconMap: Record<string, React.ElementType> = {
  Building2, Landmark, UtensilsCrossed, Banknote, ShieldPlus, Hotel,
};

const benefitIconMap: Record<string, React.ElementType> = {
  Smartphone, MapPin, Star, Video, BarChart3, Package,
};

interface SelectedItem {
  benefit_id: string;
  quantity: number;
  unit_price: number;
}

export default function ProposalBuilderPage() {
  const { data: categories, isLoading: loadingCats } = useBenefitCategories();
  const { data: benefits, isLoading: loadingBenefits } = useBenefits();
  const { data: proposals, isLoading: loadingProposals } = useProposals();
  const createProposal = useCreateProposal();
  const updateProposal = useUpdateProposal();
  const deleteProposal = useDeleteProposal();
  const saveItems = useSaveProposalItems();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeProposalId, setActiveProposalId] = useState<string | null>(null);
  const { data: existingItems } = useProposalItems(activeProposalId);
  const [selected, setSelected] = useState<Record<string, SelectedItem>>({});
  const [proposalName, setProposalName] = useState('');
  const [clientName, setClientName] = useState('');
  const [templateType, setTemplateType] = useState<TemplateType>('empresas');
  const [showList, setShowList] = useState(true);

  // Load existing items when selecting a proposal
  const loadProposal = (proposal: any) => {
    setActiveProposalId(proposal.id);
    setProposalName(proposal.name);
    setClientName(proposal.client_name || '');
    setTemplateType(proposal.template_type || 'empresas');
    setShowList(false);
  };

  // Sync existing items into selected state
  useMemo(() => {
    if (existingItems && existingItems.length > 0 && activeProposalId) {
      const sel: Record<string, SelectedItem> = {};
      existingItems.forEach(item => {
        sel[item.benefit_id] = {
          benefit_id: item.benefit_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        };
      });
      setSelected(sel);
    }
  }, [existingItems, activeProposalId]);

  const toggleBenefit = (benefit: BenefitWithCategory) => {
    setSelected(prev => {
      const next = { ...prev };
      if (next[benefit.id]) {
        delete next[benefit.id];
      } else {
        next[benefit.id] = {
          benefit_id: benefit.id,
          quantity: 1,
          unit_price: benefit.unit_price,
        };
      }
      return next;
    });
  };

  const updateQuantity = (benefitId: string, delta: number) => {
    setSelected(prev => {
      const item = prev[benefitId];
      if (!item) return prev;
      const newQty = Math.max(1, item.quantity + delta);
      return { ...prev, [benefitId]: { ...item, quantity: newQty } };
    });
  };

  const total = useMemo(() =>
    Object.values(selected).reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
    [selected]
  );

  const selectedCount = Object.keys(selected).length;

  const handleNewProposal = () => {
    setActiveProposalId(null);
    setSelected({});
    setProposalName('');
    setClientName('');
    setTemplateType('empresas');
    setShowList(false);
  };

  const handleSave = async () => {
    if (!proposalName.trim()) {
      toast({ title: 'Ponle nombre a la propuesta', variant: 'destructive' });
      return;
    }

    try {
      let proposalId = activeProposalId;

      if (!proposalId) {
        const proposal = await createProposal.mutateAsync({
          name: proposalName,
          client_name: clientName,
          template_type: templateType,
        });
        proposalId = proposal.id;
        setActiveProposalId(proposalId);
      } else {
        await updateProposal.mutateAsync({
          id: proposalId,
          name: proposalName,
          client_name: clientName,
          template_type: templateType,
        });
      }

      const items = Object.values(selected).map(item => ({
        benefit_id: item.benefit_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.unit_price * item.quantity,
      }));

      await saveItems.mutateAsync({ proposalId, items });

      toast({ title: 'Propuesta guardada' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProposal.mutateAsync(id);
      if (activeProposalId === id) {
        setActiveProposalId(null);
        setSelected({});
        setShowList(true);
      }
      toast({ title: 'Propuesta eliminada' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  if (loadingCats || loadingBenefits || loadingProposals) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Proposals list view
  if (showList) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Propuestas</h1>
            <p className="text-muted-foreground mt-1">Calcula y guarda combinaciones de beneficios para tus clientes</p>
          </div>
          <Button onClick={handleNewProposal} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Propuesta
          </Button>
        </div>

        {proposals && proposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals.map((p) => (
              <Card
                key={p.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border"
                onClick={() => loadProposal(p)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">{p.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {p.client_name && (
                    <p className="text-sm text-muted-foreground mb-1">Cliente: {p.client_name}</p>
                  )}
                  <Badge variant="outline" className="text-xs mb-2">
                    {TEMPLATE_TYPES.find(t => t.value === (p as any).template_type)?.label || 'Empresas'}
                  </Badge>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      ${p.total_price.toLocaleString('es-MX')}
                    </span>
                    <Badge variant={p.status === 'borrador' ? 'secondary' : 'default'}>
                      {p.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(p.updated_at).toLocaleDateString('es-MX')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Calculator className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No tienes propuestas aún</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Crea tu primera propuesta combinando beneficios
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Builder view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setShowList(true)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-1 block"
          >
            ← Volver a propuestas
          </button>
          <h1 className="text-3xl font-bold text-foreground">
            {activeProposalId ? 'Editar Propuesta' : 'Nueva Propuesta'}
          </h1>
        </div>
      </div>

      {/* Proposal info */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre de la propuesta</label>
              <Input
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                placeholder="Ej: Propuesta Coca-Cola — Paquete Premium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Cliente</label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Coca-Cola México"
              />
            </div>
          </div>

          {/* Template Type Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tipo de plantilla</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TEMPLATE_TYPES.map((t) => {
                const TIcon = templateIconMap[t.icon] || Building2;
                const isActive = templateType === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => setTemplateType(t.value)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <TIcon className="h-4 w-4 shrink-0" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              La plantilla se usará para generar el pitch automáticamente al guardar
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Benefit selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {categories?.map((cat) => {
            const Icon = benefitIconMap[cat.icon] || Package;
            const catBenefits = benefits?.filter(b => b.category_id === cat.id) || [];

            return (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {catBenefits.map((benefit) => {
                    const isSelected = !!selected[benefit.id];
                    return (
                      <Card
                        key={benefit.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-primary bg-primary/5 border-primary/30'
                            : 'hover:shadow-md hover:-translate-y-0.5 border'
                        }`}
                        onClick={() => toggleBenefit(benefit)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-primary-foreground" />
                                  </div>
                                )}
                                <p className="font-medium text-sm text-foreground truncate">{benefit.name}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-foreground">
                                ${benefit.unit_price.toLocaleString('es-MX')}
                              </p>
                              <p className="text-xs text-muted-foreground">/ {benefit.unit_label}</p>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border" onClick={e => e.stopPropagation()}>
                              <span className="text-xs text-muted-foreground">Cantidad:</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateQuantity(benefit.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm font-semibold w-6 text-center text-foreground">
                                  {selected[benefit.id]?.quantity || 1}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateQuantity(benefit.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="text-sm font-bold text-foreground ml-auto">
                                ${((selected[benefit.id]?.quantity || 1) * benefit.unit_price).toLocaleString('es-MX')}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Resumen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Object.entries(selected).map(([benefitId, item]) => {
                    const benefit = benefits?.find(b => b.id === benefitId);
                    if (!benefit) return null;
                    return (
                      <div key={benefitId} className="flex items-center justify-between text-sm">
                        <span className="text-foreground truncate mr-2">
                          {benefit.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-foreground shrink-0">
                          ${(item.unit_price * item.quantity).toLocaleString('es-MX')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {selectedCount === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Selecciona beneficios del catálogo
                  </p>
                )}

                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toLocaleString('es-MX')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedCount} beneficio{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
                  </p>
                </div>

                <Button
                  className="w-full gap-2"
                  onClick={handleSave}
                  disabled={selectedCount === 0 || saveItems.isPending || createProposal.isPending}
                >
                  {(saveItems.isPending || createProposal.isPending) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Guardar Propuesta
                </Button>

                {activeProposalId && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => navigate(`/panel/presentaciones?proposal=${activeProposalId}&template=${templateType}&client=${encodeURIComponent(clientName)}&total=${total}`)}
                  >
                    <FileDown className="h-4 w-4" />
                    Generar Pitch
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
