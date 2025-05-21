'use client'

import { motion } from 'framer-motion'

import { cn } from '@/shared/lib/utils/tailwind'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/ui/carousel'

import { TransactionType } from '@/transactions/lib/schemas/transaction.schema'

interface ChartItem {
  category: string
  amount: number
  icon: string
}

interface ExpenseChartProps {
  data: ChartItem[]
  type: TransactionType
}

export const ExpenseChart = ({ data, type }: ExpenseChartProps) => {
  const maxAmount = Math.max(...data.map((item) => item.amount), 1)
  const containerHeight = 250

  return (
    <Carousel>
      <CarouselContent>
        {data.map((item, index) => {
          const barHeight = (item.amount / maxAmount) * containerHeight

          return (
            <CarouselItem key={index} className='w-full basis-1/3 flex flex-col h-[300px] select-none'>
              <div className='flex flex-col items-center h-full gap-2'>
                <div className='h-full w-full flex flex-col justify-end rounded-t'>
                  {/* Barra animada con Framer Motion */}
                  <motion.div
                    className={cn(
                      'w-full rounded-t-lg',
                      type === TransactionType.INCOME && 'bg-emerald-600/10',
                      type === TransactionType.EXPENSE && 'bg-red-500/10',
                    )}
                    initial={{ height: 0 }} // Estado inicial
                    animate={{ height: barHeight }} // Estado final
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.1 // Retraso escalonado para cada barra
                    }}
                    style={{
                      minHeight: 90
                    }}
                  >
                    <div className='flex flex-col items-center justify-center p-2'>
                      <span className='text-2xl mb-2'>{item.icon}</span>
                      <span className='font-bold'>{item.amount.toFixed(2)} $</span>
                    </div>
                  </motion.div>
                </div>

                <div className='w-full mt-2 text-xs text-center text-muted-foreground'>
                  {item.category}
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}