'use client'

import { CalendarIcon } from 'lucide-react'
import { es } from 'date-fns/locale'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Calendar } from '@/ui/calendar'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

interface AddExpenseModalProps {
  children: React.ReactNode
}

export const AddExpenseModal = ({ children }: AddExpenseModalProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para guardar el gasto
    toast.success('Gasto añadido', {
      description: 'El gasto ha sido registrado correctamente.',
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Añadir nuevo gasto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 pt-4'>
          <div className='grid gap-2'>
            <Label htmlFor='amount'>Cantidad</Label>
            <div className='relative'>
              <span className='absolute left-3 top-2.5'>$</span>
              <Input id='amount' type='number' step='0.01' min='0' placeholder='0.00' className='pl-7' required />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='category'>Categoría</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar categoría' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='food'>🥑 Comida</SelectItem>
                <SelectItem value='restaurant'>🍔 Restaurantes</SelectItem>
                <SelectItem value='transport'>🚗 Transporte</SelectItem>
                <SelectItem value='luxury'>💎 Lujos</SelectItem>
                <SelectItem value='other'>📦 Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='description'>Descripción</Label>
            <Input id='description' placeholder='Descripción del gasto' />
          </div>

          <div className='grid gap-2'>
            <Label>Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='justify-start text-left font-normal'>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP', { locale: es }) : 'Seleccionar fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='currency'>Moneda</Label>
            <Select defaultValue='usd'>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='usd'>USD - Dólar estadounidense</SelectItem>
                <SelectItem value='eur'>EUR - Euro</SelectItem>
                <SelectItem value='mxn'>MXN - Peso mexicano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' className='w-full'>
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
