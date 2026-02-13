import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus, Search, Loader2, Building2, Phone, Mail, User, MapPin, SlidersHorizontal,
  Trash2, Edit3, ChevronRight, Filter,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  useProspects, useCreateProspect, useUpdateProspect, useDeleteProspect,
  Prospect, SECTORS, PIPELINE_STAGES, CITIES,
} from '@/hooks/useProspects';

function getSectorLabel(v: string) { return SECTORS.find(s => s.value === v)?.label ?? v; }
function getStage(v: string) { return PIPELINE_STAGES.find(s => s.value === v) ?? PIPELINE_STAGES[0]; }

function ProspectForm({
  initial, onSubmit, onCancel, isPending,
}: {
  initial?: Partial<Prospect>;
  onSubmit: (data: Partial<Prospect>) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState({
    company_name: initial?.company_name ?? '',
    contact_name: initial?.contact_name ?? '',
    contact_email: initial?.contact_email ?? '',
    contact_phone: initial?.contact_phone ?? '',
    contact_role: initial?.contact_role ?? '',
    sector: initial?.sector ?? 'general',
    city: initial?.city ?? 'CDMX',
    status: initial?.status ?? 'identificado',
    notes: initial?.notes ?? '',
  });

  const update = (key: string, value: string) => setForm(p => ({ ...p, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-2">
          <Label>Empresa *</Label>
          <Input value={form.company_name} onChange={e => update('company_name', e.target.value)} placeholder="Ej: BBVA México" />
        </div>
        <div className="space-y-2">
          <Label>Contacto</Label>
          <Input value={form.contact_name} onChange={e => update('contact_name', e.target.value)} placeholder="Nombre del contacto" />
        </div>
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input value={form.contact_role} onChange={e => update('contact_role', e.target.value)} placeholder="Dir. Marketing" />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={form.contact_email} onChange={e => update('contact_email', e.target.value)} placeholder="email@empresa.com" />
        </div>
        <div className="space-y-2">
          <Label>Teléfono</Label>
          <Input value={form.contact_phone} onChange={e => update('contact_phone', e.target.value)} placeholder="+52 55 1234 5678" />
        </div>
        <div className="space-y-2">
          <Label>Sector</Label>
          <Select value={form.sector} onValueChange={v => update('sector', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SECTORS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Ciudad</Label>
          <Select value={form.city} onValueChange={v => update('city', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CITIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Estado en pipeline</Label>
          <Select value={form.status} onValueChange={v => update('status', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PIPELINE_STAGES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Notas</Label>
          <Textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={3} placeholder="Notas internas sobre el prospecto..." />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button disabled={!form.company_name.trim() || isPending} onClick={() => onSubmit(form)}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {initial ? 'Guardar cambios' : 'Agregar prospecto'}
        </Button>
      </div>
    </div>
  );
}

export default function ProspectsPage() {
  const { toast } = useToast();
  const { data: prospects = [], isLoading } = useProspects();
  const createMutation = useCreateProspect();
  const updateMutation = useUpdateProspect();
  const deleteMutation = useDeleteProspect();

  const [showForm, setShowForm] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');

  const filtered = prospects.filter(p => {
    const matchesSearch = !searchQuery ||
      p.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contact_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === 'all' || p.sector === filterSector;
    const matchesCity = filterCity === 'all' || p.city === filterCity;
    return matchesSearch && matchesSector && matchesCity;
  });

  const handleCreate = async (data: Partial<Prospect>) => {
    try {
      await createMutation.mutateAsync(data);
      toast({ title: 'Prospecto agregado', description: `${data.company_name} fue agregado al directorio.` });
      setShowForm(false);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: Partial<Prospect>) => {
    if (!editingProspect) return;
    try {
      await updateMutation.mutateAsync({ id: editingProspect.id, ...data });
      toast({ title: 'Actualizado', description: `${data.company_name} fue actualizado.` });
      setEditingProspect(null);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (prospect: Prospect) => {
    try {
      await deleteMutation.mutateAsync(prospect.id);
      toast({ title: 'Eliminado', description: `${prospect.company_name} fue eliminado.` });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleStatusChange = async (prospect: Prospect, newStatus: string) => {
    try {
      await updateMutation.mutateAsync({
        id: prospect.id,
        status: newStatus,
        last_contact_at: new Date().toISOString(),
      });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prospectos</h1>
          <p className="text-muted-foreground mt-1">
            Directorio de empresas y pipeline de ventas • {prospects.length} prospectos
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Nuevo prospecto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar empresa o contacto..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterSector} onValueChange={setFilterSector}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los sectores</SelectItem>
            {SECTORS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterCity} onValueChange={setFilterCity}>
          <SelectTrigger className="w-[150px]">
            <MapPin className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Ciudad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {CITIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-1 ml-auto">
          <Button
            variant={viewMode === 'pipeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('pipeline')}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
            Pipeline
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Building2 className="h-3.5 w-3.5 mr-1" />
            Lista
          </Button>
        </div>
      </div>

      {/* Pipeline view */}
      {viewMode === 'pipeline' ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {PIPELINE_STAGES.map(stage => {
              const stageProspects = filtered.filter(p => p.status === stage.value);
              return (
                <div key={stage.value} className="w-[260px] shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                    <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
                    <span className="text-xs text-muted-foreground ml-auto">{stageProspects.length}</span>
                  </div>
                  <div className="space-y-2">
                    {stageProspects.map(prospect => (
                      <Card key={prospect.id} className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => setEditingProspect(prospect)}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-sm text-foreground leading-tight">{prospect.company_name}</h4>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                          </div>
                          {prospect.contact_name && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <User className="h-3 w-3" /> {prospect.contact_name}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{getSectorLabel(prospect.sector)}</Badge>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                              <MapPin className="h-2.5 w-2.5" /> {prospect.city}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {stageProspects.length === 0 && (
                      <div className="border border-dashed border-border rounded-lg p-4 text-center">
                        <p className="text-xs text-muted-foreground">Sin prospectos</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay prospectos que coincidan con los filtros.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map(prospect => {
              const stage = getStage(prospect.status);
              return (
                <Card key={prospect.id} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => setEditingProspect(prospect)}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${stage.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground">{prospect.company_name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{getSectorLabel(prospect.sector)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        {prospect.contact_name && (
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {prospect.contact_name}</span>
                        )}
                        {prospect.contact_email && (
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {prospect.contact_email}</span>
                        )}
                        {prospect.contact_phone && (
                          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {prospect.contact_phone}</span>
                        )}
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {prospect.city}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">{stage.label}</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Create dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo prospecto</DialogTitle>
          </DialogHeader>
          <ProspectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} isPending={createMutation.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editingProspect} onOpenChange={open => !open && setEditingProspect(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Editar: {editingProspect?.company_name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (editingProspect) {
                    handleDelete(editingProspect);
                    setEditingProspect(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {editingProspect && (
            <>
              {/* Quick status change */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-border">
                {PIPELINE_STAGES.map(stage => (
                  <button
                    key={stage.value}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                      editingProspect.status === stage.value
                        ? `${stage.color} text-white`
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => {
                      handleStatusChange(editingProspect, stage.value);
                      setEditingProspect({ ...editingProspect, status: stage.value });
                    }}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
              <ProspectForm
                initial={editingProspect}
                onSubmit={handleUpdate}
                onCancel={() => setEditingProspect(null)}
                isPending={updateMutation.isPending}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
