import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface H2Props extends React.ComponentPropsWithoutRef<'h2'> { }

export const H2 = ({ className, ...props }: H2Props) => {
  return (
    <h2
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  )
}
