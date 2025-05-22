import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  isEmptyData?: boolean
}

export const CarouselBarsSkeletons = ({ isEmptyData }: Props) => {
  return (
    <div className='relative'>
      <div className='flex items-center mx-auto justify-center'>
        {/* Left arrow */}
        <button className='absolute left-0 z-10 p-1 rounded-full bg-white shadow-md'>
          <ChevronLeft className='h-5 w-5 text-gray-400' />
        </button>

        {/* Carousel items */}
        <div className='flex space-x-4 overflow-hidden py-4 px-6'>
          <div className='flex-shrink-0 w-32 h-[30dvh] bg-zinc-200 rounded-lg p-4 flex flex-col items-center animate-pulse' />
          <div className='flex-shrink-0 w-32 h-[30dvh] bg-zinc-200 rounded-lg p-4 flex flex-col items-center animate-pulse' />
          <div className='flex-shrink-0 w-32 h-[30dvh] bg-zinc-200 rounded-lg p-4 flex flex-col items-center animate-pulse' />
        </div>


        {/* Right arrow */}
        <button className='absolute right-0 z-10 p-1 rounded-full bg-white shadow-md'>
          <ChevronRight className='h-5 w-5 text-gray-400' />
        </button>
      </div>

      <div className='w-full text-center'>
        {isEmptyData && <span className='text-muted-foreground text-sm'>Registre su primera trasacción</span>}
      </div>
    </div>
  )
}