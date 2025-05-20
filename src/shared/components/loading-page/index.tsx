import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  title?: string
  description?: string
}

export const LoadingPage = ({ title, description }: Props) => {
  const [loadingText, setLoadingText] = useState(title || 'Cargando')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular progreso de carga
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 15)

    // Animación de puntos suspensivos
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 'Cargando...') return 'Cargando'
        return prev + '.'
      })
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900'>
      <div className='w-full max-w-md px-8 py-12'>
        {/* Logo */}
        <motion.div
          className='flex justify-center mb-8'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/media/images/logo.svg' alt='UMIA' className='w-40' />
        </motion.div>

        {/* Barra de progreso */}
        <div className='w-full h-2 bg-teal-200 dark:bg-teal-800 rounded-full mb-4 overflow-hidden'>
          <motion.div
            className='h-full bg-teal-600 dark:bg-teal-400 rounded-full'
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

        {/* Texto de carga con animación */}
        <motion.div
          className='text-center text-teal-800 dark:text-teal-200 font-medium'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className='text-lg mb-1'>{loadingText}</p>
          <p className='text-sm opacity-70'>{description || 'Preparando tu sesión'}</p>
        </motion.div>
      </div>
    </div>
  )
}
