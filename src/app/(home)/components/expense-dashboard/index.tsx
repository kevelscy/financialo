'use client'

import { ChevronDown, ListFilter } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'

import { ExpenseChart } from './expense-chart'

interface ExpenseDashboardProps {
  type?: 'expense' | 'income'
}

export default function ExpenseDashboard({ type = 'expense' }: ExpenseDashboardProps) {
  const [period, setPeriod] = useState('this month')

  const totalAmount = type === 'expense' ? 206.8 : 350.25
  const chartData =
    type === 'expense'
      ? [
        { category: 'Comida', amount: 130.26, icon: '🥑' },
        { category: 'Restaurantes', amount: 60.39, icon: '🍔' },
        { category: 'Transporte', amount: 16.15, icon: '🚗' },
        { category: 'Lujos', amount: 0, icon: '💎' },
      ]
      : [
        { category: 'Salario', amount: 300, icon: '💼' },
        { category: 'Freelance', amount: 50.25, icon: '💻' },
        { category: 'Inversiones', amount: 0, icon: '📈' },
        { category: 'Otros', amount: 0, icon: '🎁' },
      ]

  const exportToExcel = () => {
    // Crear un array con los datos para la exportación
    const dataForExport = chartData.map((item) => ({
      Categoría: item.category,
      Monto: item.amount,
      Icono: item.icon,
    }))

    // Convertir a CSV
    const headers = Object.keys(dataForExport[0])
    const csvContent = [
      headers.join(','),
      ...dataForExport.map((row) => headers.map((header) => row[header as keyof typeof row]).join(',')),
    ].join('\n')

    // Crear un blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${type === 'expense' ? 'gastos' : 'ingresos'}_${period.replace(' ', '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success('Exportación completada', {
      description: `Se ha exportado el archivo CSV de ${type === 'expense' ? 'gastos' : 'ingresos'}.`,
    })
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-muted-foreground'>{type === 'expense' ? 'Gastado' : 'Ingresado'}</div>
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className='w-[160px]'>
                <SelectValue />
                <ChevronDown className='h-4 w-4 opacity-50' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='today'>Hoy</SelectItem>
                <SelectItem value='this week'>Esta semana</SelectItem>
                <SelectItem value='this month'>Este mes</SelectItem>
                <SelectItem value='this year'>Este año</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='text-center mb-6'>
            <div className='flex items-center justify-center'>
              <span className='text-3xl text-muted-foreground'>$</span>
              <span className='text-7xl font-bold'>{Math.floor(totalAmount)}</span>
              <span className='text-3xl text-muted-foreground'>.{(totalAmount % 1).toFixed(2).substring(2)}</span>
            </div>
          </div>

          <div className='flex justify-between items-center mb-4'>
            <Button variant='outline' onClick={exportToExcel}>
              Exportar Excel
            </Button>
            <Button variant='outline'>
              <ListFilter className='h-4 w-4 mr-2' />
              Mostrar Lista
            </Button>
          </div>
        </CardContent>
      </Card>

      <ExpenseChart data={chartData} />
    </div>
  )
}
