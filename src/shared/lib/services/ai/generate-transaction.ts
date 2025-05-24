import { Transaction } from "@/app/(transactions)/lib/schemas/transaction.schema"

export const generateVoiceTransaction = async ({ voiceText, categories }): Promise<Transaction[]> => {
  const request: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voiceText, categories })
  }

  const res = await fetch('/api/ai/generate/voice-transaction', request)
  const data = await res.json()

  return data
}