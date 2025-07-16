// app/api/transcribe/route.ts
import { AssemblyAI } from 'assemblyai'
import { type NextRequest, NextResponse } from 'next/server'

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY

export async function POST(request: NextRequest) {
  try {
    // 1. Obtener archivo del FormData
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile || !audioFile.type.startsWith('audio/')) {
      return NextResponse.json({ error: 'Archivo de audio inválido' }, { status: 400 })
    }

    // 2. Inicializar cliente de AssemblyAI
    const client = new AssemblyAI({
      apiKey: ASSEMBLYAI_API_KEY // Asegúrate de tener esta variable de entorno
    })

    // 3. Convertir a buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer())

    // 4. Verificar tamaño mínimo
    if (audioBuffer.length < 1024) {
      return NextResponse.json({ error: 'El archivo de audio es demasiado pequeño (mínimo 1KB)' }, { status: 400 })
    }

    // 5. Transcribir usando el SDK de AssemblyAI
    const transcript = await client.transcripts.transcribe({
      audio: audioBuffer,
      // Parámetros opcionales para mejorar resultados
      language_code: 'es', // Especificar idioma español
      speech_model: 'best', // Usar el mejor modelo disponible
      // audio_format: audioFile.name.split('.').pop() || 'mp3', // Detectar formato
      punctuate: true, // Agregar puntuación
      format_text: true // Formatear texto
    })

    // 6. Verificar si se generó la transcripción
    if (transcript.status === 'error' || !transcript.text) {
      throw new Error(`AssemblyAI error: ${transcript.error}`)
    }

    // 7. Devolver resultados
    return NextResponse.json({
      text: transcript.text,
      language: transcript.language_code,
      durationInSeconds: Math.floor(transcript.audio_duration || 0)
    })
  } catch (error: any) {
    console.error('Error detallado:', error)

    // Mensaje de error personalizado
    let errorMessage = 'Error en la transcripción'
    if (error.message.includes('Invalid file format')) {
      errorMessage = 'Formato de audio no soportado. Usa MP3, WAV u otros formatos comunes.'
    } else if (error.message.includes('file is too short')) {
      errorMessage = 'El audio es demasiado corto (mínimo 200ms)'
    } else if (error.message.includes('Invalid credentials')) {
      errorMessage = 'Problema de autenticación con AssemblyAI. Verifica la API key.'
    }

    return NextResponse.json({ error: errorMessage, details: error.message }, { status: 500 })
  }
}
