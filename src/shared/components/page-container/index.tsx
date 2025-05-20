import { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

interface Props extends HTMLAttributes<HTMLDivElement> { }

export const PageContainer = ({ children, className, ...props }: Props) => {
  return (
    <div className={cn('w-full max-w-7xl mx-auto p-6', className)} {...props}>
      {children}
    </div>
  )
}