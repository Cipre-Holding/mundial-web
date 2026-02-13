import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Upload, Download, Trash2, FileVideo, FileText, FileImage, File, Loader2,
  ChevronDown, Presentation, BarChart3, Image, Palette, BookOpen, TrendingUp, Smartphone,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSalesResources, useUploadResource, useDeleteResource, getResourceSignedUrl, SalesResource } from '@/hooks/useSalesResources';

const DRAWERS = [
  {
    id: 'video',
    label: 'Video Promocional',
    description: 'Videos de pitch, demos de la app y testimoniales',
    icon: FileVideo,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 'presentacion-empresas',
    label: 'Presentación Empresas',
    description: 'Decks y materiales para prospectos corporativos',
    icon: Presentation,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'presentacion-gobierno',
    label: 'Presentación Gobierno',
    description: 'Materiales para dependencias y destinos turísticos',
    icon: BookOpen,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'presentacion-generica',
    label: 'Presentación Genérica',
    description: 'Deck general adaptable a cualquier prospecto',
    icon: FileText,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'one-pager',
    label: 'One-Pagers / Fichas Técnicas',
    description: 'Resúmenes de una página por producto o paquete',
    icon: File,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'mockups',
    label: 'Mockups de Marca en App',
    description: 'Capturas y simulaciones de cómo se ve el patrocinador dentro de la app',
    icon: Smartphone,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    id: 'infografias',
    label: 'Infografías y Datos',
    description: 'Estadísticas del Mundial, proyecciones de audiencia, benchmarks',
    icon: BarChart3,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 'media-kit',
    label: 'Media Kit / Identidad',
    description: 'Logos, paleta de colores, assets de marca de la plataforma',
    icon: Palette,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    id: 'casos-exito',
    label: 'Casos de Éxito',
    description: 'Testimoniales, métricas de campañas anteriores, social proof',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'imagenes',
    label: 'Banco de Imágenes',
    description: 'Fotos de estadios, fan zones, ciudades sede y eventos',
    icon: Image,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function FileIcon({ fileType }: { fileType: string }) {
  if (fileType.startsWith('video/')) return <FileVideo className="h-4 w-4 text-muted-foreground" />;
  if (fileType.startsWith('image/')) return <FileImage className="h-4 w-4 text-muted-foreground" />;
  if (fileType.includes('pdf')) return <FileText className="h-4 w-4 text-muted-foreground" />;
  return <File className="h-4 w-4 text-muted-foreground" />;
}

export default function ResourceLibraryPage() {
  const { toast } = useToast();
  const { data: resources = [], isLoading } = useSalesResources();
  const uploadMutation = useUploadResource();
  const deleteMutation = useDeleteResource();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadDrawer, setUploadDrawer] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDrawers, setOpenDrawers] = useState<Set<string>>(new Set());

  const toggleDrawer = (id: string) => {
    setOpenDrawers(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getDrawerResources = (drawerId: string) =>
    resources.filter(r => r.category === drawerId);

  const handleUpload = async () => {
    if (!selectedFile || !title.trim() || !uploadDrawer) return;
    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        title,
        description,
        category: uploadDrawer,
      });
      toast({ title: 'Archivo subido', description: `${title} se agregó correctamente.` });
      setUploadDrawer(null);
      setTitle('');
      setDescription('');
      setSelectedFile(null);
    } catch (e: any) {
      toast({ title: 'Error al subir', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (resource: SalesResource) => {
    try {
      await deleteMutation.mutateAsync(resource);
      toast({ title: 'Eliminado', description: `${resource.title} fue eliminado.` });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDownload = async (resource: SalesResource) => {
    try {
      const url = await getResourceSignedUrl(resource.file_path);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.file_name;
      a.target = '_blank';
      a.click();
    } catch (e: any) {
      toast({ title: 'Error al descargar', description: e.message, variant: 'destructive' });
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Biblioteca de Recursos</h1>
        <p className="text-muted-foreground mt-1">
          Materiales organizados por tipo para el equipo de ventas. Haz clic en un cajón para ver o subir archivos.
        </p>
      </div>

      <div className="space-y-3">
        {DRAWERS.map(drawer => {
          const items = getDrawerResources(drawer.id);
          const isOpen = openDrawers.has(drawer.id);
          const Icon = drawer.icon;

          return (
            <Collapsible key={drawer.id} open={isOpen} onOpenChange={() => toggleDrawer(drawer.id)}>
              <Card className="overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left">
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${drawer.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${drawer.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground">{drawer.label}</h3>
                        {items.length > 0 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            {items.length} {items.length === 1 ? 'archivo' : 'archivos'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{drawer.description}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t border-border px-4 py-3 space-y-2">
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-2 text-center">
                        Sin archivos aún en este cajón.
                      </p>
                    ) : (
                      items.map(resource => (
                        <div
                          key={resource.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group"
                        >
                          <FileIcon fileType={resource.file_type} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.file_name} • {formatSize(resource.file_size)}
                            </p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => handleDownload(resource)}>
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive hover:text-destructive" onClick={() => handleDelete(resource)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 mt-1"
                      onClick={() => setUploadDrawer(drawer.id)}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Subir a {drawer.label}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {/* Upload dialog */}
      <Dialog open={!!uploadDrawer} onOpenChange={open => !open && setUploadDrawer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Subir a: {DRAWERS.find(d => d.id === uploadDrawer)?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Deck Q1 2026" />
            </div>
            <div className="space-y-2">
              <Label>Descripción (opcional)</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Breve descripción del recurso" />
            </div>
            <div className="space-y-2">
              <Label>Archivo</Label>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={e => setSelectedFile(e.target.files?.[0] ?? null)}
              />
              <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                {selectedFile ? selectedFile.name : 'Seleccionar archivo'}
              </Button>
              {selectedFile && (
                <p className="text-xs text-muted-foreground">{formatSize(selectedFile.size)}</p>
              )}
            </div>
            <Button
              className="w-full"
              disabled={!selectedFile || !title.trim() || uploadMutation.isPending}
              onClick={handleUpload}
            >
              {uploadMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
              {uploadMutation.isPending ? 'Subiendo...' : 'Subir'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
