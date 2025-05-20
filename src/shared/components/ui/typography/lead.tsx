import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface LeadProps extends React.ComponentPropsWithoutRef<'p'> { }

export const TypographyLead = ({ className, ...props }: LeadProps) => {
  return (
    <p
      className={cn('text-xl text-muted-foreground', className)}
      {...props}
    />
  )
}
