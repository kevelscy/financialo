'use client'

import { ChevronDown, ListFilter } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Card, CardContent } from '@/ui/card'
import { Button } from '@/ui/button'

import { GroupedTransactions, TransactionType } from '@/transactions/lib/schemas/transaction.schema'
import { ExpenseChart } from './transaction-chart'
import { formatAmount } from '@/shared/lib/utils/format-amount'

interface Props {
  type?: TransactionType
  data: GroupedTransactions[]
  loading: boolean
}

export default function TransactionsDashboard({ data, loading, type = TransactionType.EXPENSE }: Props) {
  const [period, setPeriod] = useState('this month')

  console.log({ data })

  const getTotalAmount = (data: GroupedTransactions[], type: TransactionType) => {
    if (!data?.length) return 0

    let total = 0

    if (type === TransactionType.EXPENSE) {
      for (const group of data) {
        for (const transaction of group.expenseTransactions) {
          total += formatAmount(transaction.amount)
        }
      }
    }

    if (type === TransactionType.INCOME) {
      for (const group of data) {
        for (const transaction of group.incomeTransactions) {
          total += formatAmount(transaction.amount)
        }
      }
    }

    return total
  }

  const getTotalAmountByCategory = (data: GroupedTransactions, type: TransactionType) => {
    if (!data) return 0

    let total = 0

    if (type === TransactionType.EXPENSE) {
      for (const transaction of data.expenseTransactions) {
        total += formatAmount(transaction.amount)
      }
    }

    if (type === TransactionType.INCOME) {
      for (const transaction of data.incomeTransactions) {
        total += formatAmount(transaction.amount)
      }
    }

    return total
  }

  const totalAmount = getTotalAmount(data, type)

  const chartData =
    type === TransactionType.EXPENSE
      ? data?.map(grouped => ({
        category: grouped.category.name,
        amount: getTotalAmountByCategory(grouped, TransactionType.EXPENSE),
        icon: grouped.category.emoji
      }))
      : data?.map(grouped => ({
        category: grouped.category.name,
        amount: getTotalAmountByCategory(grouped, TransactionType.INCOME),
        icon: grouped.category.emoji
      }))

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
    link.setAttribute('download', `${type === TransactionType.EXPENSE ? 'gastos' : 'ingresos'}_${period.replace(' ', '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success('Exportación completada', {
      description: `Se ha exportado el archivo CSV de ${type === TransactionType.EXPENSE ? 'gastos' : 'ingresos'}.`,
    })
  }

  if (loading) {
    return <div>
      Cargando
    </div>
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-muted-foreground'>{type === TransactionType.EXPENSE ? 'Gastado' : 'Ingresado'}</div>
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className='w-[160px]'>
                <SelectValue />
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
          </div>
        </CardContent>
      </Card>

      <ExpenseChart data={chartData} />
    </div>
  )
}
