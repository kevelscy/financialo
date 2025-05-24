import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { NextResponse } from 'next/server'
import { generateText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
})

// Almacena categorías generadas durante la sesión
let dynamicCategories: string[] = []

function cleanJsonResponse(rawResponse: string) {
  return rawResponse
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/\\n/g, '')
    .replace(/\\"/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function validateTransaction(tx: any, allCategories: string[]) {
  const isValidType = ['INCOME', 'EXPENSE'].includes(tx.type)
  const isValidAmount = /^\d+\.\d{2}$/.test(tx.amount)
  const isValidCategory = allCategories.includes(tx.category)

  return isValidType && isValidAmount && isValidCategory
}

export async function POST(req: Request) {
  try {
    const { voiceText, categories }: { voiceText?: string; categories: string[] } = await req.json()

    if (!voiceText?.trim()) {
      return NextResponse.json(
        { error: 'voiceText is required and must be a string' },
        { status: 400 }
      )
    }

    // Combinar categorías existentes con dinámicas
    const allCategories = [...new Set([...categories, ...dynamicCategories])]

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: `Analiza y genera un ARRAY de JSON siguiendo estas REGLAS en ORDEN:

1. POR CADA MONTO: Crear transacción independiente
2. CATEGORIZACIÓN (en este orden):
   a) Coincidencia EXACTA con [${categories.join(', ')}] → Mantener nombre original
   b) Coincidencia PARCIAL → Usar categoría existente
   c) Hiperónimo existente → Usar categoría existente
   d) Nueva categoría (solo si no aplican a-c):
      - Formato: "Nombre 🎨" (nombre + 1 emoji relevante)
      - Ejemplos: 
         * "Fruta 🍎" 
         * "Streaming 📺"
         * "Mantenimiento 🔧"

3. REUTILIZAR en la misma respuesta:
   - Categorías existentes (sin emoji)
   - Nuevas categorías ya creadas (con emoji)

EJEMPLOS ACTUALIZADOS:
Categorías existentes: [Comer afuera, Trabajo]

Input: "Gasté $8 en helado"
Output: [
  {
    "type": "EXPENSE",
    "amount": "8.00",
    "description": "helado",
    "category": "Comer afuera" // Existente → sin emoji
  }
]

Input: "Pagué $50 por curso de piano"
Output: [
  {
    "type": "EXPENSE",
    "amount": "50.00",
    "description": "curso piano",
    "category": "Música 🎹" // Nueva → con emoji
  }
]

REGLAS ESTRICTAS:
- Emoji SOLO en nuevas categorías (paso 2d)
- 1 emoji máximo por categoría
- Usar emojis estándar (no banderas ni símbolos complejos)
- Nunca modificar categorías existentes
- Priorizar emojis de objetos > animales > símbolos`,
      messages: [
        {
          role: 'user',
          content: `Texto a analizar: "${voiceText.trim()}"`
        }
      ]
    })

    // Limpiar y parsear respuesta
    const cleanedResponse = cleanJsonResponse(text)
    let transactions = []

    try {
      transactions = JSON.parse(cleanedResponse)
      if (!Array.isArray(transactions)) transactions = [transactions]
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return NextResponse.json([], { status: 200 })
    }

    // Validar y actualizar categorías dinámicas
    const validTransactions = transactions.filter(tx => validateTransaction(tx, [...allCategories, ...transactions.map(t => t.category)]))

    // Actualizar categorías dinámicas
    validTransactions.forEach(tx => {
      if (!allCategories.includes(tx.category)) {
        dynamicCategories.push(tx.category)
      }
    })

    return NextResponse.json(validTransactions, { status: 200 })

  } catch (error) {
    console.error('Error processing transaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}