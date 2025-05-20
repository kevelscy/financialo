import { GENDER_LABEL } from '@/shared/lib/consts/genders-labels'
import { Badge } from '@/ui/badge'
import { EGENDER } from '@/shared/lib/types/genders'
import { cn } from '@/shared/lib/utils/tailwind'
import { HtmlHTMLAttributes } from 'react'

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  children: string
}

export const GenderBadge = ({ children, className }: Props) => {
  return (
    <Badge className={cn(
      'bg-gray-300 text-gray-900',
      children === EGENDER.FEMALE ? 'bg-pink-50 text-pink-900' : '',
      children === EGENDER.MALE ? 'bg-blue-50 text-blue-900' : '',
      children === EGENDER.OTHER ? 'bg-gray-300 text-gray-900' : '',
      className && className
    )}>
      {GENDER_LABEL[children] || 'N/A'}
    </Badge>
  )
}