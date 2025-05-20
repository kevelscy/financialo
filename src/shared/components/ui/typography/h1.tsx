import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface H1Props extends React.ComponentPropsWithoutRef<'h1'> { }

export const H1 = ({ className, ...props }: H1Props) => {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...props}
    />
  )
}
