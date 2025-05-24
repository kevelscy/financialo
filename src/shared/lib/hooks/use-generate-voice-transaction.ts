import { useState } from 'react'
import { aiServices } from '../services/ai'

export const useGenerateVoiceTransaction = () => {
  const [loading, setLoading] = useState(false)

  const generateTransaction = async (voiceText: string, categories: string[]) => {
    setLoading(true)

    try {
      const res = await aiServices.generateVoiceTransaction({ voiceText, categories })
      return res
    } catch (error) {
      console.error('Error generating transaction:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { generateTransaction, loading }
}