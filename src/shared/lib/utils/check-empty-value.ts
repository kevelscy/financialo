/**
 * Sanitiza un valor reemplazando casos "vacíos" con un valor personalizado
 * @template T - Tipo del valor de entrada
 * @param {T | null | undefined} value - Valor a sanitizar
 * @param {string} [fallback='-'] - Valor alternativo a devolver
 * @returns {T | string} El valor original o el fallback si es:
 * - null/undefined
 * - string vacío
 * - objeto vacío ({})
 * 
 * @example
 * // Casos básicos
 * checkEmptyValue("", '--');            // Retorna: '--'
 * checkEmptyValue(null, 'Sin dato');    // Retorna: 'Sin dato'
 * 
 * @example
 * // Usando valores personalizados
 * checkEmptyValue({}, 'No disponible'); // Retorna: 'No disponible'
 * checkEmptyValue(0, 'Cero');           // Retorna: 0 (no aplica reemplazo)
 */
export const checkEmptyValue = <T>(
  value: T | null | undefined,
  fallback: string = '-'
): T | string => {
  // Casos primarios: null/undefined
  if (value === null || value === undefined) return fallback;

  // String vacío
  if (typeof value === 'string' && value.trim() === '') return fallback;

  // Objeto vacío (solo para objetos planos)
  if (typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0) {
    return fallback;
  }

  return value;
};