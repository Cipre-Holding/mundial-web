import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma segura, resolviendo conflictos.
 * Usa clsx para unir strings condicionales y twMerge para sobrescribir clases conflictivas.
 *
 * @param inputs - Clases CSS (strings, objetos, arrays, condicionales)
 * @returns String de clases CSS combinadas y sin conflictos
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
