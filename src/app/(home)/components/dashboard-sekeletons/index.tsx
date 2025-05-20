import { Skeleton } from '@/ui/skeleton'

export const DashboardSkeleton = () => {
  return (
    <div className='space-y-4 w-full'>
      <Skeleton className='h-24 w-full' />
      <Skeleton className='h-64 w-full' />
    </div>
  )
}