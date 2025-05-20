'use client'

import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { CalendarForm } from '@/ui/calendar-form'
import { SelectForm } from '@/ui/select-form'
import { InputForm } from '@/ui/input-form'
import { Separator } from '@/ui/separator'
import { Button } from '@/ui/button'
import { Form } from '@/ui/form'

import { useCreateTransaction } from '@/transactions/lib/hooks/use-create-transaction'
import { TransactionType } from '../../lib/schemas'

interface AddExpenseModalProps {
  children: React.ReactNode
}

export const DialogAddTrasaction = ({ children }: AddExpenseModalProps) => {
  const { form, loading, onSubmit } = useCreateTransaction()

  const [open, setOpen] = useState(false)

  const categories = [
    {
      label: '🥑 Comida',
      value: 'food'
    },
    {
      label: '🍔 Restaurantes',
      value: 'restaurant'
    },
    {
      label: '🚗 Transporte',
      value: 'transport'
    },
    {
      label: '💎 Lujos',
      value: 'luxury'
    },
    {
      label: '📦 Otrosporte',
      value: 'other'
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Registrar transacción</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={onSubmit} className='space-y-4'>
            <SelectForm
              form={form}
              id='type'
              label='Tipo de transacción'
              items={[
                {
                  label: 'Gasto',
                  value: TransactionType.EXPENSE
                },
                {
                  label: 'Ingreso',
                  value: TransactionType.INCOME
                }
              ]}
            />

            <InputForm
              form={form}
              id='description'
              label='Descripción'
              placeholder='Descripción de la transacción'
            />

            <InputForm
              form={form}
              id='amount'
              type='number'
              step='0.01'
              min={0}
              label='Cantidad'
              placeholder='0.00'
              required
              maxLength={4}
              max={9999}
            />

            <SelectForm
              form={form}
              id='category'
              placeholder='Seleccione una categoría'
              label='Categoría'
              items={categories}
            />

            <CalendarForm
              form={form}
              id='date'
              label='Fecha'
            />

            <Button type='submit' className='w-full'>
              Guardar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
