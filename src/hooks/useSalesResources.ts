/**
 * @fileoverview Hooks para la biblioteca de recursos de ventas (storage + DB).
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

/** Recurso de ventas: archivo subido con título, categoría y metadata. */
export interface SalesResource {
  id: string;
  title: string;
  description: string;
  category: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

const BUCKET = 'sales-materials';

/** Lista de recursos de ventas ordenados por fecha. */
export function useSalesResources() {
  return useQuery({
    queryKey: ['sales-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_resources')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as SalesResource[];
    },
  });
}

/** Mutación para subir un archivo a storage y registrar en DB. */
export function useUploadResource() {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ file, title, description, category }: {
      file: File;
      title: string;
      description: string;
      category: string;
    }) => {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('sales_resources')
        .insert({
          title,
          description,
          category,
          file_name: file.name,
          file_path: path,
          file_size: file.size,
          file_type: file.type,
          uploaded_by: user!.id,
        });
      if (dbError) throw dbError;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales-resources'] }),
  });
}

/** Mutación para eliminar un recurso (storage + DB). */
export function useDeleteResource() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (resource: SalesResource) => {
      await supabase.storage.from(BUCKET).remove([resource.file_path]);
      const { error } = await supabase
        .from('sales_resources')
        .delete()
        .eq('id', resource.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales-resources'] }),
  });
}

/**
 * Obtiene una URL firmada para descargar un recurso (válida 1h).
 *
 * @param filePath - Ruta del archivo en el bucket sales-materials
 * @returns URL firmada para descarga
 */
export async function getResourceSignedUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 3600);
  if (error) throw error;
  return data.signedUrl;
}
