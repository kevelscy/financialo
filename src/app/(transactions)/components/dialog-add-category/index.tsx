'use client'

import { Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog'
import { InputForm } from '@/ui/input-form'
import { Separator } from '@/ui/separator'
import { Button } from '@/ui/button'
import { Form } from '@/ui/form'

import { useCreateCategory } from '../../lib/hooks/use-create-category'


interface Props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogAddCategory = ({ open, setOpen }: Props) => {
  const { form, loading, onSubmit } = useCreateCategory({
    callbackOnSuccess: () => setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Registrar categoría</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={onSubmit} className='space-y-4'>
            <InputForm
              form={form}
              id='name'
              label='Nombre'
              placeholder='Ropa, Trabajo, Salud...'
              disabled={loading}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              Guardar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
