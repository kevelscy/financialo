import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { queryClient } from '@/shared/lib/providers/query-client'
import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'

import { CreateTransaction, createTransactionSchema, TransactionType } from '../schemas/transaction.schema'
import { Category } from '../schemas/category.schema'
import { transactionServices } from '../services'

interface Props {
  callbackOnSuccess?: () => void
}

export const useCreateTransaction = ({ callbackOnSuccess }: Props) => {
  const { user } = useUser()

  const form = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
      date: new Date()
    }
  })


  const { data, isPending, isSuccess, error, mutate } = useMutation({
    mutationFn: (payload: CreateTransaction) => transactionServices.create(user.id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS.LIST] })
  })

  const onSubmit = form.handleSubmit(async (payload: CreateTransaction) => {
    mutate({
      ...payload,
    })
  })

  const createTransaction = async (payload: CreateTransaction) => mutate(payload)

  useEffect(() => {
    if (isPending) {
      toast.info('Agregando transacción')
      return
    }

    if (isSuccess) {
      form.reset()

      toast.success('Transacción registrada', {
        description: 'La transacción ha sido registrada correctamente.',
      })

      callbackOnSuccess?.()
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
    createTransaction,
    loading: isPending
  }
}