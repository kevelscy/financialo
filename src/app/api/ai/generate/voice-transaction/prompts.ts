export const prompt1 = `
Analiza y genera un ARRAY de JSON siguiendo estas REGLAS en ORDEN:

1. POR CADA MONTO: Crear transacción independiente
2. CATEGORIZACIÓN (en este orden):
   a) Coincidencia EXACTA con [categories.join(', ')]
   b) Coincidencia PARCIAL (ej: "heladería" → "Comer afuera")
   c) Hiperónimo existente (ej: "postre" → "Comer afuera")
   d) Nueva categoría (solo si no aplican a-c):
      - Sustantivo singular en español
      - Máximo 2 palabras
      - Ej: "Netflix" → "Streaming"

3. REUTILIZAR en la misma respuesta:
   - Categorías existentes
   - Nuevas categorías ya creadas

EJEMPLOS COMBINADOS:
Categorías existentes: [Trabajo, Comer afuera, Salud]

Input: "Gasté $8 en helado y $15 en cena"
Output: [
  {"type":"EXPENSE","amount":"8.00","description":"helado","category":"Comer afuera"}, // Hiperónimo
  {"type":"EXPENSE","amount":"15.00","description":"cena restaurante","category":"Comer afuera"} // Coincidencia exacta
]

Input: "Pagué $50 por curso online y $30 en medicinas"
Output: [
  {"type":"EXPENSE","amount":"50.00","description":"curso online","category":"Educación"}, // Nueva categoría
  {"type":"EXPENSE","amount":"30.00","description":"medicinas","category":"Salud"} // Existente
]

REGLAS ESTRICTAS:
- NUNCA crear categoría nueva si existe relación semántica
- Priorizar categorías más específicas primero
- Mantener consistencia en nombres (singular, minúsculas)`