'use client'

import { Mic, Plus } from 'lucide-react'

import { Separator } from '@/shared/components/ui/separator'

import { CarouselBarsSkeletons } from './carousel-bars-skeletons'

export const LoadingSkeletonsWithShimmer = () => {
  return (
    <div className='h-[calc(100dvh_-_64px)] mx-auto px-4 py-6 max-w-xl flex flex-col justify-center items-center'>
      {/* Total section skeleton */}
      <div className='flex flex-col items-center mb-6'>
        <div className='text-sm text-gray-500'>Total</div>
        <div className='flex items-start mt-2'>
          <div className='relative overflow-hidden'>
            <div className='flex items-start'>
              <div className='h-10 w-16 md:w-20 bg-gray-200 rounded relative overflow-hidden animate-pulse'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>

              <div className='h-32 w-32 md:w-52 bg-gray-200 rounded mx-1 relative overflow-hidden animate-pulse'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>

              <div className='h-10 w-16 md:w-20 bg-gray-200 rounded relative overflow-hidden animate-pulse'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator line */}
      <Separator />

      {/* Carousel skeleton */}
      <CarouselBarsSkeletons />

      {/* Action buttons */}
      <div className='flex justify-center items-center mt-6 space-x-4'>
        <button className='w-12 h-12 rounded-full bg-red-300 flex items-center justify-center relative overflow-hidden'>
          <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-red-300 via-red-200 to-red-300'></div>
          <Mic className='h-5 w-5 text-white z-10' />
        </button>
        <button className='px-4 py-2 rounded-full border border-gray-200 flex items-center space-x-2 relative overflow-hidden'>
          <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100'></div>
          <Plus className='h-4 w-4 text-gray-400 z-10' />
          <span className='text-gray-400 z-10'>Añadir</span>
        </button>
      </div>
    </div>
  )
}
