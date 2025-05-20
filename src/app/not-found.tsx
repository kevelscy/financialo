'use client'

import { ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils/tailwind'
import { Button, buttonVariants } from '@/ui/button'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <img
            src='/media/images/404.png'
            alt='Page not found illustration'
            className='mx-auto w-[500px]'
          />
        </div>

        <h1 className='text-6xl font-bold text-gray-900 mb-2'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Página no encontrada</h2>
        <p className='text-gray-600 mb-8'>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </Button>

          {/* <Button
          onClick={handleReload}
          className='inline-flex items-center justify-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors'
        >
          <RefreshCw className='w-4 h-4' />
          Recargar página
        </Button> */}

          <Link href='/inicio' className={cn(
            buttonVariants({ variant: 'default' }),
            'inline-flex items-center justify-center px-5 py-2.5 bg-umia-green hover:bg-umia-green/90 text-white rounded-lg transition-colors'
          )}>
            <Home className='w-4 h-4' />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}