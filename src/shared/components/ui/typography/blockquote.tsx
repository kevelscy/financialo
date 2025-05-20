import React from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface BlockquoteProps extends React.ComponentPropsWithoutRef<'blockquote'> { }

export const Blockquote = ({ className, ...props }: BlockquoteProps) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  )
}
