'use client'

import { Card, CardContent } from '@/ui/card'

interface ChartItem {
  category: string
  amount: number
  icon: string
}

interface ExpenseChartProps {
  data: ChartItem[]
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  // Encontrar el valor máximo para escalar las barras
  const maxAmount = Math.max(...data.map((item) => item.amount), 1)

  return (
    <Card>
      <CardContent className='pt-6'>
        <div className='flex items-end justify-between h-64 gap-2'>
          {data.map((item, index) => (
            <div key={index} className='flex flex-col items-center flex-1'>
              <div
                className='w-full bg-gray-100 rounded-t-lg flex items-end justify-center'
                style={{
                  height: `${Math.max((item.amount / maxAmount) * 100, 5)}%`,
                  minHeight: '20px',
                }}
              >
                <div className='p-2 w-full flex flex-col items-center'>
                  <span className='text-2xl mb-2'>{item.icon}</span>
                  <span className='font-bold'>{item.amount.toFixed(2)} $</span>
                </div>
              </div>
              <div className='mt-2 text-xs text-center text-muted-foreground'>{item.category}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
