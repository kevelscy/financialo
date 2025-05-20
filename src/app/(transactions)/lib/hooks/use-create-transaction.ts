import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { queryClient } from '@/shared/lib/providers/query-client'
import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'

import { CreateTransaction, createTransactionSchema, TransactionType } from '../schemas'
import { transactionServices } from '../services'

export const useCreateTransaction = () => {
  const form = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
      date: new Date().toString()
    }
  })

  const { data, isPending, isSuccess, error, mutate } = useMutation({
    mutationFn: (payload: CreateTransaction) => transactionServices.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS.TABLE] })
  })

  const onSubmit = form.handleSubmit(async (payload: CreateTransaction) => mutate(payload))

  useEffect(() => {
    if (isPending) {
      toast.info('Agregando instituto de salud')
      return
    }

    if (isSuccess) {
      form.reset()

      toast.success('Transacción registrada', {
        description: 'La transacción ha sido registrada correctamente.',
      })
      return
    }

    if (error) {
      toast.error('Ha ocurrido un error')
      return
    }
  }, [isPending, isSuccess, error])

  return {
    data,
    form,
    error,
    onSubmit,
    loading: isPending
  }
}