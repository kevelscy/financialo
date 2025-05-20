import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog'
import { useLoadingDialogStore } from '@/shared/lib/store/loading'

export const GlobalLoadingDialog = () => {
  const { open, title, description } = useLoadingDialogStore()

  const [loadingText, setLoadingText] = useState(title || 'Cargando')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!open) {
      setProgress(0)
      return
    }

    setLoadingText(title || 'Cargando')

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 6)

    // Animación de puntos suspensivos
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const baseText = title || 'Cargando'
        if (prev === `${baseText}...`) return baseText
        return prev + '.'
      })
    }, 300)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [open, title])

  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-sm border-none bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm'>
        <DialogHeader className='pb-2'>
          <div className='flex flex-col justify-center items-center'>
            {/* Logo */}
            <motion.div
              className='flex justify-center'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src='/media/images/logo.svg' alt='UMIA' className='w-28' />
            </motion.div>

            <div className='max-w-52 w-full flex flex-col justify-center items-center space-y-4 mt-4'>
              {/* Barra de progreso */}
              <div className='w-full h-2 bg-teal-200 dark:bg-teal-800 rounded-full mb-4 overflow-hidden'>
                <motion.div
                  className='h-full bg-teal-600 dark:bg-teal-400 rounded-full'
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>

              {/* Título y descripción */}
              <motion.div
                className='text-center'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DialogTitle className='font-bold text-xl text-teal-800 dark:text-teal-200'>{loadingText}</DialogTitle>
                {description && <p className='text-muted-foreground text-sm mt-1'>{description}</p>}
              </motion.div>
            </div>
          </div>
        </DialogHeader>

        {/* Elementos decorativos animados */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-300 opacity-40'
              initial={{
                x: Math.random() * 400,
                y: -20,
                opacity: 0.2,
              }}
              animate={{
                y: 400,
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
