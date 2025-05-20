import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface TypographyMutedProps extends React.ComponentPropsWithoutRef<'p'> { }

export const TypographyMuted = ({ className, ...props }: TypographyMutedProps) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
