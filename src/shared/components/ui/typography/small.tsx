import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface SmallProps extends React.ComponentPropsWithoutRef<'small'> { }

export const Small = ({ className, ...props }: SmallProps) => {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    />
  )
}
