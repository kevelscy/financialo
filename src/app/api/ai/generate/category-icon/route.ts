import { createGoogleGenerativeAI } from '@ai-sdk/google'
// import { createDeepSeek } from '@ai-sdk/deepseek'
// import { createOpenAI } from '@ai-sdk/openai'

import { NextResponse } from 'next/server'
import { generateText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
})

// const deepseek = createDeepSeek({
//   apiKey: process.env.DEEPSEEK_API_KEY ?? '',
// })

// const openai = createOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   compatibility: 'strict', // strict mode, enable when using the OpenAI API
// })

export async function POST(req: Request) {
  try {
    const { categoryName }: { categoryName?: string } = await req.json()

    // Input validation
    if (!categoryName || typeof categoryName !== 'string') {
      return NextResponse.json(
        { error: 'categoryName is required and must be a string' },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      // model: openai('gpt-4o-mini'),
      // model: deepseek('deepseek-chat'), 
      model: google('gemini-1.5-flash'),
      system: `You are an emoji/color generator. Return EXCLUSIVELY in this RAW FORMAT:
        "[EMOJI][SPACE][HEX_COLOR]"

        RULES:
        1. No punctuation, text, or line breaks
        2. Color must be in #RRGGBB format
        3. 1 emoji only

        VALID OUTPUTS:
        🍔 #F9A825
        💻 #2E7D32
        🎓 #1565C0

        INVALID OUTPUTS:
        🍔 #F9A825 (Food category)
        "💻 #2E7D32"`,
      messages: [
        {
          role: 'user',
          content: `Category: "${categoryName.trim()}"`
        }
      ]
    })

    const [emoji, color] = text.replace(/[\n"'.]/g, '').split(' ')


    if (!emoji && !color) {
      return NextResponse.json({
        emoji: '❓',
        color: '#CCCCCC'
      })
    }

    return NextResponse.json({ emoji, color })

  } catch (error) {
    console.error('Error generating emoji:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}