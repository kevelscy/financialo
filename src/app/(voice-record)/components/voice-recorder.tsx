'use client'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useGenerateVoiceTransaction } from '@/shared/lib/hooks/use-generate-voice-transaction'

import { Button } from '@/ui/button'

import { useCreateTransaction } from '@/transactions/lib/hooks/use-create-transaction'
import { CreateTransaction } from '@/transactions/lib/schemas/transaction.schema'
import { useListCategories } from '@/transactions/lib/hooks/use-list-categories'

export const VoiceRecorder = () => {
  const { data, loading: loadingTransaction, createTransaction } = useCreateTransaction({})
  const { data: categories, loading: loadingCategories, error } = useListCategories()

  const { generateTransaction, loading } = useGenerateVoiceTransaction()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const processExpense = (amount: string, category: string, type: 'expense' | 'income') => {
    setIsProcessing(true)

    // Extraer el número del monto (puede contener 'pesos', 'dólares', etc.)
    const amountValue = amount.match(/\d+(\.\d+)?/)
    const cleanAmount = amountValue ? amountValue[0] : '0'

    setTimeout(() => {
      setIsProcessing(false)
      resetTranscript()

      toast(type === 'expense' ? 'Gasto registrado' : 'Ingreso registrado', {
        description: `${type === 'expense' ? 'Gasto' : 'Ingreso'} de $${cleanAmount} en ${category}`,
      })
    }, 1000)
  }

  const toggleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })

      toast('Grabando voz', {
        description: 'Diga su ingreso o gasto...',
      })
    }
  }

  useEffect(() => {
    (async () => {
      if (transcript) {
        if (listening) return

        const categoryNames = categories?.result?.map?.(c => c.name)

        const previewTransactions = await generateTransaction(transcript, categoryNames)

        // if (previewTransactions) {
        //   toast('Transacciones generadas', {
        //     description: `Se generaron ${previewTransactions.length} transacciones.`,
        //   })
        // }

        if (previewTransactions.length === 0) {
          toast.error('No se encontraron transacciones válidas')
          return
        }

        const transactionsWithNewCategories: CreateTransaction[] = []
        const transactionsWithCurrentCategories: CreateTransaction[] = []

        previewTransactions.forEach(tx => {
          const category = categories?.result?.find(c => c.name === tx.category)

          if (category) {
            transactionsWithCurrentCategories.push({
              ...tx,
              categoryId: category.id,
            })
          } else {
            transactionsWithNewCategories.push({
              ...tx
            })
          }
        })

        for (const element of transactionsWithCurrentCategories) {
          await createTransaction(element)
        }


        // previewTransactions.forEach(tx => {
        //   toast(`${tx.type === TransactionType.EXPENSE ? 'Gasto' : 'Ingreso'}: $${tx.amount} - ${tx.description}`, {
        //     description: `Categoría: ${tx.category}`,
        //   })
        // })

      }
    })()
  }, [transcript, listening])

  // Si el navegador no soporta reconocimiento de voz
  if (!browserSupportsSpeechRecognition) {
    return (
      <Button
        disabled
        className='rounded-full h-16 w-16 bg-red-300'
        title='Tu navegador no soporta reconocimiento de voz'
      >
        <Mic className='h-8 w-8 text-white' />
      </Button>
    )
  }

  // Si el micrófono no está disponible
  if (!isMicrophoneAvailable) {
    return (
      <Button disabled className='rounded-full h-16 w-16 bg-red-300' title='No se puede acceder al micrófono'>
        <Mic className='h-8 w-8 text-white' />
      </Button>
    )
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      {transcript && !isProcessing && (
        <div
          onClick={() => {
            resetTranscript()
          }}
          className='bg-white p-2 rounded-lg shadow-md text-sm max-w-[200px] text-center'
        >
          {transcript}
        </div>
      )}

      <Button
        onClick={toggleRecording}
        disabled={isProcessing}
        className={`rounded-full h-16 w-16 ${listening ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'
          }`}
      >
        {isProcessing ? (
          <Loader2 className='h-8 w-8 animate-spin text-white' />
        ) : listening ? (
          <MicOff className='h-8 w-8 text-white' />
        ) : (
          <Mic className='h-8 w-8 text-white' />
        )}
      </Button>
    </div>
  )
}
