'use client'

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Button, buttonVariants } from '@/ui/button'

import { VoiceRecorder } from '../../(voice-record)/components/voice-recorder'
import { DashboardSkeleton } from '../components/dashboard-sekeletons'
import TransactionsDashboard from '../components/expense-dashboard'

import { DialogAddTrasaction } from '@/transactions/components/add-transaction'
import { TransactionType } from '@/transactions/lib/schemas/transaction.schema'
import { useListTransactionsGrouped } from '@/app/(transactions)/lib/hooks/use-list-transactions-grouped'

export default function HomePage() {
  const { data, loading } = useListTransactionsGrouped()

  return (
    <div className='h-[calc(100dvh_-_64px)] mx-auto px-4 py-6 max-w-xl flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col items-center'>
        <Tabs defaultValue={TransactionType.EXPENSE} className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value={TransactionType.EXPENSE}>Gastos</TabsTrigger>
            <TabsTrigger value={TransactionType.INCOME}>Ingresos</TabsTrigger>
          </TabsList>

          <TabsContent value={TransactionType.EXPENSE} className='w-full'>
            <Suspense fallback={<DashboardSkeleton />}>
              <TransactionsDashboard data={data?.result} loading={loading} />
            </Suspense>
          </TabsContent>

          <TabsContent value={TransactionType.INCOME} className='w-full'>
            <Suspense fallback={<DashboardSkeleton />}>
              <TransactionsDashboard type={TransactionType.INCOME} data={data?.result} loading={loading} />
            </Suspense>
          </TabsContent>
        </Tabs>

        <div className='w-full mt-6 flex justify-center items-center gap-4'>
          <VoiceRecorder />

          <SignedIn>
            <DialogAddTrasaction>
              <Button
                variant='outline'
                className='rounded-full px-6 py-6 border-dashed border-gray-300 flex items-center gap-2'
              >
                <PlusIcon size={18} />
                <span>Añadir</span>
              </Button>
            </DialogAddTrasaction>
          </SignedIn>

          <SignedOut>
            <SignInButton mode='modal'>
              <div className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full px-6 py-6 border-dashed border-gray-300 flex items-center gap-2')}>
                <PlusIcon size={18} />
                <span>Añadir</span>
              </div>
            </SignInButton>
          </SignedOut>
        </div>

      </div>
    </div>
  )
}