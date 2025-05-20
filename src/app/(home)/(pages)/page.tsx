import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Button } from '@/ui/button'

import { VoiceRecorder } from '../../(voice-record)/components/voice-recorder'
import { DashboardSkeleton } from '../components/dashboard-sekeletons'
import { AddExpenseModal } from '../components/add-expense-modal'
import ExpenseDashboard from '../components/expense-dashboard'

export default function HomePage() {
  return (
    <div className='container mx-auto px-4 py-6 max-w-md'>
      <div className='flex flex-col items-center'>
        <Tabs defaultValue='expenses' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value='expenses'>Gastos</TabsTrigger>
            <TabsTrigger value='income'>Ingresos</TabsTrigger>
          </TabsList>

          <TabsContent value='expenses' className='w-full'>
            <Suspense fallback={<DashboardSkeleton />}>
              <ExpenseDashboard />
            </Suspense>
          </TabsContent>

          <TabsContent value='income' className='w-full'>
            <Suspense fallback={<DashboardSkeleton />}>
              <ExpenseDashboard type='income' />
            </Suspense>
          </TabsContent>
        </Tabs>

        <div className='w-full mt-6 flex justify-center items-center gap-4'>
          <VoiceRecorder />

          <AddExpenseModal>
            <Button
              variant='outline'
              className='rounded-full px-6 py-6 border-dashed border-gray-300 flex items-center gap-2'
            >
              <PlusIcon size={18} />
              <span>Añadir</span>
            </Button>
          </AddExpenseModal>
        </div>

      </div>
    </div>
  )
}