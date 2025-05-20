import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface H4Props extends React.ComponentPropsWithoutRef<'h4'> { }

export const H4 = ({ className, ...props }: H4Props) => {
  return (
    <h3
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  )
}
