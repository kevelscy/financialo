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
import { cn } from '@/shared/lib/utils/tailwind'
import { Separator } from '@/shared/components/ui/separator'
import CountUp from '@/shared/components/ui/count-up'
import { CarouselBarsSkeletons } from '../loading-skeletons-with-shimmer/carousel-bars-skeletons'

interface Props {
  type?: TransactionType
  data: GroupedTransactions[]
  loading: boolean
}

export default function TransactionsDashboard({ data, loading, type = TransactionType.EXPENSE }: Props) {
  const [period, setPeriod] = useState('this month')

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
      ? data?.map?.(grouped => ({
        category: grouped.category.name,
        amount: getTotalAmountByCategory(grouped, TransactionType.EXPENSE),
        icon: grouped.category.emoji
      }))
      : data?.map?.(grouped => ({
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
      {/* <div className='flex justify-between items-center mb-4'>
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
      </div> */}

      <div className='text-center mb-6'>
        <span className='text-muted-foreground'>Total</span>

        <div className={cn(
          'flex items-center justify-center',
          type === TransactionType.EXPENSE && 'text-red-500',
          type === TransactionType.INCOME && 'text-green-500',
        )}>
          <span className={cn(
            'text-3xl text-muted-foreground',
            type === TransactionType.EXPENSE && 'text-red-300',
            type === TransactionType.INCOME && 'text-green-300',
          )}>
            $
          </span>

          <span className='text-7xl font-bold'>
            {/* {Math.floor(totalAmount)} */}
            <CountUp
              from={0}
              to={Math.floor(totalAmount)}
              separator=","
              direction="up"
              duration={0.1}
              className="count-up-text"
            />
          </span>

          <span className={cn(
            'text-3xl text-muted-foreground',
            type === TransactionType.EXPENSE && 'text-red-300',
            type === TransactionType.INCOME && 'text-green-300',
          )}>
            .{(totalAmount % 1).toFixed(2).substring(2)}
          </span>
        </div>
      </div>

      {/* <div className='flex justify-between items-center mb-4'>
        <Button variant='outline' onClick={exportToExcel}>
          Exportar Excel
        </Button>
      </div> */}

      <Separator />

      {
        !data?.length
          ? <CarouselBarsSkeletons isEmptyData />
          : <ExpenseChart data={chartData} type={type} />
      }
    </div>
  )
}
