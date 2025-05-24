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
import { TransactionType } from '../../lib/schemas/transaction.schema'
import { useListCategories } from '../../lib/hooks/use-list-categories'
import { DialogAddCategory } from '../dialog-add-category'

interface Props {
  children: React.ReactNode
}

export const DialogAddTransaction = ({ children }: Props) => {
  const [openCategory, setOpenCategory] = useState(false)
  const [open, setOpen] = useState(false)

  const { data: categories, loading: loadingCategories, error } = useListCategories()
  const { form, loading, onSubmit } = useCreateTransaction({ callbackOnSuccess: () => setOpen(false) })

  return (
    <>
      <DialogAddCategory open={openCategory} setOpen={setOpenCategory} />

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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                placeholder='0.00'
                required
                maxLength={4}
                max={9999}
              />

              <SelectForm
                form={form}
                id='categoryId'
                label='Categoría'
                disabled={loading}
                loading={loadingCategories}
                onAdd={() => setOpenCategory(true)}
                placeholder='Seleccione una categoría'
                items={categories?.result?.map?.(category => ({
                  label: `${category.emoji} ${category.name}`,
                  value: category.id
                }))}
              />

              <CalendarForm
                form={form}
                id='date'
                disabled={loading}
                label='Fecha'
              />

              <Button type='submit' className='w-full' disabled={loading}>
                Guardar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
