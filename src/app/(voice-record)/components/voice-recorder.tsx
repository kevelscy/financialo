'use client'

import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/ui/button'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const VoiceRecorder = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const commands = [
    {
      command: "gasto de * en *",
      callback: (amount: string, category: string) => {
        processExpense(amount, category, "expense")
      },
    },
    {
      command: "gasté * en *",
      callback: (amount: string, category: string) => {
        processExpense(amount, category, "expense")
      },
    },
    {
      command: "ingreso de * por *",
      callback: (amount: string, category: string) => {
        processExpense(amount, category, "income")
      },
    },
    {
      command: "recibí * por *",
      callback: (amount: string, category: string) => {
        processExpense(amount, category, "income")
      },
    },
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands })

  const processExpense = (amount: string, category: string, type: "expense" | "income") => {
    setIsProcessing(true)

    // Extraer el número del monto (puede contener "pesos", "dólares", etc.)
    const amountValue = amount.match(/\d+(\.\d+)?/)
    const cleanAmount = amountValue ? amountValue[0] : "0"

    setTimeout(() => {
      setIsProcessing(false)
      resetTranscript()

      toast(type === "expense" ? "Gasto registrado" : "Ingreso registrado", {
        description: `${type === "expense" ? "Gasto" : "Ingreso"} de $${cleanAmount} en ${category}`,
      })
    }, 1000)
  }

  const toggleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      console.log('AJA')
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" })

      toast("Grabando voz", {
        description: "Diga su ingreso o gasto...",
      })
    }
  }

  console.log({
    transcript, isProcessing
  })

  // Si el navegador no soporta reconocimiento de voz
  if (!browserSupportsSpeechRecognition) {
    return (
      <Button
        disabled
        className="rounded-full h-16 w-16 bg-red-300"
        title="Tu navegador no soporta reconocimiento de voz"
      >
        <Mic className="h-8 w-8 text-white" />
      </Button>
    )
  }

  // Si el micrófono no está disponible
  if (!isMicrophoneAvailable) {
    return (
      <Button disabled className="rounded-full h-16 w-16 bg-red-300" title="No se puede acceder al micrófono">
        <Mic className="h-8 w-8 text-white" />
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {transcript && !isProcessing && (
        <div className="bg-white p-2 rounded-lg shadow-md text-sm max-w-[200px] text-center">{transcript}</div>
      )}

      <Button
        onClick={toggleRecording}
        disabled={isProcessing}
        className={`rounded-full h-16 w-16 ${listening ? "bg-red-500 hover:bg-red-600" : "bg-red-400 hover:bg-red-500"
          }`}
      >
        {isProcessing ? (
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        ) : listening ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-white" />
        )}
      </Button>
    </div>
  )
}
