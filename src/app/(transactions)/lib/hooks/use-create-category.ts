import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { queryClient } from '@/shared/lib/providers/query-client'
import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'

import { CreateCategory, createCategorySchema } from '../schemas/category.schema'
import { categoryServices } from '../services'

export const useCreateCategory = () => {
  const { user } = useUser()

  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema),
  })

  const { data, isPending, isSuccess, error, mutate } = useMutation({
    mutationFn: (payload: CreateCategory) => categoryServices.create(user.id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES.TABLE] })
  })

  const onSubmit = form.handleSubmit(async (payload: CreateCategory) => mutate(payload))

  useEffect(() => {
    if (isPending) {
      toast.info('Agregando categoria')
      return
    }

    if (isSuccess) {
      form.reset()

      toast.success('Categoria registrada', {
        description: 'La categoria ha sido registrada correctamente.',
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